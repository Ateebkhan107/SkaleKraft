import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { showcaseProjects } from "@/lib/showcase-projects";
import BackHomeLink from "@/components/ui/BackHomeLink";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0B0B] px-5 pb-24 pt-32 text-white md:px-10">
      <section className="relative mx-auto max-w-6xl">
        <div className="pointer-events-none absolute -right-32 -top-28 h-96 w-96 rounded-full bg-[#805948]/15 blur-3xl" />
        <div className="relative max-w-4xl">
          <BackHomeLink className="mb-12" />
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Selected work</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">The work behind the craft.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">Explore practical AI applications created around healthcare prediction, automated grievance routing, and customer support.</p>
        </div>
        <div className="relative mt-14 grid gap-4 md:grid-cols-3">
          {showcaseProjects.map((project) => (
            <article key={project.number} className="flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,rgba(128,89,72,.16),#101010_48%)] p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/35"><span>{project.category}</span><span>{project.number}</span></div>
              <div>{project.image && <div className="relative mb-6 h-36 overflow-hidden rounded-2xl bg-white"><Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 768px) calc(100vw - 5rem), 360px" className="object-cover object-top" /></div>}<div className="mb-6 h-px bg-gradient-to-r from-[#c19a88]/50 to-transparent" /><h2 className="text-2xl font-medium">{project.title}</h2><p className="mt-3 text-sm leading-6 text-white/48">{project.short}</p><div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">{tag}</span>)}</div>{project.url && <a href={project.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/72 transition hover:text-white">Open live project <ArrowRight className="h-4 w-4" /></a>}</div>
            </article>
          ))}
        </div>
        <Link
          href="/contact"
          className="relative mt-10 inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white"
        >
          Start Your Project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
