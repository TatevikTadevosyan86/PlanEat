import { describe, it, expect } from 'vitest'


describe('Meal Score Calculation', () => {
  function calculateScore(mealIngredients, userIngredients, planningMode, isLeftover) {
    let score = 0
    mealIngredients.forEach(ing => {
      if (userIngredients.includes(ing.toLowerCase())) {
        score += 2
      } else {
        score -= 1
      }
    })
    
    if (planningMode === 'smart' && isLeftover) score += 3
    if (planningMode === 'fresh' && isLeftover) score -= 2
    
    return score
  }

  const userIngredients = ['chicken', 'rice', 'soy sauce']

  it('gives +2 for each ingredient user has', () => {
    const meal = ['chicken', 'rice']
    expect(calculateScore(meal, userIngredients, 'smart', false)).toBe(4)
  })

  it('gives -1 for each missing ingredient', () => {
    const meal = ['chicken', 'pasta', 'cream']
    expect(calculateScore(meal, userIngredients, 'smart', false)).toBe(0) // +2 -1 -1 = 0
  })

  it('adds +3 for leftover in smart mode', () => {
    const meal = ['chicken', 'rice']
    expect(calculateScore(meal, userIngredients, 'smart', true)).toBe(7) // 4 + 3 = 7
  })

  it('subtracts -2 for leftover in fresh mode', () => {
    const meal = ['chicken', 'rice']
    expect(calculateScore(meal, userIngredients, 'fresh', true)).toBe(2) // 4 - 2 = 2
  })
})