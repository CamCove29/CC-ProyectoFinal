import ProductDetail from "../components/Products/ProductDetail";

const ProductDetailPage = () => {
  const tenantId = "example-tenant-id"; // Reemplaza con el tenant_id dinámico

  return (
    <div>
      <ProductDetail tenantId={tenantId} />
    </div>
  );
};

export default ProductDetailPage;
