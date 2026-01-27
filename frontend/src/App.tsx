import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Authority from "./pages/Authority";
import Profile from "./pages/Profile";
import Footer from "./components/common/Footer";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

/**
 * App Router
 * ----------
 * - Public Home page
 * - Role-based redirect after login
 * - Protected dashboards
 * - Global footer
 */
export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= REDIRECT AFTER LOGIN ================= */}
        <Route
          path="/redirect"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : user.role === "authority" ? (
                <Navigate to="/authority" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ================= CITIZEN ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role={["citizen"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* ================= AUTHORITY ================= */}
        <Route
          path="/authority"
          element={
            <ProtectedRoute role={["authority"]}>
              <Authority />
            </ProtectedRoute>
          }
        />

        {/* ================= PROFILE (ALL ROLES) ================= */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute role={["admin", "authority", "citizen"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ================= GLOBAL FOOTER ================= */}
      <Footer />
    </>
  );
}
