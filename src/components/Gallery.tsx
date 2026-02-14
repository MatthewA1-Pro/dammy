'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
    { src: '/images/valentine_1.jpg', alt: 'Damilola 1' },
    { src: '/images/valentine_2.jpg', alt: 'Damilola 2' },
    { src: '/images/valentine_3.jpg', alt: 'Damilola 3' },
    { src: '/images/valentine_4.jpg', alt: 'Damilola 4' },
    { src: '/images/valentine_5.jpg', alt: 'Damilola 5' },
];

export default function Gallery() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change image every 4 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center">
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-serif font-bold text-center mb-12 text-primary drop-shadow-sm"
            >
                Every Side of You is My Favorite ❤️
            </motion.h2>

            {/* Tight container that hugs the image */}
            <div className="relative w-fit max-w-full rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(201,24,74,0.2)] border-[6px] border-white bg-[#1a1a1a]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Use Image with responsive sizing and no fixed layout to let it define the box */}
                        <img
                            src={images[index].src}
                            alt={images[index].alt}
                            className="max-h-[80vh] w-auto block object-contain"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Minimal Indicator Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10 px-5 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/20">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-primary' : 'w-2.5 bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>

            <p className="text-center mt-8 text-foreground/70 font-medium italic text-lg md:text-xl">
                &ldquo;No filters needed, you are naturally stunning...&rdquo;
            </p>
        </div>
    );
}
