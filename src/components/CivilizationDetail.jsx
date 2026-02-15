import React, { useState } from 'react';
import { ArrowLeft, BookOpen, MapPin, Activity, Info } from 'lucide-react';
import wisdomData from '../data/demo_content.json';
import { civilizationImages } from '../data/image_map';

const CivilizationDetail = ({ civilization, onBack, onOpenArticle }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Filter wisdom data for this civilization
    // This is a naive filter based on string matching the civilization name or keywords in source/content
    const civilizationTransmissions = useMemo(() => {
        if (!civilization) return [];

        // Flatten all excerpts from all spheres
        const allExcerpts = wisdomData.spheres.flatMap(sphere =>
            sphere.excerpts.map(excerpt => ({ ...excerpt, sphereTitle: sphere.title, sphereId: sphere.id }))
        );

        const keywords = [
            civilization.id,
            civilization.name.split(' ')[0], // e.g., "Pleiadians" from "The Pleiadian High Council"
            civilization.name.split(' ')[1]
        ].filter(Boolean).map(k => k.toLowerCase());

        if (civilization.id === 'ra') keywords.push('law of one');
        if (civilization.id === 'lemurians') keywords.push('lemuria');
        if (civilization.id === 'atlanteans') keywords.push('atlantis');

        return allExcerpts.filter(excerpt => {
            const text = (excerpt.source + " " + excerpt.content).toLowerCase();
            return keywords.some(k => text.includes(k));
        });
    }, [civilization]);

    if (!civilization) return null;

    return (
        <div className="min-h-screen bg-deep-space text-white relative font-sans overflow-y-auto custom-scrollbar">
            {/* Hero Background */}
            <div className={`fixed inset - 0 bg - gradient - to - br opacity - 20 ${civilization.gradient} pointer - events - none`} />
            <div className="fixed inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />

            {/* Scrollable Content */}
            <div className="relative z-10 pb-20">

                {/* Navigation Header */}
                <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
                    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-all group">
                        <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-white" />
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-300 group-hover:text-white">Return to Sector</span>
                    </button>
                </header>

                {/* Hero Section */}
                <div className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${civilizationImages[civilization.id]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.4
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset - 0 bg - gradient - to - b opacity - 80 ${civilization.gradient} `} />
                    <div className="absolute inset-0 bg-black/50" />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-cyan-300">
                                {civilization.density}
                            </span>
                            <span className="flex items-center gap-2 text-purple-300 text-xs font-mono uppercase tracking-widest">
                                <MapPin className="w-3 h-3" /> {civilization.system}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-cinzel text-white mb-6 leading-tight">
                            {civilization.name}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl border-l-4 border-white/20 pl-6">
                            {civilization.description}
                        </p>
                    </motion.div>
                </div>

                {/* Tabbed Content Section */}
                <div className="max-w-6xl mx-auto px-6">
                    {/* Tab Navigation */}
                    <div className="flex gap-2 md:gap-4 border-b border-white/10 mb-8 overflow-x-auto">
                        {['overview', 'traits', 'transmissions'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px - 4 md: px - 6 py - 3 font - mono text - xs md: text - sm uppercase tracking - widest transition - all whitespace - nowrap ${activeTab === tab
                                        ? 'text-white border-b-2 border-cyan-500'
                                        : 'text-gray-500 hover:text-gray-300'
                                    } `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="glass-panel p-6 md:p-8 rounded-2xl">
                                <h3 className="text-2xl font-cinzel mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                    Civilization Overview
                                </h3>
                                <p className="text-gray-300 leading-relaxed mb-4">{civilization.theme}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                        <div className="text-xs text-gray-500 font-mono uppercase mb-1">Star System</div>
                                        <div className="text-white font-semibold">{civilization.system}</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                        <div className="text-xs text-gray-500 font-mono uppercase mb-1">Density Level</div>
                                        <div className="text-white font-semibold">{civilization.density}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Traits Tab */}
                    {activeTab === 'traits' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {civilization.traits.map((trait, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-panel p-6 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all"
                                >
                                    <div className="text-3xl mb-3">{trait.icon}</div>
                                    <h4 className="text-white font-semibold mb-2">{trait.name}</h4>
                                    <p className="text-sm text-gray-400">{trait.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Transmissions Tab */}
                    {activeTab === 'transmissions' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {civilizationTransmissions.length > 0 ? (
                                civilizationTransmissions.map((trans, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => onOpenArticle(trans)}
                                        className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-mono text-cyan-400">{trans.sphereTitle}</span>
                                            <span className="text-xs text-gray-500">{trans.date}</span>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed line-clamp-3 group-hover:text-white transition-colors">
                                            {trans.content}
                                        </p>
                                        <div className="mt-3 text-xs font-bold text-cyan-500/70 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            Read Full Transmission →
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                    <p className="font-mono text-sm">No transmissions available for this civilization.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CivilizationDetail;
