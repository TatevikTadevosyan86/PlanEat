import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../server.js'
import { clearDatabase, closeDatabase } from '../helpers/dbHelper.js'

describe('Integration: Ingredients API', () => {
  let authToken
  let testEmail

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DB_CONNECTION_STRING)
    }
  })

  beforeEach(async () => {
    await clearDatabase()
    
    // Use a unique email for each test
    testEmail = `ingredients-${Date.now()}@example.com`
    
    // Register user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: '123456',
        name: 'Ingredients User'
      })
    
    console.log('Register status:', registerRes.status)
    console.log('Register body:', registerRes.body)
    
    // Login to get token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: '123456'
      })
    
    console.log('Login status:', loginRes.status)
    console.log('Login body:', loginRes.body)
    
    expect(loginRes.status).toBe(200)
    authToken = loginRes.body.token
  })

  afterAll(async () => {
    await closeDatabase()
  })

  it('POST /api/ingredients - creates a new ingredient', async () => {
    const res = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'chicken',
        type: 'fresh'
      })
    
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('chicken')
  })

  it('POST /api/ingredients - rejects duplicate ingredient', async () => {
    // First ingredient - should succeed
    const firstRes = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'chicken', type: 'fresh' })
    
    expect(firstRes.status).toBe(201)
    
    // Second ingredient with same name and type - should fail
    const duplicateRes = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'chicken', type: 'fresh' })
    
    expect(duplicateRes.status).toBe(409)
    expect(duplicateRes.body.message).toContain('already exists')
  })
})