// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// import AuthLayout from "../components/layouts/AuthLayout";
// import GlassCard from "../components/ui/GlassCard";
// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";

// import { api } from "../services/api";
// import { useAuth } from "../context/AuthContext";

// /* ================= THREE.JS FLOATING BALLOONS ================= */
// function Balloon({
//   position,
//   color,
//   speed = 0.002,
// }: {
//   position: [number, number, number];
//   color: string;
//   speed?: number;
// }) {
//   const ref = useRef<THREE.Mesh>(null!);

//   useFrame(() => {
//     if (!ref.current) return;
//     ref.current.position.y += speed;
//     if (ref.current.position.y > 4) {
//       ref.current.position.y = -4;
//     }
//   });

//   return (
//     <mesh ref={ref} position={position}>
//       <sphereGeometry args={[0.6, 32, 32]} />
//       <meshStandardMaterial
//         color={color}
//         transparent
//         opacity={0.6}
//       />
//     </mesh>
//   );
// }

// function FloatingBalloons() {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 6] }}
//       className="absolute inset-0 -z-10"
//     >
//       <ambientLight intensity={0.8} />
//       <directionalLight position={[5, 5, 5]} />

//       <Balloon position={[-2, -3, 0]} color="#6366f1" />
//       <Balloon position={[1.5, -4, -1]} color="#06b6d4" />
//       <Balloon position={[0, -5, -0.5]} color="#ec4899" />
//       <Balloon position={[2, -6, -1]} color="#22c55e" />
//     </Canvas>
//   );
// }

// export default function Register() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState<"citizen" | "authority">("citizen");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ---------------- REGISTER HANDLER ---------------- */
//   const handleRegister = async () => {
//     setError("");

//     if (!name || !email || !password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//         role,
//       });

//       const { token, user } = res.data;
//       login(user, token);

//       if (user.role === "admin") {
//         navigate("/admin", { replace: true });
//       } else if (user.role === "authority") {
//         navigate("/authority", { replace: true });
//       } else {
//         navigate("/dashboard", { replace: true });
//       }
//     } catch (err: any) {
//       console.error("REGISTER ERROR:", err);
//       setError(
//         err.response?.data?.message || "Registration failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       {/* 🌈 THREE.JS BACKGROUND */}
//       <FloatingBalloons />

//       <GlassCard>
//         {/* Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: -25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
//         >
//           Create Account 🚀
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-center text-white/60 mb-6"
//         >
//           Join CivicConnect today
//         </motion.p>

//         {/* Error */}
//         {error && (
//           <motion.p
//             initial={{ x: -10 }}
//             animate={{ x: [-10, 10, -8, 8, 0] }}
//             transition={{ duration: 0.4 }}
//             className="text-red-400 text-sm text-center mb-3"
//           >
//             {error}
//           </motion.p>
//         )}

//         {/* Full Name */}
//         <Input
//           label="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         {/* Email */}
//         <Input
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password */}
//         <Input
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* Role Dropdown */}
//         <div className="mt-4">
//           <label className="block text-sm mb-1 text-white/80">
//             Register As
//           </label>
//           <select
//             value={role}
//             onChange={(e) =>
//               setRole(e.target.value as "citizen" | "authority")
//             }
//             className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//           >
//             <option value="citizen" className="text-black">
//               Citizen
//             </option>
//             <option value="authority" className="text-black">
//               Authority
//             </option>
//           </select>
//         </div>

//         {/* Button (slightly lower position preserved) */}
//         <motion.div whileTap={{ scale: 0.97 }} className="mt-[26px]">
//           <Button
//             className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 transition"
//             onClick={handleRegister}
//             disabled={loading}
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </Button>
//         </motion.div>
//       </GlassCard>
//     </AuthLayout>
//   );
// }

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import AuthLayout from "../components/layouts/AuthLayout";
import GlassCard from "../components/ui/GlassCard";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

/* ================= THREE.JS FLOATING BALLOONS ================= */
function Balloon({
  position,
  color,
  speed = 0.002,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.y += speed;
    if (ref.current.position.y > 4) {
      ref.current.position.y = -4;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function FloatingBalloons() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6] }}
      className="absolute inset-0 -z-10"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />

      <Balloon position={[-2, -3, 0]} color="#6366f1" />
      <Balloon position={[1.5, -4, -1]} color="#06b6d4" />
      <Balloon position={[0, -5, -0.5]} color="#ec4899" />
      <Balloon position={[2, -6, -1]} color="#22c55e" />
    </Canvas>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"citizen" | "authority">("citizen");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- REGISTER HANDLER ---------------- */
  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      const { token, user } = res.data;
      login(user, token);

      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (user.role === "authority") {
        navigate("/authority", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      console.error("REGISTER ERROR:", err);
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* 🌈 THREE.JS BACKGROUND */}
      <FloatingBalloons />

      <GlassCard>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
        >
          Create Account 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white/60 mb-6"
        >
          Join CivicConnect today
        </motion.p>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ x: -10 }}
            animate={{ x: [-10, 10, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            className="text-red-400 text-sm text-center mb-3"
          >
            {error}
          </motion.p>
        )}

        {/* Full Name */}
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role Dropdown */}
        <div className="mt-4">
          <label className="block text-sm mb-1 text-white/80">
            Register As
          </label>
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "citizen" | "authority")
            }
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="citizen" className="text-black">
              Citizen
            </option>
            <option value="authority" className="text-black">
              Authority
            </option>
          </select>
        </div>

        {/* Create Account Button */}
        <motion.div whileTap={{ scale: 0.97 }} className="mt-[26px]">
          <Button
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 transition"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </motion.div>

        {/* ================= LOGIN REDIRECT ================= */}
        {/* Added without affecting existing logic or routing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-white/70 mt-5 text-sm"
        >
          Already a member?{" "}
          <button
            type="button"
            onClick={() => navigate("/Login")}
            className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4"
          >
            Login now
          </button>
        </motion.p>
        {/* ================================================== */}
      </GlassCard>
    </AuthLayout>
  );
}
