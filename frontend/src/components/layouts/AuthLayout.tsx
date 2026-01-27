// import { ReactNode } from "react";
// import Scene from "../three/Scene";

// /**
//  * AuthLayout
//  * ----------
//  * Shared layout for Login & Register pages
//  * - Three.js animated background
//  * - Centered content
//  */
// export default function AuthLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className="relative h-screen w-screen overflow-hidden">
//       {/* Three.js background */}
//       <Scene />

//       {/* Dark overlay for readability */}
//       <div className="absolute inset-0 bg-black/50" />

//       {/* Centered auth card */}
//       <div className="relative z-10 flex h-full items-center justify-center">
//         {children}
//       </div>
//     </div>
//   );
// }

//import Scene from "../three/Scene";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black">
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
