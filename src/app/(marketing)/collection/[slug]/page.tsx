import BackHomeLink from "@/components/ui/BackHomeLink";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  await params;

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-5 pb-24 pt-28 text-white md:px-10">
      <section className="mx-auto max-w-3xl">
        <BackHomeLink />
        <p className="mt-14 text-sm uppercase tracking-[0.26em] text-[#c19a88]">Private work</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">
          Project details are not public right now.
        </h1>
        <p className="mt-6 text-lg leading-8 text-white/58">
          We do not publish placeholder case studies or invented results. Share what you want to build and we&apos;ll explain how we would approach it.
        </p>
        <GlassmorphismCta href="/contact" label="Start Your Project" avatarSrc="/images/skalekraft-logo.png" avatarAlt="SkaleKraft logo" shimmerColor="rgba(193,154,136,0.75)" className="mt-9" />
      </section>
    </main>
  );
}
