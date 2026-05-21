import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../server.js'

describe('Integration: Complete User Flow', () => {
  let authToken
  let recipeId

  beforeAll(async () => {
    // Register
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'flow@example.com',
        password: '123456',
        name: 'Flow User'
      })
    
    // Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'flow@example.com',
        password: '123456'
      })
    
    authToken = loginRes.body.token
  })

  afterAll(async () => {
    await mongoose.connection.close()
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

  it('Step 2: Get all ingredients', async () => {
    const res = await request(app)
      .get('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(3)
  })

  it('Step 3: Get recipes', async () => {
    const res = await request(app).get('/api/recipes')
    
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
    
    recipeId = res.body[0]._id
  })

  it('Step 4: Get single recipe', async () => {
    const res = await request(app).get(`/api/recipes/${recipeId}`)
    
    expect(res.status).toBe(200)
    expect(res.body.name).toBeDefined()
    expect(res.body.ingredients).toBeDefined()
  })

  it('Step 5: Create meal plan', async () => {
    const res = await request(app)
      .get('/api/recipes')
    
    const recipes = res.body
    const meals = recipes.slice(0, 7).map((recipe, index) => ({
      day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index],
      recipeId: recipe._id,
      name: recipe.name,
      mainIngredient: recipe.mainIngredient,
      usesLeftover: recipe.usesLeftover,
      missingIngredients: [],
      score: 10
    }))
    
    const planRes = await request(app)
      .post('/api/meal-plans')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        planningMode: 'smart',
        meals: meals
      })
    
    expect(planRes.status).toBe(201)
    expect(planRes.body.meals.length).toBe(7)
  })

  it('Step 6: Get latest meal plan', async () => {
    const res = await request(app)
      .get('/api/meal-plans/latest')
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(res.status).toBe(200)
    expect(res.body.planningMode).toBe('smart')
    expect(res.body.meals.length).toBe(7)
  })
})