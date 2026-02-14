'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const noTexts = [
    "NO 💔",
    "Are you sure? 🥺",
    "Dammy please... 😭",
    "Don't do this to me! 💔",
    "Esther, think about it! 🙏",
    "Error: No not found 🚫",
    "Try clicking Yes? 😉",
    "You're breaking my heart! ❤️‍🩹",
    "I'll be very sad... 😔",
    "You're making me cry... 😭",
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
            colors: ['#ff2d55', '#ffb3c1', '#ffffff', '#e2b13c']
        });
    };

    const moveNoButton = () => {
        if (!containerRef.current) return;

        setNoClickCount(prev => prev + 1);

        const container = containerRef.current.getBoundingClientRect();
        const padding = 30;
        const btnWidth = 120;
        const btnHeight = 50;

        // Ensure the button stays within the visible card bounds
        const rangeX = container.width - btnWidth - (padding * 2);
        const rangeY = container.height - btnHeight - (padding * 2);

        const newX = (Math.random() * rangeX) - (rangeX / 2);
        const newY = (Math.random() * rangeY) - (rangeY / 2);

        setNoButtonPos({ x: newX, y: newY });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-16 min-h-[600px] flex flex-col items-center justify-center text-center relative" ref={containerRef}>
            <AnimatePresence mode="wait">
                {!accepted ? (
                    <motion.div
                        key="proposal"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glass-card p-10 md:p-16 w-full border-2 border-primary/30 shadow-[0_0_50px_rgba(255,45,85,0.15)]"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif font-black mb-10 text-foreground leading-tight">
                            Will you be my Valentine, <br />
                            <span className="text-primary italic">Damilola?</span>
                        </h2>

                        <div className="flex flex-col md:flex-row gap-10 justify-center items-center mt-12 relative min-h-[200px] w-full">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleYes}
                                style={{
                                    scale: Math.min(1.8, 1 + (noClickCount * 0.15)), // Cap scale to 1.8 for mobile reach
                                    zIndex: 20
                                }}
                                className="bg-primary text-white px-14 py-6 rounded-full text-2xl font-black shadow-[0_15px_40px_rgba(255,45,85,0.4)] hover:brightness-110 transition-all duration-300 ring-2 ring-white/20"
                            >
                                YES! ❤️
                            </motion.button>

                            <motion.button
                                animate={{
                                    x: noButtonPos.x,
                                    y: noButtonPos.y,
                                    scale: Math.max(0.4, 1 - (noClickCount * 0.08))
                                }}
                                onMouseEnter={moveNoButton}
                                onTouchStart={(e) => {
                                    e.preventDefault();
                                    moveNoButton();
                                }}
                                className="bg-white/5 text-foreground/40 px-8 py-3 rounded-full text-lg font-bold border border-white/10 absolute md:static pointer-events-auto backdrop-blur-sm"
                            >
                                {noTexts[Math.min(noClickCount, noTexts.length - 1)]}
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="accepted"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-12 md:p-20 w-full border-4 border-primary shadow-[0_0_100px_rgba(255,45,85,0.3)]"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.4, 1],
                                rotate: [0, 15, -15, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-9xl mb-10"
                        >
                            ❤️‍🔥
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-serif font-black mb-8 text-primary">
                            YESSS!
                        </h2>
                        <p className="text-2xl md:text-4xl text-foreground font-bold leading-tight">
                            Damilola, you just made me the luckiest man alive.
                        </p>
                        <p className="mt-8 text-xl md:text-2xl text-accent font-serif italic">
                            Everything is ready for you... 🫦
                        </p>
                        <div className="mt-14 flex justify-center gap-6">
                            {[...Array(5)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    animate={{
                                        y: [0, -40, 0],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1 + (i * 0.2),
                                        delay: i * 0.1
                                    }}
                                    className="text-5xl"
                                >
                                    🌹
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
