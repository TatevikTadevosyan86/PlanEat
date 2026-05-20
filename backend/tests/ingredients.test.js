import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app, server } from '../server.js'

describe('Ingredients API', () => {
  let authToken
  let ingredientId

  beforeAll(async () => {
    // Create a test user and get token
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456', name: 'Test User' })
    
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: '123456' })
    
    authToken = loginRes.body.token
  })

  afterAll(async () => {
    await mongoose.connection.close()
    server.close()
  })

  it('POST /api/ingredients - creates new ingredient', async () => {
    const res = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'chicken', type: 'fresh' })
    
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('chicken')
    ingredientId = res.body._id
  })

  it('GET /api/ingredients - returns all ingredients', async () => {
    const res = await request(app)
      .get('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/ingredients - rejects duplicate ingredient', async () => {
    await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'chicken', type: 'fresh' })
    
    const res = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'chicken', type: 'fresh' })
    
    expect(res.status).toBe(409) // Conflict
    expect(res.body.message).toContain('already exists')
  })

  it('DELETE /api/ingredients/:id - deletes ingredient', async () => {
    const res = await request(app)
      .delete(`/api/ingredients/${ingredientId}`)
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(res.status).toBe(204)
  })
})