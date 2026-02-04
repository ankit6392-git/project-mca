import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="auth-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="auth-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold text-white"
      >
        Login
      </motion.button>

      {/* 🔹 New member link */}
      <p className="text-center text-sm text-gray-600">
        New member?{" "}
        <Link
          to="/register"
          className="text-indigo-600 hover:underline font-medium"
        >
          Join now
        </Link>
      </p>
    </form>
  );
}
