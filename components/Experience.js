"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "PugArch Technology Pvt. Ltd.",
    period: "Nov 2025 – Present",
    points: [
      "Architecting scalable web applications using Java/Spring Boot and MERN",
      "Focused on low-latency APIs and cloud deployment",
    ],
    tech: ["Java", "Spring Boot", "React", "Node.js", "AWS"],
  },
  {
    title: "Software Development Intern",
    company: "COEP Technological University",
    period: "Sep 2025 – Dec 2025",
    points: [
      "Engineered mathematical simulation modules and interactive learning components",
    ],
    tech: ["JavaScript", "React", "UI/UX"],
  },
  {
    title: "Full Stack Intern",
    company: "CODTECH IT Solutions",
    period: "Jul 2024 – Aug 2024",
    points: ["Developed e-commerce features using MongoDB, Express, and React"],
    tech: ["MongoDB", "Express", "React"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-text-primary mb-4 text-center tracking-tighter uppercase"
        >
          <span className="gradient-text">Experience</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text-muted text-center mb-10 max-w-2xl mx-auto font-mono text-xs uppercase tracking-[0.2em]"
        >
          {"// professional_chronology"}
        </motion.p>
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px md:-translate-x-1/2" />
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 md:pl-8 md:pr-8 md:text-right md:flex md:flex-col md:items-end">
                <div className="flex items-center gap-3 md:flex-row-reverse">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1 * i,
                    }}
                    whileHover={{ scale: 1.2 }}
                    className="relative w-4 h-4 rounded-full bg-accent border-4 border-surface flex-shrink-0 ring-4 ring-accent/20"
                  />
                  <div>
                    <p className="text-sm text-accent font-mono">
                      {exp.period}
                    </p>
                    <h3 className="font-semibold text-text-primary text-lg">
                      {exp.title}
                    </h3>
                    <p className="text-text-secondary">{exp.company}</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 md:pr-8 md:text-left">
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl bg-surface-elevated border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
                >
                  <ul className="space-y-2 text-text-secondary text-sm mb-4">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 md:justify-start">
                    {exp.tech.map((t) => (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium cursor-default"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
