import { describe, it, expect } from 'vitest'
import { getCleanIngredientName } from './shoppingList.js'

describe('getCleanIngredientName', () => {
  it('removes quantity and unit from ingredient name', () => {
    expect(getCleanIngredientName('tomato 200g')).toBe('tomato')
    expect(getCleanIngredientName('milk 1l')).toBe('milk')
    expect(getCleanIngredientName('rice 2 cups')).toBe('rice')
  })
})
