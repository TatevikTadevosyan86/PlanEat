import { describe, it, expect } from 'vitest'


const ingredientCategories = {
  chicken: '🍗 Protein',
  'ground beef': '🍗 Protein',
  beef: '🍗 Protein',
  eggs: '🍗 Protein',
  tomato: '🥬 Vegetables',
  onion: '🥬 Vegetables',
  carrot: '🥬 Vegetables',
  cheese: '🥛 Dairy',
  milk: '🥛 Dairy',
  rice: '🍚 Grains',
  pasta: '🍚 Grains',
}

function getIngredientCategory(ingredientName) {
  const lowerName = ingredientName.toLowerCase()
  
  for (const [key, category] of Object.entries(ingredientCategories)) {
    if (lowerName.includes(key)) {
      return category
    }
  }
  return '🛒 Other'
}

describe('Ingredient Category Mapping', () => {
  it('maps chicken to Protein category', () => {
    expect(getIngredientCategory('chicken')).toBe('🍗 Protein')
    expect(getIngredientCategory('chicken 500g')).toBe('🍗 Protein')
  })
  
  it('maps tomato to Vegetables category', () => {
    expect(getIngredientCategory('tomato')).toBe('🥬 Vegetables')
    expect(getIngredientCategory('tomato 3pcs')).toBe('🥬 Vegetables')
  })
  
  it('maps milk to Dairy category', () => {
    expect(getIngredientCategory('milk')).toBe('🥛 Dairy')
  })
  
  it('maps rice to Grains category', () => {
    expect(getIngredientCategory('rice')).toBe('🍚 Grains')
  })
  
  it('returns Other for unknown ingredients', () => {
    expect(getIngredientCategory('unknown ingredient')).toBe('🛒 Other')
  })
  
  it('is case insensitive', () => {
    expect(getIngredientCategory('CHICKEN')).toBe('🍗 Protein')
    expect(getIngredientCategory('Tomato')).toBe('🥬 Vegetables')
  })
})