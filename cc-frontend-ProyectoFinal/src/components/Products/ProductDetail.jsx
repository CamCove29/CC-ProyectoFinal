import { useEffect, useState } from "react";
import { getProduct } from "../../services/productService";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";

const ProductDetail = ({ tenantId }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(tenantId, productId);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Error fetching product details");
      }
    };

    fetchProduct();
  }, [tenantId, productId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-green-500 font-bold text-xl">${product.price}</p>
    </div>
  );
};
ProductDetail.propTypes = {
  tenantId: PropTypes.string.isRequired,
};


export default ProductDetail;
