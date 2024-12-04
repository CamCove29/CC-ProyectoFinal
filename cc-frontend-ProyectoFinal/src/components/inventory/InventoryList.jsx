// src/components/inventory/InventoryList.jsx
import { useEffect, useState } from "react";
import { getInventory } from "../../services/inventoryService";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const data = await getInventory();
      setInventory(data);
    };
    fetchInventory();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Inventario de Productos</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID Producto</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Stock Disponible</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.product_id}>
              <td className="border px-4 py-2">{item.product_id}</td>
              <td className="border px-4 py-2">{item.product_name}</td>
              <td className="border px-4 py-2">{item.stock_available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
