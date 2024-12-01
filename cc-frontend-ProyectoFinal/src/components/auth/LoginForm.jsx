import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import { Button } from "../Button";
import { login } from "../../services/authService";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      setError("");
      navigate("/profile"); // Redirige al perfil tras iniciar sesión
    } catch (err) {
      setError(
        "Error al iniciar sesión: " + (err.message || "Intenta nuevamente.")
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-6 bg-white rounded shadow-md"
    >
      <h1 className="mb-4 text-2xl font-bold text-center">Iniciar Sesión</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
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
      <Button type="submit">Iniciar Sesión</Button>
    </form>
  );
};

export default LoginForm;
