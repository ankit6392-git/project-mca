import axios from "axios";

export const api = axios.create({
  baseURL: "https://civic-connect-backend.vercel.app/api",
});

/**
 * Automatically attach JWT token
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
