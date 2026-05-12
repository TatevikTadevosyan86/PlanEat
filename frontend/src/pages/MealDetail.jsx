import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MealDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setMeal(response.data);
      } catch (error) {
        console.error('Failed to load recipe:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMeal();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Loading recipe...</div>;
  }

  if (!meal) {
    return <div className="p-8 text-center">Recipe not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7faf7] p-8">
      <div className="mx-auto max-w-4xl">
        {/* Back button */}
        <Link to="/meal-plan" className="text-[#1f5c4d] hover:underline">
          ← Back to Meal Plan
        </Link>

        {/* Recipe title */}
        <h1 className="mt-6 text-5xl font-bold text-[#1f5c4d]">{meal.name}</h1>

        {/* Two column layout */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Ingredients column */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#1f5c4d]">Ingredients</h2>
            <div className="mt-4 space-y-3">
              {meal.ingredients.map((ingredient, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span className="capitalize">{ingredient.name}</span>
                  <span className="text-[#8ba095]">
                    {ingredient.quantity}{ingredient.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions column */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#1f5c4d]">How to Cook</h2>
            <ol className="mt-4 space-y-4">
              {meal.instructions.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="font-bold text-[#2b6a58]">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDetail;