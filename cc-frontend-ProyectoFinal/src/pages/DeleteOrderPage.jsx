import  { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOrder } from "../services/orderService";

const DeleteOrderPage = () => {
  const { tenant_id, order_id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

const handleDeleteOrder = async () => {
  try {
    setIsLoading(true);
    await deleteOrder(tenant_id, order_id);
    navigate("/orders");
  } catch {
    setError("Error deleting order. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Delete Order</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <p>Are you sure you want to delete this order?</p>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => navigate("/orders")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteOrder}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrderPage;
