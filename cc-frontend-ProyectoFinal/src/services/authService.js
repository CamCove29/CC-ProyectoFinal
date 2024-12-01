import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Asumimos que el backend está en localhost:5000

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Error de conexión");
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Error de conexión");
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Error de conexión");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
