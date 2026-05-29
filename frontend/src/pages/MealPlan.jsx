import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getRecipes } from '../services/recipes.js'
import { getIngredients } from '../services/ingredients.js'
import { createMealPlan, getLatestMealPlan } from '../services/mealPlans.js'
import {
  getCleanIngredientName,
  ingredientNamesMatch,
} from '../utils/shoppingList.js'

/**
 * Fresh mode prefers a wider spread of main ingredients before filling remaining slots by score.
 *
 * @param {Array<Object>} scoredMeals
 * @param {number} limit
 * @returns {Array<Object>}
 */
function selectFreshMeals(scoredMeals, limit) {
  const sortedMeals = [...scoredMeals].sort((a, b) => b.score - a.score)
  const selectedMeals = []
  const usedMainIngredients = new Set()

  for (const meal of sortedMeals) {
    const mainIngredient = meal.mainIngredient.toLowerCase()

    if (usedMainIngredients.has(mainIngredient)) {
      continue
    }

    selectedMeals.push(meal)
    usedMainIngredients.add(mainIngredient)

    if (selectedMeals.length === limit) {
      return selectedMeals
    }
  }

  for (const meal of sortedMeals) {
    if (selectedMeals.some((selectedMeal) => selectedMeal._id === meal._id)) {
      continue
    }

    selectedMeals.push(meal)

    if (selectedMeals.length === limit) {
      return selectedMeals
    }
  }

  return selectedMeals
}

/**
 * Generates and displays meal plans based on the current inventory and selected planning mode.
 *
 * @param {{ planningMode: string, token: string }} props
 * @returns {JSX.Element}
 */
function MealPlan({ planningMode, token }) {
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [mealPlan, setMealPlan] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [dataLoadError, setDataLoadError] = useState('')
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  useEffect(() => {
    async function loadData() {
      try {
        setIsDataLoading(true)
        setDataLoadError('')

        const [savedIngredients, savedRecipes] = await Promise.all([
          getIngredients(token),
          getRecipes(),
        ])

        setIngredients(savedIngredients)
        setRecipes(savedRecipes)
      } catch {
        setDataLoadError('Could not load data from the server.')
      } finally {
        setIsDataLoading(false)
      }
    }

    loadData()
  }, [token])

  // Reload the latest saved plan when the selected mode changes so the UI doesn't show a stale mode snapshot.
  useEffect(() => {
    async function loadSavedMealPlan() {
      try {
        const savedPlan = await getLatestMealPlan(token, planningMode)

        if (savedPlan?.meals?.length > 0) {
          const loadedMeals = savedPlan.meals.map((meal, index) => ({
  _id: `${meal.name}-${index}`,
  recipeId: meal.recipeId,
  name: meal.name,
            mainIngredient: meal.mainIngredient,
            usesLeftover: meal.usesLeftover,
            missingIngredients: meal.missingIngredients,
            score: meal.score,
            image: meal.image,
          }))

          setMealPlan(loadedMeals)
          console.log('âœ… Loaded saved meal plan from backend')
        }
      } catch (error) {
        setMealPlan([])

        if (error.response?.status !== 404) {
          console.error('Failed to load saved meal plan:', error)
        }
      }
    }

    loadSavedMealPlan()
  }, [planningMode, token])

  async function handleGenerateMealPlan() {
    setIsGenerating(true)
    console.log('=== Generate Meal Plan Debug ===')
    console.log('Ingredients count:', ingredients.length)
    console.log('Recipes count:', recipes.length)
    console.log('Planning mode:', planningMode)

    if (ingredients.length === 0) {
      console.log('No ingredients, showing error')
      setMealPlan([])
      setDataLoadError(
        'Add ingredients in your inventory before generating a meal plan.'
      )
      setIsGenerating(false)
      return
    }

    const availableIngredientNames = ingredients.map((ingredient) =>
      ingredient.name.toLowerCase()
    )

    console.log('Available ingredients:', availableIngredientNames)

    const scoredMeals = recipes.map((meal) => {
      let score = meal.ingredients.reduce((total, ingredient) => {
        // Match against normalized inventory names so the shopping list only includes truly missing ingredients.
        const hasIngredient = availableIngredientNames.some(
          (availableIngredient) =>
            ingredientNamesMatch(availableIngredient, ingredient.name)
        )

        if (hasIngredient) {
          return total + 2
        }

        return total - 1
      }, 0)

      if (planningMode === 'smart' && meal.usesLeftover) score += 3
      if (planningMode === 'fresh' && meal.usesLeftover) score -= 4

      // Save only the ingredients that could not be satisfied by the current inventory.
      const missingIngredients = meal.ingredients
        .filter(
          (ingredient) =>
            !availableIngredientNames.some((availableIngredient) =>
              ingredientNamesMatch(availableIngredient, ingredient.name)
            )
        )
        .map((ingredient) =>
          getCleanIngredientName(
            `${ingredient.name} ${ingredient.quantity}${ingredient.unit}`
          )
        )

      return { ...meal, score, missingIngredients }
    })

    console.log('Scored meals count:', scoredMeals.length)
    console.log('First scored meal:', scoredMeals[0])

    const selectedMeals =
      planningMode === 'fresh'
        ? selectFreshMeals(scoredMeals, 7)
        : [...scoredMeals].sort((a, b) => b.score - a.score).slice(0, 7)

    console.log('Selected meals count:', selectedMeals.length)
    console.log('Selected meals:', selectedMeals)

    setMealPlan(selectedMeals)
    console.log('mealPlan state updated')

    const mealsWithDays = selectedMeals.map((meal, index) => ({
      day: weekdays[index],
      recipeId: meal._id,
      name: meal.name,
      mainIngredient: meal.mainIngredient,
      usesLeftover: meal.usesLeftover,
      missingIngredients: meal.missingIngredients,
      score: meal.score,
      image: meal.image,
    }))
    console.log('Meals being saved to backend:', mealsWithDays)

    try {
      await createMealPlan(
        {
          planningMode,
          meals: mealsWithDays,
        },
        token
      )
      console.log('âœ… Meal plan saved to backend')
    } catch (error) {
      console.error('Failed to save meal plan:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      {dataLoadError && (
        <div className="mb-6 rounded-2xl bg-[#fdf1ec] p-4">
          <p className="text-lg text-[#a35f4b]">{dataLoadError}</p>
        </div>
      )}

      <section className="mt-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
              Your 7-Day Meal Plan
            </h2>
            <p className="mt-3 text-xl text-[#8ba095]">
              Generated meals based on your current ingredients
            </p>
          </div>
          <button
            onClick={handleGenerateMealPlan}
            disabled={isDataLoading || isGenerating}
            className="rounded-2xl bg-[#1f5c4d] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#2b6a58] disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate New Plan'}
          </button>
        </div>

        {mealPlan.length === 0 && !isGenerating ? (
          <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-lg text-[#8ba095]">
              No meal plan generated yet. Click "Generate New Plan" to create
              one.
            </p>
          </div>
        ) : mealPlan.length === 0 && isGenerating ? (
          <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-lg text-[#8ba095]">
              Generating your meal plan...
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mealPlan.map((meal, index) => (
              <div
                key={meal._id}
                className="overflow-hidden rounded-3xl border border-[#dbe7de] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-52 w-full bg-[#eef6f1]">
                  <img
                    src={
                      meal.image ||
                      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200'
                    }
                    alt={meal.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8ba095]">
                    {weekdays[index]}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-[#1f5c4d]">
                    {meal.name}
                  </h3>

                  <Link
                    to={`/meal-plan/${meal.recipeId}`}
                    className="mt-6 flex items-center justify-center rounded-2xl bg-[#1f5c4d] px-6 py-3 font-medium text-white transition hover:bg-[#2b6a58]"
                  >
                    View Instructions
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
          Shopping List
        </h2>
        <p className="mt-3 text-xl text-[#8ba095]">
          View the missing ingredients from your latest saved meal plan on the
          shopping list page.
        </p>

        <div className="mt-8">
          <Link
            to="/shopping-list"
            className="inline-block rounded-2xl bg-[#1f5c4d] px-8 py-4 text-lg font-semibold text-white hover:bg-[#2b6a58]"
          >
            Go to Shopping List
          </Link>
        </div>
      </section>
    </>
  )
}

export default MealPlan
