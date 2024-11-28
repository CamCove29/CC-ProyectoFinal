const express = require("express");
const router = express.Router();
const {
  generateInvoice,
  getInvoice,
  listInvoices,
} = require("../services/billing_service");
const { validateToken } = require("../utils/auth");

// Ruta para generar una nueva factura vinculada a un pedido
router.post("/invoices", async (req, res) => {
  const tenant_id = req.user.tenant_id; // Obtenemos el tenant_id del token JWT validado
  const { order_id, payment_details } = req.body;
  try {
    // Llamar al servicio para generar la factura
    const invoice = await generateInvoice(tenant_id, order_id, payment_details);
    res.status(201).json(invoice); // Retornamos la factura creada
  } catch (error) {
    console.error("Error generando la factura:", error);
    res.status(500).json({ error: "Error generando la factura" });
  }
});

// Obtener detalles de una factura por ID
router.get("/invoices/:invoice_id", async (req, res) => {
  const tenant_id = req.user.tenant_id; // Obtenemos el tenant_id del token JWT validado
  const invoice_id = req.params.invoice_id;
  try {
    const invoice = await getInvoice(tenant_id, invoice_id);
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ message: "Factura no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo la factura" });
  }
});

// Listar todas las facturas
router.get("/invoices", async (req, res) => {
  const tenant_id = req.user.tenant_id; // Obtenemos el tenant_id del token JWT validado
  try {
    const invoices = await listInvoices(tenant_id);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Error listando las facturas" });
  }
});

module.exports = router;
