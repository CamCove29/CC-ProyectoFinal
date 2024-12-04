// src/services/authService.js

import axios from "axios";

const API_URL = "http://localhost:5000"; // Cambia esta URL si tu API está en otro lugar

// Crear una instancia de Axios con la URL base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Crear usuario
export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    const data = response.data;
    localStorage.setItem("token", data.token); // Guardar el token en localStorage
    return data;
  } catch (error) {
    console.error(
      "Error al crear el usuario:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

// Obtener perfil del usuario
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener el perfil del usuario:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

// Actualizar usuario
export const updateUser = async (userId, userData) => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await api.put(`/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Eliminar usuario
export const deleteUser = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar el usuario:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

// Obtener todos los usuarios (solo admin)
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener todos los usuarios:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};