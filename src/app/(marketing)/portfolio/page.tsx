"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "FinTech Dashboard Pro",
    category: "Web Application",
    image: "/images/portfolio-1.jpg", // Placeholder
    tech: ["Next.js", "TailwindCSS", "Supabase"],
    results: "200% Increase in User Retention",
  },
  {
    title: "AI Legal Assistant",
    category: "AI Agent",
    image: "/images/portfolio-2.jpg",
    tech: ["OpenAI", "React", "Node.js"],
    results: "80% Reduction in Query Time",
  },
  {
    title: "E-Commerce Replatforming",
    category: "Website Development",
    image: "/images/portfolio-3.jpg",
    tech: ["Shopify Plus", "React", "Sanity CMS"],
    results: "$2.5M Increase in Q1 Revenue",
  },
  {
    title: "HealthTech Mobile App",
    category: "App Development",
    image: "/images/portfolio-4.jpg",
    tech: ["React Native", "Firebase", "HealthKit"],
    results: "50k+ Downloads in Month 1",
  },
];

export default function PortfolioPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      {/* Header */}
      <section className="container mx-auto px-4 md:px-6 mb-20 text-center max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6"
        >
          Featured <span className="text-primary">Work</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Explore how we've helped industry leaders build scalable technology and achieve explosive growth.
        </motion.p>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden mb-6 bg-card border border-foreground/10">
                {/* Fallback gradient if no image */}
                <div className="absolute inset-0 bg-gradient-to-br from-card to-background group-hover:scale-105 transition-transform duration-700"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="font-heading font-bold text-4xl tracking-widest uppercase">{project.title}</span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-14 px-8 text-lg transform translate-y-8 group-hover:translate-y-0 transition-all duration-300">
                    <Link href={`/case-studies`}>
                      Read Case Study <ArrowUpRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-primary font-medium">{project.category}</p>
                  <p className="text-sm font-medium text-foreground/50 bg-foreground/5 px-3 py-1 rounded-full">
                    {project.results}
                  </p>
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-medium text-muted-foreground bg-card border border-foreground/10 px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
