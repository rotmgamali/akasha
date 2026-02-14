import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, MapPin, Activity, Info } from 'lucide-react';
import wisdomData from '../data/wisdom_data.json';
import { civilizationImages } from '../data/image_map';

const CivilizationDetail = ({ civilization, onBack, onOpenArticle }) => {
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
        <div className="min-h-screen bg-deep-space text-white relative font-sans">
            {/* Hero Background */}
            <div className={`fixed inset-0 bg-gradient-to-br opacity-20 ${civilization.gradient} pointer-events-none`} />
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
                    <div className={`absolute inset-0 bg-gradient-to-b opacity-80 ${civilization.gradient}`} />
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

                {/* Info Grid */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                        <h3 className="flex items-center gap-2 font-cinzel text-xl text-purple-300 mb-6">
                            <Activity className="w-5 h-5" /> Key Traits
                        </h3>
                        <ul className="space-y-4">
                            {civilization.traits.map((trait, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300 font-light">
                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                    {trait}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 md:col-span-2">
                        <h3 className="flex items-center gap-2 font-cinzel text-xl text-blue-300 mb-6">
                            <Info className="w-5 h-5" /> Biological & Energetic Signature
                        </h3>
                        <div className="prose prose-invert max-w-none text-gray-300 font-light leading-relaxed">
                            <p>{civilization.appearance}</p>
                            <p className="mt-4">
                                <strong>Theme:</strong> {civilization.theme}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Transmission Feed */}
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <h2 className="text-3xl font-cinzel text-white mb-8 border-b border-white/10 pb-4 flex justify-between items-end">
                        <span>Archives // Transmissions</span>
                        <span className="text-xs font-mono text-gray-500 mb-1">{civilizationTransmissions.length} Records Found</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {civilizationTransmissions.length > 0 ? (
                            civilizationTransmissions.map((excerpt, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => onOpenArticle(excerpt)}
                                    className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/5 hover:border-purple-500/40 hover:bg-white/5 transition-all cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-xs font-mono text-gray-500 uppercase">{excerpt.date}</div>
                                        <BookOpen className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                    <h4 className="font-cinzel text-lg text-gray-200 mb-2 group-hover:text-white transition-colors">
                                        Transmission #{idx + 1}
                                    </h4>
                                    <p className="text-gray-400 line-clamp-3 font-light text-sm leading-relaxed mb-4">
                                        {excerpt.content}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Access Data <ArrowLeft className="w-3 h-3 rotate-180" />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center text-gray-500 italic">
                                No direct transmissions found in the current sector archives.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CivilizationDetail;
