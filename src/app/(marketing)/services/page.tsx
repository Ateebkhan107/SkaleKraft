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
    description: "We build high-performance, beautifully designed marketing websites and complex web applications that convert visitors into customers.",
    features: ["Business Websites", "Portfolio Websites", "Landing Pages", "Ecommerce Websites", "Custom Web Applications"],
  },
  {
    id: "app",
    title: "App Development",
    icon: <Smartphone className="w-12 h-12 text-secondary" />,
    description: "Native and cross-platform mobile experiences that users love to engage with, backed by scalable cloud infrastructure.",
    features: ["Android Apps", "iOS Apps", "Cross Platform Apps", "AI Applications"],
  },
  {
    id: "ai",
    title: "AI Agents",
    icon: <Bot className="w-12 h-12 text-primary" />,
    description: "Custom AI solutions to automate support, qualify leads, and scale operations 24/7 without adding headcount.",
    features: ["Customer Support Agents", "Lead Qualification Agents", "Sales Agents", "Knowledge Base Agents", "Workflow Automation"],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: <TrendingUp className="w-12 h-12 text-secondary" />,
    description: "Data-driven SEO, ads, and social campaigns that drive measurable revenue and dominate your market.",
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
    description: "Connect your tools and eliminate manual tasks with bespoke automation workflows.",
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
          Comprehensive digital solutions designed to help ambitious companies scale faster and dominate their markets.
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
              <div className="w-full md:w-1/2 h-[400px] bg-card border border-foreground/10 rounded-3xl overflow-hidden relative group">
                 {/* Placeholder for 3D graphic or screenshot */}
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <span className="font-heading font-bold text-foreground/20 text-4xl tracking-widest">{service.title.toUpperCase()}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
