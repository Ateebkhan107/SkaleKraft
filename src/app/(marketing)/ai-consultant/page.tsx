import Link from "next/link";
import { ArrowRight, Bot, Check } from "lucide-react";

const areas = [
  "AI chatbots",
  "AI agents",
  "Workflow automation",
  "Document AI",
  "RAG systems",
  "AI integrations",
];

export default function AiConsultantPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] px-5 pb-24 pt-32 text-white md:px-10">
      <section className="mx-auto max-w-5xl">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#101010] text-[#805948]">
          <Bot className="h-7 w-7" />
        </div>
        <p className="mt-8 text-sm uppercase tracking-[0.26em] text-[#c19a88]">AI Systems</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-medium tracking-tight sm:text-6xl">
          Let&apos;s find where AI can actually help.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">
          Tell us about your business, tools, and workflow. We&apos;ll review it and suggest a practical direction before anything gets built.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-3">
          {areas.map((area) => (
            <div key={area} className="flex min-h-14 items-center gap-2 rounded-2xl border border-white/10 bg-[#101010] px-3 py-3 text-sm text-white/72 sm:gap-3 sm:px-4 sm:py-4 sm:text-base">
              <Check className="h-4 w-4 text-[#c19a88]" />
              {area}
            </div>
          ))}
        </div>

        <Link
          href="/contact"
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white"
        >
          Start a Project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
