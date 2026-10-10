"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Tag, Sparkles } from "lucide-react";
import { articles, Article } from "@/lib/insights";
import SimpleFooter from "@/components/layout/SimpleFooter";
import BackHomeLink from "@/components/ui/BackHomeLink";

const categories = ["All", "Engineering", "AI Systems", "Design & UX"];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles.filter(
    (a) => selectedCategory === "All" || a.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0B0B0B]/80 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-semibold tracking-[0.24em] text-white"
          >
            <Image
              src="/images/skalekraft-logo.png"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 rounded-xl object-cover shadow-[0_0_20px_rgba(128,89,72,0.18)]"
            />
            <span>
              SKALE<span className="text-[#805948]">KRAFT</span>
            </span>
          </Link>
          <BackHomeLink />
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        {/* Title Banner */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#805948]/30 bg-[#805948]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c19a88]">
            <BookOpen className="h-3.5 w-3.5" />
            Insights & Playbooks
          </span>
          <h1 className="mt-6 text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
            Thought leadership in <br />
            <span className="font-semibold text-white">code, AI & product design</span>.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">
            Practical breakdowns, architectural guides, and design philosophies straight from the engineering team at SkaleKraft.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition duration-300 ${
                selectedCategory === cat
                  ? "border border-[#805948] bg-[#805948]/24 text-white shadow-[0_0_20px_rgba(128,89,72,0.2)]"
                  : "border border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, idx) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E0E] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition duration-500 hover:border-[#805948]/60 hover:bg-[#121212]"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="rounded-full border border-[#805948]/30 bg-[#805948]/10 px-3 py-1 font-semibold uppercase tracking-wider text-[#c19a88]">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/40">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-semibold leading-tight text-white transition duration-300 group-hover:text-[#c19a88]">
                  <Link href={`/insights/${article.slug}`}>
                    <span className="absolute inset-0" />
                    {article.title}
                  </Link>
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">{article.publishedAt}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white transition duration-300 group-hover:translate-x-1 group-hover:text-[#c19a88]">
                    Read Guide <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}
