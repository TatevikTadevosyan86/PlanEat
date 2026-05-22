import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../server.js'
import { clearDatabase, closeDatabase } from '../helpers/dbHelper.js'
import Recipe from '../../models/Recipe.js'

const testRecipes = [
  {
    name: 'Chicken Rice Bowl',
    ingredients: [{ name: 'chicken', quantity: '200', unit: 'g' }],
    mainIngredient: 'chicken',
    usesLeftover: false,
    cuisine: 'asian',
    prepTime: 25,
  },
   {
      name: 'Chicken Rice Bowl',
      ingredients: [
        { name: 'chicken', quantity: '200', unit: 'g' },
        { name: 'rice', quantity: '1', unit: 'cup' },
        { name: 'carrot', quantity: '1', unit: '' },
        { name: 'soy sauce', quantity: '2', unit: 'tbsp' }
      ],
      instructions: [
        'Cook rice according to package instructions',
        'Cut chicken into bite-sized pieces',
        'Cook chicken in a pan until golden brown',
        'Add soy sauce and cook for 2 more minutes',
        'Slice carrots thinly',
        'Serve chicken over rice with carrots on top'
      ],
      mainIngredient: 'chicken',
      usesLeftover: false,
      cuisine: 'asian',
      image:'/images/recipes/Chicken_Rice_Bowl.png',
      prepTime: 25,
    },
    {
      name: 'Chicken Pasta',
      ingredients: [
        { name: 'chicken', quantity: '250', unit: 'g' },
        { name: 'pasta', quantity: '200', unit: 'g' },
        { name: 'cream', quantity: '150', unit: 'ml' },
        { name: 'parmesan', quantity: '30', unit: 'g' }
      ],
      instructions: [
        'Cook pasta according to package instructions',
        'Cut chicken into bite-sized pieces and cook in a pan',
        'Add cream to the pan and simmer for 5 minutes',
        'Mix pasta with the sauce',
        'Top with grated parmesan cheese'
      ],
      mainIngredient: 'chicken',
      usesLeftover: false,
      cuisine: 'italian',
      image:'/images/recipes/Chicken_Pasta.png',
      prepTime: 30,
    },
    {
      name: 'Chicken Soup (Leftover)',
      ingredients: [
        { name: 'chicken', quantity: '200', unit: 'g' },
        { name: 'onion', quantity: '1', unit: '' },
        { name: 'carrot', quantity: '1', unit: '' },
        { name: 'potato', quantity: '2', unit: '' },
        { name: 'broth', quantity: '500', unit: 'ml' }
      ],
      instructions: [
        'Dice onion, carrot, and potato',
        'Sauté vegetables in a pot for 5 minutes',
        'Add broth and bring to a boil',
        'Add leftover chicken (already cooked)',
        'Simmer for 15 minutes',
        'Serve hot'
      ],
      mainIngredient: 'chicken',
      usesLeftover: true,
      cuisine: 'comfort',
      image:'/images/recipes/chicken_soup.png',
      prepTime: 20,
    },
    {
      name: 'Chicken Tacos',
      ingredients: [
        { name: 'chicken', quantity: '250', unit: 'g' },
        { name: 'tortilla', quantity: '4', unit: '' },
        { name: 'lettuce', quantity: '1', unit: 'cup' },
        { name: 'tomato', quantity: '1', unit: '' },
        { name: 'sour cream', quantity: '50', unit: 'ml' }
      ],
      instructions: [
        'Shred leftover chicken',
        'Warm tortillas in a pan',
        'Chop lettuce and tomato',
        'Assemble tacos with chicken, lettuce, tomato',
        'Top with sour cream'
      ],
      mainIngredient: 'chicken',
      usesLeftover: true,
      cuisine: 'mexican',
      image:'/images/recipes/chicken_tacos.png',  
      prepTime: 15,
    },
    {
      name: 'Spaghetti Bolognese',
      ingredients: [
        { name: 'ground beef', quantity: '400', unit: 'g' },
        { name: 'pasta', quantity: '300', unit: 'g' },
        { name: 'tomato sauce', quantity: '400', unit: 'ml' },
        { name: 'onion', quantity: '1', unit: '' },
        { name: 'garlic', quantity: '2', unit: 'cloves' }
      ],
      instructions: [
        'Cook pasta according to package instructions',
        'Dice onion and mince garlic',
        'Brown ground beef in a pan',
        'Add onion and garlic, cook for 3 minutes',
        'Add tomato sauce and simmer for 10 minutes',
        'Serve sauce over pasta'
      ],
      mainIngredient: 'ground beef',
      usesLeftover: false,
      cuisine: 'italian',
      image: '/images/recipes/spaghetti_bolognese.png',
      prepTime: 35,
    },
    {
      name: 'Tacos',
      ingredients: [
        { name: 'ground beef', quantity: '400', unit: 'g' },
        { name: 'tortilla', quantity: '6', unit: '' },
        { name: 'lettuce', quantity: '1', unit: 'cup' },
        { name: 'tomato', quantity: '2', unit: '' },
        { name: 'cheese', quantity: '100', unit: 'g' },
        { name: 'salsa', quantity: '100', unit: 'ml' }
      ],
      instructions: [
        'Brown ground beef in a pan with taco seasoning',
        'Chop lettuce and tomatoes',
        'Grate cheese',
        'Warm tortillas',
        'Assemble tacos with meat, lettuce, tomato, cheese, salsa'
      ],
      mainIngredient: 'ground beef',
      usesLeftover: false,
      cuisine: 'mexican',
      image:'/images/recipes/tacos.png',          
      prepTime: 20,
    },
    {
      name: 'Meatball Pasta (Leftover)',
      ingredients: [
        { name: 'ground beef', quantity: '300', unit: 'g' },
        { name: 'pasta', quantity: '250', unit: 'g' },
        { name: 'tomato sauce', quantity: '300', unit: 'ml' },
        { name: 'breadcrumbs', quantity: '50', unit: 'g' }
      ],
      instructions: [
        'Mix ground beef with breadcrumbs to form meatballs',
        'Cook meatballs in a pan until browned',
        'Cook pasta according to instructions',
        'Heat tomato sauce',
        'Combine meatballs, pasta, and sauce'
      ],
      mainIngredient: 'ground beef',
      usesLeftover: true,
      cuisine: 'italian',
      image: '/images/recipes/meatball_pasta.png',
      prepTime: 15,
    },
    {
      name: "Shepherd's Pie",
      ingredients: [
        { name: 'ground beef', quantity: '500', unit: 'g' },
        { name: 'potato', quantity: '4', unit: '' },
        { name: 'carrot', quantity: '2', unit: '' },
        { name: 'peas', quantity: '100', unit: 'g' },
        { name: 'onion', quantity: '1', unit: '' }
      ],
      instructions: [
        'Boil and mash potatoes',
        'Brown ground beef with diced onion',
        'Add diced carrots and peas',
        'Transfer meat to baking dish',
        'Top with mashed potatoes',
        'Bake at 200°C for 20 minutes'
      ],
      mainIngredient: 'ground beef',
      usesLeftover: false,
      cuisine: 'british',
      image: '/images/recipes/shepherds_pie.png',
      prepTime: 45,
    },
    {
      name: 'Omelette',
      ingredients: [
        { name: 'eggs', quantity: '3', unit: '' },
        { name: 'cheese', quantity: '50', unit: 'g' },
        { name: 'milk', quantity: '30', unit: 'ml' },
        { name: 'butter', quantity: '10', unit: 'g' }
      ],
      instructions: [
        'Crack eggs into a bowl and whisk with milk',
        'Heat butter in a pan over medium heat',
        'Pour egg mixture into the pan',
        'Sprinkle cheese on top',
        'Cook for 2-3 minutes until set',
        'Fold and serve'
      ],
      mainIngredient: 'eggs',
      usesLeftover: false,
      cuisine: 'breakfast',
      image: '/images/recipes/omelette.png',
      prepTime: 10,
    },
    {
      name: 'Fried Rice (Leftover)',
      ingredients: [
        { name: 'eggs', quantity: '2', unit: '' },
        { name: 'rice', quantity: '2', unit: 'cups' },
        { name: 'soy sauce', quantity: '2', unit: 'tbsp' },
        { name: 'vegetables', quantity: '100', unit: 'g' },
        { name: 'leftover meat', quantity: '150', unit: 'g' }
      ],
      instructions: [
        'Scramble eggs in a wok',
        'Add leftover meat and vegetables',
        'Add cooked rice and stir fry',
        'Add soy sauce and mix well',
        'Cook for 3-5 minutes until hot'
      ],
      mainIngredient: 'eggs',
      usesLeftover: true,
      cuisine: 'asian',
      image: '/images/recipes/fried_rice.png',
      prepTime: 15,
    },
    {
      name: 'Tomato Pasta',
      ingredients: [
        { name: 'pasta', quantity: '300', unit: 'g' },
        { name: 'tomato sauce', quantity: '400', unit: 'ml' },
        { name: 'onion', quantity: '1', unit: '' },
        { name: 'garlic', quantity: '2', unit: 'cloves' },
        { name: 'basil', quantity: '1', unit: 'tbsp' }
      ],
      instructions: [
        'Cook pasta according to instructions',
        'Sauté diced onion and minced garlic',
        'Add tomato sauce and basil',
        'Simmer for 10 minutes',
        'Mix sauce with pasta and serve'
      ],
      mainIngredient: 'tomato',
      usesLeftover: false,
      cuisine: 'italian',
      image: '/images/recipes/tomato_pasta.png',
      prepTime: 20,
    },
    {
      name: 'Vegetable Soup (Leftover)',
      ingredients: [
        { name: 'onion', quantity: '1', unit: '' },
        { name: 'carrot', quantity: '2', unit: '' },
        { name: 'potato', quantity: '2', unit: '' },
        { name: 'tomato', quantity: '2', unit: '' },
        { name: 'broth', quantity: '500', unit: 'ml' },
        { name: 'any vegetables', quantity: '200', unit: 'g' }
      ],
      instructions: [
        'Dice all vegetables',
        'Sauté onions and carrots in a pot',
        'Add remaining vegetables and broth',
        'Simmer for 20 minutes',
        'Season with salt and pepper to taste'
      ],
      mainIngredient: 'vegetables',
      usesLeftover: true,
      cuisine: 'soup',
      image: '/images/recipes/vegetable_soup.png',
      prepTime: 25,
    }
  ];
  
  async function seedRecipes() {
    try {
      // Connect to MongoDB
      await mongoose.connect(process.env.DB_CONNECTION_STRING);
      console.log('✅ Connected to MongoDB');
  
      // Clear existing recipes
      await Recipe.deleteMany({});
      console.log('🗑️ Cleared existing recipes');
  
      // Insert new recipes
      const result = await Recipe.insertMany(meals);
      console.log(`✅ Added ${result.length} recipes to database`);
  
      // List all recipes
      const recipes = await Recipe.find();
      console.log('\n📋 Recipes in database:');
      recipes.forEach((recipe) => {
        console.log(`   - ${recipe.name} (${recipe.cuisine})`);
      });
  
      process.exit(0);
    } catch (error) {
      console.error('❌ Error seeding recipes:', error.message);
      process.exit(1);
    }
  }
  
]

describe('Integration: Complete User Flow', () => {
  let authToken

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DB_CONNECTION_STRING)
    }
  })

  beforeEach(async () => {
    await clearDatabase()
    
    // Create user
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'flow@example.com',
        password: '123456',
        name: 'Flow User'
      })
    
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'flow@example.com',
        password: '123456'
      })
    
    authToken = loginRes.body.token
  })

  afterAll(async () => {
    await closeDatabase()
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

  it('Step 2: Get recipes', async () => {
    const res = await request(app)
      .get('/api/recipes')
    
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('Step 3: Generate meal plan', async () => {
    // First get recipes
    const recipesRes = await request(app).get('/api/recipes')
    const recipes = recipesRes.body
    
    // Create meal plan with first 7 recipes
    const meals = recipes.slice(0, 7).map((recipe, index) => ({
      day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index],
      recipeId: recipe._id,
      name: recipe.name,
      mainIngredient: recipe.mainIngredient,
      usesLeftover: recipe.usesLeftover || false,
      missingIngredients: [],
      score: 10
    }))
    
    const res = await request(app)
      .post('/api/meal-plans')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        planningMode: 'smart',
        meals: meals
      })
    
    expect(res.status).toBe(201)
    expect(res.body.planningMode).toBe('smart')
    expect(res.body.meals.length).toBe(7)
  })

  it('Step 4: Get latest meal plan', async () => {
    // First create a meal plan
    const recipesRes = await request(app).get('/api/recipes')
    const recipes = recipesRes.body
    
    const meals = recipes.slice(0, 7).map((recipe, index) => ({
      day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index],
      recipeId: recipe._id,
      name: recipe.name,
      mainIngredient: recipe.mainIngredient,
      usesLeftover: recipe.usesLeftover || false,
      missingIngredients: [],
      score: 10
    }))
    
    await request(app)
      .post('/api/meal-plans')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        planningMode: 'smart',
        meals: meals
      })
    
    // Get latest meal plan
    const res = await request(app)
      .get('/api/meal-plans/latest')
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(res.status).toBe(200)
    expect(res.body.planningMode).toBe('smart')
    expect(res.body.meals.length).toBe(7)
  })

  it('Step 5: Get shopping list (missing ingredients)', async () => {
    // First create a meal plan
    const recipesRes = await request(app).get('/api/recipes')
    const recipes = recipesRes.body
    
    const meals = recipes.slice(0, 7).map((recipe, index) => ({
      day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index],
      recipeId: recipe._id,
      name: recipe.name,
      mainIngredient: recipe.mainIngredient,
      usesLeftover: recipe.usesLeftover || false,
      missingIngredients: ['missing ingredient 1', 'missing ingredient 2'],
      score: 10
    }))
    
    await request(app)
      .post('/api/meal-plans')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        planningMode: 'smart',
        meals: meals
      })
    
    // Get latest meal plan and check missing ingredients
    const res = await request(app)
      .get('/api/meal-plans/latest')
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(res.status).toBe(200)
    
    // Verify missing ingredients exist
    const hasMissingIngredients = res.body.meals.some(meal => 
      meal.missingIngredients && meal.missingIngredients.length > 0
    )
    expect(hasMissingIngredients).toBe(true)
  })

  it('Step 6: Delete ingredient', async () => {
    // First add an ingredient
    const addRes = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'test-ingredient', type: 'fresh' })
    
    const ingredientId = addRes.body._id
    
    // Delete it
    const deleteRes = await request(app)
      .delete(`/api/ingredients/${ingredientId}`)
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(deleteRes.status).toBe(204)
    
    // Verify it's gone
    const getRes = await request(app)
      .get('/api/ingredients')
      .set('Authorization', `Bearer ${authToken}`)
    
    const found = getRes.body.some(i => i._id === ingredientId)
    expect(found).toBe(false)
  })
})