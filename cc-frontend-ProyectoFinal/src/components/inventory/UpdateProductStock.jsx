// src/components/inventory/UpdateProductStock.jsx
import { useState, useEffect } from "react";
import { updateProductStock, getProduct } from "../../services/inventoryService";
import { useParams } from "react-router-dom";

const UpdateProductStock = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [stockAvailable, setStockAvailable] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(productId);
      setProduct(data);
      setStockAvailable(data ? data.stock_available : "");
    };
    fetchProduct();
  }, [productId]);

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    try {
      await updateProductStock(productId, stockAvailable);
      alert("Stock actualizado exitosamente");
    } catch (error) {
      setError("Error al actualizar el stock");
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Actualizar Stock</h1>
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
      )}
      <form onSubmit={handleUpdateStock}>
        <input
          type="number"
          placeholder="Nuevo Stock"
          value={stockAvailable}
          onChange={(e) => setStockAvailable(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Actualizar Stock
        </button>
      </form>
    </div>
  );
};

export default UpdateProductStock;
