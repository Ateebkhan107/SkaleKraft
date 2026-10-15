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
    const previousOverflow = document.body.style.overflow;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
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
        className="relative max-h-[90dvh] w-full max-w-5xl overflow-y-auto overflow-x-hidden rounded-[24px] border border-white/12 bg-[#0B0B0B] text-white shadow-[0_40px_160px_rgba(0,0,0,0.78)] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.18)_transparent]"
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
          className="sticky right-4 top-4 z-30 ml-auto mr-4 mt-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/65 text-white/62 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl transition hover:border-white/28 hover:bg-white/10 hover:text-white"
          aria-label="Close service details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative px-5 pb-8 pt-0 sm:px-8 lg:px-10 lg:pb-10">
          <div className="grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#101010] shadow-[0_0_28px_rgba(0,0,0,0.4)]" style={{ color: color.hex }}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.26em]" style={{ color: color.hex }}>{detail.eyebrow}</p>
              <h2 id={`service-modal-title-${serviceKey}`} className="mt-3 max-w-3xl text-3xl font-medium leading-[1.04] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
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
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/58 sm:text-base sm:leading-7">{service.short}</p>

              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {detail.areas.map((area) => (
                  <div key={area} className="flex min-h-11 items-center gap-2.5 rounded-xl border border-white/10 bg-[#101010]/90 px-3.5 py-2.5 text-xs text-white/72 sm:text-sm">
                    <Check className="h-4 w-4 shrink-0" style={{ color: color.hex }} />
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
                className="mt-6"
              />
            </div>

            <div className="relative mx-auto flex h-[290px] w-full max-w-[410px] items-center justify-center overflow-visible sm:h-[380px]">
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

          <div className="mt-10 border-t border-white/10 pt-6 lg:mt-12">
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">How we take it from idea to launch</p>
            <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {detail.process.map((step, index) => (
                <div key={step} className="bg-[#0D0D0D] p-4">
                  <span className="font-mono text-xs" style={{ color: color.hex }}>0{index + 1}</span>
                  <p className="mt-3 text-sm text-white/72">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
