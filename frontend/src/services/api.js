import axios from "axios";

// Using relative path so Vite proxy forwards to http://localhost:5000, 
// with baseURL fallback to http://localhost:5000 for direct API access
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL: Ensures HttpOnly cookies (JWT) are sent & received
  headers: {
    "Content-Type": "application/json",
  },
});

// Customer Authentication APIs (Lab 01 & 02)
export const registerCustomer = async (customerData) => {
  const response = await api.post("/customers/register", customerData);
  return response.data;
};

export const loginCustomer = async (credentials) => {
  const response = await api.post("/customers/login", credentials);
  return response.data;
};

export const getMyProfile = async () => {
  const response = await api.get("/customers/me");
  return response.data;
};

export const logoutCustomer = async () => {
  const response = await api.post("/customers/logout");
  return response.data;
};

export const changeCustomerPassword = async (passwords) => {
  const response = await api.patch("/customers/change-password", passwords);
  return response.data;
};

// Product Catalog & Discovery APIs (Lab 03)
export const getProducts = async (params = {}) => {
  // params can contain: { search, category, sort }
  const cleanParams = {};
  if (params.search && params.search.trim()) cleanParams.search = params.search.trim();
  if (params.category && params.category !== "All Categories" && params.category.toLowerCase() !== "all") {
    cleanParams.category = params.category;
  }
  if (params.sort) cleanParams.sort = params.sort;

  const response = await api.get("/products", { params: cleanParams });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export default api;
