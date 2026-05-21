import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../server.js'

describe('Integration: Ingredients API', () => {
  let authToken
  let createdIngredientId

  beforeAll(async () => {
    // Register a test user
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'ingredients-test@example.com',
        password: '123456',
        name: 'Test User'
      })
    
    // Login to get token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ingredients-test@example.com',
        password: '123456'
      })
    
    authToken = loginRes.body.token
  })

  afterAll(async () => {
    await mongoose.connection.close()
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
    expect(res.body.type).toBe('fresh')
    expect(res.body.userId).toBeDefined()
    
    createdIngredientId = res.body._id
  })

  it('GET /api/ingredients - returns user ingredients', async () => {
    const res = await request(app)
      .get('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0].name).toBe('chicken')
  })

  it('POST /api/ingredients - rejects duplicate ingredient', async () => {
    const res = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'chicken',
        type: 'fresh'
      })
    
    expect(res.status).toBe(409) // Conflict
    expect(res.body.message).toContain('already exists')
  })

  it('DELETE /api/ingredients/:id - deletes ingredient', async () => {
    const res = await request(app)
      .delete(`/api/ingredients/${createdIngredientId}`)
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(res.status).toBe(204)
  })

  it('GET /api/ingredients - requires authentication', async () => {
    const res = await request(app)
      .get('/api/ingredients')
      .set('Authorization', 'Bearer invalid-token')
    
    expect(res.status).toBe(401)
  })
})