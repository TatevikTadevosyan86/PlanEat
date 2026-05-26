import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../server.js'
import { clearDatabase, closeDatabase } from '../helpers/dbHelper.js'

// Integration tests for Ingredients API
describe('Integration: Ingredients API', () => {
  let authToken
  let testEmail

  // Connect to MongoDB before all tests
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DB_CONNECTION_STRING)
    }
  })

  // Clear database and create fresh authenticated user before each test
  beforeEach(async () => {
    await clearDatabase()

    // Generate unique email to avoid duplicate conflicts
    testEmail = `ingredients-${Date.now()}@example.com`

    // Register test user
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: '123456',
        name: 'Ingredients User'
      })

    // Debug registration response
    console.log('Register status:', registerRes.status)
    console.log('Register body:', registerRes.body)

    // Login user to receive JWT token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: '123456'
      })

    // Debug login response
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

    // Send request to create ingredient
    const res = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'chicken',
        type: 'fresh'
      })

    // Expect successful creation
    expect(res.status).toBe(201)

    // Verify ingredient name
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
        type: 'fresh'
      })

    expect(firstRes.status).toBe(201)

    // Attempt to create duplicate ingredient
    const duplicateRes = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'chicken',
        type: 'fresh'
      })

    // Expect duplicate conflict error
    expect(duplicateRes.status).toBe(409)

    // Verify duplicate error message
    expect(duplicateRes.body.message).toContain('already exists')
  })
})