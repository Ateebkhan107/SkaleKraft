import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { showcaseProjects } from "@/lib/showcase-projects";
import BackHomeLink from "@/components/ui/BackHomeLink";
import ProjectThumbnail from "@/components/work/ProjectThumbnail";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0B0B] px-5 pb-24 pt-32 text-white md:px-10">
      <section className="relative mx-auto max-w-6xl">
        <div className="pointer-events-none absolute -right-32 -top-28 h-96 w-96 rounded-full bg-[#805948]/15 blur-3xl" />
        <div className="relative max-w-4xl">
          <BackHomeLink className="mb-12" />
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Selected work</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">The work behind the craft.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">Explore how SkaleKraft transforms ambitious ideas into scalable digital products—combining thoughtful design, intelligent systems, and dependable engineering to create experiences people enjoy using.</p>
        </div>
        <div className="relative mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {showcaseProjects.map((project, index) => (
            <article key={project.number} className="group flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.05),rgba(16,16,16,.98)_42%)] p-2.5 shadow-[0_26px_90px_rgba(0,0,0,.32)] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_100px_rgba(0,0,0,.5)] sm:p-3">
              <ProjectThumbnail src={project.image} title={project.title} sizes="(max-width: 767px) calc(100vw - 3.25rem), (max-width: 1279px) 50vw, 33vw" priority={index < 2} />
              <div className="flex flex-1 flex-col px-3 pb-4 pt-5 sm:px-4 sm:pb-5">
                <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em]"><span className="text-[#c19a88]">{project.category}</span><span className="text-white/25">{project.number}</span></div>
                <div className="my-5 h-px bg-gradient-to-r from-[#c19a88]/45 to-transparent" />
                <h2 className="text-xl font-medium sm:text-2xl">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/48">{project.short}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1 text-xs text-white/45">{tag}</span>)}</div>
                <a href={project.url} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-white/72 transition hover:text-white">Open live project <ArrowRight className="h-4 w-4" /></a>
              </div>
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
