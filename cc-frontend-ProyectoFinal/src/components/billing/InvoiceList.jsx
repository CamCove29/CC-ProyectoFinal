// src/components/billing/InvoiceList.jsx
import { useEffect, useState } from "react";
import { getInvoices } from "../../services/billingService";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = await getInvoices();
      setInvoices(data);
    };
    fetchInvoices();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Lista de Facturas</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Factura ID</th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Método de Pago</th>
            <th className="px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoice_id}>
              <td className="border px-4 py-2">{invoice.invoice_id}</td>
              <td className="border px-4 py-2">{invoice.order_id}</td>
              <td className="border px-4 py-2">
                {invoice.payment_details.method}
              </td>
              <td className="border px-4 py-2">{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
