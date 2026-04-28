import { useState } from 'react'
import AddIngredient from '../components/AddIngredient.jsx'
import { meals } from '../data/meals.js'

function Home() {
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientType, setIngredientType] = useState('fresh')
  const [ingredients, setIngredients] = useState([])
  const [planningMode, setPlanningMode] = useState('smart')
  const [mealPlan, setMealPlan] = useState([])

  function handleAddIngredient(event) {
    event.preventDefault()

    const trimmedName = ingredientName.trim()
    if (!trimmedName) {
      return
    }
    const newIngredient = {
      id: Date.now(),
      name: trimmedName,
      type: ingredientType,
    }
    setIngredients((currentIngredients) => [
      ...currentIngredients,
      newIngredient,
    ])
    setIngredientName('')
    setIngredientType('fresh')
  }
  function handleGenerateMealPlan() {
    // Placeholder logic for meal plan generation
    const selectedMeals = meals.slice(0,7)
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
              <a className="rounded-xl bg-[#dcebe0] px-5 py-2 text-[#1f5c4d]">
                Home
              </a>
              <a>Meal Plan</a>
              <a>Inventory</a>
              <a>Add</a>
              <a>Shopping List</a>
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <section className="mb-10">
              <h1 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
                Choose Your Cooking Mode
              </h1>
              <p className="mt-3 text-xl text-[#8ba095]">
                Select how you want to plan your meals
              </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <article
                onClick={() => setPlanningMode('smart')}
                className={`rounded-3xl p-8 shadow-sm cursor-pointer ${
                  planningMode === 'smart'
                    ? 'border-2 border-[#2b6a58] bg-[#e3f0e7]'
                    : 'bg-white'
                }`}
              >
                <h2 className="text-3xl font-semibold text-[#1f5c4d]">
                  Smart Mode
                </h2>
                <p className="mt-4 text-lg leading-8 text-[#7f958a]">
                  Batch cooking that reuses the same cooked ingredients across
                  several days. Save time and money by cooking once and eating
                  multiple times.
                </p>

                <ul className="mt-6 space-y-3 text-lg text-[#2e6d5b]">
                  <li>- Save time cooking</li>
                  <li>- Reduce food waste</li>
                  <li>- Lower grocery costs</li>
                  <li>- Batch cooking efficiency</li>
                </ul>
              </article>

              <article
                onClick={() => setPlanningMode('fresh')}
                className={`rounded-3xl p-8 shadow-sm cursor-pointer ${
                  planningMode === 'fresh'
                    ? 'border-2 border-[#2b6a58] bg-[#e3f0e7]'
                    : 'bg-white'
                }`}
              >
                <h2 className="text-3xl font-semibold text-[#1f5c4d]">
                  Fresh Mode
                </h2>
                <p className="mt-4 text-lg leading-8 text-[#7f958a]">
                  Generate variety in your meals with fresh, diverse recipes
                  every day. Perfect for those who love trying new dishes.
                </p>

                <ul className="mt-6 space-y-3 text-lg text-[#2e6d5b]">
                  <li>- Daily variety</li>
                  <li>- New flavors</li>
                  <li>- Creative cooking</li>
                  <li>- Fresh ingredients daily</li>
                </ul>
              </article>
            </section>

            <p className="mt-4 text-lg text-[#1f5c4d]">
              Current mode:{' '}
              {planningMode === 'smart' ? 'Smart Mode' : 'Fresh Mode'}
            </p>
            <p className="mt-4 text-sm text-[#8ba095]">
  Available prototype meals: {meals.length}
</p>


            <div className="mt-8">
              <button className="rounded-2xl bg-[#9db3a8] px-8 py-4 text-lg font-semibold text-white">
                Continue to Add Ingredients
              </button>
            </div>

            <section className="mt-16">
              <h2 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
                Add Ingredients
              </h2>
              <p className="mt-3 text-xl text-[#8ba095]">
                Build your inventory to generate meal plans
              </p>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <AddIngredient
                ingredientName={ingredientName}
                setIngredientName={setIngredientName}
                ingredientType={ingredientType}
                setIngredientType={setIngredientType}
                onAddIngredient={handleAddIngredient}
              />

              <article className="rounded-3xl bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-[#1f5c4d]">
                  Your Ingredients ({ingredients.length})
                </h3>

                <div className="mt-5 space-y-4">
                  {ingredients.length === 0 ? (
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

                <button 
                onClick={handleGenerateMealPlan}
                className="mt-8 w-full rounded-2xl bg-[#1f5c4d] px-6 py-4 text-xl font-semibold text-white">
                  Generate Meal Plan
                </button>
                <p className="mt-4 text-sm text-[#8ba095]">
  Generated meals: {mealPlan.length}
</p>

              </article>
            </section>
            <section className="mt-16">
  <h2 className="text-5xl font-semibold tracking-tight text-[#1f5c4d]">
    Your 7-Day Meal Plan
  </h2>
  <p className="mt-3 text-xl text-[#8ba095]">
    Generated meals based on your current ingredients
  </p>
  {mealPlan.length===0 ?(
    <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm">
      <p className="text-lg text-[#8ba095]">
        No meal plan generated yet. Click "Generate Meal Plan" to create one.
      </p>
    </div>
  ):(
     <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {mealPlan.map((meal) =>(
        <div key={meal.id} className="rounded-3xl bg-white p-6 shadow-sm">
           <h3 className="text-2xl font-semibold text-[#1f5c4d]">
            {meal.name}
           </h3>
           <p className="mt-2 text-lg text-[#8ba095]">
             Main ingredient:{meal.mainIngredient}
           </p>
            <p className="mt-2 text-lg text-[#8ba095]">
              Uses leftovers:{meal.leftover ? 'Yes' : 'No'}
            </p>
            </div>
      ))}
     </div>
  )}
</section>

          </div>
        </main>

        <footer className="mt-16 border-t border-[#dbe7de] bg-white px-6 py-6">
          <div className="mx-auto grid max-w-6xl gap-6 text-center text-2xl font-medium text-[#1f5c4d] md:grid-cols-3">
            <p>PlanEat</p>
            <p>Quick Links</p>
            <p>Support</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
