"use client";

import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const context = useTheme();
  
  if (!context || !context.mounted) return null;
  const { theme, toggleTheme } = context;

  return (
    <div className="relative z-[150] flex items-center justify-center">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("Theme toggle clicked, current theme:", theme);
          toggleTheme();
        }}
        className="group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-accent hover:scale-110 shadow-2xl transition-all duration-300 active:scale-95 pointer-events-auto"
        aria-label="Toggle Theme"
      >
        <div className="absolute inset-0 bg-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ y: 10, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {theme === "dark" ? (
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}

