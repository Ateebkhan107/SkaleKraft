"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Bot, TrendingUp, Palette, Zap } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Website Development",
    description: "High-performance, beautifully designed marketing websites and complex web applications.",
    icon: <Monitor className="w-8 h-8 text-primary" />,
    delay: 0.1,
  },
  {
    title: "App Development",
    description: "Native and cross-platform mobile experiences that users love to engage with.",
    icon: <Smartphone className="w-8 h-8 text-secondary" />,
    delay: 0.2,
  },
  {
    title: "AI Agents",
    description: "Custom AI solutions to automate support, qualify leads, and scale operations.",
    icon: <Bot className="w-8 h-8 text-primary" />,
    delay: 0.3,
  },
  {
    title: "Digital Marketing",
    description: "Data-driven SEO, ads, and social campaigns that drive measurable revenue.",
    icon: <TrendingUp className="w-8 h-8 text-secondary" />,
    delay: 0.4,
  },
  {
    title: "Branding",
    description: "Premium visual identities and UX/UI design that command authority in your market.",
    icon: <Palette className="w-8 h-8 text-primary" />,
    delay: 0.5,
  },
  {
    title: "Automation",
    description: "Connect your tools and eliminate manual tasks with bespoke automation workflows.",
    icon: <Zap className="w-8 h-8 text-secondary" />,
    delay: 0.6,
  },
];

export default function ServiceEcosystem() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">
            Interactive Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ecosystem</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            An integrated approach to digital growth. We combine world-class engineering, design, and AI to build systems that scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: service.delay }}
            >
              <Link href={`/services`} className="block h-full">
                <div className="h-full bg-card/50 backdrop-blur-sm border border-foreground/5 p-8 rounded-2xl hover:bg-card hover:border-primary/30 transition-all duration-300 group">
                  <div className="bg-foreground/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
}
