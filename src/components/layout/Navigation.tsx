"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
        isScrolled ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white group">
          Skale<span className="text-[#805948] transition-colors duration-300 group-hover:text-white">Kraft</span>
        </Link>

        {/* Center: Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="#collection" className="hover:text-white transition-colors duration-300">
            Work
          </Link>
          <Link href="#services" className="hover:text-white transition-colors duration-300">
            Services
          </Link>
          <Link href="#about" className="hover:text-white transition-colors duration-300">
            About
          </Link>
        </nav>

        {/* Right: CTA (Can trigger EnquiryPanel or anchor) */}
        <div className="flex items-center">
          {/* We'll use the floating panel instead, but keeping a minimal link here if desired */}
          <button 
            onClick={() => window.dispatchEvent(new Event("open-enquiry"))}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-transparent border border-white/20 rounded-full hover:border-[#805948] hover:bg-[#805948]/10 transition-all duration-300 group"
          >
            Start Project
            <span className="ml-2 w-1.5 h-1.5 rounded-full bg-[#805948] group-hover:scale-150 transition-transform duration-300"></span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
