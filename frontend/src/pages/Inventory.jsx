import { useEffect, useState } from 'react'
import AddIngredient from '../components/AddIngredient.jsx'
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
} from '../services/ingredients.js'

function Inventory() {
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientType, setIngredientType] = useState('fresh')
  const [ingredients, setIngredients] = useState([])
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true)
  const [ingredientError, setIngredientError] = useState('')

  useEffect(() => {
    async function loadIngredients() {
      try {
        setIsLoadingIngredients(true)
        setIngredientError('')

        const savedIngredients = await getIngredients()
setIngredients(savedIngredients)

      } catch {
        setIngredientError('Could not load ingredients from the server.')
      } finally {
        setIsLoadingIngredients(false)
      }
    }

    loadIngredients()
  }, [])

  async function handleAddIngredient(event) {
    event.preventDefault()

    const trimmedName = ingredientName.trim()
    if (!trimmedName) {
      return
    }

    try {
      setIngredientError('')

      const savedIngredient = await createIngredient({
  name: trimmedName,
  type: ingredientType,
})

setIngredients((currentIngredients) => [
  savedIngredient,
  ...currentIngredients,
])


      setIngredientName('')
      setIngredientType('fresh')
    } catch (error) {
      setIngredientError(
        error.response?.data?.message ||
          'Could not save ingredient. Please try again.'
      )
    }
  }

  async function handleDeleteIngredient(id) {
    try {
      setIngredientError('')

      await deleteIngredient(id)
setIngredients((currentIngredients) =>
  currentIngredients.filter((ingredient) => ingredient.id !== id)
)

    } catch {
      setIngredientError('Could not remove ingredient. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f7faf7] px-6 py-10 text-[#1f5c4d]">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tight">
            Inventory
          </h1>
          <p className="mt-3 text-xl text-[#8ba095]">
            Add, view, and manage your available ingredients.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <AddIngredient
            ingredientName={ingredientName}
            setIngredientName={setIngredientName}
            ingredientType={ingredientType}
            setIngredientType={setIngredientType}
            onAddIngredient={handleAddIngredient}
          />

          <article className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#1f5c4d]">
              Your Ingredients ({ingredients.length})
            </h2>

            {ingredientError ? (
              <div className="mt-5 rounded-2xl bg-[#fdf1ec] p-4">
                <p className="text-lg text-[#a35f4b]">{ingredientError}</p>
              </div>
            ) : null}

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
                    No ingredients added yet.
                  </p>
                </div>
              ) : (
                ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="rounded-2xl bg-[#f6f9f7] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xl text-[#1f5c4d]">
                          {ingredient.name}
                        </p>
                        <p className="mt-1 text-lg capitalize text-[#8ba095]">
                          {ingredient.type}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteIngredient(ingredient.id)}
                        className="rounded-xl border border-[#d9e7dd] px-3 py-2 text-sm font-medium text-[#1f5c4d]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </article>
        </section>
      </div>
    </div>
  )
}

export default Inventory
