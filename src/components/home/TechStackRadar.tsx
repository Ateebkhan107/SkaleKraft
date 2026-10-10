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
  Cloud,
  ShieldCheck,
  Lock,
  FileCode,
  Award,
  RefreshCw,
  Activity,
  Check,
  Copy,
} from "lucide-react";
import Link from "next/link";

type Category = "all" | "web" | "ai" | "backend" | "mobile" | "devops";
type DetailTab = "overview" | "security" | "code";

interface TechMetric {
  label: string;
  value: string;
}

interface TechItem {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  architectureOverview: string;
  whyWeUseIt: string;
  clientRoi: string;
  badge: string;
  icon: any;
  accentColor: string;
  tags: string[];
  highlights: string[];
  metrics: TechMetric[];
  securitySpecs: string[];
  trustGuarantee: string;
  codeSnippet: string;
  codeLanguage: string;
}

const techStack: TechItem[] = [
  {
    id: "nextjs",
    name: "Next.js 15 & React 19",
    category: "web",
    tagline: "High-performance React framework powering enterprise web platforms.",
    architectureOverview:
      "Utilizes React 19 Server Components, Turbopack compilation, and Streaming SSR to eliminate client JavaScript hydration bottlenecks and deliver instant page renders.",
    whyWeUseIt:
      "Zero-waterfall server data fetching, automatic route code-splitting, and native edge runtime routing for sub-150ms global response times.",
    clientRoi: "3x faster page load speed, max Lighthouse SEO scores (98+), and 40% lower cloud compute overhead.",
    badge: "Core Web Stack",
    icon: Code2,
    accentColor: "#D8A25A",
    tags: ["SSR / SSG", "App Router", "Edge Runtime", "SEO Ready"],
    highlights: [
      "React 19 Server Components & Streaming SSR",
      "Turbopack 5x faster hot module replacement",
      "Built-in automatic Image & Font optimization",
      "Edge API Middleware & Parallel Routing",
    ],
    metrics: [
      { label: "Lighthouse Target", value: "98/100" },
      { label: "Global Page Latency", value: "<150ms" },
      { label: "Client Hydration Overhead", value: "Zero JS" },
    ],
    securitySpecs: [
      "Strict Content Security Policy (CSP) headers",
      "Server-side secret API key isolation",
      "Built-in XSS & CSRF attack prevention",
      "Automated Security Vulnerability Audit CI",
    ],
    trustGuarantee:
      "Deployed on Vercel's multi-region Edge network with 99.99% uptime SLA and automatic global CDN failover.",
    codeLanguage: "typescript",
    codeSnippet: `// Type-Safe Streaming Server Action in Next.js 15
export async function fetchDashboardAnalytics() {
  'use server';
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();
  
  const analytics = await db.analytics.findMany({
    where: { tenantId: session.user.tenantId },
    cacheStrategy: { ttl: 60, swr: 300 }
  });
  return analytics;
}`,
  },
  {
    id: "llm-engines",
    name: "OpenAI, Claude & Gemini",
    category: "ai",
    tagline: "State-of-the-art multimodal LLM orchestration & structured function calling.",
    architectureOverview:
      "Integrates OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, and Google Gemini 1.5 Pro with dynamic prompt routing, fallback chains, and context compression.",
    whyWeUseIt:
      "Provides flexible, fault-tolerant AI capabilities with guaranteed structured JSON outputs, sub-second response streaming, and domain adaptation.",
    clientRoi: "Automates up to 80% of manual data classification, customer support routing, and complex content generation workflows.",
    badge: "AI & LLM Engines",
    icon: Cpu,
    accentColor: "#22D3EE",
    tags: ["Multi-Model Routing", "Function Calling", "Structured JSON", "Multimodal AI"],
    highlights: [
      "Dynamic cost & latency LLM model routing",
      "Strict Pydantic / Zod schema enforcement",
      "Sub-second streaming token response pipeline",
      "Prompt caching & automatic failover chains",
    ],
    metrics: [
      { label: "Task Automation", value: "80%" },
      { label: "Response Stream", value: "Sub-second" },
      { label: "Model Uptime SLA", value: "99.9%" },
    ],
    securitySpecs: [
      "Zero Data Retention API Tier Agreements",
      "SOC2 Type II Compliant Model Endpoints",
      "AES-256 Encryption for Prompts in Transit",
      "Strict Input/Output Schema Pydantic Guardrails",
    ],
    trustGuarantee:
      "Your proprietary enterprise data is NEVER used to train public AI models. Guaranteed zero-retention API agreements.",
    codeLanguage: "typescript",
    codeSnippet: `// Multi-Model LLM Fallback Chain with Schema Validation
const response = await aiOrchestrator.generateStructured({
  prompt: userQuery,
  schema: LeadQualificationSchema,
  primaryModel: "claude-3-5-sonnet",
  fallbackModel: "gpt-4o",
  temperature: 0.1,
});`,
  },
  {
    id: "ai-agents-rag",
    name: "Autonomous AI Agents & RAG",
    category: "ai",
    tagline: "Production agentic decision loops with vector retrieval & enterprise search.",
    architectureOverview:
      "Builds autonomous agentic workflows using LangGraph and LlamaIndex paired with high-dimensional vector embeddings for precise contextual knowledge retrieval.",
    whyWeUseIt:
      "Transforms static LLMs into goal-driven autonomous workers that query internal databases, execute tools, verify facts, and cite precise sources.",
    clientRoi: "Unlocks organizational knowledge bases and slashes manual search and document synthesis time by over 75%.",
    badge: "Agentic Systems",
    icon: BrainCircuit,
    accentColor: "#38BDF8",
    tags: ["LangGraph", "pgvector", "RAG Pipelines", "Tool Calling"],
    highlights: [
      "pgvector & Qdrant semantic hybrid search",
      "Multi-step autonomous tool execution loops",
      "Human-in-the-loop safety & approval hooks",
      "Exact source attribution & line citations",
    ],
    metrics: [
      { label: "Knowledge Search", value: "<50ms" },
      { label: "Synthesis Time Saved", value: "-75%" },
      { label: "Retrieval Accuracy", value: "94%+" },
    ],
    securitySpecs: [
      "Tenant-Isolated Vector Store Collections",
      "Granular Row-Level Access Control Rules",
      "Human-in-the-Loop Action Approval Hooks",
      "Complete Immutable Agent Action Audit Logging",
    ],
    trustGuarantee:
      "Every AI agent output is cross-referenced against your internal document vector database with 100% verifiable source citations.",
    codeLanguage: "python",
    codeSnippet: `# Multi-Agent Graph Workflow with Human Verification
workflow = StateGraph(AgentState)
workflow.add_node("search_docs", vector_retriever_agent)
workflow.add_node("verify_facts", fact_checker_agent)
workflow.add_node("human_approval", require_human_gatekeeper)
workflow.add_edge("search_docs", "verify_facts")`,
  },
  {
    id: "supabase",
    name: "Supabase & PostgreSQL 16",
    category: "backend",
    tagline: "Scalable relational backend with real-time sockets & Row-Level Security.",
    architectureOverview:
      "Battle-tested PostgreSQL engine extended with Supabase real-time WebSockets, edge functions, automated backups, and fine-grained declarative RLS data policies.",
    whyWeUseIt:
      "Guarantees strict relational data consistency, instant REST/GraphQL endpoints, and enterprise-grade tenant isolation out of the box.",
    clientRoi: "Saves 60+ engineering hours per project on backend scaffolding while ensuring zero-downtime database scaling.",
    badge: "Database & Cloud",
    icon: Database,
    accentColor: "#805948",
    tags: ["PostgreSQL 16", "RLS Security", "Real-time Sockets", "Vector Search"],
    highlights: [
      "Declarative Row Level Security (RLS)",
      "Real-time WebSocket database subscriptions",
      "Automated Point-in-Time Recovery (PITR)",
      "Native pgvector AI embedding extension",
    ],
    metrics: [
      { label: "Query Execution", value: "<10ms" },
      { label: "Database Uptime", value: "99.99%" },
      { label: "Setup Hours Saved", value: "60+ Hrs" },
    ],
    securitySpecs: [
      "Row Level Security (RLS) forced on all tables",
      "PostgreSQL Point-in-Time Recovery (PITR)",
      "SOC2 Type II & HIPAA Compliant Cloud Host",
      "Encrypted SSL Connection Pooling & Storage at Rest",
    ],
    trustGuarantee:
      "Open-source PostgreSQL backend—you retain 100% database access, export control, and backup ownership without proprietary database lock-in.",
    codeLanguage: "sql",
    codeSnippet: `-- Strict Row Level Security (RLS) Policy Example
CREATE POLICY "Users can only access their own org data"
ON tenant_records FOR ALL
TO authenticated
USING (org_id = auth.jwt() ->> 'org_id');`,
  },
  {
    id: "type-safe-backend",
    name: "Node.js, TypeScript & FastAPI",
    category: "backend",
    tagline: "End-to-end type-safe microservices & asynchronous data processing pipelines.",
    architectureOverview:
      "Combines strict TypeScript contracts with Zod runtime validation on Node.js, and high-concurrency Python FastAPI microservices for data science tasks.",
    whyWeUseIt:
      "Eliminates type mismatch bugs across client and server boundaries while sustaining massive parallel async IO execution.",
    clientRoi: "Dramatically reduces production runtime errors by 90% and accelerates team feature velocity.",
    badge: "Microservices",
    icon: Server,
    accentColor: "#10B981",
    tags: ["End-to-End Types", "Zod Validation", "OpenAPI", "Async IO"],
    highlights: [
      "100% strict end-to-end TypeScript compilation",
      "Zod runtime payload schema validation",
      "Auto-generated OpenAPI & Swagger documentation",
      "Microsecond latency API response handlers",
    ],
    metrics: [
      { label: "Type Safety", value: "100%" },
      { label: "Runtime Bug Reduction", value: "90%" },
      { label: "Async Capacity", value: "50k req/s" },
    ],
    securitySpecs: [
      "Strict Runtime Payload Schema Validation",
      "Automated OpenAPI Contract Testing",
      "Real-Time Dependency Vulnerability Scans",
      "Parameterized Queries to Eliminate SQL Injection",
    ],
    trustGuarantee:
      "End-to-end static typing catches potential runtime bugs during compilation before code ever touches production servers.",
    codeLanguage: "typescript",
    codeSnippet: `// Strict Payload Validation with Zod Schema
const CreateOrderSchema = z.object({
  customerId: z.string().uuid(),
  amount: z.number().positive(),
  items: z.array(z.string().min(1)),
});
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;`,
  },
  {
    id: "redis-cache",
    name: "Redis & Upstash Edge Cache",
    category: "backend",
    tagline: "Ultra-low latency in-memory data store for caching, queues & rate-limiting.",
    architectureOverview:
      "Distributed in-memory caching layer powering global session storage, BullMQ background task processing, and API rate-limiting enforcement.",
    whyWeUseIt:
      "Shields primary origin databases from heavy traffic spikes and delivers sub-5ms data lookups globally.",
    clientRoi: "Prevents service downtime during viral traffic surges and reduces database read load by up to 90%.",
    badge: "Caching & Queues",
    icon: Zap,
    accentColor: "#EF4444",
    tags: ["In-Memory Cache", "BullMQ Queues", "Rate-Limiting", "Global Edge"],
    highlights: [
      "Sub-5ms global edge data read latency",
      "Distributed lock & session management",
      "BullMQ asynchronous job queue execution",
      "DDoS protection & token bucket rate limiting",
    ],
    metrics: [
      { label: "Read Latency", value: "<5ms" },
      { label: "Database Offload", value: "90%" },
      { label: "Rate Limit Shield", value: "100%" },
    ],
    securitySpecs: [
      "TLS 1.3 In-Flight Data Encryption",
      "DDoS Token Bucket Rate Limiting per IP/Key",
      "Isolated Cryptographic Cache Namespaces",
      "Sub-5ms Edge Authentication Token Verification",
    ],
    trustGuarantee:
      "Edge rate limiting and distributed memory caches protect your application against malicious DDoS surges and unexpected traffic spikes.",
    codeLanguage: "typescript",
    codeSnippet: `// Global Edge Rate Limiting Middleware
const { success, limit, remaining } = await redisRateLimiter.limit(
  clientIp
);
if (!success) {
  return new Response("Too Many Requests", { status: 429 });
}`,
  },
  {
    id: "react-native",
    name: "React Native & Expo",
    category: "mobile",
    tagline: "Universal cross-platform mobile apps with native 60 FPS performance.",
    architectureOverview:
      "Single TypeScript codebase rendering true native UI components for iOS and Android with shared web business logic.",
    whyWeUseIt:
      "Enables simultaneous iOS and Android releases with native gesture feel and instant Over-The-Air (OTA) bug fixes.",
    clientRoi: "Cuts mobile development timelines and operational costs in half without compromising on 60 FPS native smoothness.",
    badge: "Mobile Apps",
    icon: Smartphone,
    accentColor: "#8B5CF6",
    tags: ["iOS & Android", "Native Modules", "OTA Updates", "Shared Logic"],
    highlights: [
      "Universal iOS & Android React codebase",
      "Instant Over-The-Air (OTA) patch updates",
      "Shared business logic with web apps",
      "Hardware-accelerated native animations",
    ],
    metrics: [
      { label: "Shared Codebase", value: "90%+" },
      { label: "Animation Frame Rate", value: "60 FPS" },
      { label: "Development Cost", value: "-50%" },
    ],
    securitySpecs: [
      "iOS Keychain & Android Keystore Secure Storage",
      "Biometric Authentication (FaceID / TouchID)",
      "App Binary Code Obfuscation & Shielding",
      "Encrypted Local SQLite Database Storage",
    ],
    trustGuarantee:
      "Bank-grade mobile security standards utilizing native device hardware security chips for encryption key storage.",
    codeLanguage: "typescript",
    codeSnippet: `// Secure Hardware Keychain Token Storage
import * as SecureStore from 'expo-secure-store';

export async function saveAuthToken(token: string) {
  await SecureStore.setItemAsync('user_auth_token', token, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}`,
  },
  {
    id: "tailwind-framer",
    name: "Tailwind CSS & Framer Motion",
    category: "web",
    tagline: "Precision design tokens & GPU-accelerated micro-interactions.",
    architectureOverview:
      "Utility-first CSS design token architecture paired with hardware-accelerated physics motion for fluid, luxury-grade interfaces.",
    whyWeUseIt:
      "Guarantees consistent spatial hierarchy, dark/light token themes, and fluid 60 FPS animations that feel organic.",
    clientRoi: "Dramatically boosts user engagement, time-on-page, and brand perception with luxury-grade UX design.",
    badge: "Design & UX",
    icon: Layers,
    accentColor: "#F97316",
    tags: ["60 FPS Motion", "Design Tokens", "Dark Mode", "Fluid UX"],
    highlights: [
      "60 FPS GPU-accelerated spring motion",
      "Atomic design system token architecture",
      "Zero runtime CSS bundle overhead",
      "Full accessibility (a11y) & reduced motion compliance",
    ],
    metrics: [
      { label: "Motion Refresh Rate", value: "60 FPS" },
      { label: "CSS Runtime Overhead", value: "Zero" },
      { label: "User Engagement", value: "+45%" },
    ],
    securitySpecs: [
      "Zero Runtime CSS Injection Vulnerability Surface",
      "Strict WCAG 2.1 Contrast & Accessibility Compliance",
      "Full Reduced-Motion Preference Support",
      "Clean DOM Element Sanitization",
    ],
    trustGuarantee:
      "Precision-crafted UI design systems rigorously tested across hundreds of screen resolutions for flawless responsive rendering.",
    codeLanguage: "tsx",
    codeSnippet: `// Hardware-Accelerated Physics Spring Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
/>`,
  },
  {
    id: "cloud-devops",
    name: "Vercel & AWS Cloud Architecture",
    category: "devops",
    tagline: "Serverless edge infrastructure & continuous deployment pipelines.",
    architectureOverview:
      "Multi-region edge network deployment with automated CI/CD branch previews, SSL termination, DDoS protection, and elastic auto-scaling.",
    whyWeUseIt:
      "Eliminates server provisioning and DevOps complexity while ensuring automatic global scaling for millions of requests.",
    clientRoi: "Zero server maintenance overhead, zero downtime deployments, and 99.99% global availability SLA.",
    badge: "DevOps & Cloud",
    icon: Cloud,
    accentColor: "#6366F1",
    tags: ["Edge Deployments", "CI/CD Previews", "Auto-Scaling", "DDoS Protection"],
    highlights: [
      "Multi-region global edge network deployment",
      "Automated git push CI/CD branch previews",
      "Elastic auto-scaling from 1 to 1,000,000 users",
      "Enterprise SSL termination & DDoS shielding",
    ],
    metrics: [
      { label: "Availability SLA", value: "99.99%" },
      { label: "Deployment Speed", value: "<60s" },
      { label: "DevOps Maintenance", value: "$0" },
    ],
    securitySpecs: [
      "Automated Managed SSL/TLS Certificate Renewal",
      "AWS WAF Web Application Firewall Protection",
      "Multi-Region High-Availability Failover Redundancy",
      "Automated Daily Off-Site Database Backups",
    ],
    trustGuarantee:
      "Backed by enterprise cloud infrastructure powering Fortune 500 platforms with guaranteed 99.99% availability SLAs.",
    codeLanguage: "yaml",
    codeSnippet: `# Automated Production Deployment Pipeline
name: Production Deployment Pipeline
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: npm run lint && npm run test && npm run build`,
  },
];

const categories: { label: string; value: Category }[] = [
  { label: "All Stack", value: "all" },
  { label: "Web & UI", value: "web" },
  { label: "AI Systems", value: "ai" },
  { label: "Backend & DB", value: "backend" },
  { label: "Mobile Apps", value: "mobile" },
  { label: "DevOps & Cloud", value: "devops" },
];

const trustPillars = [
  {
    icon: Award,
    title: "100% Code Ownership",
    description: "You own all repository source code, IP rights, and deployment manifests. No proprietary lock-in or licensing trap.",
  },
  {
    icon: Lock,
    title: "Enterprise Security First",
    description: "Row-Level Security, AES-256 encryption at rest, and SOC2-compliant API patterns integrated from day one.",
  },
  {
    icon: Activity,
    title: "99.99% Production Uptime",
    description: "Multi-region edge deployment with automated CI/CD failover, automated backups, and 24/7 performance monitoring.",
  },
  {
    icon: FileCode,
    title: "Zero Monolith Tech Debt",
    description: "Clean, modular TypeScript architecture with 100% static typing that your internal team can effortlessly inherit.",
  },
];

export default function TechStackRadar() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [activeTechId, setActiveTechId] = useState<string>("nextjs");
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>("overview");
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredTech = techStack.filter(
    (t) => selectedCategory === "all" || t.category === selectedCategory
  );

  const activeTech = techStack.find((t) => t.id === activeTechId) || filteredTech[0] || techStack[0];

  const handleCopyCode = () => {
    if (!activeTech.codeSnippet) return;
    navigator.clipboard.writeText(activeTech.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-20 text-white sm:py-28 scroll-mt-24" id="tech-stack">
      {/* Background radial ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(128,89,72,0.14),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(193,154,136,0.08),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#805948]/30 bg-[#805948]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c19a88]">
            <Sparkles className="h-3.5 w-3.5" />
            Engineering & Technology Architecture
          </div>
          <h2 className="mt-6 text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
            Software built with <span className="font-semibold text-white">modern stack architecture</span>.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">
            We don’t use legacy templates or bloated monoliths. Every system is engineered on a battle-tested, high-performance technology stack designed to scale seamlessly.
          </p>

          {/* Live Trust Metrics Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 border-y border-white/10 py-3 text-xs text-white/60">
            <span className="flex items-center gap-1.5 font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              99.99% Systems Uptime SLA
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#c19a88]" />
              Enterprise Security Compliant
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#c19a88]" />
              100% Full Code Ownership
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                const firstMatch = techStack.find(
                  (t) => cat.value === "all" || t.category === cat.value
                );
                if (firstMatch) setActiveTechId(firstMatch.id);
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
          {/* Tech List (Scrollable list with badges) */}
          <div className="grid gap-3 lg:col-span-5 max-h-[660px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredTech.map((tech) => {
              const Icon = tech.icon;
              const isSelected = tech.id === activeTech.id;

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
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 ${
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
                {/* Background accent glow */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: activeTech.accentColor }}
                />

                {/* Card Top Header */}
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

                  {/* Sub-Navigation Tabs inside Card */}
                  <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/40 p-1 text-xs">
                    <button
                      onClick={() => setActiveDetailTab("overview")}
                      className={`rounded-lg px-3 py-1.5 font-medium transition ${
                        activeDetailTab === "overview"
                          ? "bg-[#805948] text-white"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      Architecture
                    </button>
                    <button
                      onClick={() => setActiveDetailTab("security")}
                      className={`rounded-lg px-3 py-1.5 font-medium transition ${
                        activeDetailTab === "security"
                          ? "bg-[#805948] text-white"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      Security
                    </button>
                    <button
                      onClick={() => setActiveDetailTab("code")}
                      className={`rounded-lg px-3 py-1.5 font-medium transition ${
                        activeDetailTab === "code"
                          ? "bg-[#805948] text-white"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      Code Pattern
                    </button>
                  </div>
                </div>

                {/* Main Tabbed Content */}
                <div className="mt-6 space-y-6 min-h-[360px]">
                  {activeDetailTab === "overview" && (
                    <motion.div
                      key="tab-overview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Tagline & Architecture Overview */}
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                          Overview & Architecture
                        </span>
                        <p className="mt-1 text-base font-medium leading-snug text-white">
                          {activeTech.tagline}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                          {activeTech.architectureOverview}
                        </p>
                      </div>

                      {/* High Impact Performance Metrics Grid */}
                      <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                        {activeTech.metrics.map((m) => (
                          <div key={m.label} className="text-center">
                            <span className="block text-lg sm:text-xl font-semibold text-[#c19a88]">
                              {m.value}
                            </span>
                            <span className="mt-1 block text-[10px] sm:text-xs uppercase tracking-wider text-white/45">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Why We Use It vs Client Business Impact */}
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

                      {/* Key Architectural Highlights List */}
                      <div>
                        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                          <ShieldCheck className="h-3.5 w-3.5 text-[#c19a88]" />
                          Key Architectural Highlights
                        </span>
                        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                          {activeTech.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-xs text-white/75">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#c19a88] mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeDetailTab === "security" && (
                    <motion.div
                      key="tab-security"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div>
                        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c19a88]">
                          <Lock className="h-3.5 w-3.5" />
                          Security & Compliance Specifications
                        </span>
                        <p className="mt-2 text-sm text-white/70">
                          Enterprise security features built natively into the deployment pipeline for this stack:
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {activeTech.securitySpecs.map((spec) => (
                          <div
                            key={spec}
                            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 p-4"
                          >
                            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
                            <span className="text-xs text-white/80 leading-relaxed font-medium">
                              {spec}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Client Security Guarantee Banner */}
                      <div className="rounded-2xl border border-[#805948]/50 bg-[#805948]/10 p-5">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c19a88]">
                          <Award className="h-4 w-4" />
                          SkaleKraft Production Standard Guarantee
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-white/85">
                          {activeTech.trustGuarantee}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeDetailTab === "code" && (
                    <motion.div
                      key="tab-code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                          <FileCode className="h-4 w-4 text-[#c19a88]" />
                          Production Code Pattern ({activeTech.codeLanguage})
                        </span>
                        <button
                          onClick={handleCopyCode}
                          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition"
                        >
                          {copiedCode ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Snippet</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505] p-4 font-mono text-xs text-emerald-300 shadow-inner">
                        <pre className="overflow-x-auto whitespace-pre leading-relaxed">
                          <code>{activeTech.codeSnippet}</code>
                        </pre>
                      </div>
                      <p className="text-[11px] text-white/45 italic">
                        This pattern is used across SkaleKraft client deployments to ensure type safety, reliability, and security compliance.
                      </p>
                    </motion.div>
                  )}

                  {/* Footer Action */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <span className="text-xs text-white/45">
                      Build your software using <strong className="text-white">{activeTech.name}</strong>
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

        {/* Client Trust Pillars Section */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.22em] text-[#c19a88] font-semibold">
              Client Trust & Guarantees
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-light text-white">
              Why founders & enterprise teams build with <span className="font-semibold">SkaleKraft</span>.
            </h3>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#805948]/15 text-[#c19a88]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-base font-semibold text-white">
                    {pillar.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
