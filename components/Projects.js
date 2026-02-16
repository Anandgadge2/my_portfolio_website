"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const GITHUB_API =
  "https://api.github.com/users/Anandgadge2/repos?sort=updated&per_page=30";

export function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(GITHUB_API)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Sort: Hosted projects first, then by stars, then by date
          const sorted = [...data].sort((a, b) => {
            const hasA = a.homepage && a.homepage.trim().length > 0;
            const hasB = b.homepage && b.homepage.trim().length > 0;
            if (hasA && !hasB) return -1;
            if (!hasA && hasB) return 1;
            return (
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            );
          });
          setRepos(sorted);
        } else {
          setError("Could not load projects");
        }
      })
      .catch(() => setError("Failed to fetch projects"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="projects" ref={sectionRef} className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-12 text-center"
          >
            <span className="gradient-text">Projects</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-surface-elevated border border-border animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" ref={sectionRef} className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-12 text-center"
          >
            <span className="gradient-text">Projects</span>
          </motion.h2>
          <p className="text-center text-text-muted">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={sectionRef} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ y: headerY }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-text-primary mb-4 text-center tracking-tighter"
          >
            <span className="gradient-text">PROJECTS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-text-muted text-center mb-10 max-w-2xl mx-auto font-mono text-xs uppercase tracking-[0.2em]"
          >
            {"// production_ready_instances"}
          </motion.p>
        </motion.div>
        <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory px-4 -mx-4">
          {repos.length > 0 ? (
            repos.map((repo, i) => {
              const hasHomepage =
                repo.homepage && String(repo.homepage).trim().length > 0;
              const projectLink = hasHomepage ? repo.homepage : repo.html_url;
              const owner = repo.owner?.login || "Anandgadge2";

              // Professional screenshot service for hosted projects
              const previewUrl = hasHomepage
                ? `https://api.microlink.io?url=${encodeURIComponent(repo.homepage)}&screenshot=true&embed=screenshot.url`
                : `https://opengraph.githubassets.com/1/${owner}/${repo.name}`;

              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: 0.05 * i,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative flex flex-col h-full min-w-[280px] sm:min-w-[320px] md:min-w-[400px] snap-center first:ml-4 last:mr-4"
                >
                  {/* Programmer-style Card */}
                  <div className="flex flex-col h-full bg-surface-elevated/40 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300 group-hover:bg-surface-elevated/60 group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
                    {/* Browser Bar Style Header */}
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <div className="ml-2 font-mono text-[10px] text-text-muted truncate opacity-50">
                        {repo.name.toLowerCase()}.exe
                      </div>
                    </div>

                    {/* Project Preview */}
                    <a
                      href={projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-video w-full overflow-hidden bg-surface/50 group-hover:shadow-inner transition-all duration-500"
                    >
                      <Image
                        src={previewUrl}
                        alt={`${repo.name} preview`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />

                      {/* View Badge */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="text-[10px] font-bold text-white tracking-wider">
                          PREVIEW
                        </span>
                      </div>
                    </a>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors">
                          {repo.name}
                        </h3>
                        {hasHomepage && (
                          <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-tighter">
                              Live
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1 opacity-80 group-hover:opacity-100 transition-opacity whitespace-normal">
                        {repo.description ||
                          "Experimental project focusing on modern architecture and performance optimization."}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              repo.language === "JavaScript"
                                ? "bg-yellow-400"
                                : repo.language === "TypeScript"
                                  ? "bg-blue-500"
                                  : repo.language === "Java"
                                    ? "bg-orange-500"
                                    : repo.language === "PHP"
                                      ? "bg-indigo-500"
                                      : "bg-emerald-500"
                            }`}
                          />
                          <span className="text-xs font-mono text-text-secondary">
                            {repo.language || "Other"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono text-text-muted">
                            ★ {repo.stargazers_count}
                          </span>
                        </div>
                      </div>

                      {/* Footer Buttons */}
                      <div className="flex items-center gap-3">
                        <motion.a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-text-primary text-xs font-bold hover:bg-white/10 hover:border-accent/40 transition-all font-mono"
                        >
                          CODE
                        </motion.a>
                        {hasHomepage && (
                          <motion.a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white text-xs font-bold shadow-[0_10px_20px_-5px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_15px_25px_-5px_rgba(var(--accent-rgb),0.4)] hover:brightness-110 transition-all font-mono"
                          >
                            LIVE
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="w-full py-20 text-center">
              <p className="text-text-muted font-mono">
                &gt; NO_LIVE_PROJECTS_DETECTED
              </p>
            </div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/Anandgadge2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
          >
            View all on GitHub
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
