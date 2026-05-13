import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUserFromToken = () => {

  const token = getToken();

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};