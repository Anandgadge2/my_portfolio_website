"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const BITS = "01";
const COLS = 14;
const ROWS_PER_LOOP = 12;

export function BitsFloating() {
  const { scrollYProgress } = useScroll({ layoutEffect: false });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "5%", "10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.15, 0.25, 0.25, 0.15],
  );

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden
    >
      <div className="absolute inset-0 flex gap-x-1 sm:gap-x-2 font-mono text-[10px] sm:text-xs leading-tight select-none overflow-hidden">
        {Array.from({ length: COLS }).map((_, colIndex) => (
          <div
            key={colIndex}
            className="bits-flow-vertical flex flex-col"
            style={{ animationDelay: `${colIndex * 1.2}s` }}
          >
            {/* Duplicated so translateY(-50%) loops seamlessly. Hacker board: green & white. */}
            {[1, 2].map((copy) => (
              <div key={copy} className="flex flex-col gap-y-0.5">
                {Array.from({ length: ROWS_PER_LOOP }).map((_, rowIndex) => {
                  const bit = BITS[(colIndex + rowIndex) % 2];
                  const isGreen = bit === "1";
                  return (
                    <span
                      key={`${copy}-${rowIndex}`}
                      className={
                        isGreen
                          ? "text-emerald-500"
                          : "text-gray-800 dark:text-white"
                      }
                    >
                      {bit}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
