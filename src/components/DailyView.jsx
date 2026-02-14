import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, ArrowLeft, RefreshCw, Share2, Bookmark } from 'lucide-react';
import wisdomData from '../data/wisdom_data.json';

const DailyView = ({ onBack, onToggleSave, isSaved }) => {
    const [dailyWisdom, setDailyWisdom] = useState(null);

    useEffect(() => {
        // In a real app, this could be seeded by the date to remain consistent for 24 hours.
        // For now, we'll randomize it on mount.
        pickRandomWisdom();
    }, []);

    const pickRandomWisdom = () => {
        const allExcerpts = wisdomData.spheres.flatMap(s => s.excerpts);
        const random = allExcerpts[Math.floor(Math.random() * allExcerpts.length)];
        setDailyWisdom(random);
    };

    if (!dailyWisdom) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative p-6">

            {/* Header Controls */}
            <div className="absolute top-6 left-6 z-20">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-purple-300" />
                </button>
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-2xl relative z-10"
            >
                {/* Card Container */}
                <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.1)] relative overflow-hidden">

                    {/* Decorative Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

                    <div className="flex items-center gap-3 mb-6">
                        <Sun className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-yellow-100">Galactic Transmission</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-cinzel text-white leading-tight mb-8">
                        The Frequency of Now
                    </h1>

                    <div className="space-y-6">
                        <p className="text-lg md:text-xl font-light leading-relaxed text-purple-100 italic">
                            "{dailyWisdom.content}"
                        </p>

                        <div className="h-px w-20 bg-gradient-to-r from-purple-500 to-transparent"></div>

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs text-purple-400 font-mono mb-1">SOURCE</p>
                                <p className="text-sm font-medium text-white">{dailyWisdom.source}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-purple-400 font-mono mb-1">DATE</p>
                                <p className="text-sm font-mono text-quantum-cyan">{dailyWisdom.date}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-10 flex gap-4 justify-center">
                        <button
                            onClick={pickRandomWisdom}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-mono uppercase tracking-wider"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Tune Frequency
                        </button>
                        <button
                            onClick={() => onToggleSave(dailyWisdom)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all text-sm font-mono uppercase tracking-wider ${isSaved(dailyWisdom) ? 'bg-pink-500/20 border-pink-500/50 text-pink-200' : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'}`}
                        >
                            <Bookmark className={`w-4 h-4 ${isSaved(dailyWisdom) ? 'fill-pink-200' : ''}`} />
                            {isSaved(dailyWisdom) ? 'Saved' : 'Save'}
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 transition-all text-sm font-mono uppercase tracking-wider text-purple-200">
                            <Share2 className="w-4 h-4" />
                            Transmit
                        </button>
                    </div>

                </div>
            </motion.div>

            <div className="absolute bottom-10 text-center z-10">
                <p className="text-[10px] text-gray-500 font-mono tracking-widest">AKASHA // DAILY PROTOCOL</p>
            </div>
        </div>
    );
};

export default DailyView;
