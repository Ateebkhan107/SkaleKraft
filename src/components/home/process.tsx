"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "We analyze your business, market, and goals." },
  { num: "02", title: "Strategy", desc: "Crafting a bespoke roadmap for digital growth." },
  { num: "03", title: "Design", desc: "Creating premium, conversion-optimized interfaces." },
  { num: "04", title: "Development", desc: "Engineering scalable and robust architectures." },
  { num: "05", title: "Launch", desc: "Rigorous testing and seamless deployment." },
  { num: "06", title: "Scale", desc: "Continuous optimization and marketing campaigns." },
];

export default function Process() {
  return (
    <section className="py-32 bg-card border-y border-foreground/5 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">
            How We <span className="text-primary">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A battle-tested methodology designed to deliver exceptional results and $50M startup aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 bg-background border border-foreground/5 rounded-2xl group hover:border-primary/50 transition-colors"
            >
              <div className="absolute top-0 right-0 p-6 text-6xl font-heading font-black text-foreground/[0.03] group-hover:text-primary/[0.05] transition-colors pointer-events-none">
                {step.num}
              </div>
              <div className="text-primary font-heading font-bold mb-4">{step.num}.</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
