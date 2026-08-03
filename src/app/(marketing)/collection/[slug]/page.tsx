import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Info } from "lucide-react";
import EnquiryPanel from "@/components/layout/EnquiryPanel";
import ContactTrigger from "@/components/layout/ContactTrigger";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <EnquiryPanel />
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#050505]/72 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-white">
            SKALE<span className="text-[#805948]">KRAFT</span>
          </Link>
          <ContactTrigger />
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 pb-24 pt-28 md:px-10">
        <section className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="relative aspect-video overflow-hidden rounded-[24px] border border-white/10 bg-[#101010] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
            <Image src={project.image} alt={project.title} fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          </div>

          <div className="space-y-6 pb-1">
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">{project.category}</p>
            <h1 className="text-5xl font-medium tracking-tight sm:text-7xl">{project.title}</h1>
            <p className="text-lg leading-8 text-white/60">{project.short}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={project.demoUrl}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-[#050505] transition hover:bg-[#805948] hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
                Open Demo
              </Link>
              <a
                href="#details"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white/75 transition hover:border-[#805948] hover:bg-[#805948]/15 hover:text-white"
              >
                <Info className="h-4 w-4" />
                View Details
              </a>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {project.gallery.map((image, index) => (
            <div key={image} className="relative aspect-video overflow-hidden rounded-[22px] border border-white/10 bg-[#101010]">
              <Image
                src={image}
                alt={`${project.title} gallery ${index + 1}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </section>

        <section id="details" className="mt-20 max-w-4xl scroll-mt-28 space-y-7">
          <p className="text-sm uppercase tracking-[0.26em] text-white/40">Story of the project</p>
          <p className="text-3xl font-light leading-tight text-white sm:text-5xl">{project.story}</p>
          <p className="text-lg leading-8 text-white/55">
            We kept the build focused. Strong visuals, clear movement, and fewer things asking for attention. The result feels easy to browse and easy to remember.
          </p>
        </section>
      </main>
    </div>
  );
}
