import mongoose from 'mongoose'
import { app } from '../../server.js'

export async function clearDatabase() {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany({})
  }
}

export async function createTestUser() {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      email: 'test@example.com',
      password: '123456',
      name: 'Test User'
    })
  return res.body
}

export async function getAuthToken() {
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: '123456'
    })
  return res.body.token
}