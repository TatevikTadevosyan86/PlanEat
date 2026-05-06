import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { meals } from '../data/meals.js'
import { getIngredients } from '../services/ingredients.js'
import { createMealPlan } from '../services/mealPlans.js'


function MealPlan({ planningMode }) {
  const [ingredients, setIngredients] = useState([])
  const [mealPlan, setMealPlan] = useState([])
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true)
  const [mealPlanError, setMealPlanError] = useState('')
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
    async function loadIngredients() {
      try {
        setIsLoadingIngredients(true)
        setMealPlanError('')
        const savedIngredients = await getIngredients()
        setIngredients(savedIngredients)
      } catch {
        setMealPlanError('Could not load ingredients from the server.')
      } finally {
        setIsLoadingIngredients(false)
      }
    }

    loadIngredients()
  }, [])

  async function handleGenerateMealPlan() {
    if (ingredients.length === 0) {
      setMealPlan([])
      setMealPlanError('Add ingredients in your inventory before generating a meal plan.')
      return
    }

    setMealPlanError('')

    const availableIngredientNames = ingredients.map((ingredient) =>
      ingredient.name.toLowerCase()
    )

    const scoredMeals = meals.map((meal) => {
      let score = meal.ingredients.reduce((total, ingredient) => {
        if (availableIngredientNames.includes(ingredient.toLowerCase())) {
          return total + 2
        }

        return total - 1
      }, 0)

      if (planningMode === 'smart' && meal.usesLeftover) {
        score += 3
      }

      if (planningMode === 'fresh' && meal.usesLeftover) {
        score -= 2
      }

      const missingIngredients = meal.ingredients.filter(
        (ingredient) =>
          !availableIngredientNames.includes(ingredient.toLowerCase())
      )

      return {
        ...meal,
        score,
        missingIngredients,
      }
    })

    const selectedMeals = scoredMeals
      .sort((a, b) => b.score - a.score)
      .slice(0, 7)
const mealsWithDays = selectedMeals.map((meal, index) => ({
  day: weekdays[index],
  name: meal.name,
  mainIngredient: meal.mainIngredient,
  usesLeftover: meal.usesLeftover,
  missingIngredients: meal.missingIngredients,
  score: meal.score,
}))
await createMealPlan({
  planningMode,
  meals: mealsWithDays,
})

    setMealPlan(selectedMeals)
  }

  return (
    <div className="min-h-screen bg-[#f7faf7] text-[#1f5c4d]">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-[#dbe7de] bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-[#dcebe0]" />
              <span className="text-2xl font-medium text-[#1f5c4d]">
                PlanEat
              </span>
            </div>

            <nav className="hidden items-center gap-10 text-xl font-medium text-[#7c9488] md:flex">
              <Link to="/">Home</Link>
              <Link to="/inventory">Inventory</Link>
              <Link
                to="/meal-plan"
                className="rounded-xl bg-[#dcebe0] px-5 py-2 text-[#1f5c4d]"
              >
                Meal Plan
              </Link>
              <Link to="/shopping-list">Shopping List</Link>

            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <section className="mb-10">
              <h1 className="text-5xl font-semibold tracking-tight">
                Meal Plan
              </h1>
              <p className="mt-3 text-xl text-[#8ba095]">
                Generate your weekly meals from the ingredients already saved in
                your inventory.
              </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <article className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#1f5c4d]">
                  Planning setup
                </h2>
                <p className="mt-4 text-lg text-[#7f958a]">
                  Current mode:{' '}
                  <span className="font-semibold text-[#1f5c4d]">
                    {planningMode === 'smart' ? 'Smart Mode' : 'Fresh Mode'}
                  </span>
                </p>
                <p className="mt-3 text-lg leading-8 text-[#7f958a]">
                  You currently have {ingredients.length} saved ingredient
                  {ingredients.length === 1 ? '' : 's'} available for planning.
                </p>

                {mealPlanError ? (
                  <div className="mt-5 rounded-2xl bg-[#fdf1ec] p-4">
                    <p className="text-lg text-[#a35f4b]">{mealPlanError}</p>
                  </div>
                ) : null}

                <div className="mt-8 space-y-4">
                  <button
                    type="button"
                    onClick={handleGenerateMealPlan}
                    disabled={isLoadingIngredients}
                    className="w-full rounded-2xl bg-[#1f5c4d] px-6 py-4 text-xl font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#9db3a8]"
                  >
                    {isLoadingIngredients
                      ? 'Loading inventory...'
                      : 'Generate Meal Plan'}
                  </button>

                  <Link
                    to="/inventory"
                    className="block rounded-2xl border border-[#d9e7dd] px-6 py-4 text-center text-lg font-semibold text-[#1f5c4d]"
                  >
                    Update Inventory
                  </Link>
                </div>
              </article>

              <article className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#1f5c4d]">
                  Ingredient overview
                </h2>

                <div className="mt-5 space-y-4">
                  {isLoadingIngredients ? (
                    <div className="rounded-2xl bg-[#f6f9f7] p-4">
                      <p className="text-lg text-[#8ba095]">
                        Loading saved ingredients...
                      </p>
                    </div>
                  ) : ingredients.length === 0 ? (
                    <div className="rounded-2xl bg-[#f6f9f7] p-4">
                      <p className="text-lg text-[#8ba095]">
                        No ingredients saved yet. Add some in Inventory first.
                      </p>
                    </div>
                  ) : (
                    ingredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="rounded-2xl bg-[#f6f9f7] p-4"
                      >
                        <p className="text-xl text-[#1f5c4d]">
                          {ingredient.name}
                        </p>
                        <p className="mt-1 text-lg capitalize text-[#8ba095]">
                          {ingredient.type}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </article>
            </section>

            <section className="mt-16">
              <h2 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
                Your 7-Day Meal Plan
              </h2>
              <p className="mt-3 text-xl text-[#8ba095]">
                Generated meals based on your current ingredients
              </p>
              {mealPlan.length === 0 ? (
                <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
                  <p className="text-lg text-[#8ba095]">
                    No meal plan generated yet. Click &quot;Generate Meal
                    Plan&quot; to create one.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {mealPlan.map((meal, index) => (
                    <div
                      key={meal.id}
                      className="rounded-3xl border border-[#dbe7de] bg-white p-6 shadow-sm"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8ba095]">
                        {weekdays[index]}
                      </p>

                      <h3 className="mt-3 text-2xl font-semibold text-[#1f5c4d]">
                        {meal.name}
                      </h3>

                      <div className="mt-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                            meal.usesLeftover
                              ? 'bg-[#e3f0e7] text-[#1f5c4d]'
                              : 'bg-[#f3f6f4] text-[#6f857b]'
                          }`}
                        >
                          {meal.usesLeftover
                            ? 'Leftover-friendly'
                            : 'Fresh meal'}
                        </span>
                      </div>

                      <div className="mt-5 space-y-2 text-lg text-[#6f857b]">
                        <p>
                          <span className="font-medium text-[#1f5c4d]">
                            Main ingredient:
                          </span>{' '}
                          {meal.mainIngredient}
                        </p>
                      </div>

                      <div className="mt-5 rounded-2xl bg-[#f6f9f7] p-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#8ba095]">
                          Missing ingredients
                        </p>
                        <p
                          className={`mt-2 text-lg ${
                            meal.missingIngredients.length > 0
                              ? 'text-[#a35f4b]'
                              : 'text-[#2b6a58]'
                          }`}
                        >
                          {meal.missingIngredients.length > 0
                            ? meal.missingIngredients.join(', ')
                            : 'None'}
                        </p>
                      </div>

                      <p className="mt-4 text-sm text-[#8ba095]">
                        Score: {meal.score}
                      </p>
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
                View the missing ingredients from your latest saved meal plan on
                the shopping list page.
              </p>

              <div className="mt-8">
                <Link
                  to="/shopping-list"
                  className="inline-block rounded-2xl bg-[#9db3a8] px-8 py-4 text-lg font-semibold text-white"
                >
                  Go to Shopping List
                </Link>
              </div>
            </section>
            <div className="mt-8">
  <Link
    to="/shopping-list"
    className="inline-block rounded-2xl bg-[#9db3a8] px-8 py-4 text-lg font-semibold text-white"
  >
    View Shopping List Page
  </Link>
</div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default MealPlan
