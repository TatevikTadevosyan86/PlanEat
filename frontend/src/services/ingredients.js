import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api'

function mapIngredient(ingredient) {
  return {
    id: ingredient._id,
    name: ingredient.name,
    type: ingredient.type,
    state: ingredient.state,
  }
}

export async function getIngredients() {
  const response = await axios.get(`${apiBaseUrl}/ingredients`)
  return response.data.map(mapIngredient)
}

export async function createIngredient(ingredient) {
  const response = await axios.post(`${apiBaseUrl}/ingredients`, ingredient)
  return mapIngredient(response.data)
}

export async function deleteIngredient(id) {
  await axios.delete(`${apiBaseUrl}/ingredients/${id}`)
}
