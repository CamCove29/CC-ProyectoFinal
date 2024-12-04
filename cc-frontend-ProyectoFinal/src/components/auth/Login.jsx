// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [role, setRole] = useState("usuario");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password, tenant_id: tenantId, role };
    const response = await createUser(userData);

    if (response) {
      alert("Usuario creado correctamente");
      navigate("/profile");
    } else {
      alert("Error al crear el usuario");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl text-center mb-4">Crear Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label htmlFor="password" className="block">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tenantId" className="block">
            Tenant ID
          </label>
          <input
            type="text"
            id="tenantId"
            className="w-full p-2 border rounded"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block">
            Rol
          </label>
          <select
            id="role"
            className="w-full p-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default Login;
