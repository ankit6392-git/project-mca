import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <form className="space-y-4">
      <input
        placeholder="Full Name"
        className="auth-input"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        className="auth-input"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="auth-input"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <motion.button
        whileHover={{ scale: 1.03 }}
        className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold text-white"
      >
        Create Account
      </motion.button>

      {/* 🔹 Already member link */}
      <p className="text-center text-sm text-gray-600">
        Already a member?{" "}
        <Link
          to="/login"
          className="text-emerald-600 hover:underline font-medium"
        >
          Login here
        </Link>
      </p>
    </form>
  );
}
