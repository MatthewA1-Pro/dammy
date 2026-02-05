'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
    { src: '/images/joy_1.jpg', alt: 'Joy 1' },
    { src: '/images/joy_2.jpg', alt: 'Joy 2' },
    { src: '/images/joy_3.jpg', alt: 'Joy 3' },
];

export default function Gallery() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-16">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
            >
                Capturing Your Beauty
            </motion.h2>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-3 gap-6">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Mobile Swipe Carousel */}
            <div className="md:hidden flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        className="flex-shrink-0 w-4/5 aspect-[3/4] relative rounded-2xl overflow-hidden shadow-xl snap-center"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
