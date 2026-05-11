import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api'

export async function createMealPlan(mealPlan) {
  const response = await axios.post(`${apiBaseUrl}/meal-plans`, mealPlan)
  return response.data
}

export async function getLatestMealPlan() {
  const response = await axios.get(`${apiBaseUrl}/meal-plans/latest`)
  return response.data
}
