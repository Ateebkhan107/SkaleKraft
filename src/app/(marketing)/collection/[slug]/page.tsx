import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BackHomeLink from "@/components/ui/BackHomeLink";

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
        <Link
          href="/contact"
          className="mt-9 inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white"
        >
          Start Your Project
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
