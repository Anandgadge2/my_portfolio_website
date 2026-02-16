"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const techStack = [
  "Java",
  "Spring Boot",
  "React",
  "Node.js",
  "MongoDB",
  "AWS",
  "TypeScript",
  "Docker",
  "PostgreSQL",
  "Next.js",
  "PHP",
  "Laravel",
];

const sysInfo = [
  { key: "LOC", value: "Nagpur, India" },
  { key: "EDU", value: "B.Tech in IT" },
  { key: "STA", value: "Available" },
  { key: "ROL", value: "Full Stack" },
  { key: "ORG", value: "PugArch Technology" },
];

export function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const panelY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const panelOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 relative overflow-hidden bg-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: Content Area */}
          <div className="flex-1 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[2px] w-12 bg-accent" />
                <span className="font-mono text-xs font-black text-accent tracking-[0.3em] uppercase">
                  SYSTEM_OVERVIEW
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter">
                Engineering{" "}
                <span className="text-accent italic">solutions</span> with{" "}
                <br />
                <span
                  className="gradient-text glitch-text"
                  data-text="modern tech."
                >
                  modern tech.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              Developing at the intersection of performance and scalability. At{" "}
              <span className="text-text-primary font-bold">
                PugArch Technology
              </span>
              , I specialize in architecting distributed systems that handle
              complexity with ease. My expertise spans across{" "}
              <span className="text-accent font-bold">
                MERN, Spring Boot, PHP/Laravel,
              </span>{" "}
              and AWS—delivering resilient and efficient digital solutions.
            </motion.div>

            {/* Sys Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {sysInfo.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="bg-surface-elevated/50 backdrop-blur-sm p-4 rounded-2xl border border-border"
                >
                  <span className="block text-[10px] font-mono text-text-muted mb-1 uppercase tracking-widest">
                    {item.key}
                  </span>
                  <span className="block text-sm font-bold text-text-primary">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Technical Details */}
          <motion.div
            style={{ y: panelY, opacity: panelOpacity }}
            className="flex-1 w-full lg:max-w-md xl:max-w-lg"
          >
            <div className="bg-slate-50 dark:bg-[#0a0a0c] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-6 py-4 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="ml-4 font-mono text-[10px] text-text-muted opacity-50 tracking-widest uppercase">
                  system_specs.config
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                {/* Tech Stack Chips */}
                <div>
                  <div className="text-[10px] font-mono text-accent mb-4 tracking-widest uppercase">
                    &gt; PACKAGES_LOADED
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, i) => (
                      <motion.div
                        key={tech}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(34, 197, 94, 0.1)",
                        }}
                        className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs font-mono text-text-secondary dark:text-white/80 transition-all cursor-default"
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Status Console */}
                <div className="pt-6 border-t border-black/5 dark:border-white/5">
                  <div className="text-[10px] font-mono text-text-muted mb-4 tracking-widest uppercase">
                    &gt; CONSOLE_OUTPUT
                  </div>
                  <div className="font-mono text-xs space-y-2 opacity-60">
                    <p className="text-emerald-400">$ system.checkStatus()</p>
                    <p className="text-text-primary dark:text-white">
                      ... [SUCCESS] Core services optimized
                    </p>
                    <p className="text-text-primary dark:text-white">
                      ... [SUCCESS] Cloud connectivity verified
                    </p>
                    <p className="text-text-primary dark:text-white">
                      ... [SUCCESS] Architecture review passed
                    </p>
                    <p className="text-emerald-400">$ uptime --p</p>
                    <p className="text-text-primary dark:text-white">
                      ... 2 years, 4 months, 12 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
