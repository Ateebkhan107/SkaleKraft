"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";
import dynamic from "next/dynamic";
import { showcaseProjects } from "@/lib/showcase-projects";
import ProjectThumbnail from "@/components/work/ProjectThumbnail";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";

import {
  Stage,
  ServiceKey,
  DestinationKey,
  destinations,
  services,
  sidebarLinks,
  accent,
  ease,
} from "./data";
import { Hero3DRobotVisual } from "./Hero3DRobotVisual";
import TechStackRadar from "./TechStackRadar";
import ImpactMetricsBar from "./ImpactMetricsBar";
import { Spotlight } from "@/components/ui/spotlight";

const ServiceModal = dynamic(() => import("./ServiceModal"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[80] bg-[#0B0B0B]/60 backdrop-blur-sm" aria-hidden="true" />
  ),
});
const ServiceVisual = dynamic(
  () => import("./Showcases").then((mod) => mod.ServiceVisual),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[360px] w-full rounded-[26px] border border-white/10 bg-[#0B0B0B] md:min-h-[430px]" />
    ),
  },
);


function IntroSplash({ isLeaving }: { isLeaving: boolean }) {
  return (
    <div
      className="skalekraft-intro-splash fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#0B0B0B]"
      data-state={isLeaving ? "leaving" : "visible"}
      aria-hidden="true"
    >
      <div className="skalekraft-splash-glow pointer-events-none absolute rounded-full bg-[#805948]/14 blur-[120px]"
        style={{ width: "min(80vw,600px)", height: "min(80vw,600px)" }}
      />
      <div className="skalekraft-splash-logo relative h-[min(42vw,300px)] w-[min(42vw,300px)]">
        <Image src="/images/skalekraft-logo.png" alt="" fill sizes="(max-width:768px) 42vw, 300px" className="object-contain" priority />
      </div>
      <p className="skalekraft-splash-text mt-7 text-sm font-medium tracking-[0.32em] text-white/55 uppercase">
        SKALE<span className="text-[#c19a88]">KRAFT</span>
      </p>
      <div className="skalekraft-splash-dots mt-8 flex items-center gap-1.5">
        <span className="skalekraft-dot skalekraft-dot-1 h-1 w-1 rounded-full bg-[#805948]/70" />
        <span className="skalekraft-dot skalekraft-dot-2 h-1 w-1 rounded-full bg-[#805948]/70" />
        <span className="skalekraft-dot skalekraft-dot-3 h-1 w-1 rounded-full bg-[#805948]/70" />
      </div>
    </div>
  );
}

function ServiceSelection({ onChoose, onSkip }: { onChoose: (destination: DestinationKey) => void; onSkip: () => void }) {
  return (
    <section
      className="fixed inset-0 z-[70] min-h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#0B0B0B] pb-[calc(env(safe-area-inset-bottom)+2rem)] text-white"
      style={{ position: "fixed", inset: 0, zIndex: 70, backgroundColor: "#0B0B0B" }}
    >
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(128,89,72,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%)]" />
      <div className="relative flex min-h-full w-full flex-col items-center justify-center p-4 py-16 sm:p-5 sm:py-20 lg:py-16">
        <Link
          href="/?dest=everything"
          onClick={(e) => { e.preventDefault(); onSkip(); }}
          className="absolute right-6 top-6 z-10 rounded-full border border-white/10 px-4 py-2 text-sm text-white/45 transition duration-300 hover:border-white/25 hover:text-white"
        >
          Skip
        </Link>
        <div className="relative mx-auto w-full max-w-6xl text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-[#c19a88] sm:text-sm sm:tracking-[0.26em]">SkaleKraft</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:mt-4 sm:text-5xl lg:text-6xl">What are we building today?</h2>
          <p className="mt-3 text-base text-white/50 sm:mt-4 sm:text-lg">Choose your destination.</p>
          <div className="mt-8 grid min-w-0 grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-4">
            {destinations.map((destination) => {
              const Icon = destination.icon;
              const key = destination.key === "everything" ? "websites" : destination.key;
              const isEverything = destination.key === "everything";
              return (
                <Link
                  key={destination.key}
                  href={`/?dest=${destination.key}`}
                  onClick={(e) => { e.preventDefault(); onChoose(destination.key); }}
                  className={`group relative h-32 min-w-0 overflow-hidden rounded-[20px] border border-white/10 bg-[#101010] p-3 text-left shadow-[0_18px_70px_rgba(0,0,0,0.28)] transition duration-500 sm:h-40 sm:p-4 lg:h-[200px] lg:rounded-[24px] lg:p-5 ${
                    isEverything ? "col-span-2 sm:col-span-1" : ""
                  }`}
                  style={{ "--service": accent[key].rgb } as React.CSSProperties}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(var(--service),0.2),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col justify-between gap-4 sm:gap-6 lg:gap-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" style={{ color: accent[key].hex }} strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-medium sm:text-lg lg:text-xl">{destination.label}</span>
                      <span className="mt-3 hidden overflow-hidden text-sm leading-6 text-white/48 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:[display:-webkit-box]">
                        {destination.subtitle}
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  return (
    <aside
      className="group/sidebar fixed left-3 top-1/2 z-40 hidden w-44 -translate-y-1/2 rounded-[24px] border border-white/10 bg-[#0B0B0B]/80 p-2 text-white shadow-[0_24px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_2px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 md:block overflow-hidden"
      style={{ position: "fixed" }}
    >
      {/* Interactive mouse spotlight following cursor */}
      <Spotlight
        size={200}
        className="from-[#c19a88]/30 via-[#805948]/15 to-transparent blur-2xl"
      />

      {/* Top specular 3D light reflection */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-[24px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 75%, transparent 100%)",
        }}
      />

      <nav className="relative z-10 flex flex-col gap-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = active === link.id;
          const glow = link.color ? accent[link.color].rgb : "193,154,136";

          return (
            <motion.button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              className={`group/item relative flex h-10 items-center gap-3 overflow-hidden rounded-xl px-3 text-left transition-colors duration-200 ${
                isActive ? "text-white font-medium" : "text-white/45 hover:text-white"
              }`}
              aria-label={link.label}
            >
              {/* Animated active pill with fluid spring physics */}
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-pill"
                  className="absolute inset-0 rounded-xl border border-white/15 bg-white/[0.08] shadow-[0_0_20px_rgba(193,154,136,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] -z-10"
                  style={{
                    backgroundColor: `rgba(${glow}, 0.16)`,
                    borderColor: `rgba(${glow}, 0.35)`,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              {/* Active left indicator light notch */}
              {isActive && (
                <motion.span
                  layoutId="active-sidebar-notch"
                  className="absolute left-1 h-3.5 w-1 rounded-full"
                  style={{
                    backgroundColor: link.color ? accent[link.color].hex : "#c19a88",
                    boxShadow: `0 0 10px rgba(${glow}, 0.8)`,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              <Icon
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover/item:scale-110 ml-0.5"
                style={{
                  color: isActive ? (link.color ? accent[link.color].hex : "#c19a88") : undefined,
                }}
              />
              <span className="whitespace-nowrap text-sm tracking-wide transition duration-200">
                {link.label}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}

function CinematicHero() {
  const [glow, setGlow] = useState({ x: "68%", y: "42%" });
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -70]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 95]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.86], [1, prefersReducedMotion ? 1 : 0.2]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-fit items-center overflow-hidden px-4 pb-8 pt-24 sm:px-6 md:px-10 md:pl-56 lg:pb-12 lg:pt-28"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setGlow({
          x: `${((event.clientX - rect.left) / rect.width) * 100}%`,
          y: `${((event.clientY - rect.top) / rect.height) * 100}%`,
        });
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(128,89,72,0.15),transparent_48%),linear-gradient(90deg,rgba(11,11,11,0.55)_0%,rgba(11,11,11,0.35)_50%,rgba(11,11,11,0.15)_100%)] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]" />
      <motion.div
        className="pointer-events-none absolute h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(193,154,136,0.14)_0%,rgba(128,89,72,0.06)_40%,transparent_70%)] blur-2xl hidden md:block"
        animate={{ left: glow.x, top: glow.y }}
        transition={{ duration: 0.6, ease }}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-12 lg:grid-cols-[45fr_55fr] xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
        >
          <motion.div className="flex max-w-3xl flex-col justify-center" style={{ y: copyY, opacity: heroOpacity }}>
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">SkaleKraft · Software Studio</p>
          <h1 className="mt-5 text-4xl sm:text-5xl font-medium tracking-tight text-white sm:leading-[1.1] md:text-6xl xl:text-7xl">
            <span className="sr-only">SkaleKraft — </span>Build things people actually enjoy using.
          </h1>
          <p className="mt-7 max-w-2xl text-base sm:text-lg leading-8 text-white/62 md:text-xl">
            Websites, apps, AI tools and creative work designed to help businesses grow without unnecessary complexity.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <GlassmorphismCta href="/contact" label="Start a Project" avatarSrc="/images/skalekraft-logo.png" avatarAlt="SkaleKraft logo" shimmerColor="rgba(193,154,136,0.75)" />
          </div>
          </motion.div>
        </motion.div>

        <motion.div className="relative flex w-full items-center justify-center overflow-visible" style={{ y: visualY, scale: visualScale, opacity: heroOpacity }}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,154,136,0.14)_0%,rgba(128,89,72,0.05)_50%,transparent_75%)] blur-3xl" />
          <Hero3DRobotVisual />
        </motion.div>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Selected work</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-5xl">Recent systems and launches.</h2>
        </div>
        <Link href="/work" className="inline-flex h-12 w-fit items-center gap-2 rounded-full border border-white/10 px-5 text-sm text-white/60 transition hover:border-white/25 hover:text-white">
          View all work
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.075, delayChildren: 0.08 } },
        }}
      >
        {showcaseProjects.map((project) => (
          <motion.article
            key={project.url}
            data-cursor-card
            className="group overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(16,16,16,.96)_42%)] p-2 shadow-[0_26px_90px_rgba(0,0,0,.32)] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_100px_rgba(0,0,0,.48)] sm:rounded-[28px] sm:p-3"
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.975 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  default: { type: "spring", stiffness: 115, damping: 20, mass: 0.8 },
                  opacity: { duration: 0.45, ease: "easeOut" },
                },
              },
            }}
          >
            <a href={project.url} target="_blank" rel="noreferrer" className="block">
              <ProjectThumbnail src={project.image} title={project.title} sizes="(max-width: 767px) calc(100vw - 3.25rem), (max-width: 1279px) 50vw, 33vw" />
              <div className="px-2 pb-3 pt-3 sm:px-4 sm:pb-5 sm:pt-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-[9px] uppercase tracking-[0.18em] text-[#c19a88] sm:text-[11px] sm:tracking-[0.22em]">{project.category}</p>
                  <span className="text-xs text-white/25">{project.number}</span>
                </div>
                <h3 className="mt-3 text-base font-medium leading-tight text-white sm:text-lg lg:text-xl">{project.title}</h3>
                <p className="mt-2 hidden overflow-hidden text-sm leading-6 text-white/52 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:[display:-webkit-box]">{project.short}</p>
              </div>
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function ServiceBlock({ service, align = "left", onExplore }: { service: typeof services[ServiceKey]; align?: "left" | "right"; onExplore: (key: ServiceKey) => void }) {
  const Icon = service.icon;
  const color = accent[service.key];

  return (
    <motion.section
      id={service.key}
      className="scroll-mt-24 py-2 lg:py-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        default: { type: "spring", stiffness: 105, damping: 22, mass: 0.85 },
        opacity: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <div
        data-cursor-card
        className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101010] p-4 shadow-[0_20px_70px_rgba(0,0,0,.32)] transition duration-500 hover:border-white/20 sm:rounded-[24px] sm:p-5 lg:grid lg:h-auto lg:min-h-[410px] lg:grid-cols-2 lg:gap-5 lg:rounded-[28px] lg:p-5 xl:min-h-[430px] xl:p-6 lg:shadow-[0_30px_110px_rgba(0,0,0,.35)] ${
          align === "right" ? "lg:[&>*:first-child]:order-2" : ""
        }`}
        style={{ boxShadow: `0 24px 80px rgba(0,0,0,.35), 0 0 44px rgba(${color.rgb},.08)` }}
      >
        {/* Desktop Visual Preview */}
        <div className="hidden lg:block h-full w-full overflow-hidden rounded-[18px] border border-white/10 lg:min-h-[280px] xl:min-h-[300px]">
          <div className="h-full w-full">
            <ServiceVisual serviceKey={service.key} />
          </div>
        </div>

        {/* Card Body */}
        <div className="flex min-w-0 flex-1 flex-col justify-between lg:justify-center lg:p-4 xl:p-5">
          <div>
            <div className="flex items-center justify-between">
              <motion.div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] sm:h-12 sm:w-12 lg:h-13 lg:w-13"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6" style={{ color: color.hex }} strokeWidth={1.7} />
              </motion.div>
              <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50 lg:hidden">
                {service.label}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl lg:mt-6 lg:text-3xl xl:text-4xl">{service.title}</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60 sm:text-sm lg:mt-4 lg:max-w-xl lg:text-base lg:leading-7">
              {service.short}
            </p>

            {/* Mobile Capability Chips */}
            <div className="mt-3 flex flex-wrap gap-1.5 lg:hidden">
              {service.capabilities.slice(0, 3).map((cap) => (
                <span key={cap} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/50">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onExplore(service.key)}
            className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full px-4 text-xs font-semibold text-white transition duration-300 group-hover:scale-[1.02] sm:text-sm lg:mt-6 lg:h-11 lg:w-fit lg:px-5"
            style={{ backgroundColor: `rgba(${color.rgb},0.22)`, border: `1px solid rgba(${color.rgb},0.42)` }}
          >
            Explore Capabilities
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default function StreamingExperience({ initialDest }: { initialDest?: DestinationKey | null }) {
  const [stage, setStage] = useState<Stage>(initialDest ? "home" : "selection");
  const [activeSection, setActiveSection] = useState("home");
  const [activeModal, setActiveModal] = useState<ServiceKey | null>(null);
  const [animateHome, setAnimateHome] = useState(false);
  const [isIntroMounted, setIsIntroMounted] = useState(!initialDest);
  const [isIntroLeaving, setIsIntroLeaving] = useState(false);
  // If initialDest is set (from ?dest= param), scroll to that section on mount
  const pendingTarget = useRef<string | null>(initialDest && initialDest !== "everything" ? initialDest : null);

  useEffect(() => {
    const hasSeenIntro = typeof window !== "undefined" && window.sessionStorage.getItem("skalekraftIntroSeen") === "true";

    if (initialDest) {
      window.history.replaceState(window.history.state, "", "/");
      return;
    }

    if (hasSeenIntro) {
      if (stage !== "home") {
        const restoreHome = window.setTimeout(() => {
          setStage("home");
          setIsIntroMounted(false);
        }, 0);
        return () => window.clearTimeout(restoreHome);
      }
      return;
    }

    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const beginExit = window.setTimeout(() => {
      setIsIntroLeaving(true);
    }, 1850);
    const removeIntro = window.setTimeout(() => {
      setIsIntroMounted(false);
    }, 2350);

    return () => {
      window.clearTimeout(beginExit);
      window.clearTimeout(removeIntro);
    };
  }, [initialDest, stage]);

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
    let frame = 0;

    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.42;
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= readingLine && rect.bottom > readingLine;
      });

      if (current?.id) setActiveSection(current.id);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [stage]);

  const chooseDestination = (destination: DestinationKey) => {
    window.sessionStorage.setItem("skalekraftDestination", destination);
    window.sessionStorage.setItem("skalekraftIntroSeen", "true");
    pendingTarget.current = destination === "everything" ? "home" : destination;
    setAnimateHome(true);
    setStage("home");
  };

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0B0B0B] text-white" suppressHydrationWarning>
      {stage === "selection" && (
        <>
          {isIntroMounted && <IntroSplash isLeaving={isIntroLeaving} />}
          <ServiceSelection
            onChoose={chooseDestination}
            onSkip={() => chooseDestination("everything")}
          />
        </>
      )}

      {/* Main homepage renders only after a destination is chosen or restored. */}
      {stage === "home" && (
        <>
        <FluidParticlesBackground
          theme="dark"
          particleCount={760}
          noiseIntensity={0.0026}
          particleSize={{ min: 0.5, max: 1.4 }}
          className="pointer-events-none fixed inset-0 z-0 h-screen bg-transparent opacity-85 dark:bg-transparent"
        />
        <Sidebar active={activeSection} onNavigate={navigate} />
        <motion.div
          key="home"
          className="relative z-10"
          initial={animateHome ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease }}
        >
          <CinematicHero />
          <main className="mx-auto max-w-[1360px] px-4 pb-16 sm:px-6 md:px-10 md:pl-56">
            <ImpactMetricsBar />

            <div className="py-8 sm:py-12">
              <motion.div className="mb-4 max-w-3xl" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.55, ease }}>
                <p className="text-xs uppercase tracking-[0.24em] text-[#c19a88] sm:text-sm">Services</p>
                <h2 className="mt-2 text-2xl font-medium tracking-tight text-white sm:mt-3 sm:text-4xl lg:text-5xl">Choose the system you want to build.</h2>
              </motion.div>
              <div className="mt-6 space-y-4 sm:mt-10 lg:mt-0 lg:space-y-6">
                <ServiceBlock service={services.websites} onExplore={setActiveModal} />
                <ServiceBlock service={services.apps} align="right" onExplore={setActiveModal} />
                <ServiceBlock service={services.ai} onExplore={setActiveModal} />
                <ServiceBlock service={services.creative} align="right" onExplore={setActiveModal} />
              </div>
            </div>

            <SelectedWork />

            <TechStackRadar />

            <motion.section data-cursor-card id="contact" className="relative my-12 scroll-mt-24 overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,#12100f,#0d0d0d_48%,#11100f)] p-5 shadow-[0_30px_110px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,.04)] sm:rounded-[30px] sm:p-8 md:p-10" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ default: { type: "spring", stiffness: 105, damping: 22 }, opacity: { duration: 0.5 } }}>
              <div className="pointer-events-none absolute -left-20 -top-28 h-80 w-80 rounded-full bg-[#805948]/15 blur-[90px]" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 bg-[radial-gradient(circle_at_100%_100%,rgba(193,154,136,.12),transparent_68%)]" />
              <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c19a88]/20 bg-[#805948]/10"><Sparkles className="h-3.5 w-3.5 text-[#c19a88]" /></span>
                    <p className="text-xs uppercase tracking-[0.26em] text-[#c19a88]">Start a conversation</p>
                  </div>
                  <h2 className="mt-4 max-w-2xl text-2xl font-medium tracking-[-0.035em] text-white sm:mt-5 sm:text-4xl lg:text-5xl lg:leading-[1.08]">Your next great product starts with a clear idea.</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/52 sm:mt-5 sm:text-base sm:leading-7">Tell us what you want to build. We&apos;ll turn the ambition into a practical roadmap—and then into a product people enjoy using.</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/52 sm:mt-6 sm:gap-2.5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2"><Clock3 className="h-3.5 w-3.5 text-[#c19a88]" />Reply within 24 hours</span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#c19a88]" />No-obligation discovery</span>
                  </div>
                  <GlassmorphismCta href="/contact" label="Start Your Project" avatarSrc="/images/skalekraft-logo.png" avatarAlt="SkaleKraft logo" shimmerColor="rgba(193,154,136,0.75)" className="mt-6 sm:mt-8" />
                </div>

                <motion.div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-black/25 p-4 shadow-[0_24px_70px_rgba(0,0,0,.3)] sm:rounded-[24px] sm:p-6" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 105, damping: 21, delay: 0.12 }}>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 sm:pb-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/32">A simple path</p>
                      <h3 className="mt-1 text-base font-medium text-white sm:mt-1.5 sm:text-lg">From idea to launch</h3>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.7)]" />
                  </div>
                  <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                    {["Understand the problem", "Shape the right solution", "Design, build and launch"].map((item, index) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 sm:rounded-2xl sm:px-3.5 sm:py-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#c19a88]/20 bg-[#805948]/10 text-[9px] font-medium text-[#d2a28d] sm:h-7 sm:w-7 sm:text-[10px]">0{index + 1}</span>
                        <span className="text-xs text-white/64 sm:text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.06] sm:mt-5"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#805948] to-[#c19a88]" /></div>
                </motion.div>
              </div>
            </motion.section>
          </main>
        </motion.div>
        </>
      )}

      <AnimatePresence>{activeModal && <ServiceModal key={`modal-${activeModal}`} serviceKey={activeModal} onClose={() => setActiveModal(null)} />}</AnimatePresence>
    </div>
  );
}
