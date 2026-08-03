import Link from "next/link";

type LegalPageProps = {
  title: string;
  updated: string;
  intro: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export default function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#0B0B0B] px-5 pb-24 pt-32 text-white md:px-10">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-white/45 transition hover:text-white">
          Back to home
        </Link>
        <p className="mt-10 text-sm uppercase tracking-[0.26em] text-[#c19a88]">SkaleKraft</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-white/40">Last updated: {updated}</p>
        <p className="mt-8 text-lg leading-8 text-white/65">{intro}</p>

        <div className="mt-14 space-y-10">
          {sections.map((section) => (
            <section key={section.heading} className="border-t border-white/10 pt-8">
              <h2 className="text-xl font-medium text-white">{section.heading}</h2>
              <p className="mt-3 leading-7 text-white/58">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-[22px] border border-white/10 bg-[#101010] p-6">
          <p className="text-sm leading-6 text-white/55">
            Questions? Email us at{" "}
            <a href="mailto:skalekraft@gmail.com" className="text-white transition hover:text-[#c19a88]">
              skalekraft@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
