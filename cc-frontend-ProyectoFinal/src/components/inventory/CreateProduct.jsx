// src/components/inventory/CreateProduct.jsx
import { useState } from "react";
import { createProduct } from "../../services/inventoryService";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [stockAvailable, setStockAvailable] = useState("");
  const [error, setError] = useState(null);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!productName || !stockAvailable) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await createProduct(productName, stockAvailable);
      alert("Producto creado exitosamente");
    } catch (error) {
      setError("Error al crear el producto");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Crear Producto</h1>
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
      )}
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Stock Disponible"
          value={stockAvailable}
          onChange={(e) => setStockAvailable(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
