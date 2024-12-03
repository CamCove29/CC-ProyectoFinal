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

// Páginas de pedidos
import OrdersPage from "./pages/OrdersPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import UpdateOrderPage from "./pages/UpdateOrderPage";
import DeleteOrderPage from "./pages/DeleteOrderPage";

// Páginas de reportes
import CreateReportPage from "./pages/CreateReportPage";
import ViewReportPage from "./pages/ViewReportPage";
import ListReportsPage from "./pages/ListReportsPage";

// Componentes
import PrivateRoute from "./components/PrivateRoute";

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
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />

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

            {/* Rutas de pedidos */}
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrdersPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/:order_id"
              element={
                <PrivateRoute>
                  <OrderDetailsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/create"
              element={
                <PrivateRoute>
                  <CreateOrderPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/:order_id/update"
              element={
                <PrivateRoute>
                  <UpdateOrderPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/:order_id/delete"
              element={
                <PrivateRoute>
                  <DeleteOrderPage />
                </PrivateRoute>
              }
            />
            {/* Rutas de reportes */}
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <ListReportsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports/create"
              element={
                <PrivateRoute>
                  <CreateReportPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports/:reportId"
              element={
                <PrivateRoute>
                  <ViewReportPage />
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
