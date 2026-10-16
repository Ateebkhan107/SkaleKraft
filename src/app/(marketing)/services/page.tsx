"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Bot,
  Clapperboard,
  ChevronDown,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import BackHomeLink from "@/components/ui/BackHomeLink";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import InteractiveCanvas3D from "@/components/3d/InteractiveCanvas3D";

const detailedServices = [
  {
    id: "websites",
    title: "Websites & Web Platforms",
    badge: "Website",
    icon: Monitor,
    accentColor: "#3B82F6",
    description:
      "We design and build fast, responsive websites that make your business clear, credible, and easy to choose. From a focused landing page to a full SaaS platform, every experience is planned around real user journeys, measurable conversion goals, and a codebase that can grow with you.",
    features: [
      "Brand and business websites",
      "Landing pages and campaign microsites",
      "E-commerce stores and payment flows",
      "SaaS products, portals, and dashboards",
      "CMS, booking, and custom integrations",
      "SEO, accessibility, speed, and analytics",
    ],
    idealFor: "Startups, service businesses, e-commerce brands, and teams replacing an outdated or underperforming website.",
    outcome: "A polished, search-ready website that communicates your value quickly, performs beautifully on every device, and is easy to maintain after launch.",
  },
  {
    id: "apps",
    title: "Mobile Apps for iOS & Android",
    badge: "App",
    icon: Smartphone,
    accentColor: "#A855F7",
    description:
      "We turn product ideas and operational workflows into dependable mobile apps for iOS and Android. Our team handles the full journey—from product strategy and interface design to backend engineering, testing, store submission, and the improvements that follow real-world use.",
    features: [
      "Product strategy and user-flow mapping",
      "Native-feeling cross-platform development",
      "Accounts, subscriptions, and secure payments",
      "Offline support, realtime sync, and notifications",
      "Scalable APIs, databases, and admin tools",
      "App Store and Play Store launch support",
    ],
    idealFor: "Founders validating a mobile product, businesses digitising a workflow, and teams expanding an existing platform to mobile.",
    outcome: "A production-ready app with intuitive flows, reliable infrastructure, and a launch plan designed for long-term iteration—not just a one-time release.",
  },
  {
    id: "ai",
    title: "AI Systems, Agents & Automation",
    badge: "AI",
    icon: Bot,
    accentColor: "#06B6D4",
    description:
      "We build practical AI systems around the work your team already does. That can mean an assistant grounded in your company knowledge, an agent that qualifies leads, a document pipeline that extracts and routes information, or an automated workflow that removes hours of repetitive operations.",
    features: [
      "Customer support and sales assistants",
      "RAG search across private company knowledge",
      "Voice agents and conversational interfaces",
      "Document extraction, OCR, and classification",
      "Multi-step agents with human approval controls",
      "CRM, email, WhatsApp, and internal-tool automation",
    ],
    idealFor: "Support, sales, operations, and knowledge-heavy teams with repetitive work, fragmented information, or slow response times.",
    outcome: "A secure, measurable AI workflow connected to your real tools and data, with guardrails, monitoring, and human oversight built in from the beginning.",
  },
  {
    id: "creative",
    title: "Creative, Video & Motion Design",
    badge: "Creative",
    icon: Clapperboard,
    accentColor: "#F97316",
    description:
      "We shape raw ideas and footage into clear, memorable visual stories. Whether the goal is stronger brand presence, a product launch, or a consistent stream of social content, we combine editorial judgment, motion, sound, and platform-aware design to hold attention without losing the message.",
    features: [
      "Reels, Shorts, and social-first content",
      "Long-form YouTube and branded films",
      "Product launches and performance ad creatives",
      "Motion graphics, titles, and explainers",
      "Thumbnails, campaign assets, and visual systems",
      "Color grading, sound design, and delivery formats",
    ],
    idealFor: "Creators, product teams, agencies, and brands that need sharper storytelling and a repeatable visual language across channels.",
    outcome: "A cohesive set of platform-ready creative assets that feels unmistakably yours, communicates faster, and gives every campaign a professional finish.",
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
    a: "Our creative studio covers short-form social content, long-form YouTube editing, brand and product films, ad creatives, motion graphics, thumbnails, color grading, sound design, and delivery in the right formats for each platform.",
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
    <main className="relative min-h-screen overflow-hidden bg-[#0B0B0B] px-4 pb-16 pt-28 text-white sm:px-6 md:px-10 md:pt-32">
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
        {/* Compact & Attractive Header with 3D Craft Visual */}
        <section className="mb-6 sm:mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
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
              <span className="text-white">
                Website Development, Mobile Apps,{" "}
              </span>
              <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text text-transparent pb-1 inline-block">
                AI & Creative Studio
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm max-w-xl"
            >
              SkaleKraft designs, engineers, and scales high-performance websites, custom iOS & Android mobile apps, autonomous AI agents, viral video edits, and digital marketing systems for ambitious brands.
            </motion.p>
          </div>

          <div className="relative mx-auto hidden h-[180px] w-[180px] shrink-0 items-center justify-center sm:flex lg:h-[210px] lg:w-[210px]">
            <div className="pointer-events-none absolute -inset-2 rounded-full bg-[#c19a88]/10 blur-2xl" />
            <InteractiveCanvas3D
              type="torus-knot"
              accentColor="#c19a88"
              secondaryColor="#805948"
              interactive={true}
              autoRotateSpeed={0.9}
              className="h-full w-full"
            />
          </div>
        </section>

        {/* Four detailed service pillars */}
        <section>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-2 lg:gap-5">
            {detailedServices.map((service, serviceIndex) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.035)_0%,rgba(16,16,16,0.95)_45%,rgba(10,10,10,0.98)_100%)] p-2.5 shadow-[0_16px_50px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_70px_rgba(0,0,0,0.6)] sm:rounded-[24px] sm:p-5 lg:p-6"
                >
                  {/* Top specular 3D light reflection highlight */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[18px] opacity-60 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-t-[24px]"
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
                    <div className="flex items-start justify-between gap-1.5 sm:items-center sm:gap-3">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/60 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition duration-300 group-hover:scale-105 group-hover:border-white/20 sm:h-11 sm:w-11 sm:rounded-xl"
                        style={{
                          boxShadow: `0 0 20px ${service.accentColor}25`,
                        }}
                      >
                        <Icon className="h-4 w-4 sm:h-5.5 sm:w-5.5" style={{ color: service.accentColor }} />
                      </div>

                      <div className="flex flex-col items-end gap-0.5 sm:flex-row sm:items-center sm:gap-2">
                        <span className="font-mono text-[9px] tracking-wider text-white/30 sm:text-[10px] sm:tracking-[0.18em]">0{serviceIndex + 1}</span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white/70 backdrop-blur-md sm:gap-1.5 sm:px-2.5 sm:text-[10px]">
                          <span
                            className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
                            style={{
                              backgroundColor: service.accentColor,
                              boxShadow: `0 0 6px ${service.accentColor}`,
                            }}
                          />
                          <span className="truncate max-w-[55px] sm:max-w-none">{service.badge}</span>
                        </span>
                      </div>
                    </div>

                    <h2 className="mt-2 text-xs font-medium tracking-tight text-white line-clamp-2 transition duration-200 group-hover:text-white sm:mt-4 sm:text-xl sm:line-clamp-none lg:text-2xl">
                      {service.title}
                    </h2>
                    <p className="mt-1 text-[10px] leading-relaxed text-white/58 line-clamp-2 sm:mt-2.5 sm:text-sm sm:leading-6 sm:line-clamp-none">
                      {service.description}
                    </p>

                    <div className="mt-2.5 border-t border-white/[0.07] pt-2 sm:mt-5 sm:pt-4">
                      <p className="text-[8px] uppercase tracking-[0.18em] text-white/35 sm:text-[10px] sm:tracking-[0.2em]">What we deliver</p>
                    </div>
                    <ul className="mt-1.5 grid grid-cols-1 gap-1 sm:mt-3 sm:grid-cols-2 sm:gap-2">
                      {service.features.map((feature, fIndex) => (
                        <li
                          key={fIndex}
                          className={`items-start gap-1 text-[9px] leading-tight text-white/62 transition duration-200 group-hover:text-white/80 sm:gap-2 sm:text-xs sm:leading-5 ${
                            fIndex >= 3 ? "hidden sm:flex" : "flex"
                          }`}
                        >
                          <CheckCircle2
                            className="mt-0.5 h-2.5 w-2.5 shrink-0 sm:h-3.5 sm:w-3.5"
                            style={{ color: service.accentColor }}
                          />
                          <span className="line-clamp-1 sm:line-clamp-2">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-2 grid grid-cols-1 gap-1.5 sm:mt-4 sm:grid-cols-2 sm:gap-2">
                      <div className="rounded-lg border border-white/[0.07] bg-black/20 p-1.5 sm:rounded-xl sm:p-3.5">
                        <p className="text-[8px] uppercase tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.18em]">Ideal for</p>
                        <p className="mt-0.5 text-[9px] leading-snug text-white/58 line-clamp-2 sm:mt-1 sm:text-xs sm:leading-relaxed sm:line-clamp-3">{service.idealFor}</p>
                      </div>
                      <div className="rounded-lg border border-white/[0.07] bg-black/20 p-1.5 sm:rounded-xl sm:p-3.5">
                        <p className="text-[8px] uppercase tracking-[0.16em] text-white/35 sm:text-[10px] sm:tracking-[0.18em]">The outcome</p>
                        <p className="mt-0.5 text-[9px] leading-snug text-white/58 line-clamp-2 sm:mt-1 sm:text-xs sm:leading-relaxed sm:line-clamp-3">{service.outcome}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive luxury Discuss Project CTA */}
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="group/btn mt-2.5 flex h-7 w-full items-center justify-center gap-1 rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] text-[10px] font-medium text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-200 hover:border-[#c19a88]/40 hover:bg-[#805948]/15 hover:text-white hover:shadow-[0_0_16px_rgba(193,154,136,0.2)] sm:mt-4 sm:h-8.5 sm:gap-1.5 sm:rounded-xl sm:text-xs"
                  >
                    <span>Discuss Project</span>
                    <ArrowUpRight className="h-3 w-3 text-[#c19a88] transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
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

        {/* Luxury Bottom CTA with 3D Cyber Sphere */}
        <section className="relative mt-12 overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(15,13,12,0.96)_45%,rgba(10,9,9,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-9">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#805948]/20 blur-[70px]" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[#c19a88]/15 blur-[70px]" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c19a88]/20 bg-[#805948]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#c19a88]">
                <Sparkles className="h-3 w-3 text-[#c19a88]" />
                Let&apos;s Build Together
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Have a project <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text text-transparent pb-1 inline-block">in mind?</span>
              </h2>
              <p className="mt-2 max-w-lg text-xs leading-relaxed text-white/55 sm:text-sm">
                Tell us about your website, mobile app, AI system, or creative project. We&apos;ll prepare a practical roadmap within 24 hours.
              </p>
              <div className="mt-5">
                <GlassmorphismCta
                  href="/contact"
                  label="Start Your Project"
                  avatarSrc="/images/skalekraft-logo.png"
                  avatarAlt="SkaleKraft logo"
                  shimmerColor="rgba(193,154,136,0.85)"
                />
              </div>
            </div>

            <div className="relative mx-auto hidden h-[220px] w-[220px] items-center justify-center sm:flex lg:h-[260px] lg:w-[260px]">
              <div className="pointer-events-none absolute -inset-2 rounded-full bg-[#c19a88]/10 blur-2xl" />
              <InteractiveCanvas3D
                type="cyber-sphere"
                accentColor="#c19a88"
                secondaryColor="#805948"
                interactive={true}
                autoRotateSpeed={1}
                className="h-full w-full"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
