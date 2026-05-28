import axios from 'axios'

const apiBaseUrl =
  import.meta.env.VITE_API_URL ||
  'https://planeat-1.onrender.com/api'

/**
 * Sends a registration request for a new user account.
 *
 * @param {Object} userData
 * @returns {Promise<Object>}
 */
export async function registerUser(userData) {
  const response = await axios.post(`${apiBaseUrl}/auth/register`, userData)
  return response.data
}

/**
 * Sends login credentials and returns the JWT and user payload.
 *
 * @param {Object} credentials
 * @returns {Promise<Object>}
 */
export async function loginUser(credentials) {
  const response = await axios.post(`${apiBaseUrl}/auth/login`, credentials)
  return response.data
}

/**
 * Loads the authenticated user represented by the provided JWT.
 *
 * @param {string} token
 * @returns {Promise<Object>}
 */
export async function getCurrentUser(token) {
  const response = await axios.get(`${apiBaseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
