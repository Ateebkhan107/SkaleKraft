"use client";

import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Digital Products",
    description: "End-to-end product development. From foundational architecture to premium user interfaces, we build applications that scale beautifully.",
  },
  {
    number: "02",
    title: "Brand Identity",
    description: "Crafting timeless visual systems. We design brand identities that resonate deeply and position you as a leader in your industry.",
  },
  {
    number: "03",
    title: "AI Integration",
    description: "Seamlessly embedding artificial intelligence into your workflows to automate processes and create magical user experiences.",
  },
  {
    number: "04",
    title: "Creative Direction",
    description: "Guiding the creative vision for your entire brand ecosystem, ensuring every touchpoint feels cohesive, premium, and purposeful.",
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-[#0B0B0B]">
      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.h2 
          className="text-4xl md:text-6xl font-light text-white tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Expertise
        </motion.h2>
      </div>

      <div className="flex flex-col border-t border-white/10">
        {services.map((service, index) => (
          <motion.div
            key={service.number}
            className="group relative flex flex-col md:flex-row md:items-center py-12 md:py-16 border-b border-white/10 transition-colors duration-500 hover:bg-white/[0.02]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Number */}
            <div className="w-24 mb-6 md:mb-0">
              <span className="text-[#805948] font-medium text-lg tracking-wider">
                {service.number}
              </span>
            </div>

            {/* Title */}
            <div className="md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-2xl md:text-4xl font-light text-white tracking-tight transition-colors duration-300 group-hover:text-[#805948]">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <div className="md:w-1/2 md:ml-auto">
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
                {service.description}
              </p>
            </div>
            
            {/* Hover Indicator (Line) */}
            <div className="absolute bottom-[-1px] left-0 h-[1px] bg-[#805948] w-0 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
