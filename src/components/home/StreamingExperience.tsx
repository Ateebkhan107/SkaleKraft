"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
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
    pricing: "Project pricing starts from $350.",
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
    pricing: "Project pricing starts from $1,000.",
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
    pricing: "Project pricing starts from $600.",
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
    pricing: "Project pricing starts from $60.",
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

const heroNotices = ["Deployment Successful", "Payment Received", "AI Agent Running", "Database Synced"];
const heroCodeLines = ["> npm run deploy", "Build Complete", "Uploading...", "Live"];

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
        className="relative h-[min(58vw,420px)] w-[min(58vw,420px)]"
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
        <Image
          src="/images/skalekraft-logo.png"
          alt="SkaleKraft"
          fill
          sizes="(max-width: 768px) 58vw, 420px"
          className="object-contain drop-shadow-[0_0_42px_rgba(128,89,72,0.32)]"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

function ServiceSelection({ onChoose, onSkip }: { onChoose: (destination: DestinationKey) => void; onSkip: () => void }) {
  return (
    <motion.section
      className="fixed inset-0 z-[70] overflow-y-auto overflow-x-hidden bg-[#0B0B0B] text-white"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(128,89,72,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%)] pointer-events-none" />
        <button
          type="button"
          onClick={onSkip}
          className="absolute right-6 top-6 z-10 rounded-full border border-white/10 px-4 py-2 text-sm text-white/45 transition duration-300 hover:border-white/25 hover:text-white"
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
      </div>
    </motion.section>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#0B0B0B]/72 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-[0.24em] text-white">
          <Image
            src="/images/skalekraft-logo.png"
            alt=""
            width={42}
            height={42}
            className="h-10 w-10 rounded-xl object-cover shadow-[0_0_22px_rgba(128,89,72,0.18)]"
          />
          <span>SKALE<span className="text-[#805948]">KRAFT</span></span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <span className="hidden text-sm text-white/45 lg:inline">Engineering software that scales.</span>
          <Link href="/about" className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/55 transition duration-300 hover:border-white/25 hover:text-white sm:inline-flex">
            About
          </Link>
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
    <aside className="fixed left-3 top-1/2 z-40 hidden w-44 -translate-y-1/2 rounded-[24px] border border-white/10 bg-[#0B0B0B]/70 p-2 text-white shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 md:block">
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
              <span className="whitespace-nowrap text-sm opacity-90 transition duration-300 group-hover/item:opacity-100">{link.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function HeroSoftwareVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-120px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [notice, setNotice] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const noticeTimer = window.setInterval(() => setNotice((current) => (current + 1) % heroNotices.length), 3200);
    const stepTimer = window.setInterval(() => setStep((current) => (current + 1) % heroCodeLines.length), 1500);
    return () => {
      window.clearInterval(noticeTimer);
      window.clearInterval(stepTimer);
    };
  }, [inView]);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -5,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 5,
    });
  };

  return (
    <motion.div
      ref={ref}
      data-cursor-card
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative min-h-[360px] overflow-hidden rounded-[34px] border border-white/10 bg-[#090909] p-4 shadow-[0_38px_110px_rgba(0,0,0,0.55)] sm:min-h-[460px] lg:min-h-[560px]"
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.45 }}
      style={{ boxShadow: "inset 0 0 76px rgba(128,89,72,.08), 0 38px 110px rgba(0,0,0,.55)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(128,89,72,.2),transparent_34%),radial-gradient(circle_at_20%_76%,rgba(255,255,255,.055),transparent_28%)]" />
      {[18, 34, 62, 78].map((left, index) => (
        <motion.span
          key={left}
          className="absolute h-1 w-1 rounded-full bg-white/35"
          style={{ left: `${left}%`, top: `${[18, 72, 28, 58][index]}%` }}
          animate={inView ? { opacity: [0.18, 0.55, 0.18], y: [0, -10, 0] } : { opacity: 0.18 }}
          transition={{ duration: 4 + index, delay: index * 0.45, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="absolute left-5 top-5 h-[72%] w-[72%] overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d]/88 shadow-[0_24px_80px_rgba(0,0,0,.42)] backdrop-blur"
        animate={inView ? { y: [0, -7, 0] } : { y: 0 }}
        transition={{ duration: 7, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
      >
        <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/[0.035] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/65" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/65" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/65" />
          <div className="ml-3 h-5 flex-1 rounded-full border border-white/8 bg-black/28" />
        </div>
        <motion.div className="p-4" animate={inView ? { y: [0, -58, -58, 0] } : { y: 0 }} transition={{ duration: 9, repeat: inView ? Infinity : 0, ease: "easeInOut" }}>
          <div className="flex items-center justify-between text-[10px] text-white/40">
            <span className="font-semibold tracking-[0.2em] text-[#c19a88]">SKALE UI</span>
            <div className="flex gap-3"><span>Home</span><span>Work</span><span>Build</span></div>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-[1fr_.85fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/36">Production System</p>
              <h3 className="mt-2 max-w-[260px] text-2xl font-medium leading-tight text-white sm:text-3xl">Software that feels calm and fast.</h3>
              <div className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-medium text-black">Start Project</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
              <svg viewBox="0 0 220 110" className="h-24 w-full overflow-visible">
                <motion.path
                  d="M8 88 C 38 32, 58 80, 86 48 S 138 18, 166 44 S 194 72, 214 24"
                  fill="none"
                  stroke="#D8A25A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0.45 }}
                  transition={{ duration: 3.6, repeat: inView ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }}
                />
                {[8, 86, 166, 214].map((cx, index) => (
                  <motion.circle key={cx} cx={cx} cy={[88, 48, 44, 24][index]} r="4" fill="#D8A25A" animate={inView ? { scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] } : { scale: 1 }} transition={{ duration: 2, delay: index * 0.22, repeat: inView ? Infinity : 0 }} />
                ))}
              </svg>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Speed", "Leads", "Health"].map((label, index) => (
              <motion.div key={label} className="rounded-xl border border-white/8 bg-black/24 p-3" initial={false} animate={inView ? { opacity: [0.55, 1, 0.72] } : { opacity: 0.7 }} transition={{ duration: 3, delay: index * 0.22, repeat: inView ? Infinity : 0 }}>
                <p className="text-[10px] text-white/36">{label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{[98, 42, 99][index]}%</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-5 top-14 w-44 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_70px_rgba(0,0,0,.38)] backdrop-blur-xl"
        animate={inView ? { y: [0, 10, 0], x: [0, -4, 0] } : { y: 0, x: 0 }}
        transition={{ duration: 6, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
      >
        <p className="text-xs text-white/40">Revenue</p>
        <p className="mt-1 text-2xl font-semibold text-white">$29.8k</p>
        <p className="mt-2 text-xs text-emerald-300">up +24%</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-black/24 p-2"><p className="text-[10px] text-white/36">Projects</p><p className="text-sm text-white">148</p></div>
          <div className="rounded-xl bg-black/24 p-2"><p className="text-[10px] text-white/36">Users</p><p className="text-sm text-white">8.2k</p></div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={notice}
          className="absolute right-6 top-[46%] rounded-2xl border border-emerald-300/18 bg-emerald-300/10 px-4 py-3 text-sm text-white/82 shadow-[0_18px_58px_rgba(0,0,0,.4)] backdrop-blur-xl"
          initial={{ opacity: 0, x: 42, y: 8 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
          exit={{ opacity: 0, x: 24, y: -8 }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="text-emerald-300">✓</span> {heroNotices[notice]}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute bottom-6 right-7 w-[250px] rounded-2xl border border-white/10 bg-black/45 p-4 font-mono text-xs text-white/70 shadow-[0_22px_70px_rgba(0,0,0,.42)] backdrop-blur-xl"
        animate={inView ? { y: [0, -8, 0] } : { y: 0 }}
        transition={{ duration: 6.5, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
      >
        {heroCodeLines.map((line, index) => (
          <motion.p key={line} className={index === 0 ? "text-white" : "text-emerald-300/86"} initial={false} animate={{ opacity: index <= step ? 1 : 0.18, x: index <= step ? 0 : -8 }} transition={{ duration: 0.35 }}>
            {index === 0 ? line : `✓ ${line}`}
          </motion.p>
        ))}
      </motion.div>

      <div className="absolute bottom-8 left-8 w-[42%] rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between text-xs text-white/45"><span>Live graph</span><span>12:48</span></div>
        <svg viewBox="0 0 260 110" className="h-28 w-full overflow-visible">
          <motion.path d="M6 92 C 44 42, 58 82, 92 54 S 150 20, 174 52 S 222 84, 254 22" fill="none" stroke="#805948" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0.35 }} transition={{ duration: 4.4, repeat: inView ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }} />
          <motion.g animate={inView ? { x: [6, 254], y: [92, 22] } : { x: 6, y: 92 }} transition={{ duration: 4.4, repeat: inView ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }}>
            <rect x="-30" y="-34" width="62" height="24" rx="8" fill="rgba(255,255,255,.1)" />
            <text x="-20" y="-18" fill="rgba(255,255,255,.75)" fontSize="10">+18.6%</text>
            <circle r="5" fill="#805948" />
          </motion.g>
        </svg>
      </div>
    </motion.div>
  );
}

function CinematicHero() {
  const [glow, setGlow] = useState({ x: "68%", y: "42%" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-28 md:px-10 md:pl-56 lg:py-32"
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

        <div className="relative">
          <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_50%_50%,rgba(128,89,72,0.22),transparent_54%)] blur-2xl" />
          <HeroSoftwareVisual />
        </div>
      </div>
    </section>
  );
}

function ServiceVisual({ serviceKey }: { serviceKey: ServiceKey }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.28, margin: "-120px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const color = accent[serviceKey];

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -7,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 7,
    });
  };

  return (
    <motion.div
      ref={ref}
      data-cursor-card
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative h-full min-h-[360px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0B0B0B] p-4 md:min-h-[430px]"
      style={{ boxShadow: `inset 0 0 0 1px rgba(${color.rgb},.08), 0 0 58px rgba(${color.rgb},.12)` }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.4 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),transparent_34%,rgba(255,255,255,0.025))]" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 68% 20%, rgba(${color.rgb}, .18), transparent 38%)` }} />
      <div className="relative h-full">
        {serviceKey === "websites" && <WebsiteShowcase active={inView} />}
        {serviceKey === "apps" && <AppShowcase active={inView} />}
        {serviceKey === "ai" && <AIShowcase active={inView} />}
        {serviceKey === "creative" && <CreativeShowcase active={inView} />}
      </div>
    </motion.div>
  );
}

function WebsiteShowcase({ active }: { active: boolean }) {
  const widgets = ["Leads", "Bookings", "Revenue"];
  const pricing = ["Starter", "Growth", "Scale"];

  return (
    <motion.div
      className="absolute inset-3 overflow-hidden rounded-[22px] border border-white/12 bg-[#08090a]/92 shadow-[0_28px_90px_rgba(0,0,0,.42)]"
      animate={active ? { y: [0, -8, 0] } : { y: 0 }}
      transition={{ duration: 7, repeat: active ? Infinity : 0, ease: "easeInOut" }}
    >
      <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/[0.035] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
        <div className="ml-3 h-5 flex-1 rounded-full border border-white/8 bg-black/25" />
      </div>
      <div className="h-[calc(100%-2.25rem)] overflow-hidden p-4">
        <motion.div animate={active ? { y: [0, -76, -76, 0] } : { y: 0 }} transition={{ duration: 9, repeat: active ? Infinity : 0, ease: "easeInOut" }}>
          <div className="flex items-center justify-between text-[11px] text-white/42">
            <span className="font-semibold tracking-[0.2em] text-[#D8A25A]">NOVA</span>
            <div className="flex gap-4"><span>Work</span><span>Pricing</span><span>Contact</span></div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-[1.1fr_.9fr]">
            <div>
              <motion.p className="text-[11px] uppercase tracking-[0.22em] text-white/36" initial={false} animate={active ? { opacity: [0.3, 0.8, 0.5] } : { opacity: 0.45 }} transition={{ duration: 4, repeat: active ? Infinity : 0 }}>Launch dashboard</motion.p>
              <h3 className="mt-3 max-w-xs text-3xl font-medium leading-tight text-white">Build sharper web experiences.</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/45">Clean pages, fast funnels, real product flows.</p>
              <div className="mt-5 flex gap-2">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black">Start</span>
                <span className="rounded-full border border-white/12 px-4 py-2 text-xs text-white/55">Demo</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
              <div className="flex items-end gap-2">
                {[38, 54, 46, 72, 64, 88, 78].map((height, index) => (
                  <motion.span
                    key={index}
                    className="w-full rounded-t bg-[#D8A25A]/70"
                    animate={active ? { height: [`${height * 0.55}px`, `${height}px`, `${height * 0.75}px`] } : { height: `${height}px` }}
                    transition={{ duration: 3.2, delay: index * 0.1, repeat: active ? Infinity : 0, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {widgets.map((item, index) => (
                  <motion.div key={item} className="rounded-xl border border-white/8 bg-black/24 p-2" initial={false} animate={active ? { opacity: [0.55, 1, 0.75] } : { opacity: 0.7 }} transition={{ duration: 3, delay: index * 0.3, repeat: active ? Infinity : 0 }}>
                    <p className="text-[10px] text-white/34">{item}</p>
                    <p className="mt-1 text-sm font-medium text-white">{[42, 81, 64][index]}%</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pricing.map((item, index) => (
              <motion.div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4" initial={{ opacity: 0, y: 18 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 18 }} transition={{ delay: index * 0.12, duration: 0.55, ease }}>
                <p className="text-sm font-medium text-white">{item}</p>
                <p className="mt-4 text-2xl font-semibold text-white">{["$350", "$1k", "$2.4k"][index]}</p>
                <div className="mt-4 h-1.5 rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-[#D8A25A]" animate={active ? { width: ["18%", "74%", "42%"] } : { width: "38%" }} transition={{ duration: 4, repeat: active ? Infinity : 0 }} /></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div className="absolute left-[32%] top-[38%] h-4 w-4 rounded-full border border-white bg-white shadow-[0_0_16px_rgba(216,162,90,.55)]" animate={active ? { x: [0, 150, 190, 84], y: [0, -16, 92, 148] } : { x: 0, y: 0 }} transition={{ duration: 6, repeat: active ? Infinity : 0, ease: "easeInOut" }} />
      <motion.div className="absolute right-5 top-14 rounded-full border border-[#D8A25A]/30 bg-[#D8A25A]/12 px-3 py-2 text-xs text-white/72" initial={false} animate={active ? { x: [80, 0, 0], opacity: [0, 1, 1] } : { x: 80, opacity: 0 }} transition={{ duration: 5, repeat: active ? Infinity : 0, repeatDelay: 1.5 }}>New lead captured</motion.div>
    </motion.div>
  );
}

const phoneScreens = [
  { title: "Fitness", metric: "68%", color: "#8B5CF6", items: ["Workout", "Meals", "Sleep"] },
  { title: "Finance", metric: "$2.9k", color: "#22C55E", items: ["Budget", "Cards", "Invest"] },
  { title: "Travel", metric: "12", color: "#38BDF8", items: ["Trips", "Hotels", "Routes"] },
];

function PhoneMock({ index, side, active }: { index: number; side: "left" | "center" | "right"; active: boolean }) {
  const screen = phoneScreens[index % phoneScreens.length];
  const scale = side === "center" ? 1 : 0.78;
  const blur = side === "center" ? "" : "blur-[1px] opacity-55";

  return (
    <motion.div
      className={`relative h-[300px] w-[148px] shrink-0 rounded-[34px] border border-white/15 bg-[#050505] p-2 shadow-[0_30px_90px_rgba(0,0,0,.45)] ${blur}`}
      animate={active ? { y: side === "center" ? [0, -12, 0] : [10, 0, 10], rotate: side === "left" ? [-8, -5, -8] : side === "right" ? [8, 5, 8] : [-2, 2, -2], scale } : { scale }}
      transition={{ duration: 6, repeat: active ? Infinity : 0, ease: "easeInOut" }}
    >
      <div className="absolute left-1/2 top-3 h-5 w-16 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-full overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,#111,#050505)] p-4">
        <motion.div key={screen.title} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40">9:41</span>
            <span className="h-2 w-8 rounded-full" style={{ backgroundColor: screen.color }} />
          </div>
          <p className="mt-7 text-xs text-white/46">Good morning</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{screen.title}</h3>
          <div className="mt-5 rounded-2xl border border-white/10 p-3" style={{ background: `linear-gradient(135deg, ${screen.color}44, rgba(255,255,255,.03))` }}>
            <p className="text-[10px] text-white/52">Today</p>
            <p className="mt-1 text-3xl font-semibold text-white">{screen.metric}</p>
            <svg viewBox="0 0 120 40" className="mt-3 h-10 w-full">
              <motion.path d="M4 32 C 24 10, 32 36, 48 18 S 78 8, 92 22 S 110 16, 118 6" fill="none" stroke={screen.color} strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0.4 }} transition={{ duration: 2.4, repeat: active ? Infinity : 0, repeatType: "reverse" }} />
            </svg>
          </div>
          <div className="mt-4 space-y-2">
            {screen.items.map((item, itemIndex) => (
              <motion.div key={item} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.035] p-2" initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }} transition={{ delay: itemIndex * 0.12 }}>
                <span className="h-6 w-6 rounded-lg" style={{ backgroundColor: `${screen.color}33` }} />
                <span className="text-[11px] text-white/68">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AppShowcase({ active }: { active: boolean }) {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setScreen((current) => (current + 1) % phoneScreens.length), 5000);
    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(139,92,246,.22),transparent_38%)]" />
      <div className="relative flex items-center gap-3 md:gap-6">
        <PhoneMock index={screen + 2} side="left" active={active} />
        <PhoneMock index={screen} side="center" active={active} />
        <PhoneMock index={screen + 1} side="right" active={active} />
      </div>
    </div>
  );
}

function AIShowcase({ active }: { active: boolean }) {
  const nodes = ["Website", "Lead Agent", "CRM", "Database", "Email", "Analytics"];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="relative h-full w-full max-w-[640px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 360" aria-hidden="true">
          <defs>
            <linearGradient id="ai-line" x1="0" x2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity=".16" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity=".72" />
            </linearGradient>
          </defs>
          {[[105,70,300,70], [340,86,510,142], [500,184,340,255], [300,255,112,215], [112,176,270,118]].map(([x1, y1, x2, y2], index) => (
            <g key={index}>
              <path d={`M${x1} ${y1} C ${(x1 + x2) / 2} ${y1 - 40}, ${(x1 + x2) / 2} ${y2 + 40}, ${x2} ${y2}`} stroke="url(#ai-line)" strokeWidth="2" fill="none" />
              <motion.circle r="4" fill="#22D3EE" animate={active ? { offsetDistance: ["0%", "100%"], opacity: [0, 1, 0] } : { opacity: 0 }} transition={{ duration: 3.2, delay: index * 0.55, repeat: active ? Infinity : 0, ease: "easeInOut" }} style={{ offsetPath: `path("M${x1} ${y1} C ${(x1 + x2) / 2} ${y1 - 40}, ${(x1 + x2) / 2} ${y2 + 40}, ${x2} ${y2}")` }} />
            </g>
          ))}
        </svg>
        {nodes.map((node, index) => {
          const positions = [[30, 35], [242, 35], [450, 104], [282, 230], [34, 186], [472, 254]][index];
          const statuses = ["Thinking...", "Processing...", "Completed"];
          return (
            <motion.div
              key={node}
              className="absolute w-36 rounded-2xl border border-cyan-300/15 bg-white/[0.045] p-3 shadow-[0_18px_54px_rgba(0,0,0,.32)] backdrop-blur-md"
              style={{ left: positions[0], top: positions[1] }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={active ? { opacity: 1, scale: [1, 1.025, 1] } : { opacity: 0.55, scale: 1 }}
              transition={{ duration: 3.4, delay: index * 0.08, repeat: active ? Infinity : 0, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_14px_rgba(34,211,238,.5)]" />
                <p className="text-sm font-medium text-white">{node}</p>
              </div>
              <motion.p className="mt-3 text-xs text-white/45" animate={active ? { opacity: [0.4, 0.8, 0.6] } : { opacity: 0.55 }} transition={{ duration: 2.4, delay: index * 0.2, repeat: active ? Infinity : 0 }}>
                {statuses[index % statuses.length]}
              </motion.p>
            </motion.div>
          );
        })}
        <motion.div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-cyan-300/10" animate={active ? { scale: [1, 1.18, 1], opacity: [0.45, 0.8, 0.45] } : { scale: 1 }} transition={{ duration: 4, repeat: active ? Infinity : 0, ease: "easeInOut" }} />
      </div>
    </div>
  );
}

function CreativeShowcase({ active }: { active: boolean }) {
  const clips = [
    { label: "Intro", width: "22%", color: "#F97316" },
    { label: "Scene", width: "34%", color: "#8B5CF6" },
    { label: "Title", width: "26%", color: "#22D3EE" },
  ];

  return (
    <div className="absolute inset-3 overflow-hidden rounded-[22px] border border-white/10 bg-[#080808]">
      <div className="flex h-full">
        <div className="hidden w-16 border-r border-white/8 bg-white/[0.025] p-2 sm:block">
          {[0, 1, 2, 3].map((item) => <div key={item} className="mb-2 h-10 rounded-lg border border-white/8 bg-white/[0.04]" />)}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#F97316]">Studio timeline</p>
            <div className="flex gap-2 text-[10px] text-white/42"><span>Video</span><span>Audio</span><span>Color</span></div>
          </div>
          <div className="grid flex-1 gap-3 p-4 lg:grid-cols-[1fr_180px]">
            <div className="flex flex-col gap-3">
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#151515,#050505)]">
                <motion.div className="absolute inset-8 rounded-[28px] border border-orange-300/14 bg-orange-500/10" animate={active ? { scale: [1, 1.04, 1], opacity: [0.45, 0.75, 0.45] } : { scale: 1 }} transition={{ duration: 4.5, repeat: active ? Infinity : 0 }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm text-white/78 backdrop-blur">Preview</div>
                </div>
              </div>
              <div className="relative h-36 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                <div className="absolute left-3 right-3 top-3 flex justify-between text-[10px] text-white/28">{["00:00", "00:05", "00:10", "00:15", "00:20"].map((tick) => <span key={tick}>{tick}</span>)}</div>
                <div className="mt-7 space-y-2">
                  {["Video", "Text", "Audio"].map((track, trackIndex) => (
                    <div key={track} className="flex items-center gap-2">
                      <span className="w-10 text-[10px] text-white/34">{track}</span>
                      <div className="flex h-7 flex-1 gap-2 overflow-hidden rounded-lg bg-black/20 p-1">
                        {clips.map((clip, index) => (
                          <motion.span key={`${clip.label}-${track}`} className="flex items-center rounded-md px-2 text-[10px] text-white/80" style={{ width: clip.width, backgroundColor: `${clip.color}${trackIndex === 2 ? "55" : "77"}` }} animate={active && index === 1 ? { opacity: [0.65, 1, 0.65] } : { opacity: 0.82 }} transition={{ duration: 2.2, repeat: active ? Infinity : 0 }}>
                            {clip.label}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <motion.div className="absolute bottom-3 top-5 w-px bg-[#F97316] shadow-[0_0_18px_rgba(249,115,22,.6)]" animate={active ? { left: ["14%", "86%", "14%"] } : { left: "14%" }} transition={{ duration: 5.5, repeat: active ? Infinity : 0, ease: "easeInOut" }} />
              </div>
            </div>
            <div className="hidden rounded-2xl border border-white/10 bg-white/[0.035] p-3 lg:block">
              {["Scale", "Opacity", "Contrast", "Warmth"].map((item, index) => (
                <div key={item} className="mb-5">
                  <div className="mb-2 flex justify-between text-[10px] text-white/42"><span>{item}</span><span>{[92, 78, 64, 48][index]}%</span></div>
                  <div className="h-1.5 rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-[#F97316]" animate={active ? { width: [`${[42, 58, 36, 72][index]}%`, `${[86, 72, 64, 52][index]}%`] } : { width: "50%" }} transition={{ duration: 3, delay: index * 0.25, repeat: active ? Infinity : 0, repeatType: "reverse" }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, ease }}
    >
      <div
        data-cursor-card
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [onClose]);

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
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-white">
            <Image
              src="/images/skalekraft-logo.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-cover shadow-[0_0_18px_rgba(128,89,72,0.16)]"
            />
            <span>SKALE<span className="text-[#805948]">KRAFT</span></span>
          </Link>
          <button ref={closeButtonRef} type="button" onClick={onClose} className="rounded-full border border-white/10 p-2 text-white/55 transition hover:border-white/25 hover:text-white" aria-label="Close service details">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto">
          <div className="p-5 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
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
          <main className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10 md:pl-56">
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

            <motion.section data-cursor-card id="contact" className="my-20 scroll-mt-24 overflow-hidden rounded-[30px] border border-white/10 bg-[#101010] p-8 shadow-[0_30px_110px_rgba(0,0,0,0.4)] md:p-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.6, ease }}>
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