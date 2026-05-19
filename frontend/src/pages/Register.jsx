import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || '/api'

export async function registerUser(userData) {
  const response = await axios.post(`${apiBaseUrl}/auth/register`, userData)
  return response.data
}

export async function loginUser(credentials) {
  const response = await axios.post(`${apiBaseUrl}/auth/login`, credentials)
  return response.data
}

export async function getCurrentUser(token) {
  const response = await axios.get(`${apiBaseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
