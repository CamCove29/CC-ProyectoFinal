import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';
const ProductList = ({ tenantId }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(tenantId);
        setProducts(data);
      } catch (err) {
        setError(err.message || "Error fetching products");
      }
    };

    fetchProducts();
  }, [tenantId]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li
            key={product.product_id}
            className="p-4 border rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => handleProductClick(product.product_id)}
          >
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-500 font-bold">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProductList.propTypes = {
  tenantId: PropTypes.string.isRequired,
};


export default ProductList;
