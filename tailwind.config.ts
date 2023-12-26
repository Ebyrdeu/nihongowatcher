import type {Config} from "tailwindcss";

export default {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#ef9995",
                "primary-content": "#282425",
                "secondary": "#a4cbb4",
                "secondary-content": "#282425",
                "accent": "#DC8850",
                "accent-content": "#282425",
                "neutral": "#2E282A",
                "neutral-content": "#EDE6D4",
                "base-100": "#e4d8b4",
                "base-200": "#DBCA9A",
                "base-300": "#D4BF87",
                "base-content": "#282425",
                "info": "#2563eb",
                "success": "#16a34a",
                "warning": "#d97706",
                "error": "#dc2626",
            },

        },
    },
    plugins: [],
} satisfies Config;

