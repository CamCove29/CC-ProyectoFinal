// src/services/billingService.js
import axios from "axios";

const API_URL = "/api/billing";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "tenant-id": localStorage.getItem("tenant_id"),
  },
});

// Obtener todas las facturas
export const getInvoices = async () => {
  try {
    const response = await api.get("/invoices");
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
  }
};

// Generar una nueva factura
export const createInvoice = async (orderId, paymentDetails) => {
  try {
    const response = await api.post("/invoices", {
      order_id: orderId,
      payment_details: paymentDetails,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
  }
};

// Obtener detalles de una factura específica
export const getInvoiceDetails = async (invoiceId) => {
  try {
    const response = await api.get(`/invoices/${invoiceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice details:", error);
  }
};
