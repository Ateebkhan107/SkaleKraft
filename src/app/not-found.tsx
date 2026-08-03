import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[#090909] px-5 py-24 text-white md:px-10">
      <section className="mx-auto max-w-2xl">
        <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">404</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">
          This page is not here.
        </h1>
        <p className="mt-5 text-lg leading-8 text-white/58">
          The link may have moved, or the page may no longer exist.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </section>
    </main>
  );
}
