import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Button = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(props.to);
  };

  const currentButton =
    location.pathname === props.to
      ? "bg-green-600 text-white font-bold"
      : "bg-green-500";

  return (
    <button
      className={`${currentButton} mx-6 py-3 px-6 rounded-full cursor-pointer text-white font-bold transition-all duration-300 ease-in-out hover:bg-green-700 hover:scale-105 active:bg-green-800 active:scale-95`}
      onClick={handleClick}
    >
      {props.message}
    </button>
  );
};
