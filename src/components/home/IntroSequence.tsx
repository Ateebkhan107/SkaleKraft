"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroSequence({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // 2-second cinematic intro
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative text-4xl md:text-6xl font-bold tracking-tighter text-white overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              Skale<span className="text-[#805948]">Kraft</span>
              {/* Soft light sweeping effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content revealed with a subtle zoom-out effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: showIntro ? 0 : 1, scale: showIntro ? 0.95 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: showIntro ? 0 : 0 }}
        className="min-h-screen bg-[#050505]"
      >
        {children}
      </motion.div>
    </>
  );
}
