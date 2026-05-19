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

function getAuthConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export async function getIngredients(token) {
  const response = await axios.get(
    `${apiBaseUrl}/ingredients`,
    getAuthConfig(token)
  )
  return response.data.map(mapIngredient)
}

export async function createIngredient(ingredient, token) {
  const response = await axios.post(
    `${apiBaseUrl}/ingredients`,
    ingredient,
    getAuthConfig(token)
  )
  return mapIngredient(response.data)
}

export async function deleteIngredient(id, token) {
  await axios.delete(`${apiBaseUrl}/ingredients/${id}`, getAuthConfig(token))
}
