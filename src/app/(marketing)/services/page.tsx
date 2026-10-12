"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Bot, TrendingUp, Clapperboard, Zap, ChevronDown, CheckCircle2 } from "lucide-react";
import BackHomeLink from "@/components/ui/BackHomeLink";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";

const detailedServices = [
  {
    id: "web",
    title: "Website Development & Custom Web Apps",
    badge: "Web Development",
    icon: Monitor,
    iconColor: "text-[#3B82F6]",
    iconBg: "bg-[#3B82F6]/10 border-[#3B82F6]/20",
    description:
      "Full-stack website development, high-converting landing pages, e-commerce platforms, SaaS dashboards, and modern web applications engineered with Next.js, React, and TypeScript.",
    features: [
      "Custom Business Websites",
      "High-Converting Landing Pages",
      "SaaS Platforms & Dashboards",
      "E-Commerce Solutions",
      "SEO & Performance Optimized",
    ],
  },
  {
    id: "app",
    title: "Mobile App Development (iOS & Android)",
    badge: "App Development",
    icon: Smartphone,
    iconColor: "text-[#A855F7]",
    iconBg: "bg-[#A855F7]/10 border-[#A855F7]/20",
    description:
      "Native and universal mobile apps for Apple iOS and Google Android with 60 FPS fluid interactions, offline caching, push notifications, and resilient cloud backends built using React Native and Expo.",
    features: [
      "iOS & Android Mobile Apps",
      "Cross-Platform React Native",
      "App Store & Play Store Launch",
      "Scalable Backend APIs",
      "Realtime Sync & Notifications",
    ],
  },
  {
    id: "ai",
    title: "AI Agents & Workflow Automation",
    badge: "AI Systems",
    icon: Bot,
    iconColor: "text-[#22D3EE]",
    iconBg: "bg-[#22D3EE]/10 border-[#22D3EE]/20",
    description:
      "Autonomous AI chatbots, customer support agents, internal knowledge retrieval (RAG) systems, document intelligence, and automated pipelines powered by OpenAI, Claude, and Gemini.",
    features: [
      "Custom AI Chatbots",
      "Autonomous Support Agents",
      "Document AI & RAG Search",
      "Workflow Process Automation",
      "LLM API Integrations",
    ],
  },
  {
    id: "editing",
    title: "Video Editing & Creative Motion Studio",
    badge: "Video Editing",
    icon: Clapperboard,
    iconColor: "text-[#F97316]",
    iconBg: "bg-[#F97316]/10 border-[#F97316]/20",
    description:
      "High-retention short-form video editing for Instagram Reels, YouTube Shorts, and TikTok, long-form YouTube cuts, commercial ad creatives, motion graphics, and sound design.",
    features: [
      "Short-Form Reels & Shorts",
      "Long-Form YouTube Editing",
      "High-Converting Ad Creatives",
      "Motion Graphics & Titles",
      "Color Grading & Audio Polish",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing & Social Media Agency",
    badge: "Digital Marketing",
    icon: TrendingUp,
    iconColor: "text-[#D8A25A]",
    iconBg: "bg-[#D8A25A]/10 border-[#D8A25A]/20",
    description:
      "End-to-end digital marketing and social media growth management. We combine search engine optimization (SEO), Meta & Google ad campaigns, content creation, and conversion funnels.",
    features: [
      "Social Media Management",
      "Search Engine Optimization (SEO)",
      "Google & Meta Ad Campaigns",
      "Content Strategy & Calendars",
      "Conversion Rate Optimization",
    ],
  },
  {
    id: "automation",
    title: "Enterprise Automation & System Integrations",
    badge: "Automation",
    icon: Zap,
    iconColor: "text-[#10B981]",
    iconBg: "bg-[#10B981]/10 border-[#10B981]/20",
    description:
      "Connect disparate business tools, automate CRM pipelines, sync databases, trigger WhatsApp and email workflows, and eliminate repetitive manual busywork.",
    features: [
      "CRM & Lead Flow Automation",
      "WhatsApp & Email Automations",
      "Multi-Tool Webhook Bridges",
      "Payment & Invoicing Workflows",
      "Custom API Connectors",
    ],
  },
];

const serviceFaqs = [
  {
    q: "What website development services does SkaleKraft offer?",
    a: "SkaleKraft builds fast, custom websites, landing pages, SaaS platforms, portals, e-commerce stores, and dashboards using modern technologies like Next.js, React, TypeScript, and Supabase.",
  },
  {
    q: "Can you build mobile apps for both iOS and Android?",
    a: "Yes. We develop cross-platform and native mobile apps using React Native and Expo, allowing you to launch high-performance apps on both the Apple App Store and Google Play Store from a unified, maintainable codebase.",
  },
  {
    q: "What does your video editing and creative studio service include?",
    a: "Our video editing services cover viral short-form cuts for Instagram Reels, YouTube Shorts, and TikTok, long-form YouTube editing, high-converting ad creatives, motion graphics, color grading, sound design, and custom thumbnail creation.",
  },
  {
    q: "What digital marketing and social media services do you provide?",
    a: "As a digital marketing and social media agency, we manage social media channels, search engine optimization (SEO) to rank your website at the top of Google, targeted paid ad campaigns (Meta, Google, LinkedIn), and high-converting marketing funnels.",
  },
  {
    q: "How can custom AI agents and automation help my business?",
    a: "We build custom AI chatbots, autonomous customer service agents, internal document search (RAG) tools, and automated workflows that eliminate repetitive tasks, answer customer inquiries 24/7, and scale operations without added headcount.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-5 pb-24 pt-28 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <BackHomeLink className="mb-10" />

        {/* Header */}
        <section className="mb-16 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Full-Service Digital Studio</p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl"
          >
            Website Development, Mobile Apps, <span className="text-[#a97862]">AI & Creative Studio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-white/58"
          >
            SkaleKraft designs, engineers, and scales high-performance websites, custom iOS & Android mobile apps, autonomous AI agents, viral video edits, and digital marketing systems for ambitious brands.
          </motion.p>
        </section>

        {/* Services List */}
        <section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {detailedServices.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div 
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className="flex min-w-0 flex-col justify-between rounded-[24px] border border-white/10 bg-[#101010] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition duration-300 hover:border-white/20 sm:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${service.iconBg}`}>
                        <Icon className={`h-7 w-7 ${service.iconColor}`} />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#c19a88]">
                        {service.badge}
                      </span>
                    </div>

                    <h2 className="mt-5 text-xl font-medium tracking-tight text-white sm:text-2xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-white/55">
                      {service.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.025] px-2.5 py-1 text-xs text-white/60">
                          <CheckCircle2 className="h-3 w-3 text-[#c19a88]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <GlassmorphismCta
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    label="Discuss Project"
                    avatarSrc="/images/skalekraft-logo.png"
                    avatarAlt="SkaleKraft logo"
                    shimmerColor="rgba(193,154,136,0.75)"
                    className="mt-6 w-full justify-center"
                  />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SEO FAQ Section */}
        <section className="mt-20 border-t border-white/10 pt-16">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Common Questions</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-white/50">
              Everything you need to know about working with our engineering and creative teams.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {serviceFaqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010] transition-colors hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-medium text-white sm:text-lg"
                  >
                    <span>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-[#c19a88]"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-5 pb-5 text-sm leading-7 text-white/60 sm:text-base">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-20 rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,#12100f,#0d0d0d_48%,#11100f)] p-8 text-center sm:p-12">
          <h2 className="text-3xl font-medium sm:text-4xl">Have a project in mind?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/55">
            Tell us about your website, mobile app, video editing, or AI automation goals. We&apos;ll prepare a practical roadmap within 24 hours.
          </p>
          <GlassmorphismCta
            href="/contact"
            label="Start Your Project"
            avatarSrc="/images/skalekraft-logo.png"
            avatarAlt="SkaleKraft logo"
            shimmerColor="rgba(193,154,136,0.75)"
            className="mx-auto mt-7"
          />
        </section>
      </div>
    </main>
  );
}
