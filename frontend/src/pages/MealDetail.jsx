import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CheckCircle2, XCircle } from 'lucide-react'
import { getIngredients } from '../services/ingredients.js'

function MealDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userIngredients, setUserIngredients] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const [recipeRes, ingredientsRes] = await Promise.all([
          axios.get(`/api/recipes/${id}`),
          getIngredients()
        ])
        setMeal(recipeRes.data)
        setUserIngredients(ingredientsRes.map(i => i.name.toLowerCase()))
      } catch (error) {
        console.error('Failed to load recipe:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8f7]">
        <p className="text-lg text-gray-500">Loading recipe...</p>
      </div>
    )
  }

  if (!meal) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8f7]">
        <p className="text-lg text-gray-500">Recipe not found</p>
      </div>
    )
  }

  // Check if user has this ingredient
  const hasIngredient = (ingredientName) => {
    return userIngredients.includes(ingredientName.toLowerCase())
  }

  return (
    <div className="min-h-screen bg-[#f6f8f7]">
      {/* Hero Section - Image only (no text overlay) */}
      <div className="relative h-[320px] overflow-hidden bg-[#f6f8f7]">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${meal.image || 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200'})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
        />
      </div>

      {/* Title and Description - Below the image */}
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-4">
        <Link
          to="/meal-plan"
          className="mb-4 inline-block rounded-full bg-[#eef9f2] px-4 py-2 text-sm text-[#1f5c4d] hover:bg-[#dcebe0]"
        >
          ← Back to Meal Plan
        </Link>

        <h1 className="text-5xl font-bold text-[#173f35] md:text-6xl">
          {meal.name}
        </h1>

        <p className="mt-3 max-w-2xl text-lg text-gray-600">
          {meal.description || 'A delicious homemade meal recipe'}
        </p>
      </div>

      {/* Main Layout */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Ingredients – green if you have, red if missing */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-[#173f35]">
              Ingredients
            </h2>

            <div className="mt-6 space-y-4">
              {meal.ingredients.map((ingredient, index) => {
                const haveIt = hasIngredient(ingredient.name)
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 rounded-2xl border p-4 ${
                      haveIt
                        ? 'border-[#c9ead8] bg-[#eef9f2]'
                        : 'border-[#f5c6c6] bg-[#fef0f0]'
                    }`}
                  >
                    {haveIt ? (
                      <CheckCircle2 className="mt-1 text-[#1f8f63]" size={22} />
                    ) : (
                      <XCircle className="mt-1 text-[#c7362b]" size={22} />
                    )}

                    <div>
                      <p className="text-lg font-medium capitalize text-[#1f5c4d]">
                        {ingredient.name}
                      </p>

                      <p className="text-sm text-[#4d7a6b]">
                        {ingredient.quantity}{ingredient.unit}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-[#173f35]">
              How to Cook
            </h2>

            <div className="mt-8 space-y-8">
              {meal.instructions.map((step, index) => (
                <div key={index} className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 font-bold text-[#1f5c4d]">
                    {index + 1}
                  </div>
                  <p className="pt-2 text-lg leading-8 text-gray-700">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealDetail