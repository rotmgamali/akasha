import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Sun, Droplets, Circle, Hexagon, Mountain, Wind } from 'lucide-react';
import { galacticLore } from '../data/galactic_lore';
import { civilizationImages } from '../data/image_map';

const IconMap = {
    Star: Star,
    Hexagon: Hexagon,
    Circle: Circle,
    Mountain: Mountain,
    Wind: Wind,
    Sun: Sun,
    Droplets: Droplets
};

const CivilizationsView = ({ onBack, onSelectCivilization }) => {
    return (
        <div className="min-h-screen bg-deep-space text-white overflow-hidden relative font-sans">
            {/* Dynamic Background */}
            <div className="fixed inset-0 bg-[url('/starfield-bg.jpg')] opacity-20 bg-cover bg-center pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            <header className="relative z-10 p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md">
                <button onClick={onBack} className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-cinzel text-sm hidden sm:block">Return to Hub</span>
                </button>
                <h1 className="text-2xl font-cinzel tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    GALACTIC CIVILIZATIONS
                </h1>
                <div className="w-24" /> {/* Spacer */}
            </header>

            <main className="relative z-10 p-8 max-w-7xl mx-auto pb-24">
                <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                    The galaxy is teeming with life. Explore the advanced consciousnesses that maintain the cosmic balance and guide the evolution of worlds.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {galacticLore.civilizations.map((civ, index) => {
                        const Icon = IconMap[civ.icon] || Star;
                        return (
                            <motion.div
                                key={civ.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => onSelectCivilization(civ)}
                                className="relative h-80 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 border border-white/5 hover:border-cyan-500/30 hover:scale-[1.05] group card-lift"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 transition-all duration-500"
                                    style={{
                                        backgroundImage: `url(${civilizationImages[civ.id]})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: 0.3
                                    }}
                                />

                                {/* Glassmorphism Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br opacity-70 backdrop-blur-sm group-hover:opacity-80 transition-opacity ${civ.gradient}`} />

                                {/* Content */}
                                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded tracking-widest uppercase">
                                            {civ.density}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-cinzel text-white mb-2 group-hover:translate-x-2 transition-transform duration-500">{civ.name}</h3>
                                        <p className="text-xs font-mono text-cyan-300 mb-4 uppercase tracking-wider">{civ.system}</p>
                                        <p className="text-sm text-gray-300 line-clamp-2 font-light opacity-80 group-hover:opacity-100 transition-opacity">
                                            {civ.theme}
                                        </p>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
                            </motion.div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default CivilizationsView;
