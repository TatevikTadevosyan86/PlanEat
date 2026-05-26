/**
 * Removes quantities and common units so ingredient names can be displayed and compared consistently.
 *
 * @param {string} ingredient
 * @returns {string}
 */
export function getCleanIngredientName(ingredient) {
  return ingredient
    .replace(
      /\s*\d+(?:\.\d+)?\s*(?:g|kg|ml|l|tbsp|tsp|cups|cup|cloves|clove)?/gi,
      ''
    )
    .trim()
}

/**
 * Normalizes ingredient names for matching by cleaning units, lowercasing, and removing flexible words.
 *
 * @param {string} ingredient
 * @returns {string}
 */
export function normalizeIngredientName(ingredient) {
  return getCleanIngredientName(ingredient)
    .toLowerCase()
    .replace(/\b(leftover|any)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Checks whether an inventory ingredient can satisfy a recipe ingredient.
 *
 * @param {string} availableIngredient
 * @param {string} recipeIngredient
 * @returns {boolean}
 */
export function ingredientNamesMatch(availableIngredient, recipeIngredient) {
  const normalizedAvailable = normalizeIngredientName(availableIngredient)
  const normalizedRecipe = normalizeIngredientName(recipeIngredient)

  if (!normalizedAvailable || !normalizedRecipe) {
    return false
  }

  if (normalizedAvailable === normalizedRecipe) {
    return true
  }

  const genericTerms = new Set(['beef', 'meat', 'vegetables', 'vegetable'])

  if (
    genericTerms.has(normalizedAvailable) ||
    genericTerms.has(normalizedRecipe)
  ) {
    return (
      normalizedAvailable.includes(normalizedRecipe) ||
      normalizedRecipe.includes(normalizedAvailable)
    )
  }

  return false
}

// Shared category map used by the shopping list page and tests.
const ingredientCategories = {
  chicken: 'Protein',
  'ground beef': 'Protein',
  beef: 'Protein',
  pork: 'Protein',
  meat: 'Protein',
  eggs: 'Protein',
  fish: 'Protein',
  tomato: 'Vegetables',
  onion: 'Vegetables',
  carrot: 'Vegetables',
  lettuce: 'Vegetables',
  potato: 'Vegetables',
  peas: 'Vegetables',
  garlic: 'Vegetables',
  basil: 'Vegetables',
  cheese: 'Dairy',
  milk: 'Dairy',
  cream: 'Dairy',
  parmesan: 'Dairy',
  'sour cream': 'Dairy',
  butter: 'Dairy',
  rice: 'Grains',
  pasta: 'Grains',
  tortilla: 'Grains',
  breadcrumbs: 'Grains',
  bread: 'Grains',
  'soy sauce': 'Sauces',
  'tomato sauce': 'Sauces',
  sauce: 'Sauces',
  salsa: 'Sauces',
  broth: 'Other',
  oil: 'Other',
  spice: 'Other',
}

/**
 * Maps an ingredient name to the shopping-list category it should be displayed under.
 *
 * @param {string} ingredientName
 * @returns {string}
 */
export function getIngredientCategory(ingredientName) {
  const normalizedName = normalizeIngredientName(ingredientName)

  if (normalizedName === 'vegetables' || normalizedName === 'vegetable') {
    return 'Vegetables'
  }

  // Match longer keys first so "tomato sauce" is categorized before the generic "tomato".
  const sortedEntries = Object.entries(ingredientCategories).sort(
    ([a], [b]) => b.length - a.length
  )

  for (const [key, category] of sortedEntries) {
    if (normalizedName.includes(key)) {
      return category
    }
  }

  const mainName = normalizedName.split(' ')[0]
  return ingredientCategories[mainName] || 'Other'
}

/**
 * Sorts category names into the order used by the shopping list UI.
 *
 * @param {Record<string, unknown>} data
 * @returns {string[]}
 */
export function getSortedShoppingCategories(data) {
  const order = [
    'Protein',
    'Vegetables',
    'Dairy',
    'Grains',
    'Sauces',
    'Other',
  ]

  return Object.keys(data).sort((a, b) => {
    const indexA = order.indexOf(a) !== -1 ? order.indexOf(a) : 999
    const indexB = order.indexOf(b) !== -1 ? order.indexOf(b) : 999
    return indexA - indexB
  })
}
