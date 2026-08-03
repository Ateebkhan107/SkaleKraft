import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] px-5 pb-24 pt-32 text-white md:px-10">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Work</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">
          We are not showing public case studies yet.
        </h1>
        <p className="mt-6 text-lg leading-8 text-white/58">
          We do not publish fake projects, fake client logos, fake results or made-up testimonials. If you want to understand how we would approach your product, tell us what you are building.
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
