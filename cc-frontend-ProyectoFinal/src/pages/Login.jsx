
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { login } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      await login(formData.email, formData.password);
      navigate("/profile"); // Redirige al perfil tras iniciar sesión
    } catch (err) {
      alert(
        "Error al iniciar sesión: " + (err.message || "Intenta nuevamente.")
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;

