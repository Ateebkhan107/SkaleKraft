"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";
import dynamic from "next/dynamic";
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
    <div className="fixed inset-0 z-[100] bg-[#0B0B0B]/70 backdrop-blur-xl" aria-hidden="true" />
  ),
});

const ServiceVisual = dynamic(
  () => import("./Showcases").then((mod) => mod.ServiceVisual),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full rounded-[18px] bg-[#070707] border border-white/6" />
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
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 35 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[70] min-h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#0B0B0B] pb-[calc(env(safe-area-inset-bottom)+2.5rem)] text-white select-none"
      style={{ position: "fixed", inset: 0, zIndex: 70, backgroundColor: "#0B0B0B" }}
    >
      {/* Dynamic Cursor Light Spotlight */}
      <motion.div
        animate={{ left: `${mouseGlow.x}%`, top: `${mouseGlow.y}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 24, mass: 0.5 }}
        className="pointer-events-none fixed h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(193,154,136,0.14)_0%,rgba(128,89,72,0.04)_45%,transparent_70%)] blur-3xl hidden md:block"
      />

      {/* Layered luxury background atmosphere */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-12%,rgba(193,154,136,0.22),transparent_70%),radial-gradient(ellipse_60%_40%_at_50%_115%,rgba(128,89,72,0.12),transparent_70%)]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.025)_1px,transparent_0)] [background-size:32px_32px] opacity-70" />

      {/* Top Left Studio Logo Badge */}
      <div className="absolute left-6 top-6 z-20 flex items-center gap-2.5">
        <div className="relative h-7 w-7 overflow-hidden rounded-xl border border-white/12 bg-white/[0.04] p-1 shadow-[0_4px_12px_rgba(0,0,0,0.4)] backdrop-blur-md">
          <Image src="/images/skalekraft-logo.png" alt="SkaleKraft" fill className="object-contain" priority />
        </div>
        <span className="font-mono text-xs tracking-[0.22em] text-white/75 uppercase">
          SKALE<span className="text-[#c19a88]">KRAFT</span>
        </span>
      </div>

      {/* Top Right Executive Skip Pill */}
      <Link
        href="/?dest=everything"
        onClick={(e) => { e.preventDefault(); onSkip(); }}
        className="group/skip absolute right-6 top-6 z-20 flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-wider text-white/70 uppercase backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(193,154,136,0.25)]"
      >
        <span>Skip Intro</span>
        <ArrowRight className="h-3.5 w-3.5 text-white/45 transition-transform duration-300 group-hover/skip:translate-x-0.5 group-hover/skip:text-white" />
      </Link>

      <div className="relative flex min-h-full w-full flex-col items-center justify-center px-4 py-20 sm:px-6 sm:py-24 lg:py-20">
        <div className="relative mx-auto w-full max-w-7xl text-center">
          {/* Studio Selection Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-1 text-[11px] font-medium tracking-[0.24em] text-[#c19a88] uppercase backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="h-3 w-3 text-[#c19a88]" />
            <span>Interactive Studio Gateway</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent"
          >
            What are we building today?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mx-auto mt-3 max-w-xl text-sm text-white/50 sm:text-base leading-relaxed"
          >
            Choose your craft to enter a curated studio experience, or explore the entire engineering collective.
          </motion.p>

          {/* Luxury 5-Card Grid */}
          <div className="mt-10 grid min-w-0 grid-cols-1 gap-3.5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-5 sm:gap-4 lg:gap-4 text-left">
            {destinations.map((destination, idx) => {
              const Icon = destination.icon;
              const colorInfo = accent[destination.key] || accent.websites;
              const isEverything = destination.key === "everything";

              return (
                <motion.div
                  key={destination.key}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18 + idx * 0.07, ease }}
                  whileHover={{ y: -6 }}
                  className={`h-full ${isEverything ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <Link
                    href={`/?dest=${destination.key}`}
                    onClick={(e) => { e.preventDefault(); onChoose(destination.key); }}
                    className="group relative flex h-full min-h-[280px] sm:min-h-[300px] lg:min-h-[340px] flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(155deg,rgba(255,255,255,0.05)_0%,rgba(16,16,16,0.85)_40%,rgba(9,9,9,0.98)_100%)] p-5 sm:p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09)] transition-all duration-500 hover:border-white/25 hover:shadow-[0_28px_80px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)]"
                    style={{ "--service": colorInfo.rgb } as React.CSSProperties}
                  >
                    {/* Top Specular Edge Catch */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-colors duration-500" />

                    {/* Ambient Hover Backglow */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--service),0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Card Top Row: Medallion + Index / Indicator */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:scale-105 group-hover:border-white/25"
                        style={{
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.15), 0 0 24px rgba(${colorInfo.rgb}, 0.15)`,
                        }}
                      >
                        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" style={{ color: colorInfo.hex }} strokeWidth={1.75} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase group-hover:text-white/50 transition-colors">
                          {destination.number}
                        </span>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/8 bg-white/[0.02] text-white/30 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.08] group-hover:text-white">
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Card Body: Tagline, Title, Subtitle */}
                    <div className="relative z-10 my-auto py-3">
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#c19a88]/90 group-hover:text-[#c19a88] transition-colors">
                        {destination.tagline}
                      </p>
                      <h2 className="mt-1 text-xl font-medium tracking-tight text-white group-hover:text-white transition-colors">
                        {destination.label}
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-white/52 group-hover:text-white/70 transition-colors line-clamp-3">
                        {destination.subtitle}
                      </p>
                    </div>

                    {/* Card Footer: Capabilities Tags */}
                    <div className="relative z-10 pt-3 border-t border-white/6 flex flex-wrap gap-1.5">
                      {destination.badges.map((badge) => (
                        <span
                          key={badge}
                          className="inline-flex items-center rounded-md border border-white/6 bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-white/45 group-hover:border-white/12 group-hover:text-white/70 transition-colors"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Hint Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 sm:mt-12 flex items-center justify-center gap-2 text-xs text-white/35 font-mono"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#c19a88] animate-pulse" />
            <span>Select a discipline to dive in · or </span>
            <button
              type="button"
              onClick={onSkip}
              className="text-[#c19a88] underline underline-offset-4 hover:text-white transition-colors"
            >
              skip to full experience
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CinematicHero() {
  const [glow, setGlow] = useState({ x: "68%", y: "42%" });
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const disableParallax = prefersReducedMotion || isMobile;
  const copyY = useTransform(scrollYProgress, [0, 1], [0, disableParallax ? 0 : -70]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, disableParallax ? 0 : 95]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, disableParallax ? 1 : 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.86], [1, disableParallax ? 1 : 0.2]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-fit items-center overflow-hidden px-4 pb-8 pt-24 sm:px-6 md:px-10 md:pl-56 lg:pb-12 lg:pt-28"
      onMouseMove={(event) => {
        if (isMobile) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setGlow({
          x: `${((event.clientX - rect.left) / rect.width) * 100}%`,
          y: `${((event.clientY - rect.top) / rect.height) * 100}%`,
        });
      }}
    >
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
            <div className="inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c19a88] shadow-[0_0_10px_rgba(193,154,136,0.9)] animate-pulse" />
              <p className="text-xs sm:text-sm uppercase tracking-[0.28em] font-medium text-[#c19a88]">
                SkaleKraft <span className="text-white/25">·</span> Software Studio
              </p>
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl xl:text-[68px] 2xl:text-[74px] font-medium tracking-tight text-white leading-[1.14] sm:leading-[1.15] xl:leading-[1.12]">
              <span className="sr-only">SkaleKraft — Build things people actually enjoy using.</span>
              <span className="block">Build things</span>
              <span className="block mt-1 sm:mt-1.5">
                people{" "}
                <span className="font-serif italic font-normal text-[#dfb8a5] text-[1.12em] tracking-wide inline-block py-1">
                  actually
                </span>
              </span>
              <span className="block mt-1 sm:mt-1.5 overflow-visible">
                <span className="font-serif italic font-normal text-[1.14em] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#edd0c2] to-[#c19a88] inline-block pt-1 pb-4 pr-3 -mb-4 overflow-visible">
                  enjoy using.
                </span>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-base sm:text-lg leading-8 text-white/60 md:text-xl font-normal">
              Websites, apps, AI tools and creative work designed to help businesses grow without unnecessary complexity.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <GlassmorphismCta href="/contact" label="Start a Project" avatarSrc="/images/skalekraft-logo.png" avatarAlt="SkaleKraft logo" shimmerColor="rgba(193,154,136,0.75)" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="relative flex w-full items-center justify-center overflow-visible" style={{ y: visualY, scale: visualScale, opacity: heroOpacity }}>
          <Hero3DRobotVisual />
        </motion.div>
      </div>
    </section>
  );
}

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  return (
    <aside
      className="group/sidebar fixed left-3 top-1/2 z-40 hidden w-44 -translate-y-1/2 overflow-hidden rounded-[24px] border border-white/10 bg-[#0B0B0B]/80 p-2 text-white shadow-[0_24px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_2px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:block"
      aria-label="Homepage sections"
    >
      <Spotlight
        size={200}
        className="from-[#c19a88]/30 via-[#805948]/15 to-transparent blur-2xl"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-[24px] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_25%,rgba(255,255,255,0.7)_50%,rgba(255,255,255,0.3)_75%,transparent_100%)]"
      />

      <nav className="relative z-10 flex flex-col gap-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = active === link.id;
          const glow = link.color ? accent[link.color].rgb : "193,154,136";
          const itemClassName = `group/item relative flex h-10 items-center gap-3 overflow-hidden rounded-xl px-3 text-left transition-all duration-200 ${
            isActive ? "font-medium text-white" : "text-white/45 hover:text-white"
          }`;
          const content = (
            <>
              {isActive && (
                <motion.span
                  layoutId="active-sidebar-pill"
                  className="absolute inset-0 -z-10 rounded-xl border border-white/15 bg-white/[0.08] shadow-[0_0_20px_rgba(193,154,136,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  style={{
                    backgroundColor: `rgba(${glow}, 0.16)`,
                    borderColor: `rgba(${glow}, 0.35)`,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {isActive && (
                <motion.span
                  layoutId="active-sidebar-notch"
                  className="absolute left-1 h-3.5 w-1 rounded-full bg-[#c19a88] shadow-[0_0_10px_rgba(193,154,136,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon
                className="ml-0.5 h-4 w-4 shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                style={{ color: isActive ? "#c19a88" : undefined }}
              />
              <span className="whitespace-nowrap text-sm tracking-wide">{link.label}</span>
            </>
          );

          return (
            <motion.button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              className={itemClassName}
              aria-label={`Go to ${link.label}`}
              aria-current={isActive ? "location" : undefined}
            >
              {content}
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}

function ServiceCard({
  service,
  index,
  onExplore,
}: {
  service: typeof services[ServiceKey];
  index: number;
  onExplore: (key: ServiceKey) => void;
}) {
  const Icon = service.icon;
  const color = accent[service.key];

  return (
    <motion.article
      id={service.key}
      data-cursor-card
      className="group relative scroll-mt-28 overflow-hidden border-b border-white/[0.08] py-14 sm:py-20 lg:min-h-[630px] lg:py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className={`pointer-events-none absolute top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full opacity-[0.065] blur-[145px] transition-opacity duration-1000 group-hover:opacity-[0.12] ${
          index % 2 === 0 ? "-right-48" : "-left-48"
        }`}
        style={{ background: color.hex }}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-10 select-none font-serif text-[clamp(8rem,18vw,16rem)] italic leading-none text-white/[0.022] ${
          index % 2 === 0 ? "right-0" : "left-0"
        }`}
      >
        0{index + 1}
      </span>

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
        <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 rounded-full shadow-[0_0_18px_currentColor]" style={{ color: color.hex, backgroundColor: color.hex }} />
            <Icon className="h-4 w-4 text-white/56" strokeWidth={1.6} />
            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/42 sm:text-xs">
              0{index + 1} / {service.label}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/18 to-transparent" />
          </div>

          <h3 className="mt-7 max-w-2xl text-[clamp(2.35rem,3.8vw,4.2rem)] font-medium leading-[1.01] tracking-[-0.05em] text-white">
            {service.title}
          </h3>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/52 sm:text-base sm:leading-8">
            {service.short}
          </p>

          <div className="mt-8 grid grid-cols-2 border-y border-white/[0.07] text-[10px] uppercase tracking-[0.15em] text-white/38 sm:text-[11px]">
            {service.capabilities.slice(0, 4).map((cap, capabilityIndex) => (
              <span
                key={cap}
                className={`flex items-center gap-3 py-3 transition-colors duration-300 group-hover:text-white/62 ${
                  capabilityIndex % 2 === 1 ? "border-l border-white/[0.07] pl-4" : "pr-4"
                } ${capabilityIndex > 1 ? "border-t border-white/[0.07]" : ""}`}
              >
                <span className="font-mono text-white/20">0{capabilityIndex + 1}</span>
                {cap}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onExplore(service.key)}
            className="mt-8 inline-flex items-center gap-3.5 text-sm font-medium text-white/72 transition-colors duration-300 hover:text-white"
          >
            <span>Explore service</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.07] group-hover:shadow-[0_0_24px_rgba(193,154,136,0.12)]">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" style={{ color: color.hex }} />
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onExplore(service.key)}
          aria-label={`Explore ${service.title}`}
          className={`relative h-[290px] w-full overflow-hidden text-left [mask-image:radial-gradient(ellipse_84%_80%_at_50%_50%,black_55%,transparent_100%)] sm:h-[370px] lg:h-[440px] ${
            index % 2 === 0 ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-[12%] rounded-full opacity-20 blur-[85px] transition-opacity duration-1000 group-hover:opacity-35"
            style={{ backgroundColor: color.hex }}
          />
          <div className="relative h-full w-full transition-transform duration-1000 ease-out group-hover:scale-[1.035]">
            <ServiceVisual serviceKey={service.key} compact={true} />
          </div>
        </button>
      </div>
    </motion.article>
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
      window.history.scrollRestoration = "auto";
      window.history.replaceState(window.history.state, "", "/");
      return;
    }

    if (hasSeenIntro) {
      window.history.scrollRestoration = "auto";
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
      window.history.scrollRestoration = "auto";
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

    const sections = sidebarLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;

    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.42;
      // Sections such as `services` contain the individual service sections.
      // Prefer the deepest/later matching section so the sidebar follows the
      // specific service currently crossing the reading line.
      const current = [...sections].reverse().find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= readingLine && rect.bottom > readingLine;
      });

      if (current) setActiveSection(current.id);
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
        {!activeModal && (
          <FluidParticlesBackground
            theme="dark"
            particleCount={110}
            noiseIntensity={0.0026}
            particleSize={{ min: 0.5, max: 1.4 }}
            className="pointer-events-none fixed inset-0 z-0 h-screen bg-transparent opacity-85 dark:bg-transparent"
          />
        )}
        <motion.div
          key="home"
          className="relative z-10"
          initial={animateHome ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease }}
        >
          <Sidebar active={activeSection} onNavigate={navigate} />
          <CinematicHero />
          <main className="mx-auto max-w-[1360px] px-4 pb-16 sm:px-6 md:px-10 md:pl-56">
            <ImpactMetricsBar />

            <div id="services" className="scroll-mt-28 py-8 sm:py-12">
              <motion.div className="mb-4 max-w-3xl" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.55, ease }}>
                <p className="text-xs uppercase tracking-[0.24em] text-[#c19a88] sm:text-sm">Services</p>
                <h2 className="mt-2 text-2xl font-medium tracking-tight text-white sm:mt-3 sm:text-4xl lg:text-5xl">Choose the system you want to build.</h2>
              </motion.div>
              <div className="mt-8 grid grid-cols-1">
                <ServiceCard service={services.websites} index={0} onExplore={setActiveModal} />
                <ServiceCard service={services.apps} index={1} onExplore={setActiveModal} />
                <ServiceCard service={services.ai} index={2} onExplore={setActiveModal} />
                <ServiceCard service={services.creative} index={3} onExplore={setActiveModal} />
              </div>
            </div>

            <div className="[content-visibility:auto] [contain-intrinsic-size:1px_550px]">
              <TechStackRadar />
            </div>

            <motion.section data-cursor-card id="contact" className="relative my-12 scroll-mt-24 overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,#12100f,#0d0d0d_48%,#11100f)] p-5 shadow-[0_30px_110px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,.04)] sm:rounded-[30px] sm:p-8 md:p-10 [content-visibility:auto] [contain-intrinsic-size:1px_650px]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ default: { type: "spring", stiffness: 105, damping: 22 }, opacity: { duration: 0.5 } }}>
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

      <AnimatePresence>
        {activeModal && (
          <ServiceModal
            key={`service-modal-${activeModal}`}
            serviceKey={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
