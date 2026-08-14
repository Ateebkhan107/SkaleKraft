import BackHomeLink from "@/components/ui/BackHomeLink";

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
        <BackHomeLink className="mt-9" />
      </section>
    </main>
  );
}
