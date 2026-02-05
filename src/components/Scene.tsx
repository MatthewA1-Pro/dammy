'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Float } from '@react-three/drei';
import { Heart } from './Heart';
import { Suspense } from 'react';

export default function Scene() {
    return (
        <div className="w-full h-[50vh] md:h-[60vh] relative">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                <Suspense fallback={null}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Heart />
                    </Float>
                    <Environment preset="sunset" />
                </Suspense>

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}
