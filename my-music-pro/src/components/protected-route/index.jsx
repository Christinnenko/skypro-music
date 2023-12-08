import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const user = Boolean(localStorage.getItem("user"));
  const isAllowed = user;
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
};

export default ProtectedRoute;
