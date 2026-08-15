import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { showcaseProjects } from "@/lib/showcase-projects";
import BackHomeLink from "@/components/ui/BackHomeLink";
import ProjectThumbnail from "@/components/work/ProjectThumbnail";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0B0B] px-5 pb-24 pt-32 text-white md:px-10">
      <section className="relative mx-auto max-w-6xl">
        <div className="pointer-events-none absolute -right-32 -top-28 hidden h-96 w-96 rounded-full bg-[#805948]/15 blur-3xl md:block" />
        <div className="relative max-w-4xl">
          <BackHomeLink className="mb-12" />
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Selected work</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">The work behind the craft.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/58">Explore how SkaleKraft transforms ambitious ideas into scalable digital products—combining thoughtful design, intelligent systems, and dependable engineering to create experiences people enjoy using.</p>
        </div>
        <div className="relative mt-10 grid grid-cols-2 gap-2 sm:mt-14 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-4">
          {showcaseProjects.map((project, index) => (
            <article key={project.number} className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.05),rgba(16,16,16,.98)_42%)] p-2 shadow-[0_26px_90px_rgba(0,0,0,.32)] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_100px_rgba(0,0,0,.5)] sm:rounded-[28px] sm:p-3">
              <ProjectThumbnail src={project.image} title={project.title} sizes="(max-width: 767px) calc(100vw - 3.25rem), (max-width: 1279px) 50vw, 33vw" priority={index < 2} />
              <div className="flex flex-1 flex-col px-2 pb-3 pt-3 sm:px-4 sm:pb-5 sm:pt-5">
                <div className="flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.2em]"><span className="truncate text-[#c19a88]">{project.category}</span><span className="text-white/25">{project.number}</span></div>
                <div className="my-3 h-px bg-gradient-to-r from-[#c19a88]/45 to-transparent sm:my-5" />
                <h2 className="text-base font-medium leading-tight sm:text-lg lg:text-xl">{project.title}</h2>
                <p className="mt-2 hidden overflow-hidden text-sm leading-6 text-white/48 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:[display:-webkit-box]">{project.short}</p>
                <div className="mt-3 hidden flex-wrap gap-2 sm:flex">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1 text-xs text-white/45">{tag}</span>)}</div>
                <a href={project.url} target="_blank" rel="noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-xs font-medium text-white/72 transition hover:text-white sm:pt-6 sm:text-sm">Open <ArrowRight className="h-4 w-4" /></a>
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
