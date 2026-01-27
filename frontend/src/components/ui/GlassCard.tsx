import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
}

export default function GlassCard({ children }: GlassCardProps) {
  return (
    <div className="w-full max-w-md p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
      {children}
    </div>
  );
}
