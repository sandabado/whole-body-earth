"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei/core/Edges";
import { Float } from "@react-three/drei/core/Float";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function OrbitalStarField() {
  const ref = useRef<THREE.Points>(null);
  const { geometry, material } = useMemo(() => {
    let seed = 48271;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#F5F3F0"),
      new THREE.Color("#C9A227"),
      new THREE.Color("#BBA7FF"),
      new THREE.Color("#FDA4D4"),
    ];

    for (let index = 0; index < count; index++) {
      const radius = 8 + Math.pow(random(), 0.7) * 42;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(phi);
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      const color = palette[Math.floor(random() * palette.length)];
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return {
      geometry: starGeometry,
      material: new THREE.PointsMaterial({
        size: 0.05,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.86,
        depthWrite: false,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.008;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.12;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.018) * 0.035;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

function StudiosIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  const shape = useMemo(() => new THREE.IcosahedronGeometry(1), []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.08;
    ref.current.rotation.y += delta * 0.14;
  });

  return (
    <Float speed={1.1} floatIntensity={0.35}>
      <mesh ref={ref} geometry={shape} scale={2.2}>
        <meshStandardMaterial
          color="#2BA8A0"
          emissive="#2BA8A0"
          emissiveIntensity={0.55}
          opacity={0.24}
          transparent
          roughness={0.3}
          metalness={0.4}
        />
        <Edges color="#2BA8A0" opacity={1} transparent />
      </mesh>
    </Float>
  );
}

export default function IcosahedronBackground({ opacity = 0.55 }: { opacity?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      <div className="absolute inset-0" style={{ opacity }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 48 }} dpr={[1, 1.5]}>
          <OrbitalStarField />
          <ambientLight intensity={0.45} />
          <pointLight position={[5, 6, 5]} intensity={1.4} color="#F4E0A6" />
          <pointLight position={[-5, -4, 3]} intensity={0.7} color="#FF6FAE" />
          <StudiosIcosahedron />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.32),rgba(5,5,5,.72)_72%,#050505)]" />
    </div>
  );
}
