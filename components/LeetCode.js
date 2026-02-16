"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// LeetCode profile: https://leetcode.com/u/agadge797/
const LEETCODE_USERNAME = "agadge797";
const LEETCODE_PROFILE_URL = "https://leetcode.com/u/agadge797/";
const STATS_API = `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`;

function ProgressBar({ solved, total, colorClass }) {
  const pct = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
  return (
    <div className="h-2 rounded-full bg-surface overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full ${colorClass}`}
      />
    </div>
  );
}

export function LeetCode() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(STATS_API)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.totalSolved != null) {
          setStats(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const difficultyConfig = {
    easy: {
      label: "Easy",
      color: "text-emerald-500 dark:text-emerald-400",
      bar: "bg-emerald-500",
      icon: "●",
    },
    medium: {
      label: "Medium",
      color: "text-amber-500 dark:text-amber-400",
      bar: "bg-amber-500",
      icon: "◆",
    },
    hard: {
      label: "Hard",
      color: "text-rose-500 dark:text-rose-400",
      bar: "bg-rose-500",
      icon: "★",
    },
  };

  return (
    <section
      id="leetcode"
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - terminal style */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 font-mono text-[10px] text-accent/60 mb-2 uppercase tracking-[0.3em] font-black">
            <span className="text-accent">$</span>
            <span>leetcode statistics --verbose</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-text-primary font-mono tracking-tighter">
            <span className="text-accent">&gt;</span> SKILLS_AUDIT
          </h2>
        </motion.div>

        <motion.a
          href={LEETCODE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="block max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0c]/60 backdrop-blur-xl hover:border-accent/40 hover:shadow-[0_0_50px_rgba(var(--accent-rgb),0.15)] transition-all duration-500 group"
        >
          {/* Card header - terminal style */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-elevated/80">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="font-mono text-xs text-text-muted ml-2">
              leetcode.com/u/{LEETCODE_USERNAME}
            </span>
            <span
              className="ml-auto text-text-muted group-hover:text-accent transition-colors"
              aria-hidden
            >
              →
            </span>
          </div>

          <div className="p-6 md:p-8">
            {/* Profile row */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 text-2xl font-bold text-amber-500 dark:text-amber-400 shrink-0">
                LC
              </div>
              <div>
                <p className="font-mono text-sm text-text-muted">
                  @{LEETCODE_USERNAME}
                </p>
                <p className="font-semibold text-text-primary text-lg">
                  View my LeetCode profile
                </p>
                <p className="text-text-muted text-sm mt-0.5">
                  Click to open profile in a new tab
                </p>
              </div>
            </div>

            {loading && (
              <div className="h-32 rounded-xl bg-surface/50 animate-pulse flex items-center justify-center border border-border">
                <span className="text-text-muted text-sm font-mono">
                  Loading stats...
                </span>
              </div>
            )}

            {!loading && stats && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Main stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="rounded-xl bg-surface-elevated/80 border border-accent/30 p-4 text-center hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
                  >
                    <p className="font-mono text-3xl font-bold text-accent">
                      {stats.totalSolved}
                    </p>
                    <p className="text-text-muted text-xs uppercase tracking-wider mt-1">
                      Total Solved
                    </p>
                  </motion.div>
                  {["easy", "medium", "hard"].map((diff, i) => (
                    <motion.div
                      key={diff}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className={`rounded-xl bg-surface-elevated/80 border border-border p-4 text-center hover:border-accent/30 hover:shadow-lg transition-all duration-300 ${difficultyConfig[diff].color}`}
                    >
                      <p className="font-mono text-2xl font-bold">
                        {stats[`${diff}Solved`]}
                      </p>
                      <p className="text-text-muted text-xs uppercase tracking-wider mt-1">
                        {difficultyConfig[diff].label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Extra details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stats.acceptanceRate != null && stats.acceptanceRate > 0 && (
                    <div className="rounded-xl bg-surface-elevated/50 border border-border p-4">
                      <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-2">
                        Acceptance Rate
                      </p>
                      <p className="font-mono text-xl font-bold text-cyan-400">
                        {(stats.acceptanceRate * 100).toFixed(1)}%
                      </p>
                    </div>
                  )}
                  {stats.ranking != null && stats.ranking > 0 && (
                    <div className="rounded-xl bg-surface-elevated/50 border border-border p-4">
                      <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-2">
                        Ranking
                      </p>
                      <p className="font-mono text-xl font-bold text-text-primary">
                        #{stats.ranking.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Progress by difficulty */}
                <div className="rounded-xl bg-surface-elevated/50 border border-border p-4 space-y-4">
                  <p className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    Progress by difficulty
                  </p>
                  {["easy", "medium", "hard"].map((diff) => (
                    <div key={diff} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={difficultyConfig[diff].color}>
                          {difficultyConfig[diff].icon}{" "}
                          {difficultyConfig[diff].label}
                        </span>
                        <span className="text-text-secondary font-mono">
                          {stats[`${diff}Solved`]} /{" "}
                          {stats[
                            `total${diff.charAt(0).toUpperCase() + diff.slice(1)}`
                          ] ?? "—"}
                        </span>
                      </div>
                      <ProgressBar
                        solved={stats[`${diff}Solved`] ?? 0}
                        total={
                          stats[
                            `total${diff.charAt(0).toUpperCase() + diff.slice(1)}`
                          ] ?? 1
                        }
                        colorClass={difficultyConfig[diff].bar}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {!loading && (error || !stats) && (
              <div className="rounded-xl bg-surface/50 border border-border p-6 text-center">
                <p className="text-text-muted text-sm mb-2">
                  Stats could not be loaded. You can still visit the profile.
                </p>
                <p className="text-text-muted text-xs font-mono">
                  Ensure{" "}
                  <code className="px-1.5 py-0.5 rounded bg-surface text-accent">
                    LEETCODE_USERNAME
                  </code>{" "}
                  in LeetCode.js matches your profile.
                </p>
              </div>
            )}
          </div>
        </motion.a>
      </div>
    </section>
  );
}
