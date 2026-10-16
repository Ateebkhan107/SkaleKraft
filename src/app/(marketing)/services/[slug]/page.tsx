import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Bot,
  Check,
  Clapperboard,
  MonitorSmartphone,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import BackHomeLink from "@/components/ui/BackHomeLink";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";
import InteractiveCanvas3D, { type Object3DType } from "@/components/3d/InteractiveCanvas3D";

type ServicePage = {
  title: string;
  eyebrow: string;
  headline: string;
  highlight: string;
  description: string;
  areas: string[];
  process: string[];
  icon: LucideIcon;
  visual: Object3DType;
  accent: string;
  secondary: string;
  visualLabel: string;
  ctaLabel: string;
  contactService: string;
};

const servicePages: Record<string, ServicePage> = {
  websites: {
    title: "Website Development & Web Platforms",
    eyebrow: "Web Strategy & Engineering",
    headline: "Build a website that earns",
    highlight: "attention—and action.",
    description: "We combine product strategy, high-end interface design, and modern engineering to create fast web experiences that explain your value clearly and turn interest into measurable growth.",
    areas: ["Business & Brand Websites", "Landing Pages & Campaigns", "SaaS Products & Dashboards", "E-commerce & Payments", "CMS, Portals & Integrations", "SEO, Performance & Analytics"],
    process: ["Clarify the offer", "Design the journey", "Engineer the system", "Launch and improve"],
    icon: MonitorSmartphone,
    visual: "torus-knot",
    accent: "#3B82F6",
    secondary: "#c19a88",
    visualLabel: "Interactive Web Core",
    ctaLabel: "Start Your Website",
    contactService: "Website Development",
  },
  apps: {
    title: "Mobile App Development",
    eyebrow: "iOS, Android & Product Systems",
    headline: "Turn your product idea into an app people",
    highlight: "keep coming back to.",
    description: "From first flow to store launch, we design and engineer dependable mobile products with intuitive interactions, secure infrastructure, and the performance users expect from a native app.",
    areas: ["Product Strategy & User Flows", "iOS & Android Applications", "Cross-platform Development", "Payments & Subscriptions", "Realtime Sync & Notifications", "Store Launch & Iteration"],
    process: ["Shape the product", "Prototype the flows", "Build and integrate", "Test and launch"],
    icon: Smartphone,
    visual: "gyroscope",
    accent: "#A855F7",
    secondary: "#60A5FA",
    visualLabel: "Interactive Mobile Engine",
    ctaLabel: "Plan Your App",
    contactService: "Mobile App",
  },
  ai: {
    title: "AI Systems, Agents & Automation",
    eyebrow: "AI Strategy & Autonomous Systems",
    headline: "Engineer practical AI that saves time and",
    highlight: "actually works.",
    description: "We analyze real bottlenecks and engineer practical AI automations, autonomous agents, RAG knowledge engines, and intelligent workflows that integrate directly with your tools.",
    areas: [
      "Autonomous AI Agents",
      "RAG & Knowledge Engines",
      "Workflow & CRM Automation",
      "Intelligent Chat Interfaces",
      "Document Parsing & AI OCR",
      "Custom LLM API Integrations",
    ],
    process: ["Identify bottlenecks", "Design data & guardrails", "Build & integrate agents", "Deploy and monitor"],
    icon: Bot,
    visual: "neural-core",
    accent: "#06B6D4",
    secondary: "#22D3EE",
    visualLabel: "Interactive Neural Core",
    ctaLabel: "Consult an AI Engineer",
    contactService: "AI & Automations",
  },
  creative: {
    title: "Creative, Video & Motion Design",
    eyebrow: "Creative Direction & Production",
    headline: "Make every frame feel",
    highlight: "impossible to ignore.",
    description: "We turn ideas, footage, and product stories into distinctive creative that holds attention. Every edit is shaped around the platform, the audience, and the action you want people to take next.",
    areas: ["Reels, Shorts & Social Content", "YouTube & Long-form Editing", "Product Launch Films", "Performance Ad Creatives", "Motion Graphics & Titles", "Color, Sound & Delivery"],
    process: ["Define the story", "Build the edit", "Add motion and sound", "Polish every format"],
    icon: Clapperboard,
    visual: "craft-prism",
    accent: "#F97316",
    secondary: "#c19a88",
    visualLabel: "Interactive Creative Core",
    ctaLabel: "Create With Us",
    contactService: "Creative Studio",
  },
};

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages[slug];
  return service ? { title: service.title, description: service.description } : {};
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicePages[slug];
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0B0B] px-5 pb-24 pt-28 text-white md:px-10 md:pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 82% 38%, ${service.accent}18, transparent 32%), radial-gradient(circle at 18% 78%, ${service.secondary}12, transparent 30%)` }} />

      <section className="relative mx-auto max-w-6xl">
        <BackHomeLink className="mb-10" />
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#101010] shadow-[0_0_28px_rgba(0,0,0,0.4)]" style={{ color: service.accent }}>
              <Icon className="h-7 w-7" />
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.26em]" style={{ color: service.accent }}>{service.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {service.headline}{" "}
              <span className="inline-block bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text pb-1 font-serif font-normal italic tracking-normal text-transparent">{service.highlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">{service.description}</p>

            <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {service.areas.map((area) => (
                <div key={area} className="flex min-h-12 items-center gap-2.5 rounded-2xl border border-white/10 bg-[#101010]/90 px-4 py-3 text-sm text-white/72">
                  <Check className="h-4 w-4 shrink-0" style={{ color: service.accent }} />
                  <span>{area}</span>
                </div>
              ))}
            </div>

            <GlassmorphismCta href={`/contact?service=${encodeURIComponent(service.contactService)}`} label={service.ctaLabel} avatarSrc="/images/skalekraft-logo.png" avatarAlt="SkaleKraft logo" shimmerColor={service.accent} className="mt-8" />
          </div>

          <div className="relative mx-auto flex h-[380px] w-full max-w-[520px] items-center justify-center overflow-visible sm:h-[480px]">
            <div className="pointer-events-none absolute inset-[8%] rounded-full opacity-20 blur-[90px]" style={{ backgroundColor: service.accent }} />
            <div className="pointer-events-none absolute inset-[17%] rounded-full opacity-30 blur-[45px]" style={{ background: `radial-gradient(circle, ${service.secondary}55, transparent 72%)` }} />
            <div className="relative h-full w-full [mask-image:radial-gradient(ellipse_82%_82%_at_50%_50%,black_54%,transparent_100%)] drop-shadow-[0_30px_55px_rgba(0,0,0,0.35)]">
              <InteractiveCanvas3D type={service.visual} accentColor={service.accent} secondaryColor={service.secondary} interactive autoRotateSpeed={1.05} className="h-full w-full" />
            </div>
            <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-white/48">
              <Sparkles className="h-3 w-3" style={{ color: service.accent }} />
              {service.visualLabel}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-8">
          <p className="text-xs uppercase tracking-[0.24em] text-white/35">How we take it from idea to launch</p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <div key={step} className="bg-[#0D0D0D] p-5">
                <span className="font-mono text-xs" style={{ color: service.accent }}>0{index + 1}</span>
                <p className="mt-3 text-sm text-white/72">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
