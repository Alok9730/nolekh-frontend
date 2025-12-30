import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

function CustomerGuard() {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/Customer/login" />;
  }

  return <Outlet />;
}

export default CustomerGuard;
