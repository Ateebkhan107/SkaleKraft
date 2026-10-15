"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import InteractiveCanvas3D, { type Object3DType } from "@/components/3d/InteractiveCanvas3D";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";
import { accent, ease, services, type ServiceKey } from "./data";

type ModalDetails = {
  eyebrow: string;
  headline: string;
  highlight: string;
  areas: string[];
  process: string[];
  visual: Object3DType;
  secondary: string;
  visualLabel: string;
  ctaLabel: string;
  contactService: string;
};

const details: Record<ServiceKey, ModalDetails> = {
  websites: {
    eyebrow: "Web Strategy & Engineering",
    headline: "Build a website that earns",
    highlight: "attention—and action.",
    areas: ["Business & Brand Websites", "Landing Pages & Campaigns", "SaaS Products & Dashboards", "E-commerce & Payments", "CMS, Portals & Integrations", "SEO, Performance & Analytics"],
    process: ["Clarify the offer", "Design the journey", "Engineer the system", "Launch and improve"],
    visual: "torus-knot",
    secondary: "#c19a88",
    visualLabel: "Interactive Web Core",
    ctaLabel: "Start Your Website",
    contactService: "Website Development",
  },
  apps: {
    eyebrow: "iOS, Android & Product Systems",
    headline: "Turn your product idea into an app people",
    highlight: "keep coming back to.",
    areas: ["Product Strategy & User Flows", "iOS & Android Applications", "Cross-platform Development", "Payments & Subscriptions", "Realtime Sync & Notifications", "Store Launch & Iteration"],
    process: ["Shape the product", "Prototype the flows", "Build and integrate", "Test and launch"],
    visual: "gyroscope",
    secondary: "#60A5FA",
    visualLabel: "Interactive Mobile Engine",
    ctaLabel: "Plan Your App",
    contactService: "Mobile App",
  },
  ai: {
    eyebrow: "AI Systems & Architecture",
    headline: "Let’s find where AI can",
    highlight: "actually help.",
    areas: ["Autonomous AI Agents", "RAG & Knowledge Engines", "Workflow Automation", "Intelligent Chat Interfaces", "Document Parsing & AI OCR", "Custom LLM API Integrations"],
    process: ["Identify the bottleneck", "Design the workflow", "Integrate the system", "Measure and improve"],
    visual: "neural-core",
    secondary: "#0E7490",
    visualLabel: "Interactive AI Core",
    ctaLabel: "Consult an AI Engineer",
    contactService: "AI & Automations",
  },
  creative: {
    eyebrow: "Creative Direction & Production",
    headline: "Make every frame feel",
    highlight: "impossible to ignore.",
    areas: ["Reels, Shorts & Social Content", "YouTube & Long-form Editing", "Product Launch Films", "Performance Ad Creatives", "Motion Graphics & Titles", "Color, Sound & Delivery"],
    process: ["Define the story", "Build the edit", "Add motion and sound", "Polish every format"],
    visual: "craft-prism",
    secondary: "#c19a88",
    visualLabel: "Interactive Creative Core",
    ctaLabel: "Create With Us",
    contactService: "Creative Studio",
  },
};

export default function ServiceModal({ serviceKey, onClose }: { serviceKey: ServiceKey; onClose: () => void }) {
  const service = services[serviceKey];
  const detail = details[serviceKey];
  const color = accent[serviceKey];
  const Icon = service.icon;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/78 p-3 backdrop-blur-xl sm:p-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`service-modal-title-${serviceKey}`}
      onClick={onClose}
    >
      <motion.section
        className="relative max-h-[calc(100dvh-1rem)] w-full max-w-5xl overflow-y-auto overflow-x-hidden rounded-[20px] border border-white/12 bg-[#0B0B0B] text-white shadow-[0_40px_160px_rgba(0,0,0,0.78)] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.18)_transparent] sm:max-h-[90dvh] sm:rounded-[24px]"
        initial={{ opacity: 0, scale: 0.965, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 14 }}
        transition={{ duration: 0.45, ease }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-75"
          style={{ background: `radial-gradient(circle at 82% 35%, ${color.hex}1c, transparent 32%), radial-gradient(circle at 16% 82%, ${detail.secondary}14, transparent 30%)` }}
        />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-black/65 text-white/62 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition hover:border-white/28 hover:bg-white/10 hover:text-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
          aria-label="Close service details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative px-4 pb-4 pt-4 sm:px-8 sm:pb-8 sm:pt-8 lg:px-10 lg:pb-10">
          <div className="grid gap-4 sm:gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#101010] shadow-[0_0_28px_rgba(0,0,0,0.4)] sm:h-12 sm:w-12 sm:rounded-2xl" style={{ color: color.hex }}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <p className="mt-3 text-[9px] uppercase tracking-[0.22em] sm:mt-5 sm:text-xs sm:tracking-[0.26em]" style={{ color: color.hex }}>{detail.eyebrow}</p>
              <h2 id={`service-modal-title-${serviceKey}`} className="mt-2 max-w-3xl pr-8 text-[26px] font-medium leading-[1.02] tracking-[-0.045em] text-white sm:mt-3 sm:pr-0 sm:text-4xl lg:text-5xl">
                {detail.headline}{" "}
                <span
                  className="inline-block bg-clip-text pb-1 font-serif font-normal italic tracking-normal text-transparent"
                  style={{
                    backgroundImage: serviceKey === "ai"
                      ? "linear-gradient(90deg, #A5F3FC 0%, #22D3EE 52%, #0E7490 100%)"
                      : "linear-gradient(90deg, #E8C5B4 0%, #C19A88 52%, #805948 100%)",
                  }}
                >
                  {detail.highlight}
                </span>
              </h2>
              <p className="mt-3 line-clamp-2 max-w-2xl text-xs leading-5 text-white/58 sm:mt-4 sm:line-clamp-none sm:text-base sm:leading-7">{service.short}</p>

              <div className="mt-4 grid grid-cols-2 gap-1.5 sm:mt-6 sm:gap-2">
                {detail.areas.map((area, index) => (
                  <div key={area} className={`${index > 3 ? "hidden sm:flex" : "flex"} min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-[#101010]/90 px-2.5 py-2 text-[10px] leading-4 text-white/72 sm:min-h-11 sm:gap-2.5 sm:rounded-xl sm:px-3.5 sm:py-2.5 sm:text-sm`}>
                    <Check className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" style={{ color: color.hex }} />
                    <span>{area}</span>
                  </div>
                ))}
              </div>

              <GlassmorphismCta
                href={`/contact?service=${encodeURIComponent(detail.contactService)}`}
                label={detail.ctaLabel}
                avatarSrc="/images/skalekraft-logo.png"
                avatarAlt="SkaleKraft logo"
                shimmerColor={color.hex}
                className="mt-4 scale-90 origin-left sm:mt-6 sm:scale-100"
              />
            </div>

            <div className="relative mx-auto flex h-20 w-full max-w-[220px] items-center justify-center overflow-visible sm:h-[380px] sm:max-w-[410px]">
              <div className="pointer-events-none absolute inset-[9%] rounded-full opacity-20 blur-[80px]" style={{ backgroundColor: color.hex }} />
              <div className="relative h-full w-full [mask-image:radial-gradient(ellipse_82%_82%_at_50%_50%,black_54%,transparent_100%)]">
                <InteractiveCanvas3D type={detail.visual} accentColor={color.hex} secondaryColor={detail.secondary} interactive autoRotateSpeed={1.05} className="h-full w-full" />
              </div>
              <div className="pointer-events-none absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-white/52">
                <Sparkles className="h-3 w-3" style={{ color: color.hex }} />
                {detail.visualLabel}
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-3 sm:mt-10 sm:pt-6 lg:mt-12">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/35 sm:text-xs sm:tracking-[0.24em]">How we take it from idea to launch</p>
            <div className="mt-2 grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:mt-4 sm:grid-cols-2 sm:rounded-2xl lg:grid-cols-4">
              {detail.process.map((step, index) => (
                <div key={step} className="bg-[#0D0D0D] p-2 sm:p-4">
                  <span className="font-mono text-[8px] sm:text-xs" style={{ color: color.hex }}>0{index + 1}</span>
                  <p className="mt-1 text-[9px] leading-3.5 text-white/72 sm:mt-3 sm:text-sm sm:leading-normal">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
