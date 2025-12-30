
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/shopkeeper/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
