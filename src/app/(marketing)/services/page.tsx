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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-3 lg:gap-5">
          {detailedServices.map((service) => (
            <motion.div 
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex min-w-0 flex-col rounded-[22px] border border-foreground/10 bg-card p-3 sm:rounded-3xl sm:p-5 lg:p-6"
            >
              <div className="w-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/5 sm:mb-6 sm:h-16 sm:w-16 [&_svg]:h-7 [&_svg]:w-7 sm:[&_svg]:h-9 sm:[&_svg]:w-9">
                  {service.icon}
                </div>
                <h2 className="mb-3 text-base font-heading font-bold leading-tight text-foreground sm:text-xl lg:text-2xl">
                  {service.title}
                </h2>
                <p className="hidden text-sm leading-6 text-muted-foreground sm:block">
                  {service.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="hidden items-center gap-2 rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/70 sm:flex">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="mt-4 min-h-11 w-full bg-foreground text-background hover:bg-foreground/90 sm:mt-6">
                  <Link href={`/contact?service=${service.title}`}>
                    Discuss
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
