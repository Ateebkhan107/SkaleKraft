import { Bot, Check, Sparkles } from "lucide-react";
import BackHomeLink from "@/components/ui/BackHomeLink";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";
import InteractiveCanvas3D from "@/components/3d/InteractiveCanvas3D";

const areas = [
  "Autonomous AI Agents",
  "RAG & Knowledge Engines",
  "Workflow Automation",
  "Intelligent Chat Interfaces",
  "Document Parsing & AI OCR",
  "Custom LLM API Integrations",
];

export default function AiConsultantPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] px-5 pb-24 pt-28 text-white md:px-10 md:pt-32">
      <section className="mx-auto max-w-6xl">
        <BackHomeLink className="mb-10" />

        {/* Hero Section with Interactive 3D Neural Core */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#101010] text-[#c19a88] shadow-[0_0_24px_rgba(193,154,136,0.15)]">
              <Bot className="h-7 w-7" />
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.26em] text-[#c19a88]">AI Systems & Architecture</p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl lg:text-6xl text-white">
              Let&apos;s find where AI can <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text text-transparent pb-1 inline-block">actually help.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
              Tell us about your business, tools, and workflow. We analyze real bottlenecks and engineer practical AI automations that save time and scale cleanly.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-3">
              {areas.map((area) => (
                <div key={area} className="flex min-h-12 items-center gap-2 rounded-2xl border border-white/10 bg-[#101010] px-3 py-2.5 text-xs text-white/72 sm:gap-2.5 sm:px-4 sm:py-3 sm:text-sm">
                  <Check className="h-4 w-4 shrink-0 text-[#c19a88]" />
                  <span className="truncate">{area}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <GlassmorphismCta href="/contact?service=AI%20%26%20Automations" label="Consult an AI Engineer" avatarSrc="/images/skalekraft-logo.png" avatarAlt="SkaleKraft logo" shimmerColor="rgba(193,154,136,0.75)" />
            </div>
          </div>

          {/* Interactive 3D Neural Core Display */}
          <div className="relative mx-auto flex h-[350px] w-full max-w-[440px] items-center justify-center rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(193,154,136,0.06),rgba(11,11,11,0.95)_70%)] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.6)] sm:h-[420px]">
            <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-b from-[#c19a88]/15 via-transparent to-transparent blur-xl" />
            <InteractiveCanvas3D
              type="neural-core"
              accentColor="#c19a88"
              secondaryColor="#805948"
              interactive={true}
              autoRotateSpeed={1.2}
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#c19a88] backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              Interactive AI Core
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
