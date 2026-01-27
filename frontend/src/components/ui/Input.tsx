// import { InputHTMLAttributes } from "react";

// /**
//  * Input
//  * ------
//  * Styled input with glass UI support
//  */
// export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
//   return (
//     <input
//       {...props}
//       className="
//         w-full
//         px-4 py-3
//         rounded-lg
//         bg-white/20
//         text-white
//         placeholder-white/70
//         border border-white/30
//         focus:outline-none
//         focus:ring-2
//         focus:ring-indigo-400
//         transition
//       "
//     />
//   );
// }

import { useState } from "react";

/**
 * Floating label input
 */
export default function Input({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative mb-6">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="
          w-full
          bg-transparent
          border border-white/30
          rounded-lg
          px-4 py-3
          text-white
          outline-none
          focus:border-indigo-400
        "
      />

      <label
        className={`
          absolute left-4 transition-all
          ${focused || value ? "top-[-10px] text-xs text-indigo-400 bg-slate-900 px-1" : "top-3 text-white/60"}
        `}
      >
        {label}
      </label>
    </div>
  );
}
