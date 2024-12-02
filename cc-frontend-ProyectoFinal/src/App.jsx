import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";

// Páginas de autenticación
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Páginas de productos
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";

// Componentes
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";

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

            {/* Rutas de productos */}
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:productId"
              element={
                <PrivateRoute>
                  <ProductDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/create"
              element={
                <PrivateRoute>
                  <CreateProductPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:productId/edit"
              element={
                <PrivateRoute>
                  <EditProductPage />
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
