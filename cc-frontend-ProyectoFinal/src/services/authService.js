import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Asumimos que el backend está en localhost:5000

// Función para guardar el token en el almacenamiento local
const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Función para obtener el token almacenado
const getToken = () => {
  return localStorage.getItem("authToken");
};

// Función para eliminar el token (cerrar sesión)
const removeToken = () => {
  localStorage.removeItem("authToken");
};

// Función para realizar la autenticación y obtener el perfil
export const login = async (email, password, tenantId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`, // Endpoint de login en tu API
      { email, password, tenant_id: tenantId }
    );
    
    // Suponiendo que la respuesta contiene un token y un perfil
    const { token, user } = response.data;

    // Guardar el token
    saveToken(token);

    // Devolver el perfil del usuario
    return user;
  } catch (error) {
    console.error("Error al hacer login", error);
    throw new Error("Error al iniciar sesión");
  }
};

// Función para obtener el perfil del usuario autenticado
export const getProfile = async () => {
  try {
    const token = getToken();

    // Verificar si el token existe antes de intentar la solicitud
    if (!token) {
      throw new Error("Token no encontrado, debes iniciar sesión");
    }

    // Obtener el tenant_id desde el almacenamiento o de algún otro lugar
    const tenantId = "tenant_id_from_storage"; // Asegúrate de obtenerlo correctamente

    // Hacer la solicitud al backend para obtener el perfil
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        tenant_id: tenantId,
      },
    });

    return response.data; // Retornar los datos del perfil
  } catch (error) {
    console.error("Error al obtener el perfil", error);
    throw new Error("Error al obtener el perfil");
  }
};

// Función para cerrar sesión
export const logout = () => {
  removeToken();
};

// Función para validar si el token es válido
export const validateToken = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token no encontrado");
    }

    const tenantId = "tenant_id_from_storage"; // Asegúrate de obtenerlo correctamente

    // Verificar si el token es válido a través de la API
    const response = await axios.post(
      `${BASE_URL}/validateToken`, // Endpoint para validar el token
      { token, tenant_id: tenantId }
    );

    if (response.data && response.data.valid) {
      return true;
    } else {
      removeToken(); // Eliminar el token si no es válido
      return false;
    }
  } catch (error) {
    console.error("Error al validar el token", error);
    removeToken();
    return false;
  }
};