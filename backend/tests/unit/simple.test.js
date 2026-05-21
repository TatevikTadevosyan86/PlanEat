// backend/tests/simple.test.js
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../../server.js'

describe('Simple API Tests', () => {
  it('GET / returns welcome message', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body.message).toContain('PlanEat')
  })

  it('GET /api/health returns status ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})