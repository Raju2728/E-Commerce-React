/**
 * API Configuration
 * Centralized configuration for backend API endpoints
 * 
 * Usage:
 * - Import { API_BASE_URL, endpoints } from './apiConfig'
 * - Use API_BASE_URL for full URL construction
 * - Use endpoints for predefined endpoint paths
 */

/**
 * API Base URL
 * 
 * Configurable via environment variable: REACT_APP_API_BASE_URL
 * Defaults to the production Render-hosted backend.
 * 
 * For local development, create a .env.local file in the project root:
 *   REACT_APP_API_BASE_URL=http://localhost:7230
 */
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://e-commerce-backend-wc1a.onrender.com';

// Predefined endpoints for easy access
export const endpoints = {
  // Auth endpoints
  login: '/login',
  signup: '/signup',
  logout: '/logout',
  verify: '/verify',
  forgotpass: '/Forgotpass',
  
  // Product endpoints
  products: '/products',
  wproducts: '/wproducts',
  kproducts: '/kproducts',
  productById: (id) => `/products/${id}`,
  suggestedProducts: (id) => `/products/suggested/${id}`,
  
  // Cart endpoints
  cart: '/cart',
  addToCart: (id) => `/addTocart/${id}`,
  subscribe: (id) => `/subscribe/${id}`,
  clearCart: '/cart/clear',
  
  // Admin endpoints
  adminLogin: '/adminLogin',
  adminLogout: '/Adminlogout',
  adminChangepass: '/adminChangepass',
  userCount: '/userCount',
  
  // Item management
  addItems: '/AddItems',
  getItems: '/GetItems',
  manageItems: '/ManageItems',
  manageProduct: '/ManageProduct',
  
  // User management
  users: '/Users',
  
  // Uploaded files
  uploads: '/uploads',
  getUploadUrl: (filename) => `/uploads/${filename}`,
};

/**
 * Helper function to build full API URL
 * @param {string} endpoint - The endpoint path
 * @returns {string} - Full URL
 */
export const buildUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Get upload image URL
 * @param {string} filename - The image filename
 * @returns {string} - Full image URL
 */
export const getImageUrl = (filename) => {
  if (!filename) return '';
  return `${API_BASE_URL}/uploads/${filename}`;
};

export default API_BASE_URL;