import { useState } from "react";

/**
 * FloatingInput
 * ----------------
 * - Material-style floating label
 * - Supports password visibility toggle
 * - Reusable across Login / Register / Forms
 */
export default function FloatingInput({
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
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="relative">
      {/* Input field */}
      <input
        type={isPassword && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 pr-12
                   bg-slate-800 text-white
                   border border-slate-700 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   transition"
      />

      {/* Floating label */}
      <label
        className={`absolute left-4 transition-all pointer-events-none
          ${
            focused || value
              ? "-top-2 text-xs bg-slate-900 px-1 text-indigo-400"
              : "top-3 text-slate-400"
          }`}
      >
        {label}
      </label>

      {/* Password toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-slate-400 hover:text-white"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
}
