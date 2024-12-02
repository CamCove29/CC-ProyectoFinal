import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { register } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await register(formData);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/"); // Redirige al login tras el registro
    } catch (err) {
      alert("Error al registrar: " + (err.message || "Intenta nuevamente."));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
