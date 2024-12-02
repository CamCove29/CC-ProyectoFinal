import axios from "axios";

const API_BASE_URL = "/api/orders";

const getOrders = async (tenant_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?tenant_id=${tenant_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const getOrder = async (tenant_id, order_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${order_id}?tenant_id=${tenant_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

const createOrder = async (tenant_id, user_id, items) => {
  try {
    const response = await axios.post(
      API_BASE_URL,
      { tenant_id, user_id, items },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const updateOrder = async (tenant_id, order_id, status, items) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${order_id}`,
      { tenant_id, order_id, status, items },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

const deleteOrder = async (tenant_id, order_id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${order_id}?tenant_id=${tenant_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
