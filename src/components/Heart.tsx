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
      const isMobile = state.size.width < 768;

      // Responsive Heartbeat pulse
      const pulse = 1 + Math.sin(time * 2.5) * 0.08;
      const baseScale = isMobile ? 0.8 : 1.2; // Reduced size for mobile
      meshRef.current.scale.lerp(new THREE.Vector3(baseScale * pulse, baseScale * pulse, baseScale * pulse), 0.1);

      // Interaction & Gentler Rotation
      const x = state.pointer.x * 0.4;
      const y = -state.pointer.y * 0.2;

      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x + time * 0.25, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y, 0.05);

      meshRef.current.position.y = Math.sin(time * 1.5) * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Container for the heart and text so they move together */}
      <group position={[0, 1.2, 0]}>
        <mesh rotation={[Math.PI, 0, 0]}>
          <extrudeGeometry args={[heartShape, extrudeSettings]} />
          <meshStandardMaterial
            color="#ff2d55"
            metalness={1}
            roughness={0.05}
            emissive="#ff0040"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Front Engraving - Pos Y is local to heart group now */}
        <Text
          position={[0, -1, 0.38]} // Adjusted for shape origin
          fontSize={0.28}
          color="#000000" // Pure Black
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#e2b13c" // Gold outline
          fontWeight="black"
        >
          DAMMY
        </Text>

        {/* Back Engravings - MAX VISIBILITY */}
        <group rotation={[0, Math.PI, 0]} position={[0, -1, -0.38]}>
          <Text
            position={[0, 0.15, 0]}
            fontSize={0.24}
            color="#000000" // Deep Black
            anchorX="center"
            anchorY="middle"
            fontWeight="black"
            outlineWidth={0.03}
            outlineColor="#e2b13c" // Gold
          >
            My Everything
          </Text>
          <Text
            position={[0, -0.15, 0]}
            fontSize={0.18}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            fontWeight="black"
            outlineWidth={0.02}
            outlineColor="#ffffff"
          >
            Forever Esther ❤️
          </Text>
        </group>
      </group>
    </group>
  );
}
