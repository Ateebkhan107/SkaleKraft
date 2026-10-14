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
  BrainCircuit,
  Server,
  ShieldCheck,
  Lock,
  Copy,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

type Category = "all" | "web" | "ai" | "backend" | "mobile";

interface TechItem {
  id: string;
  name: string;
  category: Category;
  badge: string;
  tagline: string;
  roiMetric: string;
  icon: LucideIcon;
  accentColor: string;
  tags: string[];
  highlights: string[];
  whyWeUseIt: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

const techStack: TechItem[] = [
  {
    id: "nextjs",
    name: "Next.js 15 & React 19",
    category: "web",
    badge: "Core Web Stack",
    tagline: "Server Components & Streaming SSR for sub-150ms instant page loads.",
    roiMetric: "98/100 Lighthouse",
    icon: Code2,
    accentColor: "#D8A25A",
    tags: ["React 19", "App Router", "Turbopack", "Edge Runtime"],
    highlights: [
      "Zero-waterfall server data fetching",
      "Turbopack 5x faster compilation",
      "Automatic Image & Font optimization",
    ],
    whyWeUseIt: "Delivers instant page loads, max search engine visibility, and zero client JS hydration overhead for static content.",
    codeLanguage: "typescript",
    codeSnippet: `// Type-Safe Server Action in Next.js 15
export async function getDashboardData() {
  'use server';
  const session = await auth();
  if (!session) throw new UnauthorizedError();
  return await db.analytics.query({ tenantId: session.tenantId });
}`,
  },
  {
    id: "ai-engines",
    name: "OpenAI, Claude & Gemini",
    category: "ai",
    badge: "AI & Multimodal LLMs",
    tagline: "Multi-model LLM orchestration with structured JSON schema guarantees.",
    roiMetric: "80% Task Automation",
    icon: Cpu,
    accentColor: "#22D3EE",
    tags: ["GPT-4o", "Claude 3.5 Sonnet", "Structured JSON", "Function Calling"],
    highlights: [
      "Dynamic cost & latency model routing",
      "Strict Pydantic / Zod schema enforcement",
      "Zero-retention enterprise data privacy",
    ],
    whyWeUseIt: "Automates routine business workflows, support routing, and data extraction with high reliability.",
    codeLanguage: "typescript",
    codeSnippet: `// LLM Orchestration with Fallbacks
const response = await ai.generateStructured({
  prompt: userQuery,
  primaryModel: "claude-3-5-sonnet",
  fallbackModel: "gpt-4o",
  schema: QualificationSchema,
});`,
  },
  {
    id: "ai-agents-rag",
    name: "Autonomous AI Agents & RAG",
    category: "ai",
    badge: "Agentic Workflows",
    tagline: "LangGraph decision loops paired with high-dimensional vector search.",
    roiMetric: "<50ms Vector Search",
    icon: BrainCircuit,
    accentColor: "#38BDF8",
    tags: ["LangGraph", "pgvector", "RAG Pipelines", "Tool Execution"],
    highlights: [
      "pgvector & Qdrant semantic hybrid search",
      "Multi-step autonomous tool loops",
      "Exact source attribution & line citations",
    ],
    whyWeUseIt: "Transforms internal documents into queryable intelligence that executes tasks with verifiable sources.",
  },
  {
    id: "supabase",
    name: "Supabase & PostgreSQL 16",
    category: "backend",
    badge: "Database & Cloud",
    tagline: "Battle-tested PostgreSQL engine with Row-Level Security & real-time sockets.",
    roiMetric: "<10ms Query Latency",
    icon: Database,
    accentColor: "#805948",
    tags: ["PostgreSQL 16", "RLS Security", "Real-Time Sockets", "pgvector"],
    highlights: [
      "Declarative Row Level Security (RLS)",
      "Real-time WebSocket subscriptions",
      "Point-in-Time Recovery (PITR) backups",
    ],
    whyWeUseIt: "Guarantees strict data integrity, instant REST APIs, and enterprise-grade tenant data isolation.",
    codeLanguage: "sql",
    codeSnippet: `-- Row Level Security (RLS) Policy
CREATE POLICY "Users access own tenant data"
ON tenant_records FOR ALL
TO authenticated
USING (org_id = auth.jwt() ->> 'org_id');`,
  },
  {
    id: "type-safe-backend",
    name: "Node.js, TypeScript & FastAPI",
    category: "backend",
    badge: "Microservices",
    tagline: "100% strict type-safe microservices with Zod runtime validation.",
    roiMetric: "100% Type Safety",
    icon: Server,
    accentColor: "#10B981",
    tags: ["TypeScript", "Zod Validation", "FastAPI", "OpenAPI"],
    highlights: [
      "100% strict end-to-end type contracts",
      "Microsecond latency API response handlers",
      "Auto-generated OpenAPI documentation",
    ],
    whyWeUseIt: "Eliminates type mismatch bugs across client and server boundaries before code touches production.",
  },
  {
    id: "redis-cache",
    name: "Redis & Upstash Edge Cache",
    category: "backend",
    badge: "Caching & Queues",
    tagline: "Ultra-low latency in-memory cache for global session storage & rate-limiting.",
    roiMetric: "Sub-5ms Edge Cache",
    icon: Zap,
    accentColor: "#EF4444",
    tags: ["In-Memory Cache", "BullMQ Queues", "DDoS Shield", "Rate Limiting"],
    highlights: [
      "Sub-5ms global edge data lookups",
      "BullMQ asynchronous job queue execution",
      "DDoS token-bucket rate limiting",
    ],
    whyWeUseIt: "Shields origin databases from traffic spikes and delivers sub-5ms responses worldwide.",
  },
  {
    id: "react-native",
    name: "React Native & Expo",
    category: "mobile",
    badge: "Mobile Apps",
    tagline: "Universal cross-platform mobile apps with native 60 FPS performance.",
    roiMetric: "60 FPS Native Smooth",
    icon: Smartphone,
    accentColor: "#8B5CF6",
    tags: ["iOS & Android", "Expo OTA", "Native Bridge", "Shared Logic"],
    highlights: [
      "Universal iOS & Android React codebase",
      "Instant Over-The-Air (OTA) updates",
      "iOS Keychain & Android Keystore security",
    ],
    whyWeUseIt: "Cuts mobile development timelines in half without sacrificing 60 FPS native smoothness.",
  },
  {
    id: "tailwind-framer",
    name: "Tailwind CSS & Framer Motion",
    category: "web",
    badge: "Design & UX",
    tagline: "Precision design tokens & GPU-accelerated micro-interactions.",
    roiMetric: "60 FPS GPU Motion",
    icon: Layers,
    accentColor: "#F97316",
    tags: ["Tailwind CSS", "Framer Motion", "Design Tokens", "Dark Mode"],
    highlights: [
      "60 FPS GPU-accelerated physics motion",
      "Zero runtime CSS bundle overhead",
      "Flawless responsive token architecture",
    ],
    whyWeUseIt: "Elevates visual authority and user engagement with fluid, luxury-grade interfaces.",
  },
];

const categories: { label: string; value: Category }[] = [
  { label: "All Tech", value: "all" },
  { label: "Web & UI", value: "web" },
  { label: "AI Systems", value: "ai" },
  { label: "Backend & Cloud", value: "backend" },
  { label: "Mobile Apps", value: "mobile" },
];

export default function TechStackRadar() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [activeModalTech, setActiveModalTech] = useState<TechItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredTech = techStack.filter(
    (t) => selectedCategory === "all" || t.category === selectedCategory
  );

  const handleCopyCode = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-14 text-white sm:py-20 scroll-mt-24" id="tech-stack">
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[750px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(128,89,72,0.12),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        {/* Compact Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#805948]/30 bg-[#805948]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c19a88]">
            <Sparkles className="h-3 w-3" />
            Engineering & Technology Architecture
          </div>
          <h2 className="mt-3.5 text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl text-white">
            Software built with <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text text-transparent pb-1 inline-block">modern architecture.</span>
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm">
            Battle-tested, high-performance technologies engineered to scale without legacy bloat.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition duration-300 ${
                selectedCategory === cat.value
                  ? "border border-[#805948] bg-[#805948]/24 text-white shadow-[0_0_16px_rgba(128,89,72,0.25)]"
                  : "border border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Visual Bento Tech Grid */}
        <motion.div
          layout
          className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => {
              const Icon = tech.icon;

              return (
                <motion.div
                  key={tech.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E0E]/80 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#805948]/60 hover:bg-[#121212] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                >
                  {/* Subtle hover accent glow */}
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-20"
                    style={{ backgroundColor: tech.accentColor }}
                  />

                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/50 transition duration-300 group-hover:scale-105"
                        style={{ color: tech.accentColor }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 font-mono text-[10px] text-[#c19a88]">
                        {tech.roiMetric}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="mt-3.5 text-base font-semibold text-white group-hover:text-[#d2a28d] transition">
                      {tech.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                      {tech.tagline}
                    </p>

                    {/* Tag Pills */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {tech.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Quick Action */}
                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                      {tech.badge}
                    </span>
                    <button
                      onClick={() => setActiveModalTech(tech)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#c19a88] hover:text-white transition"
                    >
                      Details <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Compact Guarantee Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-y border-white/10 py-3 text-xs text-white/60 sm:gap-8">
          <span className="flex items-center gap-1.5 font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            99.99% Production Uptime
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-[#c19a88]" />
            SOC2 & Enterprise Security Compliant
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#c19a88]" />
            100% Full Source Code Ownership
          </span>
        </div>
      </div>

      {/* Quick Peek Tech Detail Modal */}
      <AnimatePresence>
        {activeModalTech && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#805948]/40 bg-[#101010] p-6 text-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalTech(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/50"
                  style={{ color: activeModalTech.accentColor }}
                >
                  <activeModalTech.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {activeModalTech.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#c19a88]">
                    {activeModalTech.badge}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="mt-4 space-y-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    Why SkaleKraft Uses It
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-white/80">
                    {activeModalTech.whyWeUseIt}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#c19a88]">
                    Key Highlights
                  </span>
                  <ul className="mt-2 space-y-1.5">
                    {activeModalTech.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-white/75">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {activeModalTech.codeSnippet && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                        Production Pattern ({activeModalTech.codeLanguage})
                      </span>
                      <button
                        onClick={() => handleCopyCode(activeModalTech.codeSnippet)}
                        className="flex items-center gap-1 text-[10px] text-white/60 hover:text-white transition"
                      >
                        {copiedCode ? (
                          <span className="text-emerald-400">Copied!</span>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/60 p-3 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                      <pre><code>{activeModalTech.codeSnippet}</code></pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-white/40">
                  Ready to build with this stack?
                </span>
                <Link
                  href="/contact"
                  onClick={() => setActiveModalTech(null)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#805948] bg-[#805948]/20 px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#805948] transition"
                >
                  Start Project <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
