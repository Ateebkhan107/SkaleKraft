import BackHomeLink from "@/components/ui/BackHomeLink";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[#0B0B0B] px-5 py-28 text-white md:px-10 md:py-32">
      <section className="mx-auto max-w-2xl">
        <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">404</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">
          This page is <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text text-transparent pb-1 inline-block">not here.</span>
        </h1>
        <p className="mt-5 text-lg leading-8 text-white/58">
          The link may have moved, or the page may no longer exist.
        </p>
        <BackHomeLink className="mt-9" />
      </section>
    </main>
  );
}
