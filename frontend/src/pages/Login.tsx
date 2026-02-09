// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Canvas } from "@react-three/fiber";
// import * as THREE from "three";

// import AuthLayout from "../components/layouts/AuthLayout";
// import GlassCard from "../components/ui/GlassCard";
// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";

// import { api } from "../services/api";
// import { useAuth } from "../context/AuthContext";

// /* ================= FLOATING BALLOONS ================= */
// function Balloon({ position, color }: any) {
//   return (
//     <mesh position={position}>
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

//       <group>
//         <Balloon position={[-2, -1, 0]} color="#6366f1" />
//         <Balloon position={[1.5, 0.5, -1]} color="#06b6d4" />
//         <Balloon position={[0, -2, -0.5]} color="#ec4899" />
//         <Balloon position={[2, 1.5, -1]} color="#22c55e" />
//       </group>
//     </Canvas>
//   );
// }

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ---------------- LOGIN HANDLER ---------------- */
//   const handleLogin = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/login", {
//         email,
//         password,
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
//     } catch {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       {/* 🎈 THREE.JS FLOATING BACKGROUND */}
//       <FloatingBalloons />

//       <GlassCard>
//         {/* Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
//         >
//           Welcome Back 👋
//         </motion.h1>

//         <p className="text-center text-white/60 mb-6">
//           Login to Civic Connect
//         </p>

//         {/* Error */}
//         {error && (
//           <motion.p
//             initial={{ x: -10 }}
//             animate={{ x: [-10, 10, -8, 8, 0] }}
//             className="text-red-400 text-sm text-center mb-3"
//           >
//             {error}
//           </motion.p>
//         )}

//         {/* Email */}
//         <Input
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password with PERFECTLY CENTERED EYE */}
//         <div className="relative">
//           <Input
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* 👁️ FIXED ALIGNMENT */}
//           <motion.button
//             type="button"
//             whileTap={{ scale: 0.85 }}
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition"
//           >
//             {showPassword ? (
//               /* Eye Off */
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3 3l18 18M10.73 5.08A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7a19.77 19.77 0 01-4.318 4.906M9.88 9.88a3 3 0 104.243 4.243"
//                 />
//               </svg>
//             ) : (
//               /* Eye */
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                 />
//               </svg>
//             )}
//           </motion.button>
//         </div>

//         {/* Button */}
//         <motion.div whileTap={{ scale: 0.97 }}>
//           <Button
//             className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 transition"
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </Button>
//         </motion.div>
//       </GlassCard>
//     </AuthLayout>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import AuthLayout from "../components/layouts/AuthLayout";
import GlassCard from "../components/ui/GlassCard";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

/* ================= FLOATING BALLOONS ================= */
function Balloon({ position, color }: any) {
  return (
    <mesh position={position}>
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

      <group>
        <Balloon position={[-2, -1, 0]} color="#6366f1" />
        <Balloon position={[1.5, 0.5, -1]} color="#06b6d4" />
        <Balloon position={[0, -2, -0.5]} color="#ec4899" />
        <Balloon position={[2, 1.5, -1]} color="#22c55e" />
      </group>
    </Canvas>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- LOGIN HANDLER ---------------- */
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
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
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* 🎈 THREE.JS FLOATING BACKGROUND */}
      <FloatingBalloons />

      <GlassCard>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
        >
          Welcome Back 👋
        </motion.h1>

        <p className="text-center text-white/60 mb-6">
          Login to Civic Connect
        </p>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ x: -10 }}
            animate={{ x: [-10, 10, -8, 8, 0] }}
            className="text-red-400 text-sm text-center mb-3"
          >
            {error}
          </motion.p>
        )}

        {/* Email */}
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            type="button"
            whileTap={{ scale: 0.85 }}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18M10.73 5.08A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7a19.77 19.77 0 01-4.318 4.906M9.88 9.88a3 3 0 104.243 4.243"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Login Button */}
        <motion.div whileTap={{ scale: 0.97 }}>
          <Button
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 transition"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </motion.div>

        {/* REGISTER LINK */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white/70 mt-5 text-sm"
        >
          New member?{" "}
          <button
            type="button"
            onClick={() => navigate("/Register")}
            className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4"
          >
            Join now
          </button>
        </motion.p>
      </GlassCard>
    </AuthLayout>
  );
}
