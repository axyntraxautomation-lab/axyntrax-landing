"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function LogoGeometry() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const particles = useRef<THREE.Points>(null);

  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (group.current) group.current.rotation.y = time * 0.1;
    if (ring1.current) ring1.current.rotation.x = time * 0.5;
    if (ring2.current) ring2.current.rotation.y = time * 0.4;
    if (ring3.current) ring3.current.rotation.z = time * 0.3;
    if (particles.current) {
      particles.current.rotation.y += 0.0006;
      particles.current.position.y = Math.sin(time) * 0.1; // Float effect
    }
  });

  // Materiales Estilo Agujero Negro / Antigravedad
  const neonPurple = new THREE.MeshStandardMaterial({
    color: 0xb380ff,
    emissive: new THREE.Color(0x330066),
    roughness: 0.1,
    metalness: 1,
  });
  const neonBlue = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: new THREE.Color(0x004444),
    wireframe: true,
  });
  const coreGold = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: new THREE.Color(0x00bfff),
    emissiveIntensity: 2,
  });

  // Partículas de gravedad
  const particlesCount = 800;
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i += 3) {
    const radius = 1.5 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.asin((Math.random() * 2) - 1);
    posArray[i] = Math.cos(theta) * Math.cos(phi) * radius;
    posArray[i + 1] = Math.sin(phi) * radius * 0.7;
    posArray[i + 2] = Math.sin(theta) * Math.cos(phi) * radius;
  }

  return (
    <group ref={group}>
      {/* Núcleo de Energía Singularity */}
      <mesh material={coreGold}>
        <sphereGeometry args={[0.4, 32, 32]} />
      </mesh>
      
      {/* Capa de Wireframe que envuelve */}
      <mesh material={neonBlue}>
        <icosahedronGeometry args={[0.6, 2]} />
      </mesh>

      {/* Anillos Orbitales de Antigravedad */}
      <mesh ref={ring1} material={neonPurple}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
      </mesh>
      
      <mesh ref={ring2} material={neonPurple}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
      </mesh>

      <mesh ref={ring3} material={neonPurple}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
      </mesh>

      {/* Partículas flotantes tipo campo cuántico */}
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={posArray}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={0x00ffff}
          size={0.02}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
}
