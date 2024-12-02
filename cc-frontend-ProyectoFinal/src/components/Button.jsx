
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"; // Importamos PropTypes

export const Button = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(props.to);
  };

  const currentButton =
    location.pathname === props.to
      ? "bg-primary text-white font-bold"
      : "bg-primary";

  return (
    <button
      className={`${currentButton} mx-6 py-2 px-4 rounded-full cursor-pointer text-white font-bold`}
      onClick={handleClick}
    >
      {props.message}
    </button>
  );
};

// Validación de las props
Button.propTypes = {
  to: PropTypes.string.isRequired, // 'to' debe ser una cadena y es obligatorio
  message: PropTypes.string.isRequired, // 'message' debe ser una cadena y es obligatorio
};

export default Button;
