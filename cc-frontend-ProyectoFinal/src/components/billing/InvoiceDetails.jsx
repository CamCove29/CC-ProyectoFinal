// src/components/billing/InvoiceDetails.jsx
import { useEffect, useState } from "react";
import { getInvoiceDetails } from "../../services/billingService";
import { useParams } from "react-router-dom";

const InvoiceDetails = () => {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      const data = await getInvoiceDetails(invoiceId);
      setInvoice(data);
    };
    fetchInvoice();
  }, [invoiceId]);

  if (!invoice) return <div>Cargando detalles de la factura...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Detalles de la Factura</h1>
      <p>
        <strong>Factura ID:</strong> {invoice.invoice_id}
      </p>
      <p>
        <strong>Order ID:</strong> {invoice.order_id}
      </p>
      <p>
        <strong>Método de Pago:</strong> {invoice.payment_details.method}
      </p>
      <p>
        <strong>Cantidad:</strong> {invoice.payment_details.amount}
      </p>
      <p>
        <strong>Estado:</strong> {invoice.status}
      </p>
    </div>
  );
};

export default InvoiceDetails;
