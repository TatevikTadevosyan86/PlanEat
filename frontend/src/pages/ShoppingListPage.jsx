import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ShoppingList from '../components/ShoppingList.jsx'
import { getLatestMealPlan } from '../services/mealPlans.js'

function ShoppingListPage() {
  const [mealPlan, setMealPlan] = useState([])
  const [isLoadingMealPlan, setIsLoadingMealPlan] = useState(true)
  const [shoppingListError, setShoppingListError] = useState('')

  useEffect(() => {
    async function loadLatestMealPlan() {
      try {
        setIsLoadingMealPlan(true)
        setShoppingListError('')

        const latestMealPlan = await getLatestMealPlan()
        setMealPlan(latestMealPlan.meals)
      } catch {
        setShoppingListError(
          'No saved meal plan found. Generate a meal plan first.'
        )
      } finally {
        setIsLoadingMealPlan(false)
      }
    }

    loadLatestMealPlan()
  }, [])

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
              <Link to="/meal-plan">Meal Plan</Link>
              <Link
                to="/shopping-list"
                className="rounded-xl bg-[#dcebe0] px-5 py-2 text-[#1f5c4d]"
              >
                Shopping List
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <section className="mb-10">
              <h1 className="text-5xl font-semibold tracking-tight">
                Shopping List
              </h1>
              <p className="mt-3 text-xl text-[#8ba095]">
                View the missing ingredients from your latest saved meal plan.
              </p>
            </section>

            {isLoadingMealPlan ? (
              <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-lg text-[#8ba095]">
                  Loading latest meal plan...
                </p>
              </div>
            ) : shoppingListError ? (
              <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-lg text-[#a35f4b]">{shoppingListError}</p>

                <div className="mt-6">
                  <Link
                    to="/meal-plan"
                    className="inline-block rounded-2xl bg-[#1f5c4d] px-6 py-4 text-lg font-semibold text-white"
                  >
                    Go to Meal Plan
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
                <ShoppingList mealPlan={mealPlan} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ShoppingListPage
