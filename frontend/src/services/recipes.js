import axios from 'axios';

const apiBaseUrl = '/api';

export async function getRecipes() {
  const response = await axios.get(`${apiBaseUrl}/recipes`);
  return response.data;
}