"use client";

import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      {["About", "Experience", "Projects", "Contact"].map((item) => (
        <Typography
          key={item}
          as="li"
          variant="small"
          className="p-1 font-semibold text-text-secondary transition-all hover:text-accent hover:scale-105"
        >
          <a href={`#${item.toLowerCase()}`} className="flex items-center">
            {item}
          </a>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="fixed top-0 z-[120] w-full px-4 py-4 md:px-8">
      <MTNavbar 
        className="mx-auto max-w-7xl px-4 md:px-6 py-2 glass rounded-3xl border-white/20 dark:border-white/5 shadow-2xl transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="scale-75 md:scale-90 origin-left">
            <Logo />
          </div>
          
          {/* Center: Nav Links */}
          <div className="hidden lg:block">
            {navList}
          </div>
          
          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center scale-90 md:scale-100">
              <ThemeToggle />
            </div>
            
            <Button
              variant="gradient"
              size="sm"
              className="hidden md:inline-block bg-accent text-white font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <span>Hire Me</span>
            </Button>
            
            <IconButton
              variant="text"
              className="lg:hidden h-10 w-10 text-text-primary hover:bg-accent/10 rounded-xl"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
        </div>
        
        <Collapse open={openNav}>
          <div className="mt-4 rounded-2xl bg-surface-elevated/80 p-6 backdrop-blur-xl border border-white/10 lg:hidden shadow-inner">
            {navList}
            <Button 
              fullWidth 
              variant="gradient" 
              size="md" 
              className="mt-6 bg-accent text-white font-bold py-3 rounded-xl"
            >
              <span>Hire Me</span>
            </Button>
          </div>
        </Collapse>
      </MTNavbar>
    </div>
  );
}