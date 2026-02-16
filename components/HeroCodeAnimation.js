"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LINES = [
  { text: "$ npm run dev", type: "command", delay: 0 },
  { text: "> next dev", type: "output", delay: 800 },
  { text: "▲ Next.js 14.2.18", type: "output", delay: 1200 },
  { text: "- Local: http://localhost:3000", type: "output", delay: 1600 },
  { text: "✓ Ready in 2.1s", type: "success", delay: 2000 },
  { text: "", type: "blank", delay: 2400 },
  { text: "const build = () => {", type: "code", delay: 2800 },
  { text: "  return <Portfolio />;", type: "code", delay: 3200 },
  { text: "};", type: "code", delay: 3600 },
  { text: "", type: "blank", delay: 4000 },
  { text: "✓ Built successfully", type: "success", delay: 4400 },
  { text: "", type: "blank", delay: 4800 },
];

function Line({ line, isVisible, cursorVisible, showCursor }) {
  const colorClass =
    line.type === "command"
      ? "text-emerald-400"
      : line.type === "success"
        ? "text-emerald-400"
        : line.type === "code"
          ? "text-cyan-400"
          : "text-slate-300";

  return (
    <div className="flex items-center gap-1 font-mono text-sm md:text-base min-h-[1.4em]">
      {line.type === "command" && (
        <span className="text-emerald-500/90 select-none">$ </span>
      )}
      <span className={colorClass}>{isVisible ? line.text : ""}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: cursorVisible ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 align-middle shrink-0"
        />
      )}
    </div>
  );
}

export function HeroCodeAnimation() {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [currentLineCharIndex, setCurrentLineCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (visibleIndex >= LINES.length) {
      const t = setTimeout(() => {
        setVisibleIndex(-1);
        setCurrentLineCharIndex(0);
        setLoopKey((k) => k + 1);
      }, 4000);
      return () => clearTimeout(t);
    }

    const line = LINES[visibleIndex];
    if (!line) {
      const nextDelay = visibleIndex === -1 ? 400 : 120;
      const t = setTimeout(() => setVisibleIndex((i) => i + 1), nextDelay);
      return () => clearTimeout(t);
    }

    if (line.type === "blank") {
      const t = setTimeout(() => setVisibleIndex((i) => i + 1), 200);
      return () => clearTimeout(t);
    }

    const fullText = line.text;
    if (currentLineCharIndex < fullText.length) {
      const t = setTimeout(
        () => setCurrentLineCharIndex((c) => c + 1),
        visibleIndex === 0 && currentLineCharIndex === 0 ? line.delay : 40,
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setVisibleIndex((i) => i + 1);
      setCurrentLineCharIndex(0);
    }, 600);
    return () => clearTimeout(t);
  }, [visibleIndex, currentLineCharIndex, loopKey]);

  return (
    <motion.div
      key={loopKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full min-h-[200px] sm:min-h-[220px] max-h-[50vh] lg:max-h-[45vh] rounded-xl overflow-hidden border-2 border-emerald-500/40 bg-[#0d1117] shadow-2xl shadow-emerald-500/10 flex flex-col"
    >
      {/* Terminal title bar - always dark so text is visible in any theme */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-600 bg-[#161b22]">
        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="flex-1 text-center text-[#8b949e] font-mono text-xs">
          terminal — portfolio
        </span>
      </div>

      {/* Code output - forced dark bg + light text so visible in any theme */}
      <div className="flex-1 min-h-0 p-4 md:p-5 font-mono overflow-y-auto overflow-x-hidden bg-[#0d1117] text-[#c9d1d9] no-scrollbar">
        {LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: i <= visibleIndex ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            {i < visibleIndex ? (
              <Line
                line={line}
                isVisible
                cursorVisible={false}
                showCursor={false}
              />
            ) : i === visibleIndex ? (
              <Line
                line={{
                  ...line,
                  text: line.text.slice(0, currentLineCharIndex),
                }}
                isVisible
                cursorVisible={cursorVisible}
                showCursor={line.type !== "blank"}
              />
            ) : (
              <Line
                line={line}
                isVisible={false}
                cursorVisible={false}
                showCursor={false}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
