import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Reemplaza con el puerto correspondiente

export const getReports = async (tenantId) => {
  try {
    const response = await axios.get(`${BASE_URL}/reports/sales`, {
      params: { tenant_id: tenantId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error.response?.data || "Error fetching reports";
  }
};

export const getReport = async (tenantId, reportId) => {
  try {
    const response = await axios.get(`${BASE_URL}/reports/sales/${reportId}`, {
      params: { tenant_id: tenantId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error.response?.data || "Error fetching report";
  }
};

export const createReport = async (reportData) => {
  try {
    const response = await axios.post(`${BASE_URL}/reports/sales`, reportData);
    return response.data;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error.response?.data || "Error creating report";
  }
};
