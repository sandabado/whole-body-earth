"use client";

import { Edges, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { PILLARS, pillarForPath } from "@/lib/pillars";

type SolidName = "tetrahedron" | "octahedron" | "icosahedron" | "cube" | "dodecahedron";

type AtlasTheme = {
  color: string;
  solid: SolidName;
};

const CONSTELLATION_THEME: AtlasTheme = { color: "#b7b7c4", solid: "dodecahedron" };

function themeFor(pathname: string): AtlasTheme {
  const pillar = pillarForPath(pathname);
  if (pillar) return { color: PILLARS[pillar].color, solid: PILLARS[pillar].solid.toLowerCase() as SolidName };
  if (pathname === "/calendar") return { color: PILLARS.press.color, solid: "octahedron" };
  return CONSTELLATION_THEME;
}

function geometryFor(solid: SolidName) {
  // All detail levels remain zero so each object retains its exact Platonic geometry.
  if (solid === "tetrahedron") return new THREE.TetrahedronGeometry(1, 0);
  if (solid === "octahedron") return new THREE.OctahedronGeometry(1, 0);
  if (solid === "icosahedron") return new THREE.IcosahedronGeometry(1, 0);
  if (solid === "cube") return new THREE.BoxGeometry(1.35, 1.35, 1.35, 1, 1, 1);
  return new THREE.DodecahedronGeometry(1);
}

export function StarDust({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    let seed = 71923;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const positions = new Float32Array(1100 * 3);

    for (let index = 0; index < 1100; index += 1) {
      const radius = 8 + Math.pow(random(), 0.72) * 34;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(phi);
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return starGeometry;
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.006;
  });

  return <points ref={ref} geometry={geometry}>
    <pointsMaterial color={color} size={0.035} sizeAttenuation transparent opacity={0.52} depthWrite={false} />
  </points>;
}

export function AtlasConstruction({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.012;
    ref.current.rotation.y -= delta * 0.018;
  });

  return <group ref={ref} position={[2.55, 0.2, -0.35]} rotation={[0.48, -0.32, 0.2]}>
    <mesh rotation={[0.75, 0.22, 0]}>
      <torusGeometry args={[2.7, 0.008, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} depthWrite={false} />
    </mesh>
    <mesh rotation={[-0.52, 1.04, 0.35]}>
      <torusGeometry args={[2.2, 0.006, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} depthWrite={false} />
    </mesh>
    <mesh rotation={[1.42, 0.12, -0.68]}>
      <torusGeometry args={[1.64, 0.005, 8, 120]} />
      <meshBasicMaterial color="#f5f3f0" transparent opacity={0.12} depthWrite={false} />
    </mesh>
  </group>;
}

function AtlasSolid({ color, solid }: AtlasTheme) {
  const ref = useRef<THREE.Group>(null);
  const geometry = useMemo(() => geometryFor(solid), [solid]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.045;
    ref.current.rotation.y += delta * 0.085;
  });

  return <Float speed={0.75} floatIntensity={0.2} rotationIntensity={0.1}>
    <group ref={ref} position={[2.55, 0.2, 0]} scale={3.05} rotation={[0.16, -0.42, 0.1]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.38} transparent opacity={0.14} metalness={0.56} roughness={0.24} />
        <Edges color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  </Float>;
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.slice(1);
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export default function PillarAtlasLayer() {
  const pathname = usePathname();
  const theme = themeFor(pathname);

  if (pathname === "/") return null;

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
    <Canvas camera={{ position: [0, 0, 8], fov: 48 }} dpr={[1, 1.25]}>
      <StarDust color={theme.color} />
      <ambientLight intensity={0.34} />
      <pointLight position={[4.5, 5, 4]} intensity={1.1} color="#f5f3f0" />
      <pointLight position={[-4, -2, 3]} intensity={0.45} color={theme.color} />
      <AtlasConstruction color={theme.color} />
      <AtlasSolid {...theme} />
    </Canvas>
    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 76% 43%, ${hexToRgba(theme.color, 0.2)} 0%, transparent 34%), linear-gradient(90deg, rgba(5,5,5,.96) 0%, rgba(5,5,5,.82) 48%, rgba(5,5,5,.48) 100%)` }} />
  </div>;
}
