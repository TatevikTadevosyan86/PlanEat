import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getRecipes } from '../services/recipes.js'
import { getIngredients } from '../services/ingredients.js'
import { createMealPlan, getLatestMealPlan } from '../services/mealPlans.js'

function MealPlan({ planningMode, token }) {
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [mealPlan, setMealPlan] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [dataLoadError, setDataLoadError] = useState('')
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  useEffect(() => {
    async function loadData() {
      try {
        setIsDataLoading(true)
        setDataLoadError('')
        const [savedIngredients, savedRecipes] = await Promise.all([
          getIngredients(token),
          getRecipes()
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

  // Load saved meal plan from backend on page load
  useEffect(() => {
    async function loadSavedMealPlan() {
      try {
        const savedPlan = await getLatestMealPlan(token)
        if (savedPlan && savedPlan.meals && savedPlan.meals.length > 0) {
          const loadedMeals = savedPlan.meals.map(meal => ({
            _id: meal.recipeId,
            name: meal.name,
            mainIngredient: meal.mainIngredient,
            usesLeftover: meal.usesLeftover,
            missingIngredients: meal.missingIngredients,
            score: meal.score,
            image: meal.image,
          }))
          setMealPlan(loadedMeals)
          console.log('✅ Loaded saved meal plan from backend')
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error('Failed to load saved meal plan:', error)
        }
      }
    }
    loadSavedMealPlan()
  }, [token])

  async function handleGenerateMealPlan() {
    setIsGenerating(true)
    console.log('=== Generate Meal Plan Debug ===')
    console.log('Ingredients count:', ingredients.length)
    console.log('Recipes count:', recipes.length)
    console.log('Planning mode:', planningMode)

    if (ingredients.length === 0) {
      console.log('No ingredients, showing error')
      setMealPlan([])
      setDataLoadError('Add ingredients in your inventory before generating a meal plan.')
      setIsGenerating(false)
      return
    }

    const availableIngredientNames = ingredients.map(i => i.name.toLowerCase())
    console.log('Available ingredients:', availableIngredientNames)

    const scoredMeals = recipes.map((meal) => {
      let score = meal.ingredients.reduce((total, ingredient) => {
        if (availableIngredientNames.includes(ingredient.name.toLowerCase())) {
          return total + 2
        }
        return total - 1
      }, 0)

      if (planningMode === 'smart' && meal.usesLeftover) score += 3
      if (planningMode === 'fresh' && meal.usesLeftover) score -= 2

      const missingIngredients = meal.ingredients
        .filter(ing => !availableIngredientNames.includes(ing.name.toLowerCase()))
        .map(ing => `${ing.name} ${ing.quantity}${ing.unit}`)

      return { ...meal, score, missingIngredients }
    })

    console.log('Scored meals count:', scoredMeals.length)
    console.log('First scored meal:', scoredMeals[0])

    const selectedMeals = scoredMeals.sort((a, b) => b.score - a.score).slice(0, 7)
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

    try {
      await createMealPlan(
        {
          planningMode,
          meals: mealsWithDays,
        },
        token
      )
      console.log('✅ Meal plan saved to backend')
    } catch (error) {
      console.error('Failed to save meal plan:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
            {/* Error message */}
            {dataLoadError && (
              <div className="mb-6 rounded-2xl bg-[#fdf1ec] p-4">
                <p className="text-lg text-[#a35f4b]">{dataLoadError}</p>
              </div>
            )}

            {/* Meal Plan Section with Title and Button side by side */}
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
                    No meal plan generated yet. Click "Generate New Plan" to create one.
                  </p>
                </div>
              ) : mealPlan.length === 0 && isGenerating ? (
                <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
                  <p className="text-lg text-[#8ba095]">Generating your meal plan...</p>
                </div>
              ) : (
                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  {mealPlan.map((meal, index) => (
    <div
      key={meal._id}
      className="overflow-hidden rounded-3xl border border-[#dbe7de] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {/* Image */}
      <div className="h-52 w-full bg-[#eef6f1]">
        <img
          src={meal.image || 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200'}
          alt={meal.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8ba095]">
          {weekdays[index]}
        </p>

        <h3 className="mt-2 text-2xl font-semibold text-[#1f5c4d]">
          {meal.name}
        </h3>

        

        <Link
          to={`/meal-plan/${meal._id}`}
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

            {/* Shopping List Link */}
            <section className="mt-16">
              <h2 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
                Shopping List
              </h2>
              <p className="mt-3 text-xl text-[#8ba095]">
                View the missing ingredients from your latest saved meal plan on
                the shopping list page.
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
