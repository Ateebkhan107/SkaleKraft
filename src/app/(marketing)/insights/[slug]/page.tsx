import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { getArticleBySlug, articles } from "@/lib/insights";
import SimpleFooter from "@/components/layout/SimpleFooter";
import BackHomeLink from "@/components/ui/BackHomeLink";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | SkaleKraft Insights`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0B0B0B]/80 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link
            href="/insights"
            className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Insights
          </Link>
          <BackHomeLink />
        </div>
      </header>

      {/* Main Container */}
      <article className="mx-auto max-w-4xl px-5 py-16 md:px-10 md:py-24">
        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full border border-[#805948]/30 bg-[#805948]/10 px-3.5 py-1 font-semibold uppercase tracking-wider text-[#c19a88]">
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-white/50">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1.5 text-white/50">
            <Calendar className="h-3.5 w-3.5" />
            {article.publishedAt}
          </span>
        </div>

        {/* Title & Excerpt */}
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/70 border-l-2 border-[#805948] pl-5 italic">
          {article.excerpt}
        </p>

        {/* Author info */}
        <div className="mt-8 flex items-center gap-3 border-y border-white/10 py-4">
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover border border-white/20"
          />
          <div>
            <span className="block text-sm font-medium text-white">{article.author.name}</span>
            <span className="text-xs text-white/45">{article.author.role}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-12 space-y-10 text-base leading-relaxed text-white/80 sm:text-lg">
          <p>{article.content.intro}</p>

          {article.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                {section.heading}
              </h2>
              <p>{section.body}</p>

              {section.keyTakeaway && (
                <div className="my-6 flex items-start gap-3 rounded-2xl border border-[#805948]/40 bg-[#805948]/10 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c19a88]" />
                  <span className="text-sm font-medium leading-relaxed text-white/90">
                    <strong className="text-[#c19a88]">Key Takeaway:</strong> {section.keyTakeaway}
                  </span>
                </div>
              )}
            </div>
          ))}

          <div className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold text-white">Conclusion</h2>
            <p className="mt-4">{article.content.conclusion}</p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-16 rounded-3xl border border-[#805948]/40 bg-[radial-gradient(ellipse_at_top,rgba(128,89,72,0.2),transparent_70%)] p-8 text-center sm:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-[#c19a88]" />
          <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
            Ready to build high-performance software?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
            Tell us about your project, website, mobile app, or AI idea. We&apos;ll bring senior architecture and fast execution to your team.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#805948] bg-[#805948] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:scale-105 hover:bg-[#805948]/90 hover:shadow-[0_0_30px_rgba(128,89,72,0.4)]"
            >
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      <SimpleFooter />
    </div>
  );
}
