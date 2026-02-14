import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles } from 'lucide-react';
import { masterImages } from '../data/image_map';

const PortalView = ({ onEnter }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [glowIntensity, setGlowIntensity] = useState(0);

    useEffect(() => {
        // Pulsing glow effect
        const interval = setInterval(() => {
            setGlowIntensity(prev => (prev + 0.05) % 1);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const glowOpacity = Math.sin(glowIntensity * Math.PI * 2) * 0.3 + 0.5;

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative font-sans">
            {/* Animated Background Layers */}
            <div className="absolute inset-0">
                {/* Background Image Underlay */}
                <div
                    className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url(${masterImages.portal})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Deep space layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-purple-950/80 to-black opacity-90" />

                {/* Rotating nebula */}
                <motion.div
                    className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent"
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                />

                {/* Particle field effect - optimized to 20 particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Central Portal */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Sacred Geometry Portal Ring */}
                <motion.div
                    className="relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                >
                    {/* Outer ring */}
                    <div
                        className="w-80 h-80 rounded-full border-2 border-cyan-500/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                            boxShadow: `0 0 ${40 * glowOpacity}px rgba(34, 211, 238, ${0.5 * glowOpacity})`,
                        }}
                    />

                    {/* Middle ring */}
                    <motion.div
                        className="w-64 h-64 rounded-full border-2 border-purple-500/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                        style={{
                            boxShadow: `0 0 ${30 * glowOpacity}px rgba(168, 85, 247, ${0.4 * glowOpacity})`,
                        }}
                    />

                    {/* Inner core */}
                    <div
                        className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-xl border border-white/10"
                        style={{
                            boxShadow: `
                inset 0 0 ${60 * glowOpacity}px rgba(34, 211, 238, ${0.3 * glowOpacity}),
                0 0 ${80 * glowOpacity}px rgba(168, 85, 247, ${0.4 * glowOpacity})
              `,
                        }}
                    />
                </motion.div>

                {/* Enter Button */}
                <motion.button
                    onClick={onEnter}
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                    className="relative z-20 mt-8 px-12 py-5 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 backdrop-blur-xl overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        boxShadow: `0 0 ${30 * glowOpacity}px rgba(168, 85, 247, ${isHovering ? 0.6 : 0.3})`,
                    }}
                >
                    {/* Shine effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                            x: ['-200%', '200%']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    <span className="relative flex items-center gap-3 font-cinzel text-xl text-white tracking-[0.3em] uppercase">
                        <Layers className="w-5 h-5" />
                        Enter Akasha
                        <Sparkles className="w-5 h-5" />
                    </span>
                </motion.button>

                {/* Title and Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-16 text-center"
                >
                    <h1 className="text-6xl md:text-8xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 tracking-wider">
                        AKASHA
                    </h1>
                    <p className="text-sm md:text-base font-light text-gray-400 tracking-[0.5em] uppercase">
                        The Galactic Interface
                    </p>
                    <motion.p
                        className="mt-6 text-xs text-gray-600 font-mono max-w-md mx-auto leading-relaxed"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        "The Records of All That Is, Was, and Ever Shall Be"
                    </motion.p>
                </motion.div>
            </div>

            {/* Ambient Elements */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8 text-xs text-gray-700 font-mono tracking-widest">
                <motion.span
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    FREQUENCY: 528Hz
                </motion.span>
                <span>|</span>
                <motion.span
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                    DENSITY: Transitioning
                </motion.span>
                <span>|</span>
                <motion.span
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                    CONNECTION: Established
                </motion.span>
            </div>
        </div>
    );
};

export default PortalView;
