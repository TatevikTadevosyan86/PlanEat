import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { getRecipes } from '../services/recipes.js'
import { getIngredients } from '../services/ingredients.js'
import { createMealPlan, getLatestMealPlan } from '../services/mealPlans.js'



function MealPlan({ planningMode }) {
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])  // ← NEW
  const [mealPlan, setMealPlan] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [mealPlanError, setMealPlanError] = useState('')
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setMealPlanError('')
        const [savedIngredients, savedRecipes] = await Promise.all([
          getIngredients(),
          getRecipes()
        ])
        setIngredients(savedIngredients)
        setRecipes(savedRecipes)
      } catch {
        setMealPlanError('Could not load data from the server.')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])
  // Load saved meal plan from backend on page load
useEffect(() => {
  async function loadSavedMealPlan() {
    try {
      const savedPlan = await getLatestMealPlan()
      if (savedPlan && savedPlan.meals && savedPlan.meals.length > 0) {
        // Convert saved plan back to the format your component expects
        const loadedMeals = savedPlan.meals.map(meal => ({
           _id: meal.recipeId,
          name: meal.name,
          mainIngredient: meal.mainIngredient,
          usesLeftover: meal.usesLeftover,
          missingIngredients: meal.missingIngredients,
          score: meal.score,
        }))
        setMealPlan(loadedMeals)
        console.log('✅ Loaded saved meal plan from backend')
      }
    } catch (error) {
      // 404 is fine – means no saved plan yet
      if (error.response?.status !== 404) {
        console.error('Failed to load saved meal plan:', error)
      }
    }
  }
  
  loadSavedMealPlan()
}, []) // Empty array = runs once when page loads

  async function handleGenerateMealPlan() {
  console.log('=== Generate Meal Plan Debug ===');
  console.log('Ingredients count:', ingredients.length);
  console.log('Recipes count:', recipes.length);
  console.log('Planning mode:', planningMode);

  if (ingredients.length === 0) {
    console.log('No ingredients, showing error');
    setMealPlan([]);
    setMealPlanError('Add ingredients in your inventory before generating a meal plan.');
    return;
  }

  const availableIngredientNames = ingredients.map(i => i.name.toLowerCase());
  console.log('Available ingredients:', availableIngredientNames);

  const scoredMeals = recipes.map((meal) => {
    let score = meal.ingredients.reduce((total, ingredient) => {
      if (availableIngredientNames.includes(ingredient.name.toLowerCase())) {
        return total + 2;
      }
      return total - 1;
    }, 0);

    if (planningMode === 'smart' && meal.usesLeftover) score += 3;
    if (planningMode === 'fresh' && meal.usesLeftover) score -= 2;

    const missingIngredients = meal.ingredients
      .filter(ing => !availableIngredientNames.includes(ing.name.toLowerCase()))
      .map(ing => `${ing.name} ${ing.quantity}${ing.unit}`);

    return { ...meal, score, missingIngredients };
  });

  console.log('Scored meals count:', scoredMeals.length);
  console.log('First scored meal:', scoredMeals[0]);

  const selectedMeals = scoredMeals.sort((a, b) => b.score - a.score).slice(0, 7);
  console.log('Selected meals count:', selectedMeals.length);
  console.log('Selected meals:', selectedMeals);

  setMealPlan(selectedMeals);
  console.log('mealPlan state updated');
  const mealsWithDays = selectedMeals.map((meal, index) => ({
    day: weekdays[index],
    recipeId: meal._id,
    name: meal.name,
    mainIngredient: meal.mainIngredient,
    usesLeftover: meal.usesLeftover,
    missingIngredients: meal.missingIngredients,
    score: meal.score,
  }));

  try {
    await createMealPlan({
      planningMode,
      meals: mealsWithDays,
    });
    console.log('✅ Meal plan saved to backend');
  } catch (error) {
    console.error('Failed to save meal plan:', error);
  }

}


  return (
    <div className="min-h-screen bg-[#f7faf7] text-[#1f5c4d]">
          <div className="flex min-h-screen flex-col">
            <header className="h-24 border-b border-[#dbe7de] bg-white">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
      <img
        src={logo}
        alt="PlanEat logo"
        className="h-22 w-22 object-contain"
      />
    
      <span className="text-4xl font-semibold tracking-tight text-[#1f5c4d]">
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
                      key={meal._id}
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
<Link
  to={`/meal-plan/${meal._id}`}
  className="mt-4 inline-block rounded-2xl bg-[#1f5c4d] px-6 py-2 text-white"
>
  View Instructions →
</Link>
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
 
</div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default MealPlan
