"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Mail,
  UserPlus,
} from "lucide-react";
import dynamic from "next/dynamic";
import { showcaseProjects } from "@/lib/showcase-projects";
import ProjectThumbnail from "@/components/work/ProjectThumbnail";

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
import { HeroSoftwareVisual } from "./HeroSoftwareVisual";

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

function BootingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0B0B0B]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-[min(58vw,420px)] w-[min(58vw,420px)]">
        <Image
          src="/images/skalekraft-logo.png"
          alt="SkaleKraft"
          fill
          sizes="(max-width: 768px) 58vw, 420px"
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  );
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0.5 : 2.8;
  const isCompleted = useRef(false);

  const handleComplete = useCallback(() => {
    if (isCompleted.current) return;
    isCompleted.current = true;
    window.sessionStorage.setItem("skalekraftIntroSeen", "true");
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timer = window.setTimeout(handleComplete, duration * 1000 + 100);
    return () => window.clearTimeout(timer);
  }, [handleComplete, duration]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0B0B0B]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div
        className="relative h-[min(58vw,420px)] w-[min(58vw,420px)]"
        initial={{ opacity: 1, scale: prefersReducedMotion ? 1 : 0.96, textShadow: "0 0 0 rgba(128,89,72,0)" }}
        animate={{
          opacity: 1,
          scale: prefersReducedMotion ? 1 : [0.96, 1, 1],
          textShadow: prefersReducedMotion
            ? "0 0 0 rgba(128,89,72,0)"
            : [
                "0 0 0 rgba(128,89,72,0)",
                "0 0 42px rgba(128,89,72,0.5)",
                "0 0 22px rgba(128,89,72,0.28)",
              ],
        }}
        transition={{ duration, times: prefersReducedMotion ? undefined : [0, 0.58, 1], ease }}
        onAnimationComplete={handleComplete}
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
      className="fixed inset-0 z-[70] min-h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#0B0B0B] pb-[calc(env(safe-area-inset-bottom)+2rem)] text-white"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(128,89,72,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%)]" />
      <div className="relative flex min-h-full w-full flex-col items-center justify-center p-5 py-24">
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
          <div className="mt-12 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {destinations.map((destination, index) => {
              const Icon = destination.icon;
              const key = destination.key === "everything" ? "websites" : destination.key;
              return (
                <motion.button
                  key={destination.key}
                  type="button"
                  onClick={() => onChoose(destination.key)}
                  className="group relative min-w-0 min-h-[230px] overflow-hidden rounded-[24px] border border-white/10 bg-[#101010] p-5 text-left shadow-[0_18px_70px_rgba(0,0,0,0.28)] transition duration-500"
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
                    <span className="min-w-0">
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

function Header({ activeSection, onNavigate }: { activeSection: string; onNavigate: (id: string) => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0B0B0B]/72 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-[0.24em] text-white">
            <Image
              src="/images/skalekraft-logo.png"
              alt=""
              width={42}
              height={42}
              className="h-10 w-10 rounded-xl object-cover shadow-[0_0_22px_rgba(128,89,72,0.18)]"
              priority
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
            <Link href="/contact" className="group relative hidden sm:inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border border-[#805948]/70 bg-[#805948] px-5 text-sm font-medium text-white shadow-[0_0_34px_rgba(128,89,72,0.22)] transition duration-300 hover:bg-[#936857]">
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
              <Mail className="relative h-4 w-4" />
              <span className="relative">Start</span>
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-white/70" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[60] overflow-y-auto bg-[#0B0B0B]/95 p-5 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end pt-4">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-white/70" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-4">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                const glow = link.color ? accent[link.color].rgb : "128,89,72";
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => {
                      onNavigate(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex h-14 items-center gap-4 rounded-2xl px-4 text-left transition duration-300 ${
                      isActive ? "text-white" : "text-white/45"
                    }`}
                    style={isActive ? { backgroundColor: `rgba(${glow},0.16)`, boxShadow: `0 0 24px rgba(${glow},0.24)` } : undefined}
                  >
                    <Icon className="h-6 w-6 shrink-0" />
                    <span className="text-lg font-medium">{link.label}</span>
                  </button>
                );
              })}
              <div className="mt-8 flex flex-col gap-3 pb-8">
                <Link href="/about" className="flex h-14 items-center justify-center rounded-2xl border border-white/10 px-5 text-base text-white/55 transition duration-300">
                  About
                </Link>
                <Link href="/contact" className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#805948] px-5 text-base font-medium text-white transition duration-300">
                  <Mail className="h-5 w-5" />
                  Start a Project
                </Link>
                <Link href="/join" className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 text-base text-white/55 transition duration-300">
                  <UserPlus className="h-5 w-5" />
                  Join the Team
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

function CinematicHero() {
  const [glow, setGlow] = useState({ x: "68%", y: "42%" });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-28 md:px-10 md:pl-56 lg:py-32"
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
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#805948]/18 blur-3xl hidden md:block"
        animate={{ left: glow.x, top: glow.y }}
        transition={{ duration: 0.5, ease }}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-12 lg:grid-cols-[45fr_55fr] xl:gap-16">
        <motion.div className="max-w-3xl flex flex-col justify-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }}>
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Software Studio</p>
          <h1 className="mt-5 text-4xl sm:text-5xl font-medium tracking-tight text-white sm:leading-[1.1] md:text-6xl xl:text-7xl">
            Build things people actually enjoy using.
          </h1>
          <p className="mt-7 max-w-2xl text-base sm:text-lg leading-8 text-white/62 md:text-xl">
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

        <div className="relative w-full overflow-hidden sm:overflow-visible">
          <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_50%_50%,rgba(128,89,72,0.22),transparent_54%)] blur-2xl" />
          <HeroSoftwareVisual />
        </div>
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
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {showcaseProjects.map((project, index) => (
          <motion.article
            key={project.url}
            data-cursor-card
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(16,16,16,.96)_42%)] p-2.5 shadow-[0_26px_90px_rgba(0,0,0,.32)] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_100px_rgba(0,0,0,.48)] sm:p-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.55, delay: index * 0.08, ease }}
          >
            <a href={project.url} target="_blank" rel="noreferrer" className="block">
              <ProjectThumbnail src={project.image} title={project.title} sizes="(max-width: 767px) calc(100vw - 3.25rem), (max-width: 1279px) 50vw, 33vw" />
              <div className="px-3 pb-4 pt-5 sm:px-4 sm:pb-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#c19a88]">{project.category}</p>
                  <span className="text-xs text-white/25">{project.number}</span>
                </div>
                <h3 className="mt-3 text-xl font-medium text-white sm:text-2xl">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/52">{project.short}</p>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ServiceBlock({ service, align = "left", onExplore }: { service: typeof services[ServiceKey]; align?: "left" | "right"; onExplore: (key: ServiceKey) => void }) {
  const Icon = service.icon;
  const color = accent[service.key];

  return (
    <motion.section
      id={service.key}
      className="scroll-mt-24 py-10"
      initial={{ opacity: 0, y: 20 }}
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
        <div className="h-full min-h-[360px] w-full overflow-hidden">
          <ServiceVisual serviceKey={service.key} />
        </div>
        <div className="flex flex-col justify-center p-2 md:p-6">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-8 w-8" style={{ color: color.hex }} strokeWidth={1.7} />
          </motion.div>
          <h2 className="mt-8 text-3xl sm:text-4xl font-medium tracking-tight text-white md:text-6xl">{service.title}</h2>
          <p className="mt-5 max-w-xl text-base sm:text-lg leading-8 text-white/58">{service.short}</p>
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

export default function StreamingExperience() {
  const [stage, setStage] = useState<Stage>("booting");
  const [activeSection, setActiveSection] = useState("home");
  const [activeModal, setActiveModal] = useState<ServiceKey | null>(null);
  const [animateHome, setAnimateHome] = useState(false);
  const pendingTarget = useRef<string | null>(null);

  useEffect(() => {
    const selectedDestination = window.sessionStorage.getItem("skalekraftDestination") as DestinationKey | null;
    const hasSeenIntro = window.sessionStorage.getItem("skalekraftIntroSeen") === "true";

    if (hasSeenIntro) {
      const id = window.setTimeout(() => {
        if (selectedDestination) {
          pendingTarget.current = selectedDestination === "everything" ? "home" : selectedDestination;
          setAnimateHome(false);
          setStage("home");
        } else {
          setStage("selection");
        }
      }, 0);
      return () => window.clearTimeout(id);
    } else {
      const id = window.setTimeout(() => {
        setStage("splash");
      }, 0);
      return () => window.clearTimeout(id);
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    const selectedDestination = window.sessionStorage.getItem("skalekraftDestination") as DestinationKey | null;
    if (selectedDestination) {
      pendingTarget.current = selectedDestination === "everything" ? "home" : selectedDestination;
      setAnimateHome(true);
      setStage("home");
    } else {
      setStage("selection");
    }
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
    pendingTarget.current = destination === "everything" ? "home" : destination;
    setAnimateHome(true);
    setStage("home");
  };

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0B0B0B] text-white">
      {/* Overlay layer: splash and service-selection share this AnimatePresence.
          Keys on the element (not inside the component) let AnimatePresence
          correctly track mounting/unmounting for exit animations. */}
      <AnimatePresence mode="wait">
        {stage === "booting" && <BootingScreen key="booting" />}
        {stage === "splash" && <SplashScreen key="splash" onComplete={handleSplashComplete} />}
        {stage === "selection" && (
          <ServiceSelection
            key="selection"
            onChoose={chooseDestination}
            onSkip={() => chooseDestination("everything")}
          />
        )}
      </AnimatePresence>

      {/* Main homepage — rendered outside AnimatePresence so it mounts
          before the splash finishes exiting. The overlay sits on top (z-[70+])
          so the home content is never visible until the overlay has gone. */}
      {stage === "home" && (
        <motion.div
          key="home"
          initial={animateHome ? { opacity: 0, scale: 0.985 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease }}
        >
          <Header activeSection={activeSection} onNavigate={navigate} />
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

            <SelectedWork />

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

      <AnimatePresence>{activeModal && <ServiceModal key={`modal-${activeModal}`} serviceKey={activeModal} onClose={() => setActiveModal(null)} />}</AnimatePresence>
    </div>
  );
}
