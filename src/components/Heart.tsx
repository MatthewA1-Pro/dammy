'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function Heart() {
  const meshRef = useRef<THREE.Group>(null);
  const heartMeshRef = useRef<THREE.Mesh>(null);

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Centered classic heart shape coordinates
    shape.moveTo(0, 0.5);
    shape.bezierCurveTo(0, 0.5, -0.05, 0, -0.5, 0);
    shape.bezierCurveTo(-1.1, 0, -1.1, 0.7, -1.1, 0.7);
    shape.bezierCurveTo(-1.1, 1.1, -0.8, 1.54, 0, 1.9);
    shape.bezierCurveTo(0.8, 1.54, 1.1, 1.1, 1.1, 0.7);
    shape.bezierCurveTo(1.1, 0.7, 1.1, 0, 0.5, 0);
    shape.bezierCurveTo(0.2, 0, 0, 0.5, 0, 0.5);
    return shape;
  }, []);

  const extrudeSettings = {
    depth: 0.5, // Slightly deeper for better presence
    bevelEnabled: true,
    bevelSegments: 24,
    steps: 2,
    bevelSize: 0.12,
    bevelThickness: 0.12,
  };

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      // Heartbeat pulse - slower, more rhythmic
      const pulse = 1 + Math.sin(time * 2.5) * 0.08;
      meshRef.current.scale.lerp(new THREE.Vector3(1.2 * pulse, 1.2 * pulse, 1.2 * pulse), 0.1);

      // Interaction & Gentler Rotation
      const x = state.pointer.x * 0.4;
      const y = -state.pointer.y * 0.2;

      // Reduced rotation speed to 0.2 (was 0.8)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x + time * 0.25, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y, 0.05);

      meshRef.current.position.y = Math.sin(time * 1.5) * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Centered mesh */}
      <mesh rotation={[Math.PI, 0, 0]} position={[0, 1.2, 0]}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#ff2d55"
          metalness={1}
          roughness={0.05}
          emissive="#ff0040"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Front Engraving */}
      <Text
        position={[0, 0.2, 0.38]} // Deeply placed on the surface
        fontSize={0.28}
        color="#e2b13c" // Champagne Gold
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#4a0404"
        fontWeight="bold"
      >
        DAMMY
      </Text>

      {/* Back Engravings - Now with better visibility */}
      <group rotation={[0, Math.PI, 0]} position={[0, 0.2, -0.38]}>
        <Text
          position={[0, 0.15, 0]}
          fontSize={0.2} // Larger text
          color="#e2b13c"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          outlineWidth={0.01}
          outlineColor="#4a0404"
        >
          My Everything
        </Text>
        <Text
          position={[0, -0.15, 0]} // Better spacing
          fontSize={0.16}
          color="#ffb3c1"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          outlineWidth={0.008}
          outlineColor="#4a0404"
        >
          My Forever Esther ❤️
        </Text>
      </group>
    </group>
  );
}
