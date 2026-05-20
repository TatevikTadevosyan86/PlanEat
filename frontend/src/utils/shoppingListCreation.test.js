import { describe, it, expect } from 'vitest'

describe('Shopping List Creation', () => {
  function createShoppingList(meals, userIngredients) {
    const allMissing = []
    meals.forEach(meal => {
      meal.ingredients.forEach(ing => {
        if (!userIngredients.includes(ing.toLowerCase())) {
          allMissing.push(ing)
        }
      })
    })
    return [...new Set(allMissing)] // remove duplicates
  }

  it('creates shopping list from multiple meals', () => {
    const meals = [
      { name: 'Meal 1', ingredients: ['chicken', 'rice'] },
      { name: 'Meal 2', ingredients: ['chicken', 'soy sauce'] }
    ]
    const user = ['chicken']
    
    const shoppingList = createShoppingList(meals, user)
    expect(shoppingList).toContain('rice')
    expect(shoppingList).toContain('soy sauce')
    expect(shoppingList).not.toContain('chicken')
  })

  it('removes duplicate ingredients', () => {
    const meals = [
      { name: 'Meal 1', ingredients: ['chicken', 'rice'] },
      { name: 'Meal 2', ingredients: ['rice', 'soy sauce'] }
    ]
    const user = []
    
    const shoppingList = createShoppingList(meals, user)
    expect(shoppingList.filter(i => i === 'rice').length).toBe(1)
  })
})