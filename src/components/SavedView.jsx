import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bookmark, Trash2, Grid, List } from 'lucide-react';
import { masterImages } from '../data/image_map';

const SavedView = ({ onBack, savedExcerpts, onToggleSave, onOpenArticle }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

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
            <header className="relative z-10 p-4 md:p-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-black/20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Return to Holocron">
                        <ArrowLeft className="w-5 h-5 text-purple-300" />
                    </button>
                    <h1 className="text-lg md:text-xl font-cinzel text-white tracking-widest">AKASHA // PERSONAL ARCHIVES</h1>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                        aria-label="List View"
                    >
                        <List className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                        aria-label="Grid View"
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                </div>
            </header>


            {/* Main Grid */}
            <main className="flex-1 overflow-y-auto p-4 md:p-12 relative z-10">
                <div className={`max-w-7xl mx-auto pb-10 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6 max-w-4xl'}`}>
                    {savedExcerpts && savedExcerpts.length > 0 ? (
                        <AnimatePresence>
                            {savedExcerpts.map((item, index) => (
                                <motion.div
                                    key={`${item.sphereTitle || item.source}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => onOpenArticle && onOpenArticle(item)}
                                    className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group relative cursor-pointer h-full flex flex-col"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="text-purple-400 font-mono text-xs mb-1 truncate">{item.sphereTitle || item.source || 'Unknown'}</span>
                                            <span className="text-quantum-cyan font-mono text-xs">{item.date || 'No Date'}</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onToggleSave && onToggleSave(item);
                                            }}
                                            className="p-2 hover:bg-red-500/20 rounded-full text-yellow-400 hover:text-red-400 transition-colors flex-shrink-0"
                                            title="Remove from Archives"
                                            aria-label="Remove from Archives"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className={`text-gray-200 font-light leading-relaxed whitespace-pre-wrap group-hover:text-white transition-colors flex-1 ${viewMode === 'grid' ? 'line-clamp-6' : 'line-clamp-4'}`}>
                                        {item.content}
                                    </p>
                                    <div className="mt-3 pt-3 border-t border-white/5 text-xs font-bold text-cyan-500/70 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Read Full Transmission →
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <div className="text-center py-20 col-span-full">
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
