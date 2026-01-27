import { motion } from "framer-motion";

export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 w-full max-w-md rounded-2xl
                 bg-slate-900/70 backdrop-blur-xl
                 border border-white/10 shadow-2xl
                 p-8"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
