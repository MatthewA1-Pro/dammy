'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Float, Center } from '@react-three/drei';
import { Heart } from './Heart';
import { Suspense } from 'react';

export default function Scene() {
    return (
        <div className="w-full h-[60vh] md:h-[75vh] relative flex items-center justify-center">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                <directionalLight position={[0, 5, 5]} intensity={1.5} />

                <Suspense fallback={null}>
                    <Center>
                        <Heart />
                    </Center>
                    <Environment preset="sunset" />
                </Suspense>

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}
