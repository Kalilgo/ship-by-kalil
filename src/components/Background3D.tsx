import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { TorusKnot, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

function SceneSetup() {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = null;
  }, [scene]);

  return null;
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!prefersReduced.current) {
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.rotation.y += delta * 0.08;
    }

    const tx = state.pointer.x * 0.15;
    const ty = -state.pointer.y * 0.1;
    targetRef.current.x += (tx - targetRef.current.x) * 0.03;
    targetRef.current.y += (ty - targetRef.current.y) * 0.03;

    groupRef.current.position.x = targetRef.current.x;
    groupRef.current.position.y = targetRef.current.y;
  });

  return (
    <group ref={groupRef}>
      <TorusKnot args={[1.8, 0.45, 100, 12]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#06B6D4"
          wireframe
          transparent
          opacity={0.08}
        />
      </TorusKnot>

      <Icosahedron args={[1.2, 0]} position={[3.2, -1.5, -2]}>
        <meshPhysicalMaterial
          color="#2563EB"
          transparent
          opacity={0.06}
          roughness={0.5}
          metalness={0.1}
        />
      </Icosahedron>

      <Octahedron args={[0.8, 0]} position={[-2.8, -2, 1.5]}>
        <meshPhysicalMaterial
          color="#06B6D4"
          wireframe
          transparent
          opacity={0.05}
        />
      </Octahedron>
    </group>
  );
}

function Scene() {
  return (
    <>
      <SceneSetup />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.2} color="#06B6D4" />
      <pointLight position={[-10, -10, -10]} intensity={0.15} color="#2563EB" />
      <FloatingShapes />
    </>
  );
}

export default function Background3D() {
  const [mounted, setMounted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (window.matchMedia('(pointer: coarse)').matches) {
      setDisabled(true);
    }
  }, []);

  if (!mounted || disabled) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
