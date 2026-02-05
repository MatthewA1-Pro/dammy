'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Heart() {
  const meshRef = useRef<THREE.Mesh>(null);

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
    shape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
    shape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
    shape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
    return shape;
  }, []);

  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelSegments: 20,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  useFrame((state) => {
    if (meshRef.current) {
      // Beating effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
      
      // Gentle rotation based on mouse
      const { x, y } = state.pointer;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.5 + Math.PI, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI, 0, 0]}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshStandardMaterial color="#e63946" roughness={0.3} metalness={0.8} />
    </mesh>
  );
}
