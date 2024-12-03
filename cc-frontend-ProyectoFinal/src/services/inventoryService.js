// src/services/inventoryService.js
import axios from "axios";

const API_URL = "https://tu-api-backend.com"; // Asegúrate de colocar la URL correcta

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "tenant-id": localStorage.getItem("tenant_id"),
  },
});

// Obtener todo el inventario
export const getInventory = async () => {
  try {
    const response = await api.get("/inventory");
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
};

// Crear un nuevo producto
export const createProduct = async (productName, stockAvailable) => {
  try {
    const response = await api.post("/inventory", {
      product_name: productName,
      stock_available: stockAvailable,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

// Obtener el inventario de un produc
