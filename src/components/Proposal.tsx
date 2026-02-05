'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Proposal() {
    const [accepted, setAccepted] = useState(false);
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleYes = () => {
        setAccepted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#e63946', '#ffb6c1', '#ff4d6d']
        });
    };

    const moveNoButton = () => {
        if (!containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const btnWidth = 100;
        const btnHeight = 50;

        const newX = Math.random() * (container.width - btnWidth) - (container.width / 2 - btnWidth / 2);
        const newY = Math.random() * (container.height - btnHeight) - (container.height / 2 - btnHeight / 2);

        setNoButtonPos({ x: newX, y: newY });
    };

    return (
        <div className="w-full max-w-lg mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center relative overflow-hidden" ref={containerRef}>
            <AnimatePresence mode="wait">
                {!accepted ? (
                    <motion.div
                        key="proposal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="glass-card p-12 rounded-3xl w-full"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">
                            Will you be my Valentine?
                        </h2>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12 relative min-h-[100px] w-full">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleYes}
                                className="bg-primary text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-accent transition-colors z-10"
                            >
                                YES ❤️
                            </motion.button>

                            <motion.button
                                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                                onMouseEnter={moveNoButton}
                                onTouchStart={moveNoButton}
                                className="bg-gray-200 text-gray-600 px-12 py-4 rounded-full text-xl font-bold shadow-md md:static absolute"
                            >
                                NO 💔
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="accepted"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-12 rounded-3xl w-full "
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-6xl mb-6"
                        >
                            🎉
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                            Congratulations!
                        </h2>
                        <p className="text-xl md:text-2xl text-foreground">
                            JOY accepted to be Senior Dev’s Valentine ❤️
                        </p>
                        <div className="mt-8 flex justify-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                    className="text-3xl"
                                >
                                    ❤️
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
