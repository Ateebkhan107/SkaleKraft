"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  Database,
  Layers,
  Smartphone,
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

  useEffect(() => {
    if (!activeModalTech) return;

    const body = document.body;
    const root = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [activeModalTech]);

  const handleCopyCode = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="relative scroll-mt-36 overflow-hidden bg-transparent py-14 text-white sm:py-20" id="tech-stack">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(128,89,72,0.15),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-[8%] top-32 h-px bg-gradient-to-r from-transparent via-[#c19a88]/20 to-transparent" />

      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#c19a88]/75" />
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#c19a88]/85 sm:text-xs">Engineering architecture</p>
            </div>
            <h2 className="mt-4 text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.7rem]">
              Technology chosen for{" "}
              <span className="inline-block bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text pb-1 font-serif font-normal italic tracking-normal text-transparent">real-world scale.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
              A modern, production-proven stack selected for speed, reliability, security, and maintainability—not trend cycles.
            </p>
          </div>

          <div className="hidden grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20 backdrop-blur-xl lg:grid">
            {[["08", "Core systems"], ["99.99%", "Uptime ready"], ["24/7", "Observable"]].map(([value, label], index) => (
              <div key={label} className={`min-w-28 px-4 py-4 ${index > 0 ? "border-l border-white/[0.08]" : ""}`}>
                <p className="font-mono text-lg tracking-[-0.04em] text-white/90">{value}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.17em] text-white/30">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-1 rounded-2xl border border-white/[0.08] bg-black/25 p-1.5 backdrop-blur-xl sm:inline-flex">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`relative rounded-xl px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] transition duration-300 sm:px-4 ${selectedCategory === cat.value ? "text-white" : "text-white/42 hover:text-white/75"}`}
            >
              {selectedCategory === cat.value && (
                <motion.span layoutId="tech-category" className="absolute inset-0 rounded-xl border border-[#c19a88]/25 bg-[#805948]/18 shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_8px_28px_rgba(0,0,0,.25)]" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech, index) => {
              const Icon = tech.icon;
              const isFeatured = selectedCategory === "all" && index === 0;

              return (
                <motion.div
                  key={tech.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex min-h-[270px] flex-col justify-between overflow-hidden rounded-[22px] border border-white/[0.085] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(13,13,13,0.94)_40%,rgba(7,7,7,0.98))] p-5 shadow-[0_22px_65px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1 hover:border-[#c19a88]/30 hover:shadow-[0_30px_90px_rgba(0,0,0,0.46)] ${isFeatured ? "lg:col-span-2" : ""}`}
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-[0.07] blur-[55px] transition duration-700 group-hover:opacity-20"
                    style={{ backgroundColor: tech.accentColor }}
                  />
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_12px_35px_rgba(0,0,0,.3)] transition duration-500 group-hover:scale-105"
                          style={{ color: tech.accentColor }}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.7} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.16em] text-white/22">0{index + 1}</span>
                      </div>
                      <span className="rounded-full border border-white/[0.08] bg-black/25 px-2.5 py-1 font-mono text-[9px] tracking-[-0.01em] text-white/48 backdrop-blur-md">
                        {tech.roiMetric}
                      </span>
                    </div>

                    <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.2em]" style={{ color: `${tech.accentColor}cc` }}>{tech.badge}</p>
                    <h3 className={`mt-2 font-medium leading-tight tracking-[-0.025em] text-white transition group-hover:text-[#e8c5b4] ${isFeatured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
                      {tech.name}
                    </h3>
                    <p className={`mt-2.5 leading-relaxed text-white/46 ${isFeatured ? "max-w-xl text-sm" : "text-xs"}`}>
                      {tech.tagline}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tech.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/[0.075] bg-white/[0.025] px-2.5 py-1 text-[9px] text-white/42"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.075] pt-4">
                    <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-white/28">
                      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: tech.accentColor }} /> Production ready
                    </span>
                    <button
                      onClick={() => setActiveModalTech(tech)}
                      className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#c19a88] transition hover:text-white"
                    >
                      Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 grid overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20 text-[10px] text-white/48 backdrop-blur-xl sm:grid-cols-3 sm:text-xs">
          <span className="flex items-center justify-center gap-2 px-4 py-3.5 font-mono text-emerald-400/85 sm:justify-start">
            <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" /><span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" /></span>
            99.99% production uptime
          </span>
          <span className="flex items-center justify-center gap-2 border-t border-white/[0.07] px-4 py-3.5 sm:border-l sm:border-t-0">
            <Lock className="h-3.5 w-3.5 text-[#c19a88]" />
            Enterprise-grade security architecture
          </span>
          <span className="flex items-center justify-center gap-2 border-t border-white/[0.07] px-4 py-3.5 sm:border-l sm:border-t-0">
            <ShieldCheck className="h-3.5 w-3.5 text-[#c19a88]" />
            100% source-code ownership
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
