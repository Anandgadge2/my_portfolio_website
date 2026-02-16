"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center w-fit pointer-events-auto">
      <Link 
        href="/" 
        onClick={scrollToTop}
        className="flex items-center gap-4 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full group-hover:bg-accent/40 transition-all duration-700 scale-125" />
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="relative z-10"
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={120}
              priority
              style={{ width: 'auto', height: 'auto' }}
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)] transition-all"
            />
          </motion.div>
        </div>
      </Link>
    </div>
  );
}
