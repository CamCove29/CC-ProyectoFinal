import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/orderService";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleCreateOrder = () => {
    navigate("/orders/create");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pedidos</h2>
          <button
            onClick={handleCreateOrder}
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300"
          >
            Crear Pedido
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border text-left">ID</th>
                <th className="p-2 border text-left">Usuario</th>
                <th className="p-2 border text-left">Artículos</th>
                <th className="p-2 border text-left">Estado</th>
                <th className="p-2 border text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id} className="hover:bg-gray-50">
                  <td className="p-2 border">{order.order_id}</td>
                  <td className="p-2 border">{order.user_id}</td>
                  <td className="p-2 border">
                    {order.items.map((item, index) => (
                      <p key={index}>
                        {item.name} - {item.price}
                      </p>
                    ))}
                  </td>
                  <td className="p-2 border">{order.status}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleOrderDetails(order.order_id)}
                      className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 mr-2"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
