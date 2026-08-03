"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Clapperboard,
  Home,
  Mail,
  MonitorSmartphone,
  Smartphone,
  Sparkles,
  UserPlus,
  X,
  type LucideIcon,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type Stage = "idle" | "selection" | "home";
type ServiceKey = "websites" | "apps" | "ai" | "creative";
type DestinationKey = ServiceKey | "everything";

const accent = {
  websites: { name: "Blue", rgb: "59,130,246", hex: "#3B82F6" },
  apps: { name: "Purple", rgb: "168,85,247", hex: "#A855F7" },
  ai: { name: "Cyan", rgb: "34,211,238", hex: "#22D3EE" },
  creative: { name: "Orange", rgb: "249,115,22", hex: "#F97316" },
};

const serviceImages: Record<ServiceKey, { src: string; alt: string }> = {
  websites: { src: "/images/web.png", alt: "Web development website interface preview" },
  apps: { src: "/images/mobile.png", alt: "Mobile app phone interface preview" },
  ai: { src: "/images/ai.png", alt: "AI agent command center interface preview" },
  creative: { src: "/images/edit.png", alt: "Video editing timeline interface preview" },
};

const services: Record<ServiceKey, {
  key: ServiceKey;
  title: string;
  label: string;
  selectionTitle: string;
  subtitle: string;
  short: string;
  icon: LucideIcon;
  capabilities: string[];
  why: string[];
  idealFor: string[];
  technology: string[];
  process: string[];
  timeline: string;
  pricing: string;
  faq: Array<{ q: string; a: string }>;
}> = {
  websites: {
    key: "websites",
    title: "Web Development",
    label: "Websites",
    selectionTitle: "Websites",
    subtitle: "Business websites, SaaS, landing pages and portals.",
    short: "Build websites that convert visitors into customers.",
    icon: MonitorSmartphone,
    capabilities: ["Business Websites", "Landing Pages", "E-Commerce", "SaaS Platforms", "Dashboards", "Portals", "Booking Systems", "CMS"],
    why: ["Fast", "Responsive", "SEO Ready", "Secure", "Scalable"],
    idealFor: ["Service businesses", "SaaS teams", "Founders", "E-commerce brands"],
    technology: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    process: ["Discovery", "Architecture", "Interface Design", "Development", "Testing", "Launch"],
    timeline: "2-8 weeks",
    pricing: "Project pricing starts from $1,500.",
    faq: [
      { q: "Can you build both marketing pages and app dashboards?", a: "Yes. We can build public websites, private dashboards, portals and custom web applications." },
      { q: "Will it work well on mobile?", a: "Yes. Responsive behavior is planned from the start, not patched in later." },
    ],
  },
  apps: {
    key: "apps",
    title: "Mobile Apps",
    label: "Apps",
    selectionTitle: "Apps",
    subtitle: "Android, iOS and cross platform apps.",
    short: "Native and cross-platform apps built for growth.",
    icon: Smartphone,
    capabilities: ["Android", "iOS", "Cross Platform", "React Native", "Flutter", "Backend APIs", "Deployment"],
    why: ["Clean flows", "Stable releases", "API ready", "Scalable backend", "Launch support"],
    idealFor: ["Consumer products", "Business tools", "SaaS apps", "Internal mobile workflows"],
    technology: ["React Native", "Flutter", "Node.js", "Supabase", "PostgreSQL"],
    process: ["Scope", "Product Flow", "Prototype", "Build", "QA", "Store Prep"],
    timeline: "4-12 weeks",
    pricing: "Project pricing starts from $3,000.",
    faq: [
      { q: "Can one app work for both Android and iOS?", a: "Yes. Cross-platform builds are often the right choice when speed and budget matter." },
      { q: "Do you handle backend APIs too?", a: "Yes. We can build the mobile app and the backend it depends on." },
    ],
  },
  ai: {
    key: "ai",
    title: "AI Systems",
    label: "AI",
    selectionTitle: "AI",
    subtitle: "AI agents, chatbots, automation and ML.",
    short: "Automate work using AI agents and intelligent software.",
    icon: BrainCircuit,
    capabilities: ["AI Agents", "Chatbots", "Voice AI", "Computer Vision", "RAG", "Machine Learning", "Automation", "Custom AI"],
    why: ["Useful workflows", "Human review", "Data aware", "Secure patterns", "Measurable output"],
    idealFor: ["Support teams", "Sales teams", "Ops teams", "Knowledge-heavy businesses"],
    technology: ["OpenAI", "Claude", "Gemini", "LangChain", "Python", "FastAPI"],
    process: ["Use Case", "Data Review", "Prototype", "Integration", "Testing", "Monitoring"],
    timeline: "2-10 weeks",
    pricing: "Project pricing starts from $2,000.",
    faq: [
      { q: "Can AI connect with our existing tools?", a: "Yes. Integrations are usually the most useful part of an AI system." },
      { q: "Do you build RAG systems?", a: "Yes. We can build retrieval systems for documents, knowledge bases and internal content." },
    ],
  },
  creative: {
    key: "creative",
    title: "Creative Studio",
    label: "Creative",
    selectionTitle: "Creative",
    subtitle: "Video editing, motion graphics and content.",
    short: "Professional editing and motion graphics.",
    icon: Clapperboard,
    capabilities: ["YouTube", "Instagram", "Ads", "Motion Graphics", "Color Grading", "Short-form Content"],
    why: ["Sharp pacing", "Clean story", "Platform ready", "Visual polish", "Fast iteration"],
    idealFor: ["Creators", "Product launches", "Brands", "Social campaigns"],
    technology: ["Premiere Pro", "After Effects", "Figma", "Photoshop"],
    process: ["Brief", "Asset Review", "Edit", "Motion", "Polish", "Export"],
    timeline: "2 days to 3 weeks",
    pricing: "Project pricing starts from $300.",
    faq: [
      { q: "Do you edit short-form content?", a: "Yes. Reels, Shorts and ad creatives are part of the studio offer." },
      { q: "Can you create thumbnails too?", a: "Yes. Thumbnail design can be included with editing work." },
    ],
  },
};

const destinations: Array<{ key: DestinationKey; label: string; subtitle: string; icon: LucideIcon; target: string }> = [
  { key: "websites", label: "Websites", subtitle: services.websites.subtitle, icon: MonitorSmartphone, target: "websites" },
  { key: "apps", label: "Apps", subtitle: services.apps.subtitle, icon: Smartphone, target: "apps" },
  { key: "ai", label: "AI", subtitle: services.ai.subtitle, icon: BrainCircuit, target: "ai" },
  { key: "creative", label: "Creative", subtitle: services.creative.subtitle, icon: Clapperboard, target: "creative" },
  { key: "everything", label: "Explore Everything", subtitle: "Show me everything SkaleKraft offers.", icon: Sparkles, target: "home" },
];

const sidebarLinks: Array<{ id: string; label: string; icon: LucideIcon; color?: ServiceKey }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "websites", label: "Websites", icon: MonitorSmartphone, color: "websites" },
  { id: "apps", label: "Apps", icon: Smartphone, color: "apps" },
  { id: "ai", label: "AI", icon: BrainCircuit, color: "ai" },
  { id: "creative", label: "Creative", icon: Clapperboard, color: "creative" },
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
        <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">SkaleKraft</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">What are we building today?</h1>
        <p className="mt-4 text-lg text-white/50">Choose your destination.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {destinations.map((destination, index) => {
            const Icon = destination.icon;
            const key = destination.key === "everything" ? "websites" : destination.key;
            return (
              <motion.button
                key={destination.key}
                type="button"
                onClick={() => onChoose(destination.key)}
                className="group relative min-h-[230px] overflow-hidden rounded-[24px] border border-white/10 bg-[#101010] p-5 text-left shadow-[0_18px_70px_rgba(0,0,0,0.28)] transition duration-500"
                style={{ "--service": accent[key].rgb } as React.CSSProperties}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 + index * 0.04, ease }}
                whileHover={{ scale: 1.035, y: -6, borderColor: `rgba(${accent[key].rgb},0.75)`, boxShadow: `0 26px 85px rgba(0,0,0,.44), 0 0 36px rgba(${accent[key].rgb},.2)` }}
                whileTap={{ scale: 0.985 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(var(--service),0.2),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col justify-between gap-10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035]">
                    <Icon className="h-7 w-7" style={{ color: accent[key].hex }} strokeWidth={1.7} />
                  </span>
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

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#0B0B0B]/72 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-10 md:pl-24">
        <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-white">
          SKALE<span className="text-[#805948]">KRAFT</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <span className="hidden text-sm text-white/45 lg:inline">Engineering software that scales.</span>
          <Link href="/join" className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/55 transition duration-300 hover:border-white/25 hover:text-white sm:inline-flex">
            <UserPlus className="h-4 w-4" />
            Join
          </Link>
          <Link href="/contact" className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border border-[#805948]/70 bg-[#805948] px-5 text-sm font-medium text-white shadow-[0_0_34px_rgba(128,89,72,0.22)] transition duration-300 hover:bg-[#936857]">
            <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
            <Mail className="relative h-4 w-4" />
            <span className="relative">Start</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  return (
    <aside className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 rounded-[24px] border border-white/10 bg-[#0B0B0B]/70 p-2 text-white shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:w-42 md:block md:w-[68px]">
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = active === link.id;
          const glow = link.color ? accent[link.color].rgb : "128,89,72";
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className={`group/item flex h-12 items-center gap-3 overflow-hidden rounded-2xl px-3 text-left transition duration-300 ${
                isActive ? "text-white" : "text-white/45 hover:bg-white/[0.04] hover:text-white"
              }`}
              style={isActive ? { backgroundColor: `rgba(${glow},0.16)`, boxShadow: `0 0 24px rgba(${glow},0.24)` } : undefined}
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

function CinematicHero() {
  const [glow, setGlow] = useState({ x: "68%", y: "42%" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-28 md:px-10 md:pl-24 lg:py-32"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setGlow({
          x: `${((event.clientX - rect.left) / rect.width) * 100}%`,
          y: `${((event.clientY - rect.top) / rect.height) * 100}%`,
        });
      }}
    >
      <div className="absolute inset-0 bg-[#0B0B0B]" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(128,89,72,0.24),transparent_32%),linear-gradient(90deg,#0B0B0B_0%,rgba(11,11,11,0.95)_45%,rgba(11,11,11,0.78)_100%)]"
        animate={{ filter: ["hue-rotate(0deg)", "hue-rotate(8deg)", "hue-rotate(0deg)"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#805948]/18 blur-3xl"
        animate={{ left: glow.x, top: glow.y }}
        transition={{ duration: 0.5, ease }}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-12 lg:grid-cols-[45fr_55fr] xl:gap-16">
        <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }}>
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Software Studio</p>
          <h1 className="mt-5 text-5xl font-medium tracking-tight text-white sm:text-6xl xl:text-7xl">
            Build things people actually enjoy using.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl">
            Websites, apps, AI tools and creative work designed to help businesses grow without unnecessary complexity.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white">
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
              <span className="relative">Start a Project</span>
              <ArrowRight className="relative h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_50%_50%,rgba(128,89,72,0.26),transparent_54%)] blur-2xl" />
          <motion.div
            className="relative mx-auto flex h-full min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[32px] bg-white/[0.02] shadow-[0_38px_110px_rgba(0,0,0,0.55)] lg:min-h-[560px]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/hero.png"
              alt="Premium SkaleKraft laptop workspace"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain p-4 md:p-6 lg:p-8"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceVisual({ serviceKey }: { serviceKey: ServiceKey }) {
  const image = serviceImages[serviceKey];
  const glow = accent[serviceKey].rgb;
  const imageClassName =
    serviceKey === "apps"
      ? "object-contain p-8 md:p-10 drop-shadow-[0_0_54px_rgba(168,85,247,.24)]"
      : serviceKey === "ai"
        ? "object-contain p-1 md:p-2 drop-shadow-[0_0_54px_rgba(34,211,238,.2)]"
        : serviceKey === "websites"
          ? "object-contain p-2 md:p-3 drop-shadow-[0_0_52px_rgba(59,130,246,.2)]"
          : "object-contain p-2 md:p-3 drop-shadow-[0_0_56px_rgba(249,115,22,.2)]";
  const imageMotion =
    serviceKey === "apps"
      ? { y: [0, -10, 0] }
      : { y: 0 };

  if (serviceKey === "websites") {
    return (
      <div className="relative h-full min-h-[280px] overflow-hidden rounded-[26px] border border-white/10 bg-[#07111f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,.34),transparent_34%)]" />
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className={imageClassName} />
      </div>
    );
  }

  if (serviceKey === "apps") {
    return (
      <div className="relative h-full min-h-[280px] overflow-hidden rounded-[26px] border border-white/10 bg-[#13091f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_15%,rgba(168,85,247,.34),transparent_36%)]" />
        <motion.div className="absolute inset-0" animate={imageMotion} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className={imageClassName} />
        </motion.div>
      </div>
    );
  }

  if (serviceKey === "ai") {
    return (
      <div className="relative h-full min-h-[280px] overflow-hidden rounded-[26px] border border-white/10 bg-[#06191d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_30%,rgba(34,211,238,.28),transparent_36%)]" />
        <div className="absolute inset-0 rounded-[26px]" style={{ boxShadow: `inset 0 0 70px rgba(${glow},.12)` }} />
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className={imageClassName} />
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[280px] overflow-hidden rounded-[26px] border border-white/10 bg-[#241006]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(249,115,22,.34),transparent_36%)]" />
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className={imageClassName} />
    </div>
  );
}

function ServiceBlock({ service, align = "left", onExplore }: { service: typeof services[ServiceKey]; align?: "left" | "right"; onExplore: (key: ServiceKey) => void }) {
  const Icon = service.icon;
  const color = accent[service.key];

  return (
    <motion.section
      id={service.key}
      className="scroll-mt-24 py-10"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, ease }}
    >
      <div
        className={`grid min-h-[520px] gap-6 rounded-[30px] border border-white/10 bg-[#101010] p-5 shadow-[0_30px_110px_rgba(0,0,0,.35)] md:p-8 lg:grid-cols-2 ${
          align === "right" ? "lg:[&>*:first-child]:order-2" : ""
        }`}
        style={{ boxShadow: `0 30px 110px rgba(0,0,0,.35), 0 0 44px rgba(${color.rgb},.08)` }}
      >
        <ServiceVisual serviceKey={service.key} />
        <div className="flex flex-col justify-center p-2 md:p-6">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-8 w-8" style={{ color: color.hex }} strokeWidth={1.7} />
          </motion.div>
          <h2 className="mt-8 text-4xl font-medium tracking-tight text-white sm:text-6xl">{service.title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/58">{service.short}</p>
          <button
            type="button"
            onClick={() => onExplore(service.key)}
            className="mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full px-5 text-sm font-medium text-white transition duration-300"
            style={{ backgroundColor: `rgba(${color.rgb},0.22)`, border: `1px solid rgba(${color.rgb},0.42)` }}
          >
            Explore
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

function InfoGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[22px] border border-white/10 bg-[#0B0B0B] p-5">
      <h3 className="text-sm uppercase tracking-[0.2em] text-white/40">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ServiceModal({ service, onClose }: { service: typeof services[ServiceKey]; onClose: () => void }) {
  const Icon = service.icon;
  const color = accent[service.key];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/65 p-3 backdrop-blur-xl md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} details`}
    >
      <motion.div
        className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#101010] shadow-[0_40px_140px_rgba(0,0,0,.65)]"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link href="/" className="text-sm font-semibold tracking-[0.24em] text-white">
            SKALE<span className="text-[#805948]">KRAFT</span>
          </Link>
          <button type="button" onClick={onClose} className="rounded-full border border-white/10 p-2 text-white/55 transition hover:border-white/25 hover:text-white" aria-label="Close service details">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto">
          <div className="p-5 md:p-8">
            <div className="overflow-hidden rounded-[26px]">
              <ServiceVisual serviceKey={service.key} />
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-8 w-8" style={{ color: color.hex }} strokeWidth={1.7} />
                </div>
                <h2 className="mt-6 text-4xl font-medium tracking-tight text-white sm:text-6xl">{service.title}</h2>
                <p className="mt-5 text-lg leading-8 text-white/58">{service.short}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium text-white transition" style={{ backgroundColor: color.hex }}>
                    {service.key === "websites" ? "Start Your Website" : "Start Project"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex h-12 items-center rounded-full border border-white/15 px-5 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white">
                    Book Discovery Call
                  </Link>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <InfoGroup title="Overview">
                  <p className="leading-7 text-white/58">{service.subtitle}</p>
                </InfoGroup>
                <InfoGroup title="Capabilities">
                  <div className="flex flex-wrap gap-2">{service.capabilities.map((item) => <Pill key={item} label={item} />)}</div>
                </InfoGroup>
                <InfoGroup title="Ideal For">
                  <div className="flex flex-wrap gap-2">{service.idealFor.map((item) => <Pill key={item} label={item} />)}</div>
                </InfoGroup>
                <InfoGroup title="Technology Used">
                  <div className="flex flex-wrap gap-2">{service.technology.map((item) => <Pill key={item} label={item} />)}</div>
                </InfoGroup>
                <InfoGroup title="Development Process">
                  <div className="grid gap-2">{service.process.map((item, index) => <p key={item} className="text-sm text-white/58">{String(index + 1).padStart(2, "0")} / {item}</p>)}</div>
                </InfoGroup>
                <InfoGroup title="Typical Timeline">
                  <p className="text-2xl font-medium text-white">{service.timeline}</p>
                </InfoGroup>
                <InfoGroup title="Frequently Asked Questions">
                  <div className="space-y-4">{service.faq.map((item) => <div key={item.q}><p className="font-medium text-white">{item.q}</p><p className="mt-1 text-sm leading-6 text-white/52">{item.a}</p></div>)}</div>
                </InfoGroup>
                <InfoGroup title="Pricing starts from">
                  <p className="text-lg font-medium text-white">{service.pricing}</p>
                </InfoGroup>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/58">
      <Check className="h-3.5 w-3.5 text-[#c19a88]" />
      {label}
    </span>
  );
}

export default function StreamingExperience() {
  const [stage, setStage] = useState<Stage>("idle");
  const [showSplash, setShowSplash] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeModal, setActiveModal] = useState<ServiceKey | null>(null);
  const pendingTarget = useRef<string | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      const selectedDestination = window.sessionStorage.getItem("skalekraftDestination") as DestinationKey | null;
      const hasSeenIntro = window.sessionStorage.getItem("skalekraftIntroSeen") === "true";

      const finish = () => {
        setShowSplash(false);
        setStage(selectedDestination ? "home" : "selection");
        if (selectedDestination) pendingTarget.current = selectedDestination === "everything" ? "home" : selectedDestination;
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
    const sections = sidebarLinks.map((link) => document.getElementById(link.id)).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.12, 0.3, 0.55] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [stage]);

  const chooseDestination = (destination: DestinationKey) => {
    window.sessionStorage.setItem("skalekraftDestination", destination);
    setStage("home");
    pendingTarget.current = destination === "everything" ? "home" : destination;
  };

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0B0B0B] text-white">
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <AnimatePresence mode="wait">
        {stage === "selection" && <ServiceSelection key="selection" onChoose={chooseDestination} onSkip={() => chooseDestination("everything")} />}
      </AnimatePresence>

      {stage === "home" && (
        <motion.div key="home" initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, ease }}>
          <Header />
          <Sidebar active={activeSection} onNavigate={navigate} />
          <CinematicHero />
          <main className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10 md:pl-24">
            <div className="py-12">
              <motion.div className="mb-4 max-w-3xl" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.55, ease }}>
                <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Services</p>
                <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-5xl">Choose the system you want to build.</h2>
              </motion.div>
              <ServiceBlock service={services.websites} onExplore={setActiveModal} />
              <ServiceBlock service={services.apps} align="right" onExplore={setActiveModal} />
              <ServiceBlock service={services.ai} onExplore={setActiveModal} />
              <ServiceBlock service={services.creative} align="right" onExplore={setActiveModal} />
            </div>

            <motion.section id="contact" className="my-20 scroll-mt-24 overflow-hidden rounded-[30px] border border-white/10 bg-[#101010] p-8 shadow-[0_30px_110px_rgba(0,0,0,0.4)] md:p-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.6, ease }}>
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Contact</p>
                <h2 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-6xl">Ready to build something extraordinary?</h2>
                <p className="mt-5 text-lg leading-8 text-white/55">Tell us what you want to build. We&apos;ll help shape the path from idea to production.</p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white">
                  Start Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.section>
          </main>
        </motion.div>
      )}

      <AnimatePresence>{activeModal && <ServiceModal service={services[activeModal]} onClose={() => setActiveModal(null)} />}</AnimatePresence>
    </div>
  );
}
