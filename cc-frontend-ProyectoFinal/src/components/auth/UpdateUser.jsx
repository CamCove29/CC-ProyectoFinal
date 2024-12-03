// src/components/UpdateUser.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUser } from "../services/authService";

const UpdateUser = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [loading, setLoading] = useState(true); // Para controlar el estado de carga
  const navigate = useNavigate();

  // Cargar el perfil del usuario al montar el componente
  useEffect(() => {
    const fetchUserProfile = async () => {
      const profileData = await getUserProfile();
      if (!profileData) {
        // Si no hay datos del perfil, redirigir al login
        navigate("/");
      } else {
        setUser(profileData);
        setEmail(profileData.email);
        setName(profileData.name);
        setStore(profileData.store);
      }
      setLoading(false); // Después de cargar, terminamos el estado de carga
    };

    fetchUserProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userData = { email, name, store };

    // Actualizar el usuario
    const updatedUser = await updateUser(user.user_id, userData);

    if (updatedUser) {
      alert("Usuario actualizado correctamente");
      navigate("/profile"); // Redirigir al perfil después de la actualización
    } else {
      alert("Error al actualizar el usuario");
    }
  };

  // Si aún se está cargando, mostrar un spinner o mensaje de carga
  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  // Si el perfil está cargado, mostrar el formulario de actualización
  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl text-center mb-4">Actualizar Usuario</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">
            Correo
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="store" className="block">
            Tienda
          </label>
          <input
            type="text"
            id="store"
            className="w-full p-2 border rounded"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Actualizar Usuario
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
