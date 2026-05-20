import { describe, it, expect } from 'vitest'

describe('Missing Ingredients', () => {
  function findMissingIngredients(recipeIngredients, userIngredients) {
    return recipeIngredients.filter(ing => !userIngredients.includes(ing.toLowerCase()))
  }

  it('returns empty when user has all ingredients', () => {
    const recipe = ['chicken', 'rice', 'soy sauce']
    const user = ['chicken', 'rice', 'soy sauce']
    expect(findMissingIngredients(recipe, user)).toEqual([])
  })

  it('returns missing ingredients when user lacks some', () => {
    const recipe = ['chicken', 'rice', 'soy sauce', 'garlic']
    const user = ['chicken', 'rice']
    expect(findMissingIngredients(recipe, user)).toEqual(['soy sauce', 'garlic'])
  })

  it('is case insensitive', () => {
    const recipe = ['Chicken', 'Rice']
    const user = ['chicken', 'rice']
    expect(findMissingIngredients(recipe, user)).toEqual([])
  })
})