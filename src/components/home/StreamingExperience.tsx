"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  LockKeyhole,
  Mail,
  MessagesSquare,
  MonitorSmartphone,
  PenTool,
  Rocket,
  Search,
  ServerCog,
  Smartphone,
  Sparkles,
  Terminal,
  UserPlus,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    title: "Web Development",
    icon: MonitorSmartphone,
    items: ["Business Websites", "Landing Pages", "Portfolio Websites", "SaaS Platforms", "E-Commerce", "Dashboards", "Booking Systems", "Custom Web Applications"],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    items: ["Android Apps", "iOS Apps", "Cross Platform Apps", "SaaS Applications", "Business Applications", "Consumer Applications"],
  },
  {
    title: "AI Solutions",
    icon: BrainCircuit,
    items: ["AI Chatbots", "AI Agents", "Customer Support AI", "Voice AI", "Workflow Automation", "Machine Learning Models", "Computer Vision", "OCR", "Predictive Analytics", "Recommendation Systems", "RAG Systems", "AI Integrations"],
  },
  {
    title: "Backend Engineering",
    icon: ServerCog,
    items: ["REST APIs", "Authentication", "Payment Systems", "Cloud Infrastructure", "Database Design", "Admin Panels", "Internal Tools", "Third Party Integrations"],
  },
  {
    title: "Creative Studio",
    icon: Video,
    items: ["YouTube Editing", "Instagram Reels", "Shorts", "Product Videos", "Commercial Ads", "Motion Graphics", "Podcast Editing", "Thumbnail Design"],
  },
];

const technologies = [
  { title: "Frontend", icon: Code2, items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { title: "Backend", icon: Terminal, items: ["Node.js", "Express", "Python", "FastAPI"] },
  { title: "Database", icon: Database, items: ["PostgreSQL", "Supabase", "MongoDB", "Redis"] },
  { title: "Artificial Intelligence", icon: Bot, items: ["OpenAI", "Claude", "Gemini", "LangChain", "Llama", "Hugging Face"] },
  { title: "Cloud", icon: Cloud, items: ["Vercel", "AWS", "Docker", "GitHub", "Cloudflare"] },
  { title: "Mobile", icon: Smartphone, items: ["React Native", "Flutter"] },
  { title: "Design", icon: PenTool, items: ["Figma", "Adobe Creative Suite"] },
];

const process = [
  { step: "01", title: "Discovery", text: "Understand goals and requirements.", icon: Search },
  { step: "02", title: "Planning", text: "Design architecture and user experience.", icon: Layers3 },
  { step: "03", title: "Development", text: "Build clean, scalable software.", icon: Wrench },
  { step: "04", title: "Testing", text: "Performance, security and quality assurance.", icon: CheckCircle2 },
  { step: "05", title: "Deployment", text: "Launch with confidence.", icon: Rocket },
  { step: "06", title: "Growth", text: "Maintenance, improvements and long-term support.", icon: GitBranch },
];

const values = [
  { title: "Clean Engineering", text: "Maintainable code designed for long-term growth.", icon: Code2 },
  { title: "Performance First", text: "Fast, optimized experiences across all devices.", icon: Gauge },
  { title: "Scalable Architecture", text: "Built to grow with your business.", icon: Boxes },
  { title: "Modern Technologies", text: "Latest frameworks and AI tools.", icon: Sparkles },
  { title: "Security Focused", text: "Best practices from day one.", icon: LockKeyhole },
  { title: "Transparent Communication", text: "Regular updates throughout development.", icon: MessagesSquare },
];

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

function IconTile({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="relative flex h-13 w-13 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-500 group-hover:border-[#805948]/60 group-hover:bg-[#805948]/12">
      <span className="absolute inset-x-3 top-3 h-px bg-white/20" />
      <span className="absolute bottom-3 left-3 h-px w-5 bg-[#805948]/70" />
      <span className="absolute -right-5 -top-5 h-12 w-12 rounded-full bg-[#805948]/25 blur-xl transition duration-500 group-hover:bg-[#805948]/45" />
      <Icon className="relative h-6 w-6 text-white transition duration-500 group-hover:scale-110 group-hover:text-[#d1aa98]" strokeWidth={1.7} />
    </span>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div
      className="mb-10 max-w-3xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.55, ease }}
    >
      <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-8 text-white/55">{text}</p>}
    </motion.div>
  );
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const Icon = service.icon;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101010] p-6 transition-colors duration-500 hover:border-[#805948]/70"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay: index * 0.04, ease }}
      whileHover={{ scale: 1.018 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(128,89,72,0.18),transparent_34%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <IconTile Icon={Icon} />
        <h3 className="mt-8 text-2xl font-medium text-white">{service.title}</h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {service.items.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/55">
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function TechnologyCard({ group, index }: { group: (typeof technologies)[number]; index: number }) {
  const Icon = group.icon;

  return (
    <motion.article
      className="group rounded-[22px] border border-white/10 bg-[#101010] p-5 transition-colors duration-500 hover:border-[#805948]/60"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.035, ease }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center gap-3">
        <IconTile Icon={Icon} />
        <h3 className="text-xl font-medium text-white">{group.title}</h3>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {group.items.map((item) => (
          <span key={item} className="rounded-xl border border-white/10 bg-[#0B0B0B] px-3 py-2 text-sm text-white/55 transition duration-300 group-hover:text-white/70">
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function StreamingExperience() {
  const [showSplash, setShowSplash] = useState(false);
  const [isIntroReady, setIsIntroReady] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      const hasSeenIntro = window.sessionStorage.getItem("skalekraftIntroSeen") === "true";

      if (hasSeenIntro) {
        setIsIntroReady(true);
        return;
      }

      setShowSplash(true);
      setIsIntroReady(true);
      window.sessionStorage.setItem("skalekraftIntroSeen", "true");
      timer = window.setTimeout(() => setShowSplash(false), 2600);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#0B0B0B] text-white">
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>
      <motion.div
        initial={false}
        animate={{ opacity: !isIntroReady || showSplash ? 0 : 1, scale: !isIntroReady || showSplash ? 0.97 : 1 }}
        transition={{ duration: 0.9, ease }}
      >
        <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#0B0B0B]/72 backdrop-blur-xl">
          <div className="mx-auto flex min-h-20 max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-10">
            <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-white">
              SKALE<span className="text-[#805948]">KRAFT</span>
            </Link>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <span className="hidden text-sm text-white/45 lg:inline">From idea to production.</span>
              <Link
                href="/join"
                className="hidden h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/55 transition duration-300 hover:border-white/25 hover:text-white sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" />
                Join
              </Link>
              <Link
                href="/contact"
                className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border border-[#805948]/70 bg-[#805948] px-5 text-sm font-medium text-white shadow-[0_0_34px_rgba(128,89,72,0.22)] transition duration-300 hover:bg-[#936857]"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
                <Mail className="relative h-4 w-4" />
                <span className="relative">Start</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-5 pb-24 pt-32 md:px-10">
          <section className="flex min-h-[calc(100vh-8rem)] flex-col justify-center py-14">
            <motion.div
              className="max-w-5xl"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Software engineering and AI studio</p>
              <h1 className="mt-5 max-w-5xl text-5xl font-medium tracking-tight text-white sm:text-7xl lg:text-8xl">
                Engineering digital products from idea to production.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/58 sm:text-xl">
                We design and engineer modern websites, mobile applications, AI solutions and business systems with a focus on performance, scalability and exceptional user experience.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white">
                  <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
                  <span className="relative">Start Your Project</span>
                  <ArrowRight className="relative h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex h-13 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white/70 transition duration-300 hover:border-[#805948] hover:bg-[#805948]/15 hover:text-white">
                  Schedule a Call
                </Link>
              </div>
            </motion.div>
          </section>

          <section className="py-20">
            <SectionHeader
              eyebrow="What we build"
              title="Software, systems and content built with care."
              text="A focused set of engineering and creative services for businesses that need real products, not noise."
            />
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </section>

          <section className="py-20">
            <SectionHeader
              eyebrow="Technology stack"
              title="Modern tools, chosen for the job."
              text="We use proven frameworks, AI platforms, databases and deployment tools that keep products fast, stable and maintainable."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {technologies.map((group, index) => (
                <TechnologyCard key={group.title} group={group} index={index} />
              ))}
            </div>
          </section>

          <section className="py-20">
            <SectionHeader eyebrow="How we build" title="A clear path from first idea to launch." />
            <div className="relative grid gap-4 lg:grid-cols-6">
              {process.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.step}
                    className="group rounded-[22px] border border-white/10 bg-[#101010] p-5 transition duration-500 hover:border-[#805948]/60"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.04, ease }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-[#c19a88]">{item.step}</span>
                      <Icon className="h-5 w-5 text-white/40 transition group-hover:text-[#c19a88]" />
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/50">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <section className="py-20">
            <SectionHeader eyebrow="Why SkaleKraft" title="Built around quality, clarity and long-term thinking." />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.article
                    key={value.title}
                    className="group rounded-[22px] border border-white/10 bg-[#101010] p-6 transition duration-500 hover:border-[#805948]/60"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.04, ease }}
                    whileHover={{ scale: 1.015 }}
                  >
                    <IconTile Icon={Icon} />
                    <h3 className="mt-7 text-xl font-medium text-white">{value.title}</h3>
                    <p className="mt-3 leading-7 text-white/52">{value.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <motion.section
            className="my-20 overflow-hidden rounded-[24px] border border-white/10 bg-[#101010] p-8 md:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Ready?</p>
              <h2 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-6xl">
                Ready to build something exceptional?
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/55">
                Tell us what you want to build. We&apos;ll help shape the path from rough idea to reliable product.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-[#0B0B0B] transition duration-300 hover:bg-[#805948] hover:text-white">
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex h-13 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white/70 transition duration-300 hover:border-[#805948] hover:bg-[#805948]/15 hover:text-white">
                Schedule a Call
              </Link>
            </div>
          </motion.section>
        </main>
      </motion.div>
    </div>
  );
}
