import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bookmark, Trash2 } from 'lucide-react';

const SavedView = ({ onBack, savedItems, onRemove }) => {
    return (
        <div className="min-h-screen bg-deep-space relative overflow-hidden flex flex-col">
            {/* Background */}
            <div className="fixed inset-0 bg-galaxy-gradient opacity-30 pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 p-6 flex items-center gap-4 border-b border-white/5 backdrop-blur-md">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-purple-300" />
                </button>
                <h1 className="text-xl font-cinzel text-white tracking-widest">AKASHA // PERSONAL ARCHIVES</h1>
            </header>

            {/* Main Grid */}
            <main className="flex-1 overflow-y-auto p-4 md:p-12 relative z-10">
                <div className="max-w-4xl mx-auto space-y-6">
                    {savedItems.length > 0 ? (
                        <AnimatePresence>
                            {savedItems.map((item, index) => (
                                <motion.div
                                    key={`${item.source}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group relative"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-purple-400 font-mono text-xs mb-1">{item.source}</span>
                                            <span className="text-quantum-cyan font-mono text-xs">{item.date}</span>
                                        </div>
                                        <button
                                            onClick={() => onRemove(item)}
                                            className="p-2 hover:bg-red-500/20 rounded-full text-gray-500 hover:text-red-400 transition-colors"
                                            title="Remove from Archives"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-gray-200 font-light leading-relaxed whitespace-pre-wrap">
                                        {item.content}
                                    </p>
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
