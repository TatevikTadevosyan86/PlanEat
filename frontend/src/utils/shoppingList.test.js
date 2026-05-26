import { describe, it, expect } from 'vitest'
import { getCleanIngredientName } from './shoppingList.js'

// These tests cover the small text-cleaning helper used before shopping list items are displayed.
describe('getCleanIngredientName', () => {
  
  it('removes quantity and unit from ingredient name', () => {
    expect(getCleanIngredientName('tomato 200g')).toBe('tomato')
    expect(getCleanIngredientName('milk 1l')).toBe('milk')
    expect(getCleanIngredientName('rice 2 cups')).toBe('rice')
  })

 
  it('handles ingredients without quantity', () => {
    expect(getCleanIngredientName('salt')).toBe('salt')
    expect(getCleanIngredientName('pepper')).toBe('pepper')
  })

  it('handles empty string', () => {
    expect(getCleanIngredientName('')).toBe('')
  })

  it('handles different units', () => {
    expect(getCleanIngredientName('flour 500g')).toBe('flour')
    expect(getCleanIngredientName('water 250ml')).toBe('water')
    expect(getCleanIngredientName('oil 2tbsp')).toBe('oil')
    expect(getCleanIngredientName('sugar 1tsp')).toBe('sugar')
  })

  it('handles multiple words ingredient names', () => {
    expect(getCleanIngredientName('olive oil 100ml')).toBe('olive oil')
    expect(getCleanIngredientName('soy sauce 2tbsp')).toBe('soy sauce')
    expect(getCleanIngredientName('ground beef 500g')).toBe('ground beef')
  })

  it('handles spaces around quantity', () => {
    expect(getCleanIngredientName('chicken 500 g')).toBe('chicken')
    expect(getCleanIngredientName('milk 1 l')).toBe('milk')
  })
})
