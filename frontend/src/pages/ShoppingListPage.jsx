import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { getLatestMealPlan } from '../services/mealPlans.js'

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
  
  // Check all keys in the mapping (full phrase match)
  for (const [key, category] of Object.entries(ingredientCategories)) {
    if (lowerName.includes(key)) {
      return category
    }
  }
  
  // Fallback: check first word only
  const mainName = lowerName.split(' ')[0]
  return ingredientCategories[mainName] || '🛒 Other'
}

// Clean ingredient name by removing quantities
function getCleanIngredientName(ingredient) {
  // Remove quantities like "500g", "2tbsp", "50ml", "200g", etc.
  return ingredient.replace(/\s*\d+(?:\.\d+)?\s*(?:g|kg|ml|l|tbsp|tsp|cup|cups)?/gi, '').trim()
}

function ShoppingListPage() {
  const [mealPlan, setMealPlan] = useState([])
  const [isLoadingMealPlan, setIsLoadingMealPlan] = useState(true)
  const [shoppingListError, setShoppingListError] = useState('')
  const [groupBy, setGroupBy] = useState('category')

  useEffect(() => {
    async function loadLatestMealPlan() {
      try {
        setIsLoadingMealPlan(true)
        setShoppingListError('')
        const latestMealPlan = await getLatestMealPlan()
        setMealPlan(latestMealPlan.meals)
      } catch {
        setShoppingListError('No saved meal plan found. Generate a meal plan first.')
      } finally {
        setIsLoadingMealPlan(false)
      }
    }
    loadLatestMealPlan()
  }, [])

  // Group by category
  const groupByCategory = () => {
    const allMissing = []
    mealPlan.forEach((meal) => {
      if (meal.missingIngredients) {
        meal.missingIngredients.forEach((ingredient) => {
          allMissing.push(getCleanIngredientName(ingredient))
        })
      }
    })
    
    // Remove duplicates
    const uniqueIngredients = [...new Set(allMissing)]
    
    // Group by category
    const grouped = {}
    uniqueIngredients.forEach((ingredient) => {
      const category = getIngredientCategory(ingredient)
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(ingredient)
    })
    return grouped
  }

  // Group by day
  const groupByDay = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const grouped = {}
    mealPlan.forEach((meal, index) => {
      const day = meal.day || days[index]
      if (meal.missingIngredients && meal.missingIngredients.length > 0) {
        grouped[day] = meal.missingIngredients.map(ing => getCleanIngredientName(ing))
      }
    })
    return grouped
  }

  // Group by meal
  const groupByMeal = () => {
    const grouped = {}
    mealPlan.forEach((meal) => {
      if (meal.missingIngredients && meal.missingIngredients.length > 0) {
        grouped[meal.name] = meal.missingIngredients.map(ing => getCleanIngredientName(ing))
      }
    })
    return grouped
  }

  const getGroupedData = () => {
    switch (groupBy) {
      case 'category':
        return groupByCategory()
      case 'day':
        return groupByDay()
      case 'meal':
        return groupByMeal()
      default:
        return groupByCategory()
    }
  }

  const groupedData = getGroupedData()
  const hasMissingItems = Object.keys(groupedData).length > 0

  // Sort categories in a logical order
  const getSortedCategories = (data) => {
    const order = ['🍗 Protein', '🥬 Vegetables', '🥛 Dairy', '🍚 Grains', '🧂 Sauces', '🧂 Other', '🛒 Other']
    return Object.keys(data).sort((a, b) => {
      const indexA = order.indexOf(a) !== -1 ? order.indexOf(a) : 999
      const indexB = order.indexOf(b) !== -1 ? order.indexOf(b) : 999
      return indexA - indexB
    })
  }

  return (
    <div className="min-h-screen bg-[#f7faf7] text-[#1f5c4d]">
      <div className="flex min-h-screen flex-col">
        <header className="h-24 border-b border-[#dbe7de] bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <img src={logo} alt="PlanEat logo" className="h-22 w-22 object-contain" />
              <span className="text-4xl font-semibold tracking-tight text-[#1f5c4d]">
                PlanEat
              </span>
            </div>

            <nav className="hidden items-center gap-10 text-xl font-medium text-[#7c9488] md:flex">
              <Link to="/">Home</Link>
              <Link to="/inventory">Inventory</Link>
              <Link to="/meal-plan">Meal Plan</Link>
              <Link to="/shopping-list" className="rounded-xl bg-[#dcebe0] px-5 py-2 text-[#1f5c4d]">
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

            {/* Group By Selector */}
            {!isLoadingMealPlan && !shoppingListError && hasMissingItems && (
              <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <span className="text-lg font-medium text-[#1f5c4d]">Group by:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGroupBy('category')}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      groupBy === 'category'
                        ? 'bg-[#1f5c4d] text-white'
                        : 'bg-[#eef9f2] text-[#1f5c4d] hover:bg-[#dcebe0]'
                    }`}
                  >
                    🥬 Category
                  </button>
                  <button
                    onClick={() => setGroupBy('day')}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      groupBy === 'day'
                        ? 'bg-[#1f5c4d] text-white'
                        : 'bg-[#eef9f2] text-[#1f5c4d] hover:bg-[#dcebe0]'
                    }`}
                  >
                    📅 Day
                  </button>
                  <button
                    onClick={() => setGroupBy('meal')}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      groupBy === 'meal'
                        ? 'bg-[#1f5c4d] text-white'
                        : 'bg-[#eef9f2] text-[#1f5c4d] hover:bg-[#dcebe0]'
                    }`}
                  >
                    🍽️ Meal
                  </button>
                </div>
              </div>
            )}

            {/* Content */}
            {isLoadingMealPlan ? (
              <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-lg text-[#8ba095]">Loading latest meal plan...</p>
              </div>
            ) : shoppingListError ? (
              <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-lg text-[#a35f4b]">{shoppingListError}</p>
                <div className="mt-6">
                  <Link to="/meal-plan" className="inline-block rounded-2xl bg-[#1f5c4d] px-6 py-4 text-lg font-semibold text-white">
                    Go to Meal Plan
                  </Link>
                </div>
              </div>
            ) : !hasMissingItems ? (
              <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
                <div className="text-center">
                  <span className="text-6xl">🎉</span>
                  <p className="mt-4 text-xl text-[#1f5c4d] font-semibold">
                    You have all the ingredients!
                  </p>
                  <p className="mt-2 text-lg text-[#8ba095]">
                    No shopping needed for this meal plan.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                {getSortedCategories(groupedData).map((groupName) => (
                  <div key={groupName} className="rounded-3xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-2xl font-semibold text-[#1f5c4d] border-b border-[#dbe7de] pb-3">
                      {groupName}
                    </h2>
                    <ul className="space-y-3">
                      {groupedData[groupName].map((ingredient, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-lg text-[#1f5c4d]">
                          <span className="text-[#a35f4b]">✗</span>
                          <span className="capitalize">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Summary */}
                <div className="rounded-3xl bg-[#eef9f2] p-6 text-center">
                  <p className="text-lg text-[#1f5c4d]">
                    Total missing items: <span className="font-bold">
                      {Object.values(groupedData).reduce((sum, items) => sum + items.length, 0)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ShoppingListPage