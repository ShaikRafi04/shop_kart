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

// Customer Authentication APIs
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

export default api;
