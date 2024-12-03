// src/pages/Users.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../services/authService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      if (!usersData) {
        navigate("/");
      } else {
        setUsers(usersData.users);
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleDelete = async (userId) => {
    const response = await deleteUser(userId);
    if (response) {
      setUsers(users.filter((user) => user.user_id !== userId));
      alert("Usuario eliminado");
    } else {
      alert("Error al eliminar el usuario");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl">Lista de Usuarios</h2>
      <ul className="mt-4 space-y-2">
        {users.map((user) => (
          <li key={user.user_id} className="flex justify-between items-center">
            <span>{user.email}</span>
            <button
              onClick={() => handleDelete(user.user_id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
