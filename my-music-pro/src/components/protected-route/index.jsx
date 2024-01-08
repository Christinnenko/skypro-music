import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

//компонент, который будет получать признак isAllowed , который говорит о том, что пользователю можно попасть в авторизированную зону
export const ProtectedRoute = ({ redirectPath = "/register", isAllowed }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }
  return <Outlet />;
};

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  isAllowed: PropTypes.bool.isRequired,
};
