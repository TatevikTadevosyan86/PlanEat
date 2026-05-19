import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api'

function getAuthConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export async function createMealPlan(mealPlan, token) {
  const response = await axios.post(
    `${apiBaseUrl}/meal-plans`,
    mealPlan,
    getAuthConfig(token)
  )
  return response.data
}

export async function getLatestMealPlan(token) {
  const response = await axios.get(
    `${apiBaseUrl}/meal-plans/latest`,
    getAuthConfig(token)
  )
  return response.data
}
