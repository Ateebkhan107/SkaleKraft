"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Paintbrush,
  Rocket,
  Target,
  Zap,
  Globe,
  Layers3,
  TimerReset,
} from "lucide-react";
import Image from "next/image";
import BackHomeLink from "@/components/ui/BackHomeLink";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";
import InteractiveCanvas3D from "@/components/3d/InteractiveCanvas3D";

const values = [
  {
    title: "Velocity",
    description: "Ship fast, iterate faster. We believe speed is a feature.",
    icon: Zap,
  },
  {
    title: "Craftsmanship",
    description: "We sweat the details. Every pixel, animation, and database query matters.",
    icon: Paintbrush,
  },
  {
    title: "Transparency",
    description: "No hidden fees, no black-box development. You see what we see.",
    icon: Eye,
  },
  {
    title: "Pragmatism",
    description: "Solve the actual problem. We don't over-engineer simple solutions.",
    icon: Target,
  },
];

const steps = [
  {
    title: "Discovery & Alignment",
    description: "We start by deeply understanding your business goals, target audience, and the core problem you are trying to solve.",
  },
  {
    title: "Architecture & Design",
    description: "We map out the system architecture, design the database schema, and craft intuitive, high-converting user interfaces.",
  },
  {
    title: "Development & Testing",
    description: "We write clean, scalable code with regular check-ins. You get to see the product evolve in real-time.",
  },
  {
    title: "Launch & Scale",
    description: "We handle the deployment, set up monitoring, and ensure your system is ready to handle real-world traffic.",
  },
];

const staggerGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const springReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      default: { type: "spring" as const, stiffness: 110, damping: 21, mass: 0.82 },
      opacity: { duration: 0.45, ease: "easeOut" as const },
    },
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-[#805948]/30">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(128,89,72,0.15),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.02),transparent_40%)]" />
      </div>
      <FluidParticlesBackground
        theme="dark"
        particleCount={560}
        noiseIntensity={0.0024}
        particleSize={{ min: 0.45, max: 1.2 }}
        className="pointer-events-none fixed inset-0 z-0 h-screen bg-transparent opacity-65 dark:bg-transparent"
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 md:px-10 md:pt-32">
        <BackHomeLink className="mb-4 sm:mb-8" />

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid gap-6 border-b border-white/10 pb-10 pt-1 sm:pb-14 sm:pt-3 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:gap-16 lg:pb-16"
        >
          <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#805948]/12 blur-[100px]" />
          <div className="relative">
            <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#c19a88]">
              SkaleKraft · Independent product studio
            </div>
            <h1 className="mt-3 sm:mt-5 max-w-3xl text-[1.85rem] sm:text-5xl lg:text-[4.6rem] font-medium leading-[1.12] sm:leading-[1.02] tracking-[-0.035em] sm:tracking-[-0.045em]">
              <span className="sr-only">About SkaleKraft — </span>We make ambitious ideas <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text text-transparent pb-1 inline-block">feel inevitable.</span>
            </h1>
            <p className="mt-3 sm:mt-5 max-w-2xl text-xs sm:text-base leading-5 sm:leading-7 text-white/60 sm:text-white/56">
              SkaleKraft is an engineering and creative studio for teams that value speed, clarity, and products people genuinely enjoy using.
            </p>
          </div>

          <div className="relative mx-auto flex flex-col items-center w-full max-w-[390px]">
            {/* Realtime 3D Kinetic Gyroscope */}
            <div className="relative h-[190px] w-full max-w-[280px] sm:h-[320px] sm:max-w-[390px] lg:h-[360px]">
              <div className="absolute inset-0 z-0">
                <InteractiveCanvas3D
                  type="gyroscope"
                  accentColor="#c19a88"
                  secondaryColor="#805948"
                  interactive={true}
                  autoRotateSpeed={1.2}
                  className="h-full w-full"
                />
              </div>

              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-16 w-16 sm:h-20 sm:w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#c19a88]/30 bg-[#110f0e]/85 shadow-[0_0_40px_rgba(128,89,72,.25)] backdrop-blur-md"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" />
                <span className="mt-0.5 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/40">Studio</span>
                <span className="text-[10px] sm:text-xs font-semibold text-white">SkaleKraft</span>
              </motion.div>

              {/* Desktop Floating Badges */}
              <motion.div className="pointer-events-none absolute left-0 top-3 z-10 hidden max-w-[150px] lg:block" animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <div className="flex items-center gap-1.5 text-[#c19a88]"><Layers3 className="h-3.5 w-3.5" /><span className="text-[9px] uppercase tracking-[0.2em]">Build</span></div>
                <p className="mt-1.5 text-xs leading-4 text-white/65">Websites, apps & AI systems.</p>
              </motion.div>
              <motion.div className="pointer-events-none absolute right-0 top-12 z-10 hidden text-right max-w-[140px] lg:block" animate={{ y: [0, 6, 0] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
                <div className="flex items-center justify-end gap-1.5 text-[#c19a88]"><span className="text-[9px] uppercase tracking-[0.2em]">Move</span><TimerReset className="h-3.5 w-3.5" /></div>
                <p className="mt-1.5 text-xs text-white/65">Short feedback loops.</p>
              </motion.div>
              <motion.div className="pointer-events-none absolute bottom-2 left-1/2 z-10 hidden w-44 -translate-x-1/2 text-center lg:block" animate={{ y: [0, -5, 0] }} transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut" }}>
                <Globe className="mx-auto h-3.5 w-3.5 text-[#c19a88]" />
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40">Worldwide delivery</p>
              </motion.div>
            </div>

            {/* Mobile Bento Grid for Studio Pillars */}
            <div className="mt-3 grid w-full grid-cols-3 gap-2 lg:hidden">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-center">
                <Layers3 className="mx-auto h-3.5 w-3.5 text-[#c19a88]" />
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-white">Build</span>
                <p className="mt-0.5 text-[8.5px] leading-tight text-white/50">Apps & AI</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-center">
                <TimerReset className="mx-auto h-3.5 w-3.5 text-[#c19a88]" />
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-white">Move</span>
                <p className="mt-0.5 text-[8.5px] leading-tight text-white/50">Fast loops</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-center">
                <Globe className="mx-auto h-3.5 w-3.5 text-[#c19a88]" />
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-white">Global</span>
                <p className="mt-0.5 text-[8.5px] leading-tight text-white/50">Worldwide</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why SkaleKraft Exists */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ default: { type: "spring", stiffness: 105, damping: 22 }, opacity: { duration: 0.5 } }}
          className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 md:grid-cols-[.55fr_1fr] md:gap-14"
        >
          <div>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#c19a88]">Why we exist</p>
            <h2 className="mt-2 sm:mt-3 text-xl sm:text-3xl font-medium">Less theatre.<br />Better products.</h2>
          </div>
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-base leading-5 sm:leading-7 text-white/60 sm:text-white/56">
            <p>The software industry often makes simple problems feel complicated. Slow handoffs, opaque pricing, and needless layers get between a good idea and a working product.</p>
            <p>We built SkaleKraft around a clearer model: senior thinking, direct collaboration, fast execution, and uncompromising attention to craft.</p>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section className="mt-10 sm:mt-16 grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerGroup}>
          <motion.div 
            variants={springReveal}
            className="group relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/10 bg-[#101010] p-3.5 sm:p-7 md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(128,89,72,0.1),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Rocket className="h-5 w-5 sm:h-8 sm:w-8 text-[#c19a88]" />
            <h3 className="mt-3 sm:mt-6 text-sm sm:text-xl font-medium text-white">Our Mission</h3>
            <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-base leading-snug sm:leading-relaxed text-white/60">
              Software that feels calm, runs incredibly fast, and scales effortlessly.
            </p>
          </motion.div>
          
          <motion.div 
            variants={springReveal}
            className="group relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/10 bg-[#101010] p-3.5 sm:p-7 md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.05),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Globe className="h-5 w-5 sm:h-8 sm:w-8 text-white/80" />
            <h3 className="mt-3 sm:mt-6 text-sm sm:text-xl font-medium text-white">Our Vision</h3>
            <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-base leading-snug sm:leading-relaxed text-white/60">
              The default engineering partner for forward-thinking brands globally.
            </p>
          </motion.div>
        </motion.section>

        {/* Values */}
        <section className="mt-10 sm:mt-20">
          <div className="max-w-2xl">
            <p className="text-[11px] sm:text-sm uppercase tracking-[0.26em] text-[#c19a88]">Culture</p>
            <h2 className="mt-2 sm:mt-4 text-xl sm:text-4xl font-medium">Our Core Values</h2>
          </div>
          <motion.div className="mt-5 sm:mt-7 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerGroup}>
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={value.title}
                  variants={springReveal}
                  className="rounded-xl sm:rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:p-6 transition-colors hover:bg-white/[0.04]"
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#805948]" />
                  <h3 className="mt-2.5 sm:mt-5 text-sm sm:text-lg font-medium text-white">{value.title}</h3>
                  <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm leading-snug sm:leading-relaxed text-white/50">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* How you work */}
        <section className="mt-10 sm:mt-20 rounded-2xl sm:rounded-[32px] border border-white/10 bg-[#101010] p-4 sm:p-8 md:p-10">
          <div className="max-w-2xl">
            <p className="text-[11px] sm:text-sm uppercase tracking-[0.26em] text-[#c19a88]">Process</p>
            <h2 className="mt-2 sm:mt-4 text-xl sm:text-4xl font-medium">How we work</h2>
          </div>
          <motion.div className="mt-6 sm:mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-5 md:gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerGroup}>
            {steps.map((step, index) => (
              <motion.div 
                key={step.title}
                variants={springReveal}
                className="relative"
              >
                {index !== 3 && (
                  <div className="absolute left-6 top-8 hidden h-px w-full bg-white/10 md:block" />
                )}
                <div className="relative z-10 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#805948]/30 bg-[#805948]/10 text-xs sm:text-sm font-medium text-[#c19a88]">
                  0{index + 1}
                </div>
                <h3 className="mt-3 sm:mt-6 text-xs sm:text-lg font-medium leading-tight text-white">{step.title}</h3>
                <p className="mt-1 sm:mt-3 text-[11px] sm:text-sm leading-snug sm:leading-relaxed text-white/50">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Founders */}
        <section className="mt-10 sm:mt-20">
          <div className="max-w-2xl">
            <p className="text-[11px] sm:text-sm uppercase tracking-[0.26em] text-[#c19a88]">Leadership</p>
            <h2 className="mt-2 sm:mt-4 text-xl sm:text-4xl font-medium">Founders</h2>
          </div>
          <motion.div className="mt-5 sm:mt-8 grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={staggerGroup}>
            <motion.div 
              variants={springReveal}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-5 rounded-2xl sm:rounded-[26px] border border-white/10 bg-[#101010] p-3.5 sm:p-6"
            >
              <div className="relative h-16 w-16 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5">
                <Image src="/images/founders/syed-ateeb-fatmi.png" alt="Syed Ateeb Fatmi" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-sm sm:text-xl font-medium text-white">Syed Ateeb Fatmi</h3>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#c19a88]">Co-founder</p>
              </div>
            </motion.div>

            <motion.div 
              variants={springReveal}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-5 rounded-2xl sm:rounded-[26px] border border-white/10 bg-[#101010] p-3.5 sm:p-6"
            >
              <div className="relative h-16 w-16 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5">
                <Image src="/images/founders/ateeb-mazhar.jpg" alt="Ateeb Mazhar" fill className="object-cover object-top" />
              </div>
              <div>
                <h3 className="text-sm sm:text-xl font-medium text-white">Ateeb Mazhar</h3>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#c19a88]">Co-founder</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ default: { type: "spring", stiffness: 105, damping: 22 }, opacity: { duration: 0.5 } }}
          className="mt-12 sm:mt-20 rounded-2xl sm:rounded-[28px] border border-white/10 bg-white/[0.025] px-4 py-8 text-center sm:px-10 sm:py-12"
        >
          <h2 className="text-2xl font-medium sm:text-5xl">Ready to <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text text-transparent pb-1 inline-block">build?</span></h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-base leading-5 sm:leading-7 text-white/56">
            Stop worrying about tech debt and start focusing on your business. Let&apos;s talk about your next big project.
          </p>
          <GlassmorphismCta href="/contact" label="Start a Project" avatarSrc="/images/skalekraft-logo.png" avatarAlt="SkaleKraft logo" shimmerColor="rgba(193,154,136,0.75)" className="mx-auto mt-6 sm:mt-7" />
        </motion.section>

      </div>
    </main>
  );
}
