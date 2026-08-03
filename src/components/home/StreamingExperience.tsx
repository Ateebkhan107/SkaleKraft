"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bot, Clapperboard, Layers3, Mail, MonitorSmartphone, UserPlus, type LucideIcon } from "lucide-react";
import { categories, projects, serviceCategories, shelves, type Project, type ProjectCategory } from "@/lib/projects";

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
  line,
  active,
  onClick,
}: {
  label: ProjectCategory;
  line: string;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = categoryIcons[label];

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
        <CategoryMark Icon={Icon} label={label} active={active} />
        <span>
          <span className="block text-2xl font-medium text-white">{label}</span>
          <span className="mt-2 block text-sm leading-6 text-white/50">{line}</span>
        </span>
      </div>
    </motion.button>
  );
}

const categoryIcons: Record<ProjectCategory, LucideIcon> = {
  Websites: MonitorSmartphone,
  Apps: Layers3,
  AI: Bot,
  Editing: Clapperboard,
};

function CategoryMark({ Icon, label, active }: { Icon: LucideIcon; label: ProjectCategory; active: boolean }) {
  return (
    <span
      className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border transition duration-500 ${
        active
          ? "border-[#805948]/80 bg-[#805948]/18 shadow-[0_0_32px_rgba(128,89,72,0.28)]"
          : "border-white/10 bg-white/[0.03] group-hover:border-[#805948]/60 group-hover:bg-[#805948]/12"
      }`}
      aria-label={label}
    >
      <span className="absolute inset-x-3 top-3 h-px bg-white/20" />
      <span className="absolute bottom-3 left-3 h-px w-5 bg-[#805948]/70" />
      <span className="absolute -right-5 -top-5 h-12 w-12 rounded-full bg-[#805948]/25 blur-xl transition duration-500 group-hover:bg-[#805948]/45" />
      <Icon className="relative h-8 w-8 text-white transition duration-500 group-hover:scale-110 group-hover:text-[#d1aa98]" strokeWidth={1.7} />
    </span>
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

function ServiceCategoryGrid({
  service,
  selectedCategory,
  onSelect,
  onBack,
}: {
  service: ProjectCategory;
  selectedCategory: string | null;
  onSelect: (category: string) => void;
  onBack: () => void;
}) {
  const Icon = categoryIcons[service];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pr-0 md:pr-10">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">{service}</p>
          <h2 className="mt-2 text-2xl font-medium text-white sm:text-3xl">
            {selectedCategory ? selectedCategory : `Choose a ${service === "AI" ? "AI" : service.toLowerCase()} category.`}
          </h2>
        </div>
        {selectedCategory && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/65 transition duration-300 hover:border-[#805948] hover:bg-[#805948]/15 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}
      </div>

      {!selectedCategory && (
        <motion.div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.5, ease }}
        >
          {serviceCategories[service].map((category) => (
            <motion.button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              className="group relative min-h-[118px] overflow-hidden rounded-[22px] border border-white/10 bg-[#101010] p-5 text-left transition-colors duration-500 hover:border-[#805948]/70"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.45, ease }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(128,89,72,0.18),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col justify-between gap-5">
                <Icon className="h-6 w-6 text-[#c19a88] transition duration-500 group-hover:scale-110 group-hover:text-white" strokeWidth={1.7} />
                <span className="text-lg font-medium text-white">{category}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default function StreamingExperience() {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("skalekraftIntroSeen") !== "true";
  });
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!showSplash) return;

    window.sessionStorage.setItem("skalekraftIntroSeen", "true");
    const timer = window.setTimeout(() => setShowSplash(false), 2600);
    return () => window.clearTimeout(timer);
  }, [showSplash]);

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => {
      if (project.category !== activeCategory) return false;
      if (!selectedServiceCategory) return true;
      return project.serviceCategories.includes(selectedServiceCategory);
    });
  }, [activeCategory, selectedServiceCategory]);

  const handleServiceSelect = (category: ProjectCategory) => {
    setActiveCategory(category);
    setSelectedServiceCategory(null);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0B0B0B] text-white">
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: showSplash ? 0 : 1, scale: showSplash ? 0.97 : 1 }}
        transition={{ duration: 0.9, ease }}
      >
        <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#0B0B0B]/72 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10">
            <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-white">
              SKALE<span className="text-[#805948]">KRAFT</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/join"
                className="hidden h-11 items-center gap-2 rounded-full border border-[#805948]/50 bg-[#805948]/15 px-4 text-sm text-white transition duration-300 hover:border-[#805948] hover:bg-[#805948]/25 sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" />
                Join the Agency
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/80 transition duration-300 hover:border-[#805948] hover:bg-[#805948]/15 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                Start
              </Link>
            </div>
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
                  onClick={() => handleServiceSelect(category.label)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${selectedServiceCategory ?? "categories"}`}
                className="mt-16 space-y-14"
                initial={{ opacity: 0, scale: 0.965, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.03, y: -16 }}
                transition={{ duration: 0.55, ease }}
              >
                {activeCategory === "All" ? (
                  <>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className="rounded-full border border-[#805948] bg-[#805948]/20 px-4 py-2 text-sm text-white transition duration-300"
                      >
                        All
                      </button>
                      {categories.map((category) => (
                        <button
                          key={`filter-${category.label}`}
                          type="button"
                          onClick={() => handleServiceSelect(category.label)}
                          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 transition duration-300 hover:border-white/30 hover:text-white"
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
                  </>
                ) : (
                  <>
                    <ServiceCategoryGrid
                      service={activeCategory}
                      selectedCategory={selectedServiceCategory}
                      onSelect={setSelectedServiceCategory}
                      onBack={() => setSelectedServiceCategory(null)}
                    />

                    {selectedServiceCategory && (
                      <>
                        {shelves.map((shelf) => (
                          <ProjectShelf
                            key={`${selectedServiceCategory}-${shelf}`}
                            title={shelf}
                            items={visibleProjects.filter((project) => project.shelves.includes(shelf))}
                          />
                        ))}
                        {visibleProjects.length === 0 && (
                          <div className="rounded-[22px] border border-white/10 bg-[#101010] p-6 text-white/55">
                            Nothing here yet. Pick another category.
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                <section className="max-w-3xl py-8">
                  <p className="text-3xl font-light leading-tight text-white sm:text-5xl">We build cool stuff.</p>
                  <p className="mt-4 text-lg leading-8 text-white/55">Pick a project. Poke around. When something clicks, let&apos;s make something.</p>
                  <Link
                    href="/join"
                    className="mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-[#805948]/50 bg-[#805948]/15 px-5 text-sm text-white transition duration-300 hover:border-[#805948] hover:bg-[#805948]/25 sm:hidden"
                  >
                    <UserPlus className="h-4 w-4" />
                    Join the Agency
                  </Link>
                </section>
              </motion.div>
            </AnimatePresence>
          </motion.section>
        </main>
      </motion.div>
    </div>
  );
}
