import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Bookmark, Share2, X } from 'lucide-react';
import { masterImages } from '../data/image_map';

const ArticleView = ({ excerpt, onClose, onToggleSave, isSaved }) => {
    const [readTime, setReadTime] = useState(0);
    const [bgImage, setBgImage] = useState(null);

    useEffect(() => {
        if (excerpt) {
            const words = excerpt.content.trim().split(/\s+/).length;
            const time = Math.ceil(words / 200); // 200 words per minute
            setReadTime(time);

            // Determine relevant background image based on keywords
            const content = excerpt.content.toLowerCase();
            if (content.includes('solar flash') || content.includes('pulse') || content.includes('sun')) {
                setBgImage(masterImages['solar-flash']);
            } else if (content.includes('dna') || content.includes('genetic') || content.includes('molecule')) {
                setBgImage(masterImages['dna-activation']);
            } else if (content.includes('pyramid') || content.includes('giza') || content.includes('anchor')) {
                setBgImage(masterImages['great-pyramid']);
            } else if (content.includes('agartha') || content.includes('telos') || content.includes('inner earth')) {
                setBgImage(masterImages['agartha']);
            } else {
                setBgImage(null);
            }
        }
    }, [excerpt]);

    if (!excerpt) return null;

    // Determine theme based on sphere (simplified logic for now, can be expanded)
    const sphereColors = {
        'universal-metaphysics-the-law-of-one': 'from-yellow-400 to-orange-500',
        'galactic-history-exopolitics': 'from-blue-400 to-indigo-600',
        'ascension-mechanics': 'from-purple-400 to-pink-500',
        'planetary-transition': 'from-green-400 to-teal-500',
        'lightworkers-handbook': 'from-red-400 to-rose-500'
    };

    const gradient = sphereColors[excerpt.sphereId] || 'from-purple-400 to-pink-500';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-deep-space flex justify-center overflow-hidden"
        >
            {/* Dynamic Background */}
            <div className={`fixed inset-0 bg-gradient-to-br ${gradient} opacity-5 pointer-events-none`} />

            {/* Background Image Underlay (subtle) */}
            {bgImage && (
                <div
                    className="fixed inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            )}

            <div className="fixed inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />

            {/* Progress Bar (at top) */}
            <motion.div
                className={`fixed top-0 left-0 h-1 bg-gradient-to-r ${gradient} z-50`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: "circOut" }}
            />

            <div className="relative w-full max-w-3xl h-full flex flex-col bg-black/40 backdrop-blur-xl border-x border-white/5 shadow-2xl">

                {/* Navigation / Header */}
                <header className="p-6 flex justify-between items-center bg-black/20 backdrop-blur-md sticky top-0 z-40 border-b border-white/5">
                    <button
                        onClick={onClose}
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-xs uppercase tracking-widest hidden sm:inline">Return to Archives</span>
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onToggleSave(excerpt)}
                            className={`p-2 rounded-full border transition-all ${isSaved(excerpt) ? 'border-pink-500/50 bg-pink-500/20 text-pink-200' : 'border-white/10 hover:bg-white/10 text-gray-400 hover:text-white'}`}
                            title={isSaved(excerpt) ? "Remove Bookmark" : "Bookmark Transmission"}
                        >
                            <Bookmark className={`w-4 h-4 ${isSaved(excerpt) ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">

                    {/* Meta Data */}
                    <div className="flex flex-wrap gap-4 items-center mb-6 md:mb-8 text-xs font-mono tracking-wider text-gray-500 border-b border-white/5 pb-6 md:pb-8">
                        <span className={`px-2 py-1 rounded bg-gradient-to-r ${gradient} bg-opacity-10 text-white bg-clip-text text-transparent bg-clip-text font-bold uppercase`}>
                            {excerpt.sphereTitle}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {excerpt.formattedDate || excerpt.date}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readTime} min read
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-5xl font-cinzel text-white leading-tight mb-8 md:mb-12 drop-shadow-lg">
                        Transmission regarding <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                            {excerpt.content.split(' ').slice(0, 5).join(' ')}...
                        </span>
                    </h1>

                    {/* Body Text */}
                    <article className="prose prose-invert prose-lg md:prose-xl font-serif text-gray-300 leading-relaxed max-w-none">
                        {excerpt.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                                <p key={index} className="mb-6 opacity-90 hover:opacity-100 transition-opacity">
                                    {paragraph}
                                </p>
                            )
                        ))}
                    </article>

                    {/* Footer / Signature */}
                    <div className="mt-20 pt-8 border-t border-white/10 text-center">
                        <div className="text-2xl opacity-50 font-cinzel mb-2">✦ ✦ ✦</div>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">End of Transmission</p>
                    </div>

                </div>

            </div>
        </motion.div>
    );
};

export default ArticleView;
