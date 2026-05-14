import { Navigate } from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

function RoleRoute({
  children,
  role,
}) {

  const auth = useAuth();

  if (!auth || !auth.user) {
    return <Navigate to="/login" />;
  }

  if (auth.user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleRoute;