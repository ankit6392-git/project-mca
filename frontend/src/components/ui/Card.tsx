// import { motion } from "framer-motion";

// interface CardProps {
//   title?: string;
//   children: React.ReactNode;
// }

// export default function Card({ title, children }: CardProps) {
//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       transition={{ duration: 0.3 }}
//       className="bg-slate-800 border border-slate-700 rounded-2xl p-6"
//     >
//       {title && (
//         <h3 className="text-xl font-semibold mb-4">
//           {title}
//         </h3>
//       )}
//       {children}
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";

/**
 * Glassmorphism card
 */
export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        rounded-2xl
        shadow-xl
        p-6
      "
    >
      {children}
    </motion.div>
  );
}
