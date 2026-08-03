"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Clapperboard,
  Cloud,
  Code2,
  Database,
  Home,
  Layers3,
  Mail,
  MonitorSmartphone,
  Rocket,
  ServerCog,
  Settings2,
  Smartphone,
  Sparkles,
  Terminal,
  UserPlus,
  Video,
  type LucideIcon,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type DestinationKey = "websites" | "apps" | "ai" | "creative" | "everything";
type Stage = "idle" | "selection" | "home";

const destinations: Array<{
  key: DestinationKey;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  target: string;
}> = [
  { key: "websites", label: "Websites", subtitle: "Business websites, SaaS, landing pages and portals.", icon: MonitorSmartphone, target: "websites" },
  { key: "apps", label: "Apps", subtitle: "Android, iOS and cross platform apps.", icon: Smartphone, target: "apps" },
  { key: "ai", label: "AI", subtitle: "AI agents, chatbots, automation and ML.", icon: BrainCircuit, target: "ai" },
  { key: "creative", label: "Creative", subtitle: "Video editing, motion graphics and content.", icon: Clapperboard, target: "creative" },
  { key: "everything", label: "Explore Everything", subtitle: "Show me everything SkaleKraft offers.", icon: Sparkles, target: "home" },
];

const featuredServices = ["Business Websites", "Landing Pages", "SaaS Platforms", "Mobile Apps", "AI Agents", "Chatbots", "Automation"];
const appRow = ["Android Apps", "iOS Apps", "Cross Platform Apps", "SaaS Applications", "Business Applications", "Consumer Applications"];
const aiRow = ["AI Agents", "Chatbots", "Customer Support AI", "Voice AI", "Workflow Automation", "RAG Systems", "AI Integrations"];
const technologyRow = ["Next.js", "React", "TypeScript", "Node.js", "Python", "Supabase", "PostgreSQL", "MongoDB", "Docker", "AWS", "Vercel", "OpenAI", "Claude", "Gemini"];
const industries = ["Healthcare", "Education", "Real Estate", "Finance", "Startups", "E-commerce", "Legal", "Manufacturing"];
const buildRow = ["Business Websites", "Dashboards", "Admin Panels", "Booking Systems", "Portals", "Marketplaces", "AI Products", "Internal Tools"];
const creativeRow = ["YouTube Editing", "Instagram Reels", "Advertisements", "Motion Graphics", "Brand Videos"];

const servicePanels = [
  {
    key: "websites",
    title: "Websites",
    icon: MonitorSmartphone,
    overview: "High-performance websites and web platforms designed to move from first impression to action.",
    features: ["Business Websites", "Landing Pages", "SaaS Platforms", "E-Commerce", "Portals", "Dashboards", "Booking Systems"],
    technology: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    timeline: "Usually 2-8 weeks depending on scope.",
    audience: "Founders, service businesses, SaaS teams and growing companies.",
  },
  {
    key: "apps",
    title: "Apps",
    icon: Smartphone,
    overview: "Mobile and cross-platform apps with clean flows, fast interfaces and maintainable foundations.",
    features: ["Android Apps", "iOS Apps", "Cross Platform Apps", "Business Apps", "Consumer Apps", "SaaS Apps"],
    technology: ["React Native", "Flutter", "Node.js", "Supabase", "PostgreSQL"],
    timeline: "Usually 4-12 weeks depending on product complexity.",
    audience: "Businesses building internal tools, customer apps or new digital products.",
  },
  {
    key: "ai",
    title: "AI",
    icon: BrainCircuit,
    overview: "Practical AI systems that help teams answer, automate, search, classify and make decisions faster.",
    features: ["AI Agents", "Chatbots", "Customer Support AI", "Voice AI", "RAG Systems", "Workflow Automation", "AI Integrations"],
    technology: ["OpenAI", "Claude", "Gemini", "LangChain", "Python", "FastAPI"],
    timeline: "Usually 2-10 weeks depending on integrations and data readiness.",
    audience: "Teams that want AI inside real business workflows, not a standalone toy.",
  },
  {
    key: "creative",
    title: "Creative",
    icon: Video,
    overview: "Editing and motion work shaped for launches, social channels and product storytelling.",
    features: ["YouTube Editing", "Instagram Reels", "Shorts", "Product Videos", "Commercial Ads", "Motion Graphics", "Thumbnail Design"],
    technology: ["Premiere Pro", "After Effects", "Figma", "Photoshop", "Illustrator"],
    timeline: "Usually 2 days to 3 weeks depending on volume and format.",
    audience: "Brands, founders, creators and product teams that need sharper content.",
  },
  {
    key: "backend",
    title: "Backend Engineering",
    icon: ServerCog,
    overview: "Reliable systems behind the interface: APIs, auth, payments, databases and infrastructure.",
    features: ["REST APIs", "Authentication", "Payment Systems", "Cloud Infrastructure", "Database Design", "Admin Panels", "Internal Tools"],
    technology: ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
    timeline: "Usually 3-10 weeks depending on system depth.",
    audience: "Teams that need software built on a stable technical foundation.",
  },
];

const techGroups = [
  { title: "Frontend", icon: Code2, items: ["Next.js", "React", "Tailwind", "TypeScript", "Framer Motion"] },
  { title: "Backend", icon: Terminal, items: ["Node.js", "Express", "Python", "FastAPI"] },
  { title: "Database", icon: Database, items: ["Supabase", "PostgreSQL", "MongoDB", "Redis"] },
  { title: "AI", icon: Bot, items: ["OpenAI", "Claude", "Gemini", "LangChain", "Llama", "Computer Vision"] },
  { title: "Cloud", icon: Cloud, items: ["AWS", "Docker", "GitHub", "Vercel", "Cloudflare"] },
];

const processSteps = ["Discovery", "Planning", "Design", "Development", "Testing", "Deployment", "Support"];

const sidebarLinks: Array<{ id: string; label: string; icon: LucideIcon }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "websites", label: "Websites", icon: MonitorSmartphone },
  { id: "apps", label: "Apps", icon: Smartphone },
  { id: "ai", label: "AI", icon: BrainCircuit },
  { id: "creative", label: "Creative", icon: Clapperboard },
  { id: "technology", label: "Technology", icon: Code2 },
  { id: "process", label: "Process", icon: Settings2 },
  { id: "contact", label: "Contact", icon: Mail },
];

function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0B0B0B]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div
        className="text-[clamp(2.4rem,8vw,7rem)] font-semibold tracking-[0.16em] text-white"
        initial={{ opacity: 0, scale: 0.96, textShadow: "0 0 0 rgba(128,89,72,0)" }}
        animate={{
          opacity: [0, 1, 1],
          scale: [0.96, 1, 1],
          textShadow: [
            "0 0 0 rgba(128,89,72,0)",
            "0 0 42px rgba(128,89,72,0.5)",
            "0 0 22px rgba(128,89,72,0.28)",
          ],
        }}
        transition={{ duration: 2.1, times: [0, 0.58, 1], ease }}
      >
        SKALE<span className="text-[#805948]">KRAFT</span>
      </motion.div>
    </motion.div>
  );
}

function IconTile({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition duration-500 group-hover:border-[#805948]/60 group-hover:bg-[#805948]/12">
      <span className="absolute inset-x-3 top-3 h-px bg-white/20" />
      <span className="absolute bottom-3 left-3 h-px w-5 bg-[#805948]/70" />
      <span className="absolute -right-5 -top-5 h-12 w-12 rounded-full bg-[#805948]/25 blur-xl transition duration-500 group-hover:bg-[#805948]/45" />
      <Icon className="relative h-7 w-7 text-white transition duration-500 group-hover:scale-110 group-hover:text-[#d1aa98]" strokeWidth={1.65} />
    </span>
  );
}

function ServiceSelection({ onChoose, onSkip }: { onChoose: (destination: DestinationKey) => void; onSkip: () => void }) {
  return (
    <motion.section
      className="fixed inset-0 z-[70] flex min-h-screen items-center justify-center overflow-y-auto bg-[#0B0B0B] px-5 py-16 text-white"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(128,89,72,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%)]" />
      <button
        type="button"
        onClick={onSkip}
        className="absolute right-6 top-6 rounded-full border border-white/10 px-4 py-2 text-sm text-white/45 transition duration-300 hover:border-white/25 hover:text-white"
      >
        Skip
      </button>
      <div className="relative mx-auto w-full max-w-6xl text-center">
        <motion.p
          className="text-sm uppercase tracking-[0.26em] text-[#c19a88]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          SkaleKraft
        </motion.p>
        <motion.h1
          className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease }}
        >
          What are we building today?
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-white/50"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
        >
          Choose your destination.
        </motion.p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((destination, index) => {
            const Icon = destination.icon;
            return (
              <motion.button
                key={destination.key}
                type="button"
                onClick={() => onChoose(destination.key)}
                className="group relative min-h-[230px] overflow-hidden rounded-[24px] border border-white/10 bg-[#101010] p-5 text-left shadow-[0_18px_70px_rgba(0,0,0,0.28)] transition duration-500 hover:border-[#805948]/80"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 + index * 0.04, ease }}
                whileHover={{ scale: 1.035, y: -6 }}
                whileTap={{ scale: 0.985 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(128,89,72,0.2),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col justify-between gap-10">
                  <IconTile Icon={Icon} />
                  <span>
                    <span className="block text-2xl font-medium">{destination.label}</span>
                    <span className="mt-3 block text-sm leading-6 text-white/48">{destination.subtitle}</span>
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  return (
    <aside className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 rounded-[24px] border border-white/10 bg-[#0B0B0B]/70 p-2 text-white shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:w-40 md:block md:w-[68px]">
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = active === link.id;
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className={`group/item flex h-12 items-center gap-3 overflow-hidden rounded-2xl px-3 text-left transition duration-300 ${
                isActive ? "bg-[#805948]/22 text-white shadow-[0_0_24px_rgba(128,89,72,0.24)]" : "text-white/45 hover:bg-white/[0.04] hover:text-white"
              }`}
              aria-label={link.label}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap text-sm opacity-0 transition duration-300 group-hover:opacity-100">{link.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#0B0B0B]/72 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-10 md:pl-24">
        <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-white">
          SKALE<span className="text-[#805948]">KRAFT</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <span className="hidden text-sm text-white/45 lg:inline">Engineering software that scales.</span>
          <Link
            href="/join"
            className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/55 transition duration-300 hover:border-white/25 hover:text-white sm:inline-flex"
          >
            <UserPlus className="h-4 w-4" />
            Join
          </Link>
          <Link
            href="/contact"
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border border-[#805948]/70 bg-[#805948] px-5 text-sm font-medium text-white shadow-[0_0_34px_rgba(128,89,72,0.22)] transition duration-300 hover:bg-[#936857]"
          >
            <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
            <Mail className="relative h-4 w-4" />
            <span className="relative">Start</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function CinematicHero({ onExplore }: { onExplore: () => void }) {
  return (
    <section id="home" className="relative flex min-h-screen items-end overflow-hidden px-5 pb-14 pt-32 md:px-10 md:pl-24 lg:pb-20">
      <div className="absolute inset-0 bg-[#0B0B0B]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(128,89,72,0.28),transparent_34%),radial-gradient(circle_at_40%_58%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(90deg,#0B0B0B_0%,rgba(11,11,11,0.92)_30%,rgba(11,11,11,0.38)_68%,#0B0B0B_100%)]" />
      <div className="absolute right-4 top-32 h-[54vh] w-[72vw] max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#101010] shadow-[0_35px_120px_rgba(0,0,0,0.55)] md:right-10 md:top-28">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(128,89,72,0.28),transparent_28%),radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.2),transparent_18%),linear-gradient(135deg,#15110f,#0B0B0B_45%,#1a1411)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
      </div>
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease }}
      >
        <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Software engineering and AI studio</p>
        <h1 className="mt-5 text-5xl font-medium tracking-tight text-white sm:text-7xl lg:text-8xl">
          Engineering Digital Products That Businesses Remember.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60 sm:text-xl">
          We build websites, apps, AI systems and creative experiences designed for performance, scalability and long-term growth.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact" className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white">
            <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
            <span className="relative">Start Project</span>
            <ArrowRight className="relative h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={onExplore}
            className="inline-flex h-13 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white/70 transition duration-300 hover:border-[#805948] hover:bg-[#805948]/15 hover:text-white"
          >
            Explore Services
          </button>
        </div>
      </motion.div>
    </section>
  );
}

function RowCard({ label, icon: Icon, onClick }: { label: string; icon: LucideIcon; onClick?: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group relative h-36 w-[72vw] max-w-[320px] shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#101010] p-5 text-left shadow-[0_16px_60px_rgba(0,0,0,0.26)] transition duration-500 hover:border-[#805948]/70 sm:w-72"
      whileHover={{ scale: 1.035, y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.45, ease }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(128,89,72,0.22),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-between">
        <Icon className="h-7 w-7 text-[#c19a88]" strokeWidth={1.7} />
        <span className="text-xl font-medium text-white">{label}</span>
      </div>
    </motion.button>
  );
}

function ContentRow({ title, items, icon, onItemClick }: { title: string; items: string[]; icon: LucideIcon; onItemClick?: (item: string) => void }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between pr-6">
        <h2 className="text-2xl font-medium text-white">{title}</h2>
        <ArrowRight className="h-5 w-5 text-white/35" aria-hidden />
      </div>
      <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <RowCard key={`${title}-${item}`} label={item} icon={icon} onClick={onItemClick ? () => onItemClick(item) : undefined} />
        ))}
      </div>
    </section>
  );
}

function ServicePanel({ service, onClose }: { service: (typeof servicePanels)[number]; onClose: () => void }) {
  const Icon = service.icon;

  return (
    <motion.section
      className="overflow-hidden rounded-[28px] border border-[#805948]/35 bg-[#101010] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.45),0_0_42px_rgba(128,89,72,0.12)] md:p-8"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.985 }}
      transition={{ duration: 0.55, ease }}
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-3xl">
          <IconTile Icon={Icon} />
          <p className="mt-8 text-sm uppercase tracking-[0.26em] text-[#c19a88]">Service page</p>
          <h2 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-6xl">{service.title}</h2>
          <p className="mt-5 text-lg leading-8 text-white/58">{service.overview}</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 transition hover:border-white/25 hover:text-white">
          Close
        </button>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-5">
        {[
          ["Features", service.features],
          ["Technology Used", service.technology],
          ["Typical Timeline", [service.timeline]],
          ["Who it's for", [service.audience]],
        ].map(([title, items]) => (
          <div key={title as string} className="rounded-[22px] border border-white/10 bg-[#0B0B0B] p-5 lg:col-span-1">
            <h3 className="text-sm uppercase tracking-[0.18em] text-white/40">{title as string}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {(items as string[]).map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-sm leading-6 text-white/58">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="rounded-[22px] border border-white/10 bg-[#0B0B0B] p-5 lg:col-span-1">
          <h3 className="text-sm uppercase tracking-[0.18em] text-white/40">CTA</h3>
          <Link href="/contact" className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-[#0B0B0B] transition hover:bg-[#805948] hover:text-white">
            Start This Project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

function TechStackSection() {
  return (
    <section id="technology" className="scroll-mt-24 py-16">
      <SectionHeader eyebrow="Tech stack" title="Modern tools, selected for reliable delivery." text="Elegant technology cards grouped by the parts of a real production system." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {techGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <motion.article
              key={group.title}
              className="group rounded-[24px] border border-white/10 bg-[#101010] p-6 transition duration-500 hover:border-[#805948]/60"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.04, ease }}
              whileHover={{ y: -4 }}
            >
              <IconTile Icon={Icon} />
              <h3 className="mt-7 text-2xl font-medium text-white">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/55">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div
      className="mb-10 max-w-3xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.55, ease }}
    >
      <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-8 text-white/55">{text}</p>}
    </motion.div>
  );
}

export default function StreamingExperience() {
  const [stage, setStage] = useState<Stage>("idle");
  const [showSplash, setShowSplash] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [expandedService, setExpandedService] = useState<(typeof servicePanels)[number] | null>(null);
  const pendingTarget = useRef<string | null>(null);

  const serviceLookup = useMemo(() => new Map(servicePanels.map((service) => [service.key, service])), []);

  useEffect(() => {
    let timer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      const selectedDestination = window.sessionStorage.getItem("skalekraftDestination") as DestinationKey | null;
      const hasSeenIntro = window.sessionStorage.getItem("skalekraftIntroSeen") === "true";

      const finish = () => {
        setShowSplash(false);
        setStage(selectedDestination ? "home" : "selection");
        if (selectedDestination) {
          pendingTarget.current = destinations.find((destination) => destination.key === selectedDestination)?.target || "home";
        }
      };

      if (hasSeenIntro) {
        finish();
        return;
      }

      setShowSplash(true);
      window.sessionStorage.setItem("skalekraftIntroSeen", "true");
      timer = window.setTimeout(finish, 2600);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (stage !== "home" || !pendingTarget.current) return;

    const target = pendingTarget.current;
    pendingTarget.current = null;
    window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(target);
    }, 450);
  }, [stage]);

  useEffect(() => {
    if (stage !== "home") return;

    const sections = sidebarLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.12, 0.3, 0.55] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [stage]);

  const openHome = (target: string = "home") => {
    setStage("home");
    pendingTarget.current = target;
  };

  const chooseDestination = (destination: DestinationKey) => {
    window.sessionStorage.setItem("skalekraftDestination", destination);
    const target = destinations.find((item) => item.key === destination)?.target || "home";
    openHome(target);
  };

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  const openService = (key: string) => {
    const service = serviceLookup.get(key);
    if (!service) return;

    setExpandedService(service);
    window.setTimeout(() => document.getElementById("service-panel")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0B0B0B] text-white">
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <AnimatePresence mode="wait">
        {stage === "selection" && <ServiceSelection key="selection" onChoose={chooseDestination} onSkip={() => chooseDestination("everything")} />}
      </AnimatePresence>

      {stage === "home" && (
        <motion.div
          key="home"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease }}
        >
          <Header />
          <Sidebar active={activeSection} onNavigate={navigate} />
          <CinematicHero onExplore={() => navigate("websites")} />

          <main className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10 md:pl-24">
            <section id="websites" className="scroll-mt-24 space-y-12 py-12">
              <ContentRow title="Featured Services" items={featuredServices} icon={Rocket} onItemClick={(item) => {
                if (["Business Websites", "Landing Pages", "SaaS Platforms"].includes(item)) openService("websites");
                if (["Mobile Apps"].includes(item)) openService("apps");
                if (["AI Agents", "Chatbots", "Automation"].includes(item)) openService("ai");
              }} />
              <div id="service-panel" className="scroll-mt-24">
                <AnimatePresence>
                  {expandedService && <ServicePanel service={expandedService} onClose={() => setExpandedService(null)} />}
                </AnimatePresence>
              </div>
            </section>

            <section id="apps" className="scroll-mt-24 py-12">
              <ContentRow title="Apps" items={appRow} icon={Smartphone} onItemClick={() => openService("apps")} />
            </section>

            <section id="ai" className="scroll-mt-24 py-12">
              <ContentRow title="AI Systems" items={aiRow} icon={BrainCircuit} onItemClick={() => openService("ai")} />
            </section>

            <section id="creative" className="scroll-mt-24 space-y-12 py-12">
              <ContentRow title="Creative Studio" items={creativeRow} icon={Video} onItemClick={() => openService("creative")} />
            </section>

            <section className="scroll-mt-24 space-y-12 py-12">
              <ContentRow title="Technology Stack" items={technologyRow} icon={Code2} />
              <ContentRow title="Industries" items={industries} icon={BriefcaseBusiness} />
              <ContentRow title="What We Build" items={buildRow} icon={Layers3} onItemClick={(item) => {
                if (["Business Websites", "Dashboards", "Booking Systems", "Portals"].includes(item)) openService("websites");
                if (["AI Products"].includes(item)) openService("ai");
                if (["Internal Tools", "Admin Panels", "Marketplaces"].includes(item)) openService("backend");
              }} />
            </section>

            <TechStackSection />

            <section id="process" className="scroll-mt-24 py-16">
              <SectionHeader eyebrow="How we work" title="Clear steps, steady execution." />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
                {processSteps.map((step, index) => (
                  <motion.article
                    key={step}
                    className="group rounded-[22px] border border-white/10 bg-[#101010] p-5 transition duration-500 hover:border-[#805948]/60"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.04, ease }}
                    whileHover={{ y: -4 }}
                  >
                    <span className="text-sm text-[#c19a88]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-8 text-xl font-medium text-white">{step}</h3>
                  </motion.article>
                ))}
              </div>
            </section>

            <motion.section
              id="contact"
              className="my-20 scroll-mt-24 overflow-hidden rounded-[28px] border border-white/10 bg-[#101010] p-8 shadow-[0_30px_110px_rgba(0,0,0,0.4)] md:p-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Contact</p>
                <h2 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-6xl">
                  Ready to build something extraordinary?
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/55">
                  Tell us what you want to build. We&apos;ll help shape the path from idea to production.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white">
                  Start Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex h-13 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white/70 transition duration-300 hover:border-[#805948] hover:bg-[#805948]/15 hover:text-white">
                  Book a Call
                </Link>
              </div>
            </motion.section>
          </main>
        </motion.div>
      )}
    </div>
  );
}
