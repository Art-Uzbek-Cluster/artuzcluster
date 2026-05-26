/**
 * User Management Utility
 * Handles user registration, login, and session storage
 */

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

const API_BASE = "/api";

const getLocaleHeader = () => {
  if (typeof window === "undefined") {
    return "uz";
  }
  return (localStorage.getItem("app_locale") || "uz").toString();
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
): Promise<ApiResponse<User>> => {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": getLocaleHeader(),
    },
    body: JSON.stringify({ username, email, password }),
  });

  return response.json();
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<ApiResponse<User>> => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": getLocaleHeader(),
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

export const saveCurrentUser = (user: User): void => {
  sessionStorage.setItem("current_user", JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const user = sessionStorage.getItem("current_user");
  return user ? JSON.parse(user) : null;
};

export const logoutUser = (): void => {
  sessionStorage.removeItem("current_user");
};

export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};
