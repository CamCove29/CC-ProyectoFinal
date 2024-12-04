import axios from "axios";

const BASE_URL = "http://localhost:5000";// Reemplaza con el puerto

export const getProducts = async (tenantId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: { tenant_id: tenantId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response?.data || "Error fetching products";
  }
};

export const getProduct = async (tenantId, productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`, {
      params: { tenant_id: tenantId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error.response?.data || "Error fetching product";
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error.response?.data || "Error creating product";
  }
};

export const updateProduct = async (tenantId, productId, productData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/products/${productId}`,
      productData,
      { params: { tenant_id: tenantId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error.response?.data || "Error updating product";
  }
};

export const deleteProduct = async (tenantId, productId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/products/${productId}`,
      {
        params: { tenant_id: tenantId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error.response?.data || "Error deleting product";
  }
};
