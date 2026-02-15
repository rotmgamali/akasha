import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, Hexagon, Zap, BookOpen, Circle, Star, Activity, Mountain, Wind } from 'lucide-react';
import { galacticLore } from '../data/galactic_lore';
import wisdomData from '../data/wisdom_data.json';
import { topicImages } from '../data/image_map';

const IconMap = {
    Star: Star,
    Hexagon: Hexagon,
    Zap: Zap,
    BookOpen: BookOpen,
    Circle: Circle,
    Activity: Activity,
    Mountain: Mountain,
    Wind: Wind
};

const TopicView = memo(({ onBack, onOpenArticle }) => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Helper to find articles related to a topic
    const getTopicArticles = (topicId, relatedRaces) => {
        const keywords = [topicId, ...relatedRaces];
        const allExcerpts = wisdomData.spheres.flatMap(sphere =>
            sphere.excerpts.map(e => ({ ...e, sphereTitle: sphere.title }))
        );

        return allExcerpts.filter(excerpt => {
            const text = (excerpt.content + " " + excerpt.source).toLowerCase();
            return keywords.some(k => text.includes(k.toLowerCase()));
        }).slice(0, 5); // Limit to top 5 for the preview
    };

    return (
        <div className="min-h-screen bg-deep-space text-white relative font-sans overflow-y-auto">
            {/* Background with slow rotation */}
            <div className="fixed inset-0 bg-[url('/starfield-bg.jpg')] opacity-20 bg-cover bg-center animate-spin-slow pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md sticky top-0 bg-deep-space/80">
                <button onClick={onBack} className="flex items-center gap-2 text-cyan-300 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-cinzel text-sm hidden sm:block">Return to Hub</span>
                </button>
                <h1 className="text-2xl font-cinzel tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    GALACTIC NEURAL NET
                </h1>
                <div className="w-24" />
            </header>

            <main className="relative z-10 p-8 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">

                {/* The Constellation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto w-full relative">
                    {/* Connecting Lines (Decorative) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="cyan" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="purple" strokeWidth="1" />
                        <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="blue" strokeWidth="1" />
                        <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="cyan" strokeWidth="1" />
                    </svg>

                    {galacticLore.topics.map((topic, index) => {
                        const Icon = IconMap[topic.icon] || Star;
                        const isSelected = selectedTopic?.id === topic.id;

                        return (
                            <motion.div
                                key={topic.id}
                                layoutId={`topic-${topic.id}`}
                                onClick={() => setSelectedTopic(topic)}
                                className={`relative z-10 aspect-square rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 border overflow-hidden ${isSelected ? 'border-cyan-400 scale-110 shadow-[0_0_30px_rgba(34,211,238,0.3)]' : 'border-white/10 hover:border-cyan-500/50'}`}
                                whileHover={{ scale: 1.05 }}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 transition-all duration-500"
                                    style={{
                                        backgroundImage: `url(${topicImages[topic.id]})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: 0.25
                                    }}
                                />

                                {/* Glassmorphism Overlay */}
                                <div className={`absolute inset-0 backdrop-blur-sm ${isSelected ? 'bg-cyan-900/60' : 'bg-black/60 hover:bg-black/50'} transition-colors duration-500`} />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
                                    <h3 className={`font-cinzel text-xs text-center px-2 ${isSelected ? 'text-white font-bold' : 'text-gray-400'}`}>
                                        {topic.name}
                                    </h3>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Selected Topic Overlay / Detail Panel */}
                <AnimatePresence>
                    {selectedTopic && (
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-2xl border-t border-white/10 p-6 md:p-8 h-[70vh] md:h-[60vh] overflow-y-auto z-40 rounded-t-[2rem]"
                        >
                            {/* Background Image Underlay for Detail */}
                            <div
                                className="absolute inset-0 opacity-15 pointer-events-none"
                                style={{
                                    backgroundImage: `url(${topicImages[selectedTopic.id]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <div className="relative z-10 max-w-4xl mx-auto">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-cinzel text-cyan-400 mb-2">{selectedTopic.name}</h2>
                                        <p className="text-gray-300 font-light max-w-xl">{selectedTopic.description}</p>
                                    </div>
                                    <button onClick={() => setSelectedTopic(null)} className="p-2 hover:bg-white/10 rounded-full">
                                        <ArrowLeft className="w-6 h-6 -rotate-90" />
                                    </button>
                                </div>

                                <div className="flex gap-2 mb-8">
                                    {selectedTopic.relatedRaces.map(raceId => (
                                        <span key={raceId} className="text-xs font-mono uppercase px-2 py-1 bg-white/10 rounded text-purple-300">
                                            {raceId}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-sm font-mono uppercase text-gray-500 mb-4 tracking-widest border-b border-white/5 pb-2">
                                    Related Transmissions
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {getTopicArticles(selectedTopic.id, selectedTopic.relatedRaces).map((article, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => onOpenArticle(article)}
                                            className="p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5 hover:border-cyan-500/30 transition-all group"
                                        >
                                            <div className="mb-2 text-xs font-mono text-cyan-600 group-hover:text-cyan-400">
                                                Source: {article.source}
                                            </div>
                                            <p className="text-sm text-gray-300 line-clamp-2">
                                                {article.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
});

// Display name for React DevTools
TopicView.displayName = 'TopicView';

export default TopicView;
