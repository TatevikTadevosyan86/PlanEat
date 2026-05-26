import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../server.js'
import { clearDatabase, closeDatabase } from '../helpers/dbHelper.js'

// Covers the full request/response flow for registration and login against the real Express app.
describe('Integration: Authentication API', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DB_CONNECTION_STRING)
    }
  })

  beforeEach(async () => {
    await clearDatabase()
  })

  afterAll(async () => {
    await closeDatabase()
  })

  it('POST /api/auth/register - creates new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'newuser@example.com',
        password: '123456',
        name: 'New User'
      })
    
    expect(res.status).toBe(201)
    // Match the actual message with the period
    expect(res.body.message).toBe('User created successfully.')
  })

  it('POST /api/auth/register - rejects duplicate email', async () => {
    // First registration
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'duplicate@example.com',
        password: '123456',
        name: 'Duplicate User'
      })
    
    // Second registration (duplicate)
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'duplicate@example.com',
        password: '123456',
        name: 'Duplicate User'
      })
    
    // Backend returns 409 for duplicate email
    expect(res.status).toBe(409)
    expect(res.body.message).toContain('already exists')
  })

  it('POST /api/auth/login - returns JWT token', async () => {
    // First create a user
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'login@example.com',
        password: '123456',
        name: 'Login User'
      })
    
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: '123456'
      })
    
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user).toBeDefined()
  })

  it('POST /api/auth/login - rejects wrong password', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'wrongpass@example.com',
        password: '123456',
        name: 'Wrong Pass User'
      })
    
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'wrongpass@example.com',
        password: 'wrongpassword'
      })
    
    expect(res.status).toBe(401)
    // Match the actual message from  backend
    expect(res.body.message).toBe('Invalid email or password.')
  })

  it('POST /api/auth/login - rejects non-existent user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: '123456'
      })
    
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid email or password.')
  })
})
