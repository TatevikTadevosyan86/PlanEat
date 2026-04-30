function ShoppingList({ mealPlan }) {
    const missingIngredients = [
        ...new Set(mealPlan.flatMap((meal) => meal.missingIngredients))
    ]

    return (
        <ul>
            {missingIngredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
            ))}
        </ul>
    )
}

export default ShoppingList
