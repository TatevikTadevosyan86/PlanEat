/**
 * Legacy simple shopping list renderer kept for lightweight list-only views.
 *
 * @param {{ mealPlan: Array<{ missingIngredients: string[] }> }} props
 * @returns {JSX.Element}
 */
function ShoppingList({ mealPlan }) {
  // The list is flattened and deduplicated because multiple meals can miss the same ingredient.
  const missingIngredients = [
    ...new Set(mealPlan.flatMap((meal) => meal.missingIngredients)),
  ]

  return (
    <ul className="space-y-2 text-lg text-[#1f5c4d]">
      {missingIngredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
      ))}
    </ul>
  )
}

export default ShoppingList
