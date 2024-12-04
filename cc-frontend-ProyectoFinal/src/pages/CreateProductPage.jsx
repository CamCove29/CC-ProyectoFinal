import ProductForm from '../components/Products/ProductForm';

const CreateProductPage = () => {
  const tenantId = 'example-tenant-id'; // Reemplaza con el tenant_id dinámico

  return (
    <div>
      <ProductForm tenantId={tenantId} />
    </div>
  );
};

export default CreateProductPage;
