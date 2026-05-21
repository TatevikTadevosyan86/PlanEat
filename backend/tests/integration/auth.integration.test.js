import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../server.js'

describe('Integration: Authentication API', () => {
  afterAll(async () => {
    await mongoose.connection.close()
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
    expect(res.body.message).toBe('User created successfully')
  })

  it('POST /api/auth/register - rejects duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'newuser@example.com',
        password: '123456',
        name: 'New User'
      })
    
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Email already exists')
  })

  it('POST /api/auth/login - returns JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'newuser@example.com',
        password: '123456'
      })
    
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user).toBeDefined()
    expect(res.body.user.email).toBe('newuser@example.com')
  })

  it('POST /api/auth/login - rejects wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'newuser@example.com',
        password: 'wrongpassword'
      })
    
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid credentials')
  })

  it('POST /api/auth/login - rejects non-existent user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: '123456'
      })
    
    expect(res.status).toBe(401)
  })
})