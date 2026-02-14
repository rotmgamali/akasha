import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ChevronDown, ChevronUp, Filter, BookOpen } from 'lucide-react';
import wisdomData from '../data/wisdom_data.json';

const TimelineView = ({ onBack, onOpenArticle }) => {
    const [sortAsc, setSortAsc] = useState(false); // Default to newest first (descending)
    const [selectedYear, setSelectedYear] = useState('All');

    // Process and sort data
    const timelineData = useMemo(() => {
        let allExcerpts = [];

        wisdomData.spheres.forEach(sphere => {
            sphere.excerpts.forEach((excerpt, index) => {
                // Parse format YYYYMMDD
                // Assuming format is consistent YYYYMMDD based on viewed file
                const year = excerpt.date.substring(0, 4);
                const month = excerpt.date.substring(4, 6);
                const day = excerpt.date.substring(6, 8);
                const dateObj = new Date(`${year}-${month}-${day}`);

                allExcerpts.push({
                    ...excerpt,
                    id: `${sphere.id}-${index}`, // Unique ID for key
                    sphereTitle: sphere.title,
                    sphereId: sphere.id,
                    dateObj: dateObj,
                    year: year,
                    formattedDate: isNaN(dateObj.getTime()) ? excerpt.date : dateObj.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                });
            });
        });

        // Sort
        allExcerpts.sort((a, b) => {
            if (!a.dateObj || !b.dateObj) return 0;
            return sortAsc ? a.dateObj - b.dateObj : b.dateObj - a.dateObj;
        });

        return allExcerpts;
    }, [sortAsc]);

    // Filter by year
    const filteredData = useMemo(() => {
        if (selectedYear === 'All') return timelineData;
        return timelineData.filter(item => item.year === selectedYear);
    }, [timelineData, selectedYear]);

    // Get unique years for filter
    const years = useMemo(() => {
        const uniqueYears = [...new Set(timelineData.map(item => item.year))].filter(y => !isNaN(parseInt(y)));
        return uniqueYears.sort().reverse();
    }, [timelineData]);

    return (
        <div className="min-h-screen bg-deep-space relative overflow-hidden flex flex-col">
            {/* Background */}
            <div className="fixed inset-0 bg-galaxy-gradient opacity-20 pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 p-6 flex flex-col md:flex-row justify-between items-center border-b border-white/5 backdrop-blur-md gap-4 sticky top-0 bg-deep-space/80">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                        <ArrowLeft className="w-5 h-5 text-purple-300 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <h1 className="text-xl font-cinzel text-white tracking-widest hidden md:block">GALACTIC TIMELINE</h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Year Filter */}
                    <div className="relative group">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="appearance-none bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-purple-200 outline-none hover:border-purple-500/50 cursor-pointer transition-colors"
                        >
                            <option value="All">All Eons</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Sort Toggle */}
                    <button
                        onClick={() => setSortAsc(!sortAsc)}
                        className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-purple-200 transition-all flex items-center gap-2"
                        title={sortAsc ? "Oldest First" : "Newest First"}
                    >
                        <span className="text-xs font-mono uppercase hidden sm:block">{sortAsc ? "Oldest" : "Newest"}</span>
                        {sortAsc ? <ChevronDown className="w-4 h-4 transform rotate-180" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>
            </header>

            {/* Timeline Feed */}
            <div className="flex-1 overflow-y-auto relative z-10 p-4 md:p-8 custom-scrollbar">
                <div className="max-w-4xl mx-auto relative">
                    {/* Center Line for desktop */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent hidden md:block" />

                    {/* Mobile Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent md:hidden" />

                    {filteredData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            className={`relative flex flex-col md:flex-row gap-8 items-start mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Date/Marker Node */}
                            <div className="absolute left-6 md:left-1/2 w-4 h-4 -ml-[9px] md:-ml-2 mt-6 rounded-full bg-deep-space border-2 border-purple-500 z-20 shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                                <div className="absolute inset-0 bg-purple-400 animate-ping opacity-20 rounded-full" />
                            </div>

                            {/* Content Card */}
                            <div className={`w-full md:w-[calc(50%-2rem)] pl-16 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                <div
                                    onClick={() => onOpenArticle(item)}
                                    className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-pointer group hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className={`flex flex-col gap-1 mb-4 relative z-10 ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'} items-start`}>
                                        <span className="text-pink-400 font-mono text-[10px] tracking-widest uppercase border border-pink-500/20 px-2 py-1 rounded-full bg-pink-500/5">{item.sphereTitle}</span>
                                        <div className="flex items-center gap-2 text-gray-400 text-xs font-mono mt-2">
                                            <Calendar className="w-3 h-3" />
                                            {item.formattedDate}
                                        </div>
                                    </div>

                                    <p className="text-gray-200 text-sm md:text-base leading-relaxed font-light mb-4 line-clamp-4 group-hover:text-white transition-colors relative z-10">
                                        {item.content}
                                    </p>

                                    <div className={`flex items-center gap-2 text-quantum-cyan text-xs uppercase tracking-widest font-bold relative z-10 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} justify-start`}>
                                        <BookOpen className="w-3 h-3" />
                                        Read Transmission
                                    </div>
                                </div>
                            </div>

                            {/* Spacer for opposite side */}
                            <div className="hidden md:block w-[calc(50%-2rem)]" />
                        </motion.div>
                    ))}

                    {filteredData.length === 0 && (
                        <div className="text-center py-20 text-gray-500 font-mono">
                            No timeline records found for this frequency.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimelineView;
