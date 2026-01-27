import Scene from "../three/Scene";

export default function AuthBackground() {
  return (
    <div className="absolute inset-0">
      <Scene />
      {/* dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-slate-900/80" />
    </div>
  );
}
