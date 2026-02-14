import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Sparkles } from 'lucide-react';
import wisdomData from '../data/wisdom_data.json';
import { masterImages } from '../data/image_map';

const OracleView = ({ onBack }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'oracle', text: 'I am the Keeper of the Records. The frequency is open. What do you seek?' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        // Simulate Oracle processing
        setTimeout(() => {
            const responseText = generateResponse(inputText);
            const oracleMsg = { id: Date.now() + 1, sender: 'oracle', text: responseText };
            setMessages(prev => [...prev, oracleMsg]);
            setIsTyping(false);
        }, 2000);
    };

    const generateResponse = (query) => {
        // 1. Tokenize query
        const tokens = query.toLowerCase().replace(/[^\w\s]/g, '').split(' ').filter(t => t.length > 3);

        if (tokens.length === 0) {
            return "The frequency of your query is faint. Please focus your intent and ask again with more clarity.";
        }

        const allExcerpts = wisdomData.spheres.flatMap(s => s.excerpts);

        // 2. Score excerpts
        let bestMatch = null;
        let maxScore = 0;

        for (const excerpt of allExcerpts) {
            let score = 0;
            const contentLower = excerpt.content.toLowerCase();

            for (const token of tokens) {
                if (contentLower.includes(token)) {
                    score += 1;
                }
            }

            if (score > maxScore) {
                maxScore = score;
                bestMatch = excerpt;
            }
        }

        // 3. Return best match or fallback
        if (bestMatch && maxScore > 0) {
            return bestMatch.content;
        } else {
            const randomExcerpt = allExcerpts[Math.floor(Math.random() * allExcerpts.length)];
            return `The records do not hold a direct answer to that specific resonance, but here is a transmission that aligns with your current vibration:\n\n${randomExcerpt.content}`;
        }
    };

    return (
        <div className="min-h-screen bg-deep-space flex flex-col relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 opacity-20 transition-opacity duration-1000"
                style={{
                    backgroundImage: `url(${masterImages.source})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="absolute inset-0 bg-galaxy-gradient opacity-10 pointer-events-none" />
            <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 p-4 md:p-6 flex items-center gap-4 border-b border-white/5 bg-black/20 backdrop-blur-md">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-purple-300" />
                </button>
                <div>
                    <h1 className="text-lg font-cinzel text-white tracking-widest">THE ORACLE</h1>
                    <div className="text-[10px] text-quantum-cyan font-mono uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-quantum-cyan animate-pulse"></span>
                        Online
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${msg.sender === 'user'
                            ? 'bg-purple-600/20 border border-purple-500/30 text-white rounded-tr-none'
                            : 'bg-white/5 border border-white/10 text-purple-100 rounded-tl-none'
                            }`}>
                            <p className="text-sm md:text-base font-light leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-2 items-center">
                            <span className="w-2 h-2 bg-purple-400/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                            <span className="w-2 h-2 bg-purple-400/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-2 h-2 bg-purple-400/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-black/40 backdrop-blur-md border-t border-white/5 relative z-10">
                <div className="max-w-4xl mx-auto flex gap-4">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask the Source Consciousness..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all font-light"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className="p-3 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OracleView;
