import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../../utils/auth";

const useAuth = () => {
  const user = getCurrentUser();
  return Boolean(user);
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
