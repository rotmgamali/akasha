import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Akasha Error Captured:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-6 text-center z-[200]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-8 md:p-12 rounded-[2rem] border border-red-500/20 max-w-lg shadow-[0_0_50px_rgba(239,68,68,0.1)]"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
                                <AlertTriangle className="w-12 h-12 text-red-400" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-cinzel text-white mb-4">Frequency Distortion</h1>
                        <p className="text-gray-400 font-light leading-relaxed mb-8">
                            A quantum anomaly has been detected in the data stream. The connection to Akasha has been momentarily disrupted.
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 text-white font-mono text-sm uppercase tracking-widest hover:border-red-400 transition-all group mx-auto"
                        >
                            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                            Resynchronize
                        </button>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
