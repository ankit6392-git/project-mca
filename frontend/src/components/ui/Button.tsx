// // import { motion } from "framer-motion";

// // interface ButtonProps {
// //   children: React.ReactNode;
// //   onClick?: () => void;
// //   variant?: "primary" | "secondary";
// //   type?: "button" | "submit";
// // }

// // export default function Button({
// //   children,
// //   onClick,
// //   variant = "primary",
// //   type = "button",
// // }: ButtonProps) {
// //   const base =
// //     "px-6 py-3 rounded-xl font-medium transition focus:outline-none";

// //   const styles = {
// //     primary:
// //       "bg-indigo-600 text-white hover:bg-indigo-700",
// //     secondary:
// //       "border border-slate-400 text-white hover:bg-slate-800",
// //   };

// //   return (
// //     <motion.button
// //       type={type}
// //       onClick={onClick}
// //       whileHover={{ scale: 1.05 }}
// //       whileTap={{ scale: 0.95 }}
// //       className={`${base} ${styles[variant]}`}
// //     >
// //       {children}
// //     </motion.button>
// //   );
// // }

// import { motion } from "framer-motion";

// /**
//  * Button
//  * -------
//  * - Supports loading state
//  * - Animated hover / tap
//  */
// export default function Button({
//   children,
//   loading = false,
//   type = "button",
//   variant = "primary",
// }: {
//   children: string;
//   loading?: boolean;
//   type?: "button" | "submit";
//   variant?: "primary" | "success";
// }) {
//   const base =
//     "w-full py-3 rounded-lg font-semibold transition disabled:opacity-60";

//   const styles = {
//     primary: "bg-indigo-600 hover:bg-indigo-700",
//     success: "bg-emerald-600 hover:bg-emerald-700",
//   };

//   return (
//     <motion.button
//       type={type}
//       disabled={loading}
//       whileHover={!loading ? { scale: 1.03 } : {}}
//       whileTap={!loading ? { scale: 0.97 } : {}}
//       className={`${base} ${styles[variant]}`}
//     >
//       {loading ? "⏳ Please wait..." : children}
//     </motion.button>
//   );
// }

import { motion } from "framer-motion";

/**
 * Reusable animated button
 */
export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      type={type}
      className={`px-5 py-2 rounded-xl font-medium shadow-lg ${styles[variant]}`}
    >
      {children}
    </motion.button>
  );
}
