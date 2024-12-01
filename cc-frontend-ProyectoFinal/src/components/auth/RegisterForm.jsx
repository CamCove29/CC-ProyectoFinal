import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import { Button } from '../Button';
import { register } from '../../services/authService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    tenant_id: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setError('');
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/'); // Redirige al login tras el registro
    } catch (err) {
      setError('Error al registrar: ' + (err.message || 'Intenta nuevamente.'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-center">Registro</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <Input
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Correo Electrónico"
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        required
      />
      <Input
        label="Contraseña"
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
        required
      />
      <Input
        label="Rol"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <Input
        label="ID de Tienda"
        name="tenant_id"
        value={formData.tenant_id}
        onChange={handleChange}
        required
      />
      <Button type="submit">Registrarse</Button>
    </form>
  );
};

export default RegisterForm;
