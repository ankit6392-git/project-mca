import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: JSX.Element;
  role?: string[];
};

export default function ProtectedRoute({ children, role }: Props) {
  const { user, token } = useAuth();

  /* ⛔ Not logged in */
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  /* ⛔ Role not allowed */
  if (role && !role.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  /* ✅ Allowed */
  return children;
}

