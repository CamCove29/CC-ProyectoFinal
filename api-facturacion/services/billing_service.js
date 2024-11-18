const {
  getInvoiceById,
  createInvoice,
  queryInvoices,
} = require("../models/billing_model");

const generateInvoice = async (tenant_id, order_id, payment_details) => {
  const invoice = {
    tenant_id,
    invoice_id: `invoice_${Date.now()}`,
    order_id,
    created_at: new Date().toISOString(),
    payment_details,
    status: "PAID",
  };
  const invoice_id = await createInvoice(invoice);
  return invoice;
};

const getInvoice = async (tenant_id, invoice_id) => {
  return await getInvoiceById(tenant_id, invoice_id);
};

const listInvoices = async (tenant_id) => {
  return await queryInvoices(tenant_id);
};

module.exports = {
  generateInvoice,
  getInvoice,
  listInvoices,
};
