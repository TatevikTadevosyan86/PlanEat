import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getLatestMealPlan } from '../services/mealPlans.js'
import { getCleanIngredientName } from '../utils/shoppingList.js'

// Category mapping for ingredients
const ingredientCategories = {
  // Protein
  chicken: '🍗 Protein',
  'ground beef': '🍗 Protein',
  beef: '🍗 Protein',
  pork: '🍗 Protein',
  meat: '🍗 Protein',
  'leftover meat': '🍗 Protein',
  eggs: '🍗 Protein',
  fish: '🍗 Protein',

  // Vegetables
  tomato: '🥬 Vegetables',
  onion: '🥬 Vegetables',
  carrot: '🥬 Vegetables',
  lettuce: '🥬 Vegetables',
  potato: '🥬 Vegetables',
  peas: '🥬 Vegetables',
  garlic: '🥬 Vegetables',
  basil: '🥬 Vegetables',
  vegetables: '🥬 Vegetables',
  'any vegetables': '🥬 Vegetables',

  // Dairy
  cheese: '🥛 Dairy',
  milk: '🥛 Dairy',
  cream: '🥛 Dairy',
  parmesan: '🥛 Dairy',
  'sour cream': '🥛 Dairy',
  butter: '🥛 Dairy',

  // Grains
  rice: '🍚 Grains',
  pasta: '🍚 Grains',
  tortilla: '🍚 Grains',
  breadcrumbs: '🍚 Grains',
  bread: '🍚 Grains',

  // Sauces & Condiments
  'soy sauce': '🧂 Sauces',
  sauce: '🧂 Sauces',
  salsa: '🧂 Sauces',
  broth: '📦 Other',
  oil: '📦 Other',
  spice: '📦 Other',
}

function getIngredientCategory(ingredientName) {
  const lowerName = ingredientName.toLowerCase()

  for (const [key, category] of Object.entries(ingredientCategories)) {
    if (lowerName.includes(key)) {
      return category
    }
  }

  const mainName = lowerName.split(' ')[0]
  return ingredientCategories[mainName] || '🛒 Other'
}

function ShoppingListPage({ token }) {
  const [mealPlan, setMealPlan] = useState([])
  const [isLoadingMealPlan, setIsLoadingMealPlan] = useState(true)
  const [shoppingListError, setShoppingListError] = useState('')
  const [groupBy, setGroupBy] = useState('category')

  useEffect(() => {
    async function loadLatestMealPlan() {
      try {
        setIsLoadingMealPlan(true)
        setShoppingListError('')

        const latestMealPlan = await getLatestMealPlan(token)

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
  }, [token])

  // GROUP BY CATEGORY
  const groupByCategory = () => {
    const grouped = {}

    mealPlan.forEach((meal) => {
      if (!meal.missingIngredients?.length) return

      meal.missingIngredients.forEach((ingredient) => {
        const cleanIngredient = getCleanIngredientName(ingredient)
        const category = getIngredientCategory(cleanIngredient)

        if (!grouped[category]) {
          grouped[category] = []
        }

        grouped[category].push(cleanIngredient)
      })
    })

    // Remove duplicates
    Object.keys(grouped).forEach((category) => {
      grouped[category] = [...new Set(grouped[category])]
    })

    return grouped
  }

  // GROUP BY DAY
  const groupByDay = () => {
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]

    const grouped = {}

    mealPlan.forEach((meal, index) => {
      const day = meal.day || days[index]

      if (meal.missingIngredients?.length > 0) {
        grouped[day] = {
          mealName: meal.name,
          ingredients: meal.missingIngredients.map((ing) =>
            getCleanIngredientName(ing)
          ),
        }
      }
    })

    return grouped
  }

  const groupedData =
    groupBy === 'category' ? groupByCategory() : groupByDay()

  const hasMissingItems = Object.keys(groupedData).length > 0

  const getSortedCategories = (data) => {
    const order = [
      '🍗 Protein',
      '🥬 Vegetables',
      '🥛 Dairy',
      '🍚 Grains',
      '🧂 Sauces',
      '📦 Other',
      '🛒 Other',
    ]

    return Object.keys(data).sort((a, b) => {
      const indexA = order.indexOf(a) !== -1 ? order.indexOf(a) : 999
      const indexB = order.indexOf(b) !== -1 ? order.indexOf(b) : 999
      return indexA - indexB
    })
  }

  return (
    <>
      <section className="mb-10">
        <h1 className="text-5xl font-semibold tracking-tight">
          Shopping List
        </h1>

        <p className="mt-3 text-xl text-[#8ba095]">
          View the missing ingredients from your latest saved meal plan.
        </p>
      </section>

      {!isLoadingMealPlan && !shoppingListError && hasMissingItems && (
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <span className="text-lg font-medium text-[#1f5c4d]">
            Group by:
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setGroupBy('category')}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                groupBy === 'category'
                  ? 'bg-[#1f5c4d] text-white'
                  : 'bg-[#eef9f2] text-[#1f5c4d] hover:bg-[#dcebe0]'
              }`}
            >
              By Category
            </button>

            <button
              onClick={() => setGroupBy('day')}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                groupBy === 'day'
                  ? 'bg-[#1f5c4d] text-white'
                  : 'bg-[#eef9f2] text-[#1f5c4d] hover:bg-[#dcebe0]'
              }`}
            >
              By Day
            </button>
          </div>
        </div>
      )}

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
      ) : !hasMissingItems ? (
        <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
          <div className="text-center">
            <span className="text-6xl">🎉</span>

            <p className="mt-4 text-xl font-semibold text-[#1f5c4d]">
              You have all the ingredients!
            </p>

            <p className="mt-2 text-lg text-[#8ba095]">
              No shopping needed for this meal plan.
            </p>
          </div>
        </div>
      ) : groupBy === 'day' ? (
        <div className="mt-6 space-y-6">
          {Object.keys(groupedData).map((day) => (
            <div
              key={day}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-[#1f5c4d]">
                {day}
              </h2>

              <p className="mt-1 text-[#8ba095]">
                {groupedData[day].mealName}
              </p>

              <ul className="mt-5 space-y-3">
                {groupedData[day].ingredients.map((ingredient, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-lg text-[#1f5c4d]"
                  >
                    <span className="text-[#a35f4b]">✗</span>

                    <span className="capitalize">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {getSortedCategories(groupedData).map((category) => (
            <div
              key={category}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 border-b border-[#dbe7de] pb-3 text-2xl font-semibold text-[#1f5c4d]">
                {category}
              </h2>

              <ul className="space-y-3">
                {groupedData[category].map((ingredient, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-lg text-[#1f5c4d]"
                  >
                    <span className="text-[#a35f4b]">✗</span>

                    <span className="capitalize">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ShoppingListPage