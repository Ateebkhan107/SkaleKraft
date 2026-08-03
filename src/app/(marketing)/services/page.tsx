"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Bot, TrendingUp, Clapperboard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const detailedServices = [
  {
    id: "web",
    title: "Website Development",
    icon: <Monitor className="w-12 h-12 text-primary" />,
    description: "Websites, landing pages, dashboards, and custom web apps built to be fast, clear, and easy to use.",
    features: ["Business Websites", "Portfolio Websites", "Landing Pages", "Ecommerce Websites", "Custom Web Applications"],
  },
  {
    id: "app",
    title: "App Development",
    icon: <Smartphone className="w-12 h-12 text-secondary" />,
    description: "Mobile apps for Android and iOS with clean product flows and reliable backend support.",
    features: ["Android Apps", "iOS Apps", "Cross Platform Apps", "AI Applications"],
  },
  {
    id: "ai",
    title: "AI Agents",
    icon: <Bot className="w-12 h-12 text-primary" />,
    description: "AI chatbots, agents, and workflows that help with support, sales, operations, and internal knowledge.",
    features: ["Customer Support Agents", "Lead Qualification Agents", "Sales Agents", "Knowledge Base Agents", "Workflow Automation"],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: <TrendingUp className="w-12 h-12 text-secondary" />,
    description: "Simple digital campaigns, launch content, and search-friendly improvements for growing businesses.",
    features: ["SEO", "Google Ads", "Social Media Marketing", "Email Marketing"],
  },
  {
    id: "editing",
    title: "Editing",
    icon: <Clapperboard className="w-12 h-12 text-primary" />,
    description: "Clean edits, short-form cuts, and launch-ready visuals that make the story land faster.",
    features: ["Short-Form Editing", "Product Videos", "Social Cuts"],
  },
  {
    id: "automation",
    title: "Automation",
    icon: <Zap className="w-12 h-12 text-secondary" />,
    description: "Connect tools, reduce repeat work, and make everyday business systems easier to manage.",
    features: ["CRM Automation", "Email Automation", "WhatsApp Automation"],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="container mx-auto px-4 md:px-6 mb-24 text-center max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6"
        >
          Our <span className="text-primary">Services</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Useful websites, apps, AI systems, and creative work for businesses that want to move clearly.
        </motion.p>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col space-y-24">
          {detailedServices.map((service, index) => (
            <motion.div 
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2">
                <div className="bg-foreground/5 w-24 h-24 rounded-2xl flex items-center justify-center mb-8">
                  {service.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  {service.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  <Link href={`/contact?service=${service.title}`}>
                    Discuss your project
                  </Link>
                </Button>
              </div>
              <div className="w-full md:w-1/2">
                <div className="rounded-3xl border border-foreground/10 bg-card p-6">
                  <p className="text-sm uppercase tracking-[0.22em] text-primary">What this can include</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="rounded-2xl border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground/75">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
