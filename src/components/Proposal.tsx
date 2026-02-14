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
    "STOP IT! NO! 😭",
    "JUST CLICK YES! 😤",
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
        const btnWidth = 100;
        const btnHeight = 40;

        // Force a wider range for random movement
        const rangeX = container.width - btnWidth - 40;
        const rangeY = (container.height / 2) - btnHeight - 40;

        const newX = (Math.random() * rangeX) - (rangeX / 2);
        const newY = (Math.random() * rangeY) - (rangeY / 4); // Keep it mostly below/around the yes button

        setNoButtonPos({ x: newX, y: newY });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center relative overflow-visible" ref={containerRef}>
            <AnimatePresence mode="wait">
                {!accepted ? (
                    <motion.div
                        key="proposal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="glass-card p-8 md:p-16 w-full border-2 border-primary/30 shadow-[0_0_50px_rgba(255,45,85,0.1)] overflow-visible min-h-[500px] flex flex-col items-center justify-center"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif font-black mb-12 text-foreground leading-tight">
                            Will you be my Valentine, <br />
                            <span className="text-primary italic">Damilola?</span>
                        </h2>

                        <div className="relative w-full h-40 flex items-center justify-center">
                            {/* YES BUTTON */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleYes}
                                style={{
                                    scale: Math.min(2, 1 + (noClickCount * 0.2)),
                                    zIndex: 10
                                }}
                                className="bg-primary text-white px-10 py-5 rounded-full text-2xl font-black shadow-[0_15px_40px_rgba(255,45,85,0.4)] transition-all duration-300 ring-2 ring-white/20 absolute"
                            >
                                YES! ❤️
                            </motion.button>

                            {/* NO BUTTON - FIXED FOR MOBILE */}
                            <motion.button
                                animate={{
                                    x: noButtonPos.x,
                                    y: noButtonPos.y + 120, // Offset it below the Yes button initially
                                    scale: Math.max(0.4, 1 - (noClickCount * 0.05)),
                                    opacity: 1
                                }}
                                whileHover={() => moveNoButton()}
                                onMouseEnter={moveNoButton}
                                onTouchStart={(e) => {
                                    e.preventDefault();
                                    moveNoButton();
                                }}
                                className="bg-white/10 text-foreground/40 px-6 py-2 rounded-full text-lg font-bold border border-white/20 absolute z-50 pointer-events-auto backdrop-blur-md"
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
                        <h2 className="text-5xl md:text-7xl font-serif font-black mb-8 text-primary uppercase">
                            YESS! ❤️
                        </h2>
                        <p className="text-2xl md:text-4xl text-foreground font-bold leading-tight">
                            I Knew You&apos;d Say Yes, Damilola!
                        </p>
                        <p className="mt-8 text-xl md:text-2xl text-accent font-serif italic">
                            You&apos;re officially mine this Valentine&apos;s... 🫦
                        </p>
                        <div className="mt-14 flex justify-center gap-4 flex-wrap">
                            {[...Array(5)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    animate={{
                                        y: [0, -30, 0],
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
