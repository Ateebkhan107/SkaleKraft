"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Bot,
  TrendingUp,
  Clapperboard,
  Zap,
  ChevronDown,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import BackHomeLink from "@/components/ui/BackHomeLink";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";

const detailedServices = [
  {
    id: "web",
    title: "Website Development & Custom Web Apps",
    badge: "Web Development",
    icon: Monitor,
    accentColor: "#3B82F6",
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
    accentColor: "#A855F7",
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
    accentColor: "#06B6D4",
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
    accentColor: "#F97316",
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
    accentColor: "#EAB308",
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
    accentColor: "#10B981",
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
    a: "Yes. We develop cross-platform and native mobile apps using React Native and Expo, allowing you to launch high-performance apps on both the Apple App Store and Google Play Store from a unified codebase.",
  },
  {
    q: "What does your video editing and creative studio service include?",
    a: "Our video editing services cover viral short-form cuts for Instagram Reels, YouTube Shorts, and TikTok, long-form YouTube editing, high-converting ad creatives, motion graphics, and audio polish.",
  },
  {
    q: "What digital marketing and social media services do you provide?",
    a: "We manage social channels, execute SEO to rank your website on Google, run targeted paid ad campaigns (Meta, Google, LinkedIn), and engineer high-converting marketing funnels.",
  },
  {
    q: "How can custom AI agents and automation help my business?",
    a: "We build custom AI chatbots, autonomous support agents, internal knowledge retrieval (RAG) tools, and automated pipelines that eliminate repetitive tasks and scale operations 24/7.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const renderFaq = (faq: (typeof serviceFaqs)[0], index: number) => {
    const isOpen = openFaq === index;
    return (
      <div
        key={faq.q}
        className={`group/faq overflow-hidden rounded-xl border transition-all duration-200 ${
          isOpen
            ? "border-[#c19a88]/40 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(18,18,18,0.96))] shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_16px_rgba(193,154,136,0.08)]"
            : "border-white/10 bg-[#101010]/90 hover:border-white/20 hover:bg-white/[0.02]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpenFaq(isOpen ? null : index)}
          className="flex w-full items-center justify-between gap-3 p-3.5 text-left text-xs sm:text-sm font-medium text-white/90 transition hover:text-white"
        >
          <span className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-transform ${
                isOpen ? "bg-[#c19a88] shadow-[0_0_8px_rgba(193,154,136,0.8)]" : "bg-white/30 group-hover/faq:scale-125"
              }`}
            />
            <span>{faq.q}</span>
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.18 }}
            className={`shrink-0 rounded-full p-1 transition ${
              isOpen ? "bg-[#805948]/25 text-[#c19a88]" : "text-white/40 group-hover/faq:text-white/70"
            }`}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="border-t border-white/[0.06] px-4 pb-3.5 pt-2 text-xs sm:text-[13px] leading-relaxed text-white/60">
                {faq.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090909] px-4 pb-16 pt-20 text-white sm:px-6 md:px-10 lg:pt-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(128,89,72,.18),transparent_35%),radial-gradient(circle_at_85%_75%,rgba(193,154,136,.08),transparent_30%),radial-gradient(circle_at_50%_45%,rgba(255,255,255,.015),transparent_40%)]" />
      <FluidParticlesBackground
        theme="dark"
        particleCount={460}
        noiseIntensity={0.0024}
        particleSize={{ min: 0.45, max: 1.15 }}
        className="pointer-events-none fixed inset-0 z-0 h-screen bg-transparent opacity-50 dark:bg-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Compact & Attractive Header */}
        <section className="mb-6 sm:mb-8 max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <BackHomeLink className="!h-8 !px-3 !text-xs" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c19a88]/25 bg-[#805948]/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#e8c5b4] shadow-[0_0_14px_rgba(193,154,136,0.14)]">
              <Sparkles className="h-3 w-3 text-[#c19a88]" />
              Full-Service Digital Studio
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.65rem] leading-[1.12]"
          >
            <span className="bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
              Website Development, Mobile Apps,{" "}
            </span>
            <span className="bg-gradient-to-r from-[#eecaba] via-[#d4a38f] to-[#b3745a] bg-clip-text text-transparent">
              AI & Creative Studio
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm max-w-2xl"
          >
            SkaleKraft designs, engineers, and scales high-performance websites, custom iOS & Android mobile apps, autonomous AI agents, viral video edits, and digital marketing systems for ambitious brands.
          </motion.p>
        </section>

        {/* High-End Bento Service Cards */}
        <section>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3">
            {detailedServices.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.035)_0%,rgba(16,16,16,0.95)_45%,rgba(10,10,10,0.98)_100%)] p-4 shadow-[0_16px_50px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_70px_rgba(0,0,0,0.6)] sm:p-5"
                >
                  {/* Top specular 3D light reflection highlight */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[20px] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 75%, transparent 100%)",
                    }}
                  />

                  {/* Ambient hover illumination in card's signature color */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-25"
                    style={{ backgroundColor: service.accentColor }}
                  />

                  <div>
                    {/* Header: Icon with custom glow & badge */}
                    <div className="flex items-center justify-between gap-2.5">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/60 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition duration-300 group-hover:scale-105 group-hover:border-white/20"
                        style={{
                          boxShadow: `0 0 20px ${service.accentColor}25`,
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: service.accentColor }} />
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-md">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: service.accentColor,
                            boxShadow: `0 0 6px ${service.accentColor}`,
                          }}
                        />
                        {service.badge}
                      </span>
                    </div>

                    <h2 className="mt-3 text-sm font-medium tracking-tight text-white sm:text-base line-clamp-1 transition duration-200 group-hover:text-white">
                      {service.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/55 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Feature tags with color-coded checkmarks */}
                    <ul className="mt-3 flex flex-wrap gap-1">
                      {service.features.map((feature, fIndex) => (
                        <li
                          key={fIndex}
                          className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-0.5 text-[11px] text-white/60 transition duration-200 group-hover:border-white/15 group-hover:text-white/80"
                        >
                          <CheckCircle2
                            className="h-2.5 w-2.5 shrink-0"
                            style={{ color: service.accentColor }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive luxury Discuss Project CTA */}
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="group/btn mt-4 flex h-8.5 w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] text-xs font-medium text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-200 hover:border-[#c19a88]/40 hover:bg-[#805948]/15 hover:text-white hover:shadow-[0_0_16px_rgba(193,154,136,0.2)]"
                  >
                    <span>Discuss Project</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#c19a88] transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Compact & Refined 2-Column FAQ Section */}
        <section className="mt-10 border-t border-white/10 pt-8 sm:mt-12 sm:pt-10">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#c19a88]">Common Questions</p>
              <h2 className="mt-1 text-xl font-medium tracking-tight text-white sm:text-2xl">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="max-w-md text-xs text-white/45">
              Everything you need to know about working with our engineering and creative teams.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-2.5 md:grid-cols-2">
            <div className="space-y-2.5">
              {serviceFaqs.slice(0, 3).map((faq, idx) => renderFaq(faq, idx))}
            </div>
            <div className="space-y-2.5">
              {serviceFaqs.slice(3).map((faq, idx) => renderFaq(faq, idx + 3))}
            </div>
          </div>
        </section>

        {/* Luxury Bottom CTA */}
        <section className="relative mt-12 overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(15,13,12,0.96)_45%,rgba(10,9,9,0.98))] p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-9">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#805948]/20 blur-[70px]" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[#c19a88]/15 blur-[70px]" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c19a88]/20 bg-[#805948]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#c19a88]">
              <Sparkles className="h-3 w-3 text-[#c19a88]" />
              Let&apos;s Build Together
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-white/55 sm:text-sm">
              Tell us about your website, mobile app, video editing, or AI automation goals. We&apos;ll prepare a practical roadmap within 24 hours.
            </p>
            <GlassmorphismCta
              href="/contact"
              label="Start Your Project"
              avatarSrc="/images/skalekraft-logo.png"
              avatarAlt="SkaleKraft logo"
              shimmerColor="rgba(193,154,136,0.85)"
              className="mx-auto mt-5"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
