import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bookmark, Trash2 } from 'lucide-react';
import { masterImages } from '../data/image_map';

const SavedView = ({ onBack, savedExcerpts, onToggleSave, onOpenArticle }) => {
    return (
        <div className="min-h-screen bg-deep-space relative overflow-y-auto custom-scrollbar flex flex-col">
            {/* Background Image Underlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url(${masterImages.portal})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="fixed inset-0 bg-galaxy-gradient opacity-20 pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 p-4 md:p-6 flex items-center gap-4 border-b border-white/5 backdrop-blur-md bg-black/20">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Return to Holocron">
                    <ArrowLeft className="w-5 h-5 text-purple-300" />
                </button>
                <h1 className="text-lg md:text-xl font-cinzel text-white tracking-widest">AKASHA // PERSONAL ARCHIVES</h1>
            </header>

            {/* Main Grid */}
            <main className="flex-1 overflow-y-auto p-4 md:p-12 relative z-10">
                <div className="max-w-4xl mx-auto space-y-6 pb-10">
                    {savedExcerpts && savedExcerpts.length > 0 ? (
                        <AnimatePresence>
                            {savedExcerpts.map((item, index) => (
                                <motion.div
                                    key={`${item.sphereTitle || item.source}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onClick={() => onOpenArticle && onOpenArticle(item)}
                                    className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group relative cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-purple-400 font-mono text-xs mb-1">{item.sphereTitle || item.source || 'Unknown'}</span>
                                            <span className="text-quantum-cyan font-mono text-xs">{item.date || 'No Date'}</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onToggleSave && onToggleSave(item);
                                            }}
                                            className="p-2 hover:bg-red-500/20 rounded-full text-yellow-400 hover:text-red-400 transition-colors"
                                            title="Remove from Archives"
                                            aria-label="Remove from Archives"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-gray-200 font-light leading-relaxed whitespace-pre-wrap line-clamp-4 group-hover:text-white transition-colors">
                                        {item.content}
                                    </p>
                                    <div className="mt-3 text-xs font-bold text-cyan-500/70 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Read Full Transmission
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <div className="text-center py-20">
                            <Bookmark className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500 italic font-light">Your personal archive is empty.</p>
                            <p className="text-gray-600 text-sm mt-2">Save transmissions using the bookmark icon.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SavedView;
