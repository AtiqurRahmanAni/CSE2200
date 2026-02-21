import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const PublicRoute = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  return user && location.pathname === "/login" ? (
    <Navigate to="/profile" />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
