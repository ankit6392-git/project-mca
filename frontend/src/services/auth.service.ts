import api from "./api";

/**
 * Login user
 */
export async function loginUser(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

/**
 * Register user
 */
export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
}
