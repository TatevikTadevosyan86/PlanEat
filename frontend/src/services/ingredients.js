import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api'

/**
 * Converts backend ingredient documents into the smaller frontend shape used by pages.
 *
 * @param {Object} ingredient
 * @returns {{ id: string, name: string, type: string, state: string }}
 */
function mapIngredient(ingredient) {
  return {
    id: ingredient._id,
    name: ingredient.name,
    type: ingredient.type,
    state: ingredient.state,
  }
}

/**
 * Builds the auth header used by protected ingredient requests.
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
 * Loads the authenticated user's saved ingredients.
 *
 * @param {string} token
 * @returns {Promise<Array<Object>>}
 */
export async function getIngredients(token) {
  const response = await axios.get(
    `${apiBaseUrl}/ingredients`,
    getAuthConfig(token)
  )
  return response.data.map(mapIngredient)
}

/**
 * Saves a new ingredient for the authenticated user.
 *
 * @param {Object} ingredient
 * @param {string} token
 * @returns {Promise<Object>}
 */
export async function createIngredient(ingredient, token) {
  const response = await axios.post(
    `${apiBaseUrl}/ingredients`,
    ingredient,
    getAuthConfig(token)
  )
  return mapIngredient(response.data)
}

/**
 * Deletes one saved ingredient owned by the authenticated user.
 *
 * @param {string} id
 * @param {string} token
 * @returns {Promise<void>}
 */
export async function deleteIngredient(id, token) {
  await axios.delete(`${apiBaseUrl}/ingredients/${id}`, getAuthConfig(token))
}
