import { useState } from "react";
import { updateProduct, createProduct } from "../../services/productService";
import PropTypes from "prop-types";

const ProductForm = ({ tenantId, product = {}, isEdit = false }) => {
  const [formData, setFormData] = useState(
    product || { name: "", description: "", price: "" }
  );
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(tenantId, product.product_id, formData);
        setMessage("Producto actualizado exitosamente");
      } else {
        await createProduct({ ...formData, tenant_id: tenantId });
        setMessage("Producto creado exitosamente");
      }
    } catch (err) {
      setMessage(err.message || "Error al guardar el producto");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Editar Producto" : "Crear Producto"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Guardar
        </button>
      </form>
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
};

ProductForm.propTypes = {
  tenantId: PropTypes.string.isRequired,
  product: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default ProductForm;
