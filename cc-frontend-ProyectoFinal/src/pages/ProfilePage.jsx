import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../services/authService';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setProfile(userData);
      } catch (err) {
        setError(err.message || 'Error al cargar el perfil');
        logout();
        navigate('/');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-10">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl text-center mb-6">Perfil de Usuario</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <p className="text-gray-900">{profile.name}</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correo Electrónico
          </label>
          <p className="text-gray-900">{profile.email}</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rol
          </label>
          <p className="text-gray-900">{profile.role}</p>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID de Tienda
          </label>
          <p className="text-gray-900">{profile.tenant_id}</p>
        </div>
        
        <div className="flex items-center justify-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
