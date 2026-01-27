import { motion } from "framer-motion";
import Scene from "../three/Scene";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-950">

      {/* ================= 3D BACKGROUND ================= */}
      <div className="absolute inset-0">
        <Scene />
      </div>

      {/* ================= OVERLAY ================= */}
      {/* Improves text contrast over 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-slate-950" />

      {/* ================= CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
          Civic{" "}
          <span className="text-indigo-500">
            Connect
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base md:text-lg lg:text-xl text-slate-300 mb-10 leading-relaxed">
          Report civic issues, track their progress, and collaborate with
          authorities to build a smarter, more transparent city.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/issues"
            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium shadow-lg"
          >
            View Issues
          </a>

          <a
            href="/register"
            className="px-8 py-3 rounded-xl border border-slate-400 hover:bg-slate-800 transition font-medium"
          >
            Get Started
          </a>
        </div>
      </motion.div>
    </section>
  );
}
