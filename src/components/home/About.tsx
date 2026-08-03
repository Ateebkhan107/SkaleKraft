"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-[#0B0B0B]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left: Powerful statements */}
        <div className="flex flex-col gap-12">
          <motion.h2 
            className="text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            We don&apos;t just build software. <br />
            <span className="text-[#805948]">We build legacies.</span>
          </motion.h2>

          <motion.div
            className="space-y-6 text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              SkaleKraft was founded on a simple principle: digital experiences should feel human. 
              We blend state-of-the-art engineering with meticulous design to create products that 
              are not only functional, but unforgettable.
            </p>
          </motion.div>

          {/* Simple Timeline */}
          <motion.div 
            className="mt-8 flex flex-col gap-6 border-l border-white/10 pl-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <span className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-[#805948]"></span>
              <h4 className="text-white font-medium text-lg">Discovery</h4>
              <p className="text-white/40 text-sm mt-1">Understanding your vision and constraints.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-white/20"></span>
              <h4 className="text-white font-medium text-lg">Design & Architecture</h4>
              <p className="text-white/40 text-sm mt-1">Crafting the blueprint for success.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[37px] top-1.5 w-2 h-2 rounded-full bg-white/20"></span>
              <h4 className="text-white font-medium text-lg">Execution</h4>
              <p className="text-white/40 text-sm mt-1">Building with precision and care.</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Portrait Image */}
        <motion.div 
          className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-auto lg:mr-0 rounded-2xl md:rounded-[3rem] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop" 
            alt="SkaleKraft Studio"
            fill
            className="object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        </motion.div>
      </div>
    </section>
  );
}
