import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'

import AddIngredient from '../components/AddIngredient.jsx'
import IngredientIcon from '../components/IngredientIcon.jsx'
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
} from '../services/ingredients.js'

/**
 * Lets the authenticated user manage their available ingredients.
 *
 * @param {{ token: string }} props
 * @returns {JSX.Element}
 */
function Inventory({ token }) {
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientType, setIngredientType] = useState('fresh')
  const [ingredients, setIngredients] = useState([])
  const [ingredientState, setIngredientState] = useState('baked')
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true)
  const [ingredientError, setIngredientError] = useState('')

  useEffect(() => {
    async function loadIngredients() {
      try {
        setIsLoadingIngredients(true)
        setIngredientError('')

        const savedIngredients = await getIngredients(token)
        setIngredients(savedIngredients)
      } catch {
        setIngredientError('Could not load ingredients from the server.')
      } finally {
        setIsLoadingIngredients(false)
      }
    }

    loadIngredients()
  }, [token])

  async function handleAddIngredient(event) {
    event.preventDefault()

    const trimmedName = ingredientName.trim()
    if (!trimmedName) {
      return
    }

    try {
      setIngredientError('')

      const savedIngredient = await createIngredient(
        {
          name: trimmedName,
          type: ingredientType,
          state: ingredientState,
        },
        token
      )

      setIngredients((currentIngredients) => [
        savedIngredient,
        ...currentIngredients,
      ])

      setIngredientName('')
      setIngredientType('fresh')
      setIngredientState('baked')
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

      await deleteIngredient(id, token)
      setIngredients((currentIngredients) =>
        currentIngredients.filter((ingredient) => ingredient.id !== id)
      )
    } catch {
      setIngredientError('Could not remove ingredient. Please try again.')
    }
  }

  return (
    <>
      <section className="mb-10">
        <h1 className="text-5xl font-semibold tracking-tight">Inventory</h1>
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
          ingredientState={ingredientState}
          setIngredientState={setIngredientState}
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
                    <IngredientIcon name={ingredient.name} size={24} />
                    <div>
                      <p className="text-xl text-[#1f5c4d]">
                        {ingredient.name}
                      </p>
                      <p className="mt-1 text-lg capitalize text-[#8ba095]">
                        {ingredient.type}
                        {ingredient.state ? ` - ${ingredient.state}` : ''}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteIngredient(ingredient.id)}
                      className="text-red-400 transition hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      <div className="mt-10">
        <Link
          to="/meal-plan"
          className="inline-block rounded-2xl bg-[#1f5c4d] px-8 py-4 text-lg font-semibold text-white"
        >
          Continue to Meal Plan
        </Link>
      </div>
    </>
  )
}

export default Inventory
