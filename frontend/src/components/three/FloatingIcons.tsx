// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import * as THREE from "three";

// export default function FloatingIcons() {
//   const group = useRef<THREE.Group>(null);

//   useFrame((state) => {
//     if (!group.current) return;
//     group.current.rotation.y += 0.002;
//     group.current.position.y =
//       Math.sin(state.clock.elapsedTime) * 0.2 + 1.5;
//   });

//   return (
//     <group ref={group}>
//       <mesh position={[-1.5, 0, 0]}>
//         <sphereGeometry args={[0.15, 16, 16]} />
//         <meshStandardMaterial color="#22c55e" />
//       </mesh>

//       <mesh position={[0, 0, -1.5]}>
//         <sphereGeometry args={[0.15, 16, 16]} />
//         <meshStandardMaterial color="#f97316" />
//       </mesh>

//       <mesh position={[1.5, 0, 1]}>
//         <sphereGeometry args={[0.15, 16, 16]} />
//         <meshStandardMaterial color="#ef4444" />
//       </mesh>
//     </group>
//   );
// }

import { Float } from "@react-three/drei";

export default function FloatingMesh({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh position={position}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
}

