import axios from 'axios';

// Base API URL setup with fallback to local express server port 5000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch filtered and sorted products from the backend API.
 * @param {Object} filters - Filter criteria
 * @param {Array<string>} filters.categories - Selected categories
 * @param {number} filters.minPrice - Minimum price value
 * @param {number} filters.maxPrice - Maximum price value
 * @param {number} filters.rating - Minimum star rating
 * @param {string} filters.sort - Sort option ('default' | 'priceLow' | 'priceHigh' | 'topRated' | 'newest')
 * @returns {Promise<Object>} API response data with products list and metadata
 */
export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams();

  // Handle selected categories (joined by comma for clean backend parsing)
  if (filters.categories && filters.categories.length > 0) {
    params.append('category', filters.categories.join(','));
  }

  if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== '') {
    params.append('minPrice', filters.minPrice);
  }

  if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== '') {
    params.append('maxPrice', filters.maxPrice);
  }

  if (filters.rating !== undefined && filters.rating !== null && filters.rating > 0) {
    params.append('rating', filters.rating);
  }

  if (filters.sort && filters.sort !== 'default') {
    params.append('sort', filters.sort);
  }

  const response = await apiClient.get('/products', { params });
  return response.data;
};

/**
 * Fetch available product categories
 */
export const fetchCategories = async () => {
  const response = await apiClient.get('/categories');
  return response.data;
};

export default apiClient;
