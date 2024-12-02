import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../services/authService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        alert("Error al cargar perfil. Por favor, inicia sesión.");
        logout();
        navigate("/"); // Redirige al login si falla la autenticación
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige al login tras cerrar sesión
  };

  if (!profile) return <div>Cargando perfil...</div>;

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl text-center mb-6">Perfil</h2>
        <p>
          <strong>Nombre:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Rol:</strong> {profile.role}
        </p>
        <p>
          <strong>ID de Tienda:</strong> {profile.tenant_id}
        </p>
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
