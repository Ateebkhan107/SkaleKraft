"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Projects Completed", value: "150+" },
  { label: "Apps Built", value: "40+" },
  { label: "AI Systems Built", value: "25+" },
  { label: "Leads Generated", value: "2M+" },
];

export function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-6xl font-heading font-black text-foreground mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-card border border-foreground/10 rounded-3xl p-10 md:p-20 shadow-2xl shadow-primary/5"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">scale</span> your business?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book a free strategy call to discuss your project. We&apos;ll analyze your current setup and provide actionable insights.
          </p>
          <Button asChild size="lg" className="h-16 px-10 bg-foreground text-background hover:bg-foreground/90 text-xl group rounded-full w-full sm:w-auto font-bold">
            <Link href="/contact">
              Book Strategy Call
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
