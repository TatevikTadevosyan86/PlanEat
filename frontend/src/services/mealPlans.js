import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api'

/**
 * Builds the Authorization header used by protected meal-plan requests.
 *
 * @param {string} token
 * @returns {{ headers: { Authorization: string } }}
 */
function getAuthConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

/**
 * Saves a generated meal plan for the authenticated user.
 *
 * @param {Object} mealPlan
 * @param {string} token
 * @returns {Promise<Object>}
 */
export async function createMealPlan(mealPlan, token) {
  const response = await axios.post(
    `${apiBaseUrl}/meal-plans`,
    mealPlan,
    getAuthConfig(token)
  )
  return response.data
}

/**
 * Loads the latest saved meal plan, optionally filtered by planning mode.
 *
 * @param {string} token
 * @param {string} [planningMode]
 * @returns {Promise<Object>}
 */
export async function getLatestMealPlan(token, planningMode) {
  const response = await axios.get(
    `${apiBaseUrl}/meal-plans/latest`,
    {
      ...getAuthConfig(token),
      params: planningMode ? { planningMode } : undefined,
    }
  )
  return response.data
}
