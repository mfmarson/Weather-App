import { AuthResponse } from "../types/auth";
import { API_CONFIG } from "../config/api";

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await fetch(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.login}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await fetch(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.register}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
