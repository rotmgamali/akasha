import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Filter, Database, MessageSquare, Sun, Bookmark, Star, ArrowLeft, Hexagon, X, ChevronRight, Activity } from 'lucide-react';
import wisdomData from '../data/wisdom_data.json';
import { sphereImages } from '../data/image_map';

const HolocronView = ({ onNavigate, onToggleSave, savedExcerpts, onOpenArticle }) => {
    const [selectedSphere, setSelectedSphere] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const spheres = [
        { id: 'universal-metaphysics-the-law-of-one', title: 'Universal Metaphysics', icon: 'Hexagon', color: 'text-purple-400', gradient: 'from-purple-500/20 to-blue-500/20', description: 'The fundamental laws of creation, density, and unity.' },
        { id: 'cosmic-cycles-earth-changes', title: 'Cosmic Cycles', icon: 'Circle', color: 'text-blue-400', gradient: 'from-blue-500/20 to-teal-500/20', description: 'Evolutionary timelines and planetary shifts.' },
        { id: 'galactic-history-exopolitics', title: 'Galactic History', icon: 'Star', color: 'text-amber-400', gradient: 'from-amber-500/20 to-red-500/20', description: 'The origins of humanity and star races.' },
        { id: 'ascension-mechanics', title: 'Ascension Mechanics', icon: 'Zap', color: 'text-cyan-400', gradient: 'from-cyan-500/20 to-purple-500/20', description: 'The process of shifting density and consciousness.' },
        { id: 'planetary-transition-current-events', title: 'Planetary Transition', icon: 'Activity', color: 'text-green-400', gradient: 'from-green-500/20 to-emerald-500/20', description: 'Navigating the current shift on Earth.' }
    ];

    // Filter Logic
    const filteredSpheres = spheres.map(sphere => {
        if (!searchQuery) return sphere;

        // Find excerpts that match the search query within this sphere
        const sphereData = wisdomData.spheres.find(s => s.id === sphere.id);
        if (!sphereData) return null;

        const matchingExcerpts = sphereData.excerpts.filter(excerpt =>
            excerpt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            excerpt.source.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (matchingExcerpts.length > 0) {
            return { ...sphere, excerpts: matchingExcerpts }; // Pass matching excerpts if needed
        }

        return null;
    }).filter(Boolean);

    const handleSphereClick = (sphere) => {
        // If we have search results, we might want to show them differently, 
        // but for now let's just use the standard flow or open the sphere
        // In a real app, we'd pass the filtered excerpts to the detail view
        // For this simple version, we'll just open the Article selector logic
        // But since we removed DetailModal, we need a way to browse the sphere.
        // Let's implement a simple "Sphere Browser" inline or just use the new ArticleView flow?
        // Actually, the previous `HolocronView` had a `DetailModal` which I replaced with `ArticleView`.
        // But users still need to pick an excerpt.
        // So I'll render the excerpts *here* if a sphere is selected, or navigate to a specialized view?
        // The prompt asked for "Article Room" which is `ArticleView`.
        // I need a list of articles to click on.

        // Let's just expand the sphere in place or show a list.
        setSelectedSphere(selectedSphere?.id === sphere.id ? null : sphere);
    };

    const getSphereExcerpts = (sphereId) => {
        const sphereData = wisdomData.spheres.find(s => s.id === sphereId);
        return sphereData ? sphereData.excerpts : [];
    };

    return (
        <div className="min-h-screen bg-deep-space relative overflow-hidden flex flex-col font-sans">
            {/* Background */}
            <div className="fixed inset-0 bg-galaxy-gradient opacity-30 pointer-events-none" />

            {/* Application Header */}
            <header className="relative z-10 p-6 flex flex-col md:flex-row justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-md gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10">
                        <Hexagon className="w-6 h-6 text-cyan-300" />
                    </div>
                    <div>
                        <h1 className="text-xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-cyan-200 tracking-widest">
                            AKASHA
                        </h1>
                        <p className="text-xs font-mono text-cyan-700 tracking-[0.2em] uppercase">Holocron Interface v4.0</p>
                    </div>
                </div>

                {/* Primary Navigation */}
                <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-end w-full md:w-auto">
                    <button
                        onClick={() => onNavigate('timeline')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 transition-all group"
                    >
                        <Database className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-white hidden sm:block">Timeline</span>
                    </button>
                    <button
                        onClick={() => onNavigate('civilizations')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all group"
                    >
                        <Globe className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-white hidden sm:block">Galactic Map</span>
                    </button>
                    <button
                        onClick={() => onNavigate('topics')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green-500/30 transition-all group"
                    >
                        <Activity className="w-4 h-4 text-green-400 group-hover:text-green-300" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-white hidden sm:block">Neural Net</span>
                    </button>
                    <button
                        onClick={() => onNavigate('saved')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-yellow-500/30 transition-all group"
                    >
                        <Star className="w-4 h-4 text-yellow-500/70 group-hover:text-yellow-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-white hidden sm:block">Saved</span>
                    </button>
                    <button
                        onClick={() => onNavigate('daily')}
                        className="flex items-center gap-2 px-3 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all group"
                        title="Daily Transmission"
                    >
                        <Sun className="w-4 h-4 text-yellow-300 group-hover:rotate-180 transition-transform duration-700" />
                    </button>
                    <button
                        onClick={() => onNavigate('oracle')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400 transition-all group"
                        title="Oracle"
                    >
                        <MessageSquare className="w-4 h-4 text-quantum-cyan group-hover:animate-pulse" />
                    </button>
                </div>
            </header>

            {/* Search Bar - Centered */}
            <div className="relative z-10 px-6 py-4 flex justify-center border-b border-white/5 bg-black/20">
                <div className="relative w-full max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search the Akashic Records..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all font-light"
                    />
                </div>
            </div>

            {/* Spheres Grid */}
            <main className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {filteredSpheres.map((sphere, index) => {
                        const isSelected = selectedSphere?.id === sphere.id;

                        return (
                            <motion.div
                                key={sphere.id}
                                layoutId={`sphere-${sphere.id}`}
                                onClick={() => handleSphereClick(sphere)}
                                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border ${isSelected ? 'border-cyan-500/50 ring-1 ring-cyan-500/20 col-span-full md:col-span-2 lg:col-span-3' : 'border-white/5 hover:border-white/20 hover:scale-[1.02]'}`}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 transition-all duration-500"
                                    style={{
                                        backgroundImage: `url(${sphereImages[sphere.id] || ''})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: isSelected ? 0.4 : 0.25
                                    }}
                                />

                                {/* Glassmorphism Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br opacity-80 backdrop-blur-sm ${sphere.gradient}`} />

                                {/* Sphere Header Card */}
                                <div className={`p-8 relative ${isSelected ? 'h-auto' : 'h-64 flex flex-col justify-between'}`}>

                                    <div className="relative z-10 flex justify-between items-start">
                                        <h3 className={`font-cinzel text-white transition-all duration-300 ${isSelected ? 'text-3xl' : 'text-xl'}`}>
                                            {sphere.title}
                                        </h3>
                                        {/* Mock Icon */}
                                        <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
                                            <Hexagon className={`w-5 h-5 ${sphere.color}`} />
                                        </div>
                                    </div>

                                    <p className={`relative z-10 text-gray-400 font-light mt-2 transition-all duration-300 ${isSelected ? 'text-lg max-w-2xl' : 'text-sm line-clamp-2'}`}>
                                        {sphere.description}
                                    </p>

                                    {!isSelected && (
                                        <div className="relative z-10 mt-4 flex items-center text-xs font-mono uppercase tracking-widest text-gray-500 group-hover:text-cyan-400 transition-colors">
                                            Access Data <ChevronRight className="w-3 h-3 ml-1" />
                                        </div>
                                    )}
                                </div>

                                {/* Expanded Content (List of Excerpts) */}
                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-black/40 border-t border-white/5"
                                        >
                                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {getSphereExcerpts(sphere.id).map((excerpt, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={(e) => { e.stopPropagation(); onOpenArticle({ ...excerpt, sphereTitle: sphere.title }); }}
                                                        className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group relative overflow-hidden"
                                                    >
                                                        {/* Decorative Card Background */}
                                                        <div
                                                            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity group-hover:opacity-20"
                                                            style={{
                                                                backgroundImage: `url(${sphereImages[sphere.id] || ''})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                            }}
                                                        />
                                                        <div className="relative z-10">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <span className="text-xs font-mono text-gray-500">{excerpt.date}</span>
                                                                <Bookmark
                                                                    className={`w-3 h-3 hover:scale-110 transition-transform ${savedExcerpts?.some(s => s.content === excerpt.content) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                                                                    onClick={(e) => { e.stopPropagation(); onToggleSave(excerpt); }}
                                                                />
                                                            </div>
                                                            <p className="text-sm text-gray-300 line-clamp-3 font-light leading-relaxed group-hover:text-white transition-colors">
                                                                {excerpt.content}
                                                            </p>
                                                            <div className="mt-3 text-xs font-bold text-cyan-500/70 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                                Read Transmission
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default HolocronView;
