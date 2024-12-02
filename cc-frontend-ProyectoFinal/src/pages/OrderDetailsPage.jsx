import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder, updateOrder, deleteOrder } from "../services/orderService";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(orderId);
        setOrder(data);
        setUpdatedStatus(data.status);
      } catch (error) {
        console.error("Error fetching order:", error);
        setError(error.message || "Error fetching order");
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

  const handleUpdateOrder = async () => {
    try {
      await updateOrder({ order_id: orderId, status: updatedStatus });
      navigate(`/orders/${orderId}`);
    } catch (error) {
      console.error("Error updating order:", error);
      setError(error.message || "Error updating order");
    }
  };

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(orderId);
      navigate("/orders");
    } catch (error) {
      console.error("Error deleting order:", error);
      setError(error.message || "Error deleting order");
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Detalles del Pedido</h2>
          <div>
            <button
              onClick={handleUpdateOrder}
              className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 mr-2"
            >
              Actualizar
            </button>
            <button
              onClick={handleDeleteOrder}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Eliminar
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              ID
            </label>
            <p className="mt-1 text-gray-900">{order.order_id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Usuario
            </label>
            <p className="mt-1 text-gray-900">{order.user_id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Artículos
            </label>
            {order.items.map((item, index) => (
              <p key={index} className="mt-1 text-gray-900">
                {item.name} - {item.price}
              </p>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Estado
            </label>
            <select
              value={updatedStatus}
              onChange={handleStatusChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="CREATED">CREATED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
