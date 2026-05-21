import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../server.js'
import { clearDatabase, closeDatabase } from '../helpers/dbHelper.js'

describe('Integration: Complete User Flow', () => {
  let authToken

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DB_CONNECTION_STRING)
    }
  })

  beforeEach(async () => {
    await clearDatabase()
    
    // Create user
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'flow@example.com',
        password: '123456',
        name: 'Flow User'
      })
    
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'flow@example.com',
        password: '123456'
      })
    
    authToken = loginRes.body.token
  })

  afterAll(async () => {
    await closeDatabase()
  })

  it('Step 1: Add ingredients', async () => {
    const ingredients = ['chicken', 'rice', 'soy sauce']
    
    for (const ingredient of ingredients) {
      const res = await request(app)
        .post('/api/ingredients')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: ingredient, type: 'fresh' })
      
      expect(res.status).toBe(201)
    }
  })

  // ... rest of your tests
})