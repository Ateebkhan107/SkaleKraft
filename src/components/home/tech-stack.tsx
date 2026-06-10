"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js" },
  { name: "React" },
  { name: "Supabase" },
  { name: "OpenAI" },
  { name: "AWS" },
  { name: "Node.js" },
  { name: "PostgreSQL" },
];

export default function TechStack() {
  return (
    <section className="py-12 border-y border-foreground/5 bg-foreground/[0.02]">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Trusted Technologies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-xl md:text-2xl font-heading font-bold text-foreground/80 hover:text-foreground transition-colors cursor-default"
            >
              {tech.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
