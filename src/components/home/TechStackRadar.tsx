"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Database,
  Layers,
  Smartphone,
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

type Category = "all" | "web" | "mobile" | "ai" | "backend";

interface TechItem {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  whyWeUseIt: string;
  clientRoi: string;
  badge: string;
  icon: any;
  accentColor: string;
  tags: string[];
}

const techStack: TechItem[] = [
  {
    id: "nextjs",
    name: "Next.js 15 & React 19",
    category: "web",
    tagline: "High-performance React framework for modern web applications.",
    whyWeUseIt:
      "Server Components, streaming SSR, and Turbopack deliver instant page renders and effortless global edge deployment.",
    clientRoi: "3x faster page speed, max SEO scores (95+ Lighthouse), and zero server-side bottlenecks.",
    badge: "Core Web Stack",
    icon: Code2,
    accentColor: "#D8A25A",
    tags: ["SSR / SSG", "App Router", "Edge Runtime", "SEO Ready"],
  },
  {
    id: "ai-agents",
    name: "OpenAI & Autonomous AI Agents",
    category: "ai",
    tagline: "Intelligent agent workflows, custom RAG pipelines, and LLM APIs.",
    whyWeUseIt:
      "Empowers apps to automate complex workflows, extract structured data, and provide conversational intelligence.",
    clientRoi: "Automates up to 80% of repetitive operational tasks and elevates product value.",
    badge: "AI Systems",
    icon: Cpu,
    accentColor: "#22D3EE",
    tags: ["RAG Pipelines", "Function Calling", "Embeddings", "Automation"],
  },
  {
    id: "supabase",
    name: "Supabase & PostgreSQL",
    category: "backend",
    tagline: "Scalable open-source backend with real-time sync & vector search.",
    whyWeUseIt:
      "Provides instant REST/GraphQL APIs, row-level security policies, real-time sockets, and pgvector storage for AI.",
    clientRoi: "Saves 60+ engineering hours on backend setup while guaranteeing enterprise security.",
    badge: "Database & Cloud",
    icon: Database,
    accentColor: "#805948",
    tags: ["PostgreSQL", "RLS Security", "Real-time", "Vector DB"],
  },
  {
    id: "react-native",
    name: "React Native & Expo",
    category: "mobile",
    tagline: "Production mobile apps for iOS and Android with single codebase.",
    whyWeUseIt:
      "Native device performance, shared business logic with web apps, and instant over-the-air (OTA) update capabilities.",
    clientRoi: "Cuts mobile development timelines in half without compromising on 60 FPS native feel.",
    badge: "Mobile Apps",
    icon: Smartphone,
    accentColor: "#8B5CF6",
    tags: ["iOS & Android", "Native Modules", "OTA Updates", "Shared Logic"],
  },
  {
    id: "tailwind-framer",
    name: "Tailwind CSS & Framer Motion",
    category: "web",
    tagline: "Calm, precision-crafted UI design system and micro-interactions.",
    whyWeUseIt:
      "Hardware-accelerated animations, responsive token systems, and clean aesthetics that make software feel alive.",
    clientRoi: "Dramatically boosts user engagement and retention with world-class polished visual design.",
    badge: "Design & UX",
    icon: Layers,
    accentColor: "#F97316",
    tags: ["60 FPS Motion", "Design Tokens", "Dark Mode", "Fluid UX"],
  },
];

const categories: { label: string; value: Category }[] = [
  { label: "All Tech", value: "all" },
  { label: "Web", value: "web" },
  { label: "AI Systems", value: "ai" },
  { label: "Backend & DB", value: "backend" },
  { label: "Mobile", value: "mobile" },
];

export default function TechStackRadar() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [activeTechId, setActiveTechId] = useState<string>("nextjs");

  const filteredTech = techStack.filter(
    (t) => selectedCategory === "all" || t.category === selectedCategory
  );

  const activeTech = techStack.find((t) => t.id === activeTechId) || techStack[0];

  return (
    <section className="relative overflow-hidden bg-[#070707] py-20 text-white sm:py-28" id="tech-stack">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(128,89,72,0.12),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#805948]/30 bg-[#805948]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c19a88]">
            <Sparkles className="h-3.5 w-3.5" />
            Engineering & Technology
          </span>
          <h2 className="mt-6 text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
            Software built with <span className="font-semibold text-white">modern stack architecture</span>.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">
            We don’t use legacy templates or bloated monoliths. Every product is built on a battle-tested, high-performance technology stack designed to scale.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                const first = techStack.find(
                  (t) => cat.value === "all" || t.category === cat.value
                );
                if (first) setActiveTechId(first.id);
              }}
              className={`rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition duration-300 ${
                selectedCategory === cat.value
                  ? "border border-[#805948] bg-[#805948]/24 text-white shadow-[0_0_20px_rgba(128,89,72,0.2)]"
                  : "border border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid + Detail View */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Tech List */}
          <div className="grid gap-3 lg:col-span-5">
            {filteredTech.map((tech) => {
              const Icon = tech.icon;
              const isSelected = tech.id === activeTechId;

              return (
                <motion.button
                  key={tech.id}
                  onClick={() => setActiveTechId(tech.id)}
                  className={`group relative flex items-center justify-between overflow-hidden rounded-2xl border p-4 text-left transition duration-300 ${
                    isSelected
                      ? "border-[#805948]/80 bg-[#805948]/14 shadow-[0_0_30px_rgba(128,89,72,0.15)]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]"
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/40 transition duration-300 group-hover:scale-105"
                      style={{ color: tech.accentColor }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="block text-base font-semibold text-white">
                        {tech.name}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-white/45">
                        {tech.badge}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition duration-300 ${
                      isSelected
                        ? "bg-[#805948] text-white"
                        : "border border-white/10 bg-black/30 text-white/40 group-hover:text-white"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active Tech Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-3xl border border-[#805948]/40 bg-[#0E0E0E] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)] sm:p-8"
              >
                {/* Background accent gradient */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: activeTech.accentColor }}
                />

                <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/50"
                      style={{ color: activeTech.accentColor }}
                    >
                      <activeTech.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white sm:text-2xl">
                        {activeTech.name}
                      </h3>
                      <span className="text-xs uppercase tracking-widest text-[#c19a88]">
                        {activeTech.badge}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeTech.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono uppercase text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main Content */}
                <div className="mt-6 space-y-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                      Overview
                    </span>
                    <p className="mt-1 text-base leading-relaxed text-white/80">
                      {activeTech.tagline}
                    </p>
                  </div>

                  <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-2">
                    <div>
                      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#c19a88]">
                        <Zap className="h-3.5 w-3.5" />
                        Why SkaleKraft Uses It
                      </span>
                      <p className="mt-2 text-sm leading-6 text-white/70">
                        {activeTech.whyWeUseIt}
                      </p>
                    </div>

                    <div>
                      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Client Business Impact
                      </span>
                      <p className="mt-2 text-sm leading-6 text-white/70">
                        {activeTech.clientRoi}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-white/45">
                      Ready to build your product using {activeTech.name}?
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-[#805948] bg-[#805948]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#805948] hover:shadow-[0_0_25px_rgba(128,89,72,0.4)]"
                    >
                      Start Project <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
