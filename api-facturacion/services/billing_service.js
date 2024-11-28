import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const ordersApiUrl = "http://localhost:5000/orders"; // URL de la API de Pedidos en Python

// Crear factura vinculada a un pedido
export const generateInvoice = async (tenant_id, order_id, payment_details) => {
  try {
    // Paso 1: Obtener los detalles del pedido
    const orderResponse = await axios.get(`${ordersApiUrl}/${order_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`, // Suponiendo que la API de Pedidos también requiere autenticación
      },
    });

    const order = orderResponse.data; // Datos del pedido

    // Paso 2: Crear la factura
    const invoice = {
      tenant_id,
      invoice_id: `invoice_${Date.now()}`,
      order_id: order_id,
      created_at: new Date().toISOString(),
      payment_details,
      status: "PAID",
      order_details: {
        customer_name: order.customer_name,
        total_amount: order.total_amount, // Puedes incluir más detalles del pedido aquí
        products: order.products, // Detalles de productos en el pedido
      },
    };

    // Paso 3: Guardar la factura en la base de datos de facturación (en DynamoDB, por ejemplo)
    const invoiceResponse = await axios.post(
      `${backendUrl}/billing/invoices`,
      invoice,
      {
        headers: {
          Authorization: `Bearer ${process.env.JWT_SECRET}`, // O token válido para la API de Facturación
        },
      }
    );

    return invoiceResponse.data; // Devolver la factura creada
  } catch (error) {
    console.error("Error generando la factura:", error);
    throw new Error("No se pudo generar la factura");
  }
};

// Obtener una factura por ID
export const getInvoice = async (tenant_id, invoice_id) => {
  return await axios.get(`${backendUrl}/billing/invoices/${invoice_id}`, {
    headers: { Authorization: `Bearer ${process.env.JWT_SECRET}` },
  });
};

// Listar todas las facturas
export const listInvoices = async (tenant_id) => {
  return await axios.get(`${backendUrl}/billing/invoices`, {
    headers: { Authorization: `Bearer ${process.env.JWT_SECRET}` },
  });
};
