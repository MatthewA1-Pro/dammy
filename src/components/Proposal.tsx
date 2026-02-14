'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const noTexts = [
    "NO 💔",
    "Are you sure? 🥺",
    "Pookie please... 😭",
    "Don't do this to me! 💔",
    "Esther, think about it! 🙏",
    "Error: No not found 🚫",
    "Try clicking Yes? 😉",
    "You're breaking my heart! ❤️‍🩹",
    "I'll be very sad... 😔",
];

export default function Proposal() {
    const [accepted, setAccepted] = useState(false);
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [noClickCount, setNoClickCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleYes = () => {
        setAccepted(true);
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ff69b4', '#ffffff', '#ff1493']
        });
    };

    const moveNoButton = () => {
        if (!containerRef.current) return;

        setNoClickCount(prev => prev + 1);

        const container = containerRef.current.getBoundingClientRect();
        const padding = 20;
        const btnWidth = 150;
        const btnHeight = 60;

        // Ensure the button stays within bounds but moves far enough
        const maxX = (container.width / 2) - btnWidth - padding;
        const maxY = (container.height / 2) - btnHeight - padding;

        const rangeX = container.width - btnWidth - (padding * 2);
        const rangeY = container.height - btnHeight - (padding * 2);

        const newX = (Math.random() * rangeX) - (rangeX / 2);
        const newY = (Math.random() * rangeY) - (rangeY / 2);

        setNoButtonPos({ x: newX, y: newY });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-20 min-h-[70vh] flex flex-col items-center justify-center text-center relative overflow-visible" ref={containerRef}>
            <AnimatePresence mode="wait">
                {!accepted ? (
                    <motion.div
                        key="proposal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="glass-card p-8 md:p-12 rounded-[3rem] w-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(255,182,193,0.3)]"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-primary leading-tight">
                            Will you be my Valentine, <span className="text-accent underline decoration-wavy">Damilola?</span>
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-12 relative min-h-[250px] w-full">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleYes}
                                style={{
                                    scale: 1 + (noClickCount * 0.15),
                                    zIndex: 20
                                }}
                                className="bg-primary text-white px-12 py-5 rounded-full text-2xl font-black shadow-[0_10px_30px_rgba(255,0,0,0.3)] hover:bg-accent transition-colors duration-300"
                            >
                                YES! ❤️
                            </motion.button>

                            <motion.button
                                animate={{
                                    x: noButtonPos.x,
                                    y: noButtonPos.y,
                                    scale: Math.max(0.5, 1 - (noClickCount * 0.05))
                                }}
                                onMouseEnter={moveNoButton}
                                onTouchStart={(e) => {
                                    e.preventDefault();
                                    moveNoButton();
                                }}
                                className="bg-gray-100 text-gray-500 px-10 py-4 rounded-full text-xl font-bold shadow-sm md:static absolute pointer-events-auto border border-gray-200"
                            >
                                {noTexts[Math.min(noClickCount, noTexts.length - 1)]}
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="accepted"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="glass-card p-12 rounded-[3rem] w-full bg-white/80 backdrop-blur-2xl border-4 border-primary/20 shadow-2xl"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-8xl mb-8"
                        >
                            💖
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-primary">
                            YAY! I KNEW IT!
                        </h2>
                        <p className="text-2xl md:text-3xl text-foreground font-semibold">
                            Damilola, you just made me the happiest man alive! ❤️
                        </p>
                        <p className="mt-4 text-xl text-primary/80 italic">
                            Get ready for the most romantic (and naughty) night of your life... 🫦
                        </p>
                        <div className="mt-12 flex justify-center gap-4">
                            {[...Array(7)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    animate={{
                                        y: [0, -30, 0],
                                        scale: [1, 1.2, 1],
                                        opacity: [0.7, 1, 0.7]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        delay: i * 0.2
                                    }}
                                    className="text-4xl"
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
