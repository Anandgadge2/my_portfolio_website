"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "@/components/Typewriter";
import { HeroCodeAnimation } from "@/components/HeroCodeAnimation";

export function Hero() {
  const { scrollY } = useScroll({ layoutEffect: false });
  const orb1Y = useTransform(scrollY, [0, 600], [0, 120]);
  const orb2Y = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.98]);
  const heroY = useTransform(scrollY, [0, 500], [0, 60]);

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 animate-scanline"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: orb1Y }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]"
        />
        <motion.div
          style={{ y: orb2Y }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[130px]"
        />
      </div>

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 min-w-0 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs mb-6 uppercase tracking-widest font-black"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              AVAILABLE_FOR_WORK
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-text-primary mb-6 tracking-tighter"
            >
              <span className="block italic opacity-50 text-2xl sm:text-3xl md:text-4xl font-mono mb-2">
                anand_gadge.
              </span>
              <span
                className="gradient-text glitch-text"
                data-text="Build Better"
              >
                Build Better
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-xl md:text-2xl text-text-secondary mb-4 font-mono min-h-[1.5em] flex items-center justify-center lg:justify-start"
            >
              <Typewriter
                text="Full Stack Developer"
                speed={70}
                startDelay={600}
                cursorChar=""
                className="text-text-secondary font-bold"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-text-muted mb-10 max-w-xl mx-auto lg:mx-0 font-mono text-sm leading-relaxed"
            >
              /* Crafting scalable digital experiences with precision and modern
              engineering principles. Based in Nagpur, India. */
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Link
                href="#projects"
                onClick={(e) => scrollTo(e, "#projects")}
                className="group relative px-8 py-4 bg-text-primary text-surface rounded-full font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors">
                  PROJECTS_LIST
                </span>
              </Link>

              <Link
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                className="group px-8 py-4 border border-text-primary/20 rounded-full font-black text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-all font-mono"
              >
                CONTACT_DEV();
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 flex items-center justify-center relative lg:scale-110"
          >
            <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full" />
            <div className="w-full relative z-10">
              <HeroCodeAnimation />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
