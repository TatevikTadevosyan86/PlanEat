export function getCleanIngredientName(ingredient) {
  return ingredient
    .replace(/\s*\d+(?:\.\d+)?\s*(?:g|kg|ml|l|tbsp|tsp|cups|cup)?/gi, '')
    .trim()
}
