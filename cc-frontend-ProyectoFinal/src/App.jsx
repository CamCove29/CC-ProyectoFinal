import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";

// Páginas
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Componentes
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";

// Estilos
import "./styles/App.css";

const App = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href="/icono.png" />
      </Helmet>

      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Redirección inicial a Login */}
            <Route path="/" element={<Navigate to="/auth/login" />} />

            {/* Rutas públicas */}
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/auth/register" element={<RegisterForm />} />

            {/* Ruta protegida para el Perfil */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* Rutas no encontradas */}
            <Route path="*" element={<Navigate to="/auth/login" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
