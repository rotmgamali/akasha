import React from 'react';
import { motion } from 'framer-motion';

const StarfieldLoading = () => {
    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
            {/* Pulsing Star/Light in the center */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.7, 0.3],
                    boxShadow: [
                        "0 0 20px rgba(165, 180, 252, 0.2)",
                        "0 0 60px rgba(165, 180, 252, 0.5)",
                        "0 0 20px rgba(165, 180, 252, 0.2)"
                    ]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-16 h-16 rounded-full bg-indigo-200 blur-sm"
            />

            {/* Spinning Rings */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 border border-indigo-500/10 rounded-full"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-48 h-48 border border-purple-500/5 rounded-full"
            />

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 font-cinzel text-indigo-300 text-sm tracking-[0.3em] uppercase animate-pulse"
            >
                Synchronizing with Akasha...
            </motion.p>
        </div>
    );
};

export default StarfieldLoading;
