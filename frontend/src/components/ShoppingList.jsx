function ShoppingList({ mealPlan }) {
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
