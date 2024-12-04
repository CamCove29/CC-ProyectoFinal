import ProductList from '../components/Products/ProductList';

const ProductsPage = () => {
  const tenantId = 'example-tenant-id'; // Cambia por el tenant_id correspondiente

  return (
    <div>
      <ProductList tenantId={tenantId} />
    </div>
  );
};

export default ProductsPage;
