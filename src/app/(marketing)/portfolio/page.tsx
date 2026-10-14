import { ArrowRight } from "lucide-react";
import { showcaseProjects } from "@/lib/showcase-projects";
import BackHomeLink from "@/components/ui/BackHomeLink";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";
import ProjectThumbnail from "@/components/work/ProjectThumbnail";
import InteractiveCanvas3D from "@/components/3d/InteractiveCanvas3D";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0B0B] px-5 pb-24 pt-28 text-white md:px-10 md:pt-32">
      <section className="relative mx-auto max-w-6xl">
        <div className="pointer-events-none absolute -right-32 -top-28 hidden h-96 w-96 rounded-full bg-[#805948]/15 blur-3xl md:block" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <BackHomeLink className="mb-8" />
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Selected work</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl text-white">
              The work behind the <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text text-transparent pb-1 inline-block">craft.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
              Explore how SkaleKraft transforms ambitious ideas into scalable digital products—combining thoughtful design, intelligent systems, and dependable engineering.
            </p>
          </div>

          {/* Luxury Studio Craft Artifact Viewport */}
          <div className="relative mx-auto hidden sm:flex flex-col items-center justify-center overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(14,14,14,0.92)_50%,rgba(8,8,8,0.98))] p-3.5 shadow-[0_20px_70px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl sm:h-[280px] sm:w-[280px] lg:h-[320px] lg:w-[320px]">
            {/* Ambient Radial Backlight */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(193,154,136,0.18),transparent_70%)] blur-2xl" />

            {/* Top HUD Bar */}
            <div className="pointer-events-none absolute top-3.5 left-4 right-4 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
              <span>Craft Lab</span>
              <span className="flex items-center gap-1 text-[#c19a88]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c19a88] animate-pulse" />
                3D Artifact
              </span>
            </div>

            {/* 3D Realtime Canvas */}
            <div className="relative h-full w-full pt-4">
              <InteractiveCanvas3D
                type="craft-prism"
                accentColor="#c19a88"
                secondaryColor="#805948"
                interactive={true}
                autoRotateSpeed={1.1}
                className="h-full w-full"
              />
            </div>

            {/* Bottom HUD Bar */}
            <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-white/35 font-mono border-t border-white/[0.06] pt-1.5">
              <span>Precision Engine</span>
              <span>60 FPS</span>
            </div>
          </div>
        </div>
        <div className="relative mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-3">
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
        <GlassmorphismCta href="/contact" label="Start Your Project" avatarSrc="/images/skalekraft-logo.png" avatarAlt="SkaleKraft logo" shimmerColor="rgba(193,154,136,0.75)" className="mt-10" />
      </section>
    </main>
  );
}
