import { useMemo } from "react";

type Building = {
  x: number;
  z: number;
  height: number;
};

export default function CityModel() {
  const buildings = useMemo<Building[]>(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      x: (i % 5) - 2,
      z: Math.floor(i / 5) - 2,
      height: Math.random() * 1.8 + 0.6,
    }));
  }, []);

  return (
    <>
      {buildings.map((b, index) => (
        <mesh key={index} position={[b.x, b.height / 2, b.z]}>
          <boxGeometry args={[0.8, b.height, 0.8]} />
          <meshStandardMaterial color="#6366f1" />
        </mesh>
      ))}
    </>
  );
}
