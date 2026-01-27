import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.role === "admin") return <Navigate to="/admin" replace />;
    if (user?.role === "authority") return <Navigate to="/authority" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  

  return children;
}
