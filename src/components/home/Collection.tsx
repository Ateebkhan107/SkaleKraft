"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: "aether",
    title: "Aether",
    category: "Digital Product",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: "lumina",
    title: "Lumina",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "nova",
    title: "Nova",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function Collection() {
  return (
    <section id="collection" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-[#0B0B0B]">
      <div className="mb-20 flex flex-col items-start gap-4">
        <motion.h2 
          className="text-4xl md:text-6xl font-light text-white tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Collection
        </motion.h2>
        <motion.p
          className="text-white/50 text-lg md:text-xl max-w-xl font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          A curated selection of our finest digital experiences. Built with precision and passion.
        </motion.p>
      </div>

      <div className="flex flex-col gap-24">
        {projects.map((project, index) => (
          <Link href={`/collection/${project.id}`} key={project.id}>
            <motion.div
              className="group relative block w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl transition-all duration-700 hover:border-[#805948]/50 hover:shadow-[0_0_40px_-10px_rgba(128,89,72,0.3)]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Landscape Thumbnail container */}
              <div className="relative aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                  priority={index === 0}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-80" />

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col justify-end">
                  <div className="overflow-hidden">
                    <motion.div
                      className="flex items-end gap-4 transform transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-2 md:group-hover:-translate-y-4"
                    >
                      <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight">
                        {project.title}
                      </h3>
                    </motion.div>
                  </div>
                  
                  <div className="overflow-hidden mt-2">
                    <div className="transform translate-y-full opacity-0 transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-[#805948] text-sm md:text-base font-medium tracking-wide uppercase">
                        {project.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
