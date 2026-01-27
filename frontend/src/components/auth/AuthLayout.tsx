import { motion } from "framer-motion";
import AuthBackground from "./AuthBackground";

export default function AuthLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <AuthBackground />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex min-h-screen items-center justify-center px-6"
      >
        <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-center mb-6">
            {title}
          </h1>
          {children}
        </div>
      </motion.div>
    </section>
  );
}
