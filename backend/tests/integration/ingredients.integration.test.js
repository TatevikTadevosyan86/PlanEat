import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../server.js'
import { clearDatabase, closeDatabase } from '../helpers/dbHelper.js'

// Focuses on the authenticated inventory endpoints and duplicate checks.
describe('Integration: Ingredients API', () => {
  let authToken
  let testUser

  // Connect to MongoDB before all tests
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DB_CONNECTION_STRING)
    }
  })

  // Clear database and create fresh authenticated user before each test
  beforeEach(async () => {
    await clearDatabase()

    // Shared test user used for BOTH register and login
    testUser = {
      email: `ingredients-${Date.now()}@example.com`,
      password: '123456',
      name: 'Ingredients User',
    }

    // Register test user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser)

    console.log('Register status:', registerRes.status)
    console.log('Register body:', registerRes.body)

    expect(registerRes.status).toBe(201)

    // Login with SAME credentials
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })

    console.log('Login status:', loginRes.status)
    console.log('Login body:', loginRes.body)

    // Verify login was successful
    expect(loginRes.status).toBe(200)

    // Save auth token for protected routes
    authToken = loginRes.body.token
  })

  // Close database connection after all tests
  afterAll(async () => {
    await closeDatabase()
  })

  // Test ingredient creation
  it('POST /api/ingredients - creates a new ingredient', async () => {
    const res = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'chicken',
        type: 'fresh',
      })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe('chicken')
  })

  // Test duplicate ingredient validation
  it('POST /api/ingredients - rejects duplicate ingredient', async () => {
    // First ingredient creation should succeed
    const firstRes = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'chicken',
        type: 'fresh',
      })

    expect(firstRes.status).toBe(201)

    // Attempt duplicate creation
    const duplicateRes = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'chicken',
        type: 'fresh',
      })

    expect(duplicateRes.status).toBe(409)
    expect(duplicateRes.body.message).toContain('already exists')
  })
})