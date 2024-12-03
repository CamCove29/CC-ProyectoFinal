// src/components/inventory/ProductDetails.jsx
import { useEffect, useState } from "react";
import { getProduct } from "../../services/inventoryService";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(productId);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Detalles del Producto</h1>
      <p>
        <strong>Nombre:</strong> {product.product_name}
      </p>
      <p>
        <strong>Stock Disponible:</strong> {product.stock_available}
      </p>
    </div>
  );
};

export default ProductDetails;
