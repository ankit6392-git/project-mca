// // // // import { Canvas } from "@react-three/fiber";
// // // // import { OrbitControls } from "@react-three/drei";
// // // // import Lights from "./Lights";
// // // // import CityModel from "./CityModel";
// // // // import FloatingIcons from "./FloatingIcons";

// // // // export default function Scene() {
// // // //   return (
// // // //     <Canvas
// // // //       camera={{ position: [0, 3, 6], fov: 60 }}
// // // //       dpr={[1, 1.5]}
// // // //     >
// // // //       <Lights />

// // // //       <CityModel />
// // // //       <FloatingIcons />

// // // //       <OrbitControls
// // // //         enableZoom={false}
// // // //         enablePan={false}
// // // //         autoRotate
// // // //         autoRotateSpeed={0.4}
// // // //       />
// // // //     </Canvas>
// // // //   );
// // // // }

// // // import { Canvas } from "@react-three/fiber";
// // // import { OrbitControls, Environment } from "@react-three/drei";
// // // import FloatingIcons from "./FloatingIcons";

// // // export default function Scene() {
// // //   return (
// // //     <Canvas
// // //       camera={{ position: [0, 0, 6], fov: 50 }}
// // //       className="w-full h-full"
// // //     >
// // //       {/* Soft lighting */}
// // //       <ambientLight intensity={0.6} />
// // //       <directionalLight position={[5, 5, 5]} intensity={1} />

// // //       {/* 3D content */}
// // //       <FloatingIcons />

// // //       {/* Disable zoom to avoid UX issues */}
// // //       <OrbitControls enableZoom={false} />

// // //       {/* Nice realistic lighting */}
// // //       <Environment preset="city" />
// // //     </Canvas>
// // //   );
// // // }

// // import { Canvas } from "@react-three/fiber";
// // import { Environment, OrbitControls } from "@react-three/drei";
// // import FloatingIcons from "./FloatingIcons";
// // import CityModel from "./CityModel";
// // import Lights from "./Lights";

// // export default function Scene() {
// //   return (
// //     <Canvas
// //       camera={{ position: [0, 2, 6], fov: 50 }}
// //       style={{ width: "100%", height: "100%" }}
// //     >
// //       <Lights />

// //       {/* Optional city model */}
// //       <CityModel />

// //       {/* Floating icons animation */}
// //       <FloatingIcons />

// //       <Environment preset="city" />

// //       {/* Disable zoom for auth pages */}
// //       <OrbitControls enableZoom={false} enablePan={false} />
// //     </Canvas>
// //   );
// // }

// import { Canvas } from "@react-three/fiber";
// import FloatingIcons from "./FloatingIcons";
// import Lights from "./Lights";

// export default function Scene() {
//   return (
//     <Canvas
//       camera={{ position: [0, 3, 8], fov: 50 }}
//       frameloop="demand"
//     >
//       <Lights />
//       <FloatingIcons />
//     </Canvas>
//   );
// }

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CityModel from "./CityModel";
import Lights from "./Lights";

/**
 * Scene
 * -----
 * Three.js canvas background for auth pages
 */
export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 60 }}
      className="absolute inset-0"
    >
      <Lights />
      <CityModel />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  );
}

