import axios from 'axios';

const apiBaseUrl = '/api';

/**
 * Loads all recipes used by the meal-plan generator and recipe detail view.
 *
 * @returns {Promise<Array<Object>>}
 */
export async function getRecipes() {
  const response = await axios.get(`${apiBaseUrl}/recipes`);
  return response.data;
}
