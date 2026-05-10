"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import LogoGeometry from "./LogoGeometry";

export default function Logo3D() {
  return (
    <Canvas
      camera={{ position: [4, 2, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[-2, 1, -3]} intensity={0.8} color="#4a3a7a" />
      <pointLight position={[3, 2, 4]} intensity={1.2} color="#8a7aff" />
      <LogoGeometry />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.8}
        enableZoom={false}
        enablePan={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
