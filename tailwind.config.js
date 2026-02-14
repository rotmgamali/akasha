/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cosmic-blue': '#0a0a23',
                'deep-space': '#050510',
                'star': '#f0f0ff',
                'amethyst': '#9b59b6',
                'quantum-cyan': '#00ddeb',
            },
            fontFamily: {
                'cinzel': ['Cinzel', 'serif'],
                'inter': ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'galaxy-gradient': 'linear-gradient(to bottom right, #050510, #1a1a2e, #16213e)',
            },
        },
    },
    plugins: [],
}
