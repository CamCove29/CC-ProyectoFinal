// src/components/billing/CreateInvoice.jsx
import { useState } from "react";
import { createInvoice } from "../../services/billingService";

const CreateInvoice = () => {
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    const paymentDetails = {
      method: paymentMethod,
      amount: parseFloat(amount),
    };
    const response = await createInvoice(orderId, paymentDetails);
    if (response && response.success) {
      alert("Factura creada exitosamente");
    } else {
      setError("Error al crear la factura");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Crear Factura</h1>
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
      )}
      <form onSubmit={handleCreateInvoice}>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Método de Pago"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Crear Factura
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
