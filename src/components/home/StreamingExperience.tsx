"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { categories, projects, shelves, type Project, type ProjectCategory } from "@/lib/projects";
import EnquiryPanel from "@/components/layout/EnquiryPanel";

const ease = [0.16, 1, 0.3, 1] as const;

function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0B0B0B]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div
        className="text-[clamp(2.4rem,8vw,7rem)] font-semibold tracking-[0.16em] text-white"
        initial={{ opacity: 0, scale: 0.96, textShadow: "0 0 0 rgba(128,89,72,0)" }}
        animate={{
          opacity: [0, 1, 1],
          scale: [0.96, 1, 1],
          textShadow: [
            "0 0 0 rgba(128,89,72,0)",
            "0 0 42px rgba(128,89,72,0.5)",
            "0 0 22px rgba(128,89,72,0.28)",
          ],
        }}
        transition={{ duration: 2.1, times: [0, 0.58, 1], ease }}
      >
        SKALE<span className="text-[#805948]">KRAFT</span>
      </motion.div>
    </motion.div>
  );
}

function CategoryCard({
  label,
  icon,
  line,
  active,
  onClick,
}: {
  label: ProjectCategory;
  icon: string;
  line: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onClick}
      className={`group relative min-h-[210px] overflow-hidden rounded-[24px] border bg-[#101010] p-6 text-left transition-colors duration-500 ${
        active ? "border-[#805948] shadow-[0_0_44px_-18px_rgba(128,89,72,0.9)]" : "border-white/10"
      }`}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(128,89,72,0.2),transparent_34%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-between gap-8">
        <span className="text-5xl" aria-hidden>
          {icon}
        </span>
        <span>
          <span className="block text-2xl font-medium text-white">{label}</span>
          <span className="mt-2 block text-sm leading-6 text-white/50">{line}</span>
        </span>
      </div>
    </motion.button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/collection/${project.slug}`} className="group block w-[78vw] shrink-0 sm:w-[420px] lg:w-[520px]">
      <motion.article
        className="relative aspect-video overflow-hidden rounded-[22px] border border-white/10 bg-[#101010] shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
        whileHover={{
          scale: 1.035,
          borderColor: "rgba(128, 89, 72, 0.85)",
          boxShadow: "0 26px 70px rgba(0,0,0,0.58), 0 0 34px rgba(128,89,72,0.24)",
        }}
        transition={{ duration: 0.5, ease }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 78vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/22 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="translate-y-7 transition-transform duration-500 ease-out group-hover:translate-y-0">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-[#c19a88]">{project.category}</p>
            <h3 className="text-2xl font-medium tracking-tight text-white">{project.title}</h3>
            <p className="mt-2 max-w-[34rem] text-sm leading-6 text-white/0 transition-colors duration-500 group-hover:text-white/70">
              {project.short}
            </p>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function ProjectShelf({
  title,
  items,
}: {
  title: string;
  items: Project[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between pr-6 md:pr-10">
        <h2 className="text-xl font-medium text-white sm:text-2xl">{title}</h2>
        <ArrowRight className="h-5 w-5 text-white/35" aria-hidden />
      </div>
      <div className="-mx-5 flex gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden">
        {items.map((project) => (
          <ProjectCard key={`${title}-${project.slug}`} project={project} />
        ))}
      </div>
    </section>
  );
}

export default function StreamingExperience() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#0B0B0B] text-white">
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: showSplash ? 0 : 1, scale: showSplash ? 0.97 : 1 }}
        transition={{ duration: 0.9, ease }}
      >
        <EnquiryPanel />
        <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#0B0B0B]/72 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10">
            <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-white">
              SKALE<span className="text-[#805948]">KRAFT</span>
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-enquiry"))}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/80 transition duration-300 hover:border-[#805948] hover:bg-[#805948]/15 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              Start
            </button>
          </div>
        </header>

        <main id="work" className="mx-auto max-w-[1500px] px-5 pb-24 pt-32 md:px-10">
          <motion.section
            className="min-h-[calc(100vh-8rem)]"
            animate={{ scale: activeCategory === "All" ? 1 : 0.985 }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="mb-10 flex flex-col gap-4">
              <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Have a look around.</p>
              <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-white sm:text-6xl lg:text-7xl">
                Choose what you want to explore.
              </h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.label}
                  {...category}
                  active={activeCategory === category.label}
                  onClick={() => setActiveCategory(category.label)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="mt-16 space-y-14"
                initial={{ opacity: 0, scale: 0.965, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.03, y: -16 }}
                transition={{ duration: 0.55, ease }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveCategory("All")}
                    className={`rounded-full border px-4 py-2 text-sm transition duration-300 ${
                      activeCategory === "All"
                        ? "border-[#805948] bg-[#805948]/20 text-white"
                        : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={`filter-${category.label}`}
                      type="button"
                      onClick={() => setActiveCategory(category.label)}
                      className={`rounded-full border px-4 py-2 text-sm transition duration-300 ${
                        activeCategory === category.label
                          ? "border-[#805948] bg-[#805948]/20 text-white"
                          : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                {shelves.map((shelf) => (
                  <ProjectShelf
                    key={shelf}
                    title={shelf}
                    items={visibleProjects.filter((project) => project.shelves.includes(shelf))}
                  />
                ))}

                <section className="max-w-3xl py-8">
                  <p className="text-3xl font-light leading-tight text-white sm:text-5xl">We build cool stuff.</p>
                  <p className="mt-4 text-lg leading-8 text-white/55">Pick a project. Poke around. When something clicks, let&apos;s make something.</p>
                </section>
              </motion.div>
            </AnimatePresence>
          </motion.section>
        </main>
      </motion.div>
    </div>
  );
}
