
import ProductForm from "../components/Products/ProductForm";

const EditProductPage = () => {
  const tenantId = "example-tenant-id"; // Reemplaza con el tenant_id dinámico
  const product = {
    product_id: "product-id-example",
    name: "Producto Ejemplo",
    description: "Descripción del producto",
    price: 100,
  }; // Obtén este producto desde un estado global o API

  return (
    <div>
      <ProductForm tenantId={tenantId} product={product} isEdit={true} />
    </div>
  );
};

export default EditProductPage;
