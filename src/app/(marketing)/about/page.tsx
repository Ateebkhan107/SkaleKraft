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

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 pb-20 pt-20 md:px-10 md:pt-24">
        <BackHomeLink className="mb-8" />

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid gap-10 border-b border-white/10 pb-14 pt-3 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:gap-16 lg:pb-16"
        >
          <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#805948]/12 blur-[100px]" />
          <div className="relative">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#c19a88]">
              Independent product studio
            </div>
            <h1 className="mt-5 max-w-3xl text-[2.7rem] font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[4.6rem]">
              We make ambitious ideas <span className="text-[#a97862]">feel inevitable.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/56 sm:text-lg">
              SkaleKraft is an engineering and creative studio for teams that value speed, clarity, and products people genuinely enjoy using.
            </p>
          </div>

          <div className="relative mx-auto h-[300px] w-full max-w-[390px] sm:h-[340px]">
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c19a88]/15 sm:h-60 sm:w-60" />
            <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10 sm:h-40 sm:w-40" />
            <motion.div
              className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#c19a88]/25 bg-[#110f0e]/90 shadow-[0_0_60px_rgba(128,89,72,.18)] backdrop-blur-xl"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.7)]" />
              <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/38">Studio</span>
              <span className="mt-0.5 text-sm font-medium text-white">SkaleKraft</span>
            </motion.div>

            <motion.div className="absolute left-0 top-5 max-w-[160px]" animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <div className="flex items-center gap-2 text-[#c19a88]"><Layers3 className="h-4 w-4" /><span className="text-[10px] uppercase tracking-[0.2em]">Build</span></div>
              <p className="mt-2 text-sm leading-5 text-white/65">Websites, apps and intelligent systems.</p>
            </motion.div>
            <motion.div className="absolute right-0 top-16 text-right" animate={{ y: [0, 7, 0] }} transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}>
              <div className="flex items-center justify-end gap-2 text-[#c19a88]"><span className="text-[10px] uppercase tracking-[0.2em]">Move</span><TimerReset className="h-4 w-4" /></div>
              <p className="mt-2 text-sm text-white/65">Short feedback loops.</p>
            </motion.div>
            <motion.div className="absolute bottom-4 left-1/2 w-44 -translate-x-1/2 text-center" animate={{ y: [0, -5, 0] }} transition={{ duration: 4.7, repeat: Infinity, ease: "easeInOut" }}>
              <Globe className="mx-auto h-4 w-4 text-[#c19a88]" />
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/35">Worldwide delivery</p>
            </motion.div>

            <div className="absolute left-[24%] top-[38%] h-1.5 w-1.5 rounded-full bg-[#c19a88] shadow-[0_0_10px_#c19a88]" />
            <div className="absolute right-[22%] top-[57%] h-1 w-1 rounded-full bg-white/70" />
          </div>
        </motion.section>

        {/* Why SkaleKraft Exists */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ default: { type: "spring", stiffness: 105, damping: 22 }, opacity: { duration: 0.5 } }}
          className="mt-12 grid gap-5 md:grid-cols-[.55fr_1fr] md:gap-14"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-[#c19a88]">Why we exist</p>
            <h2 className="mt-3 text-2xl font-medium sm:text-3xl">Less theatre.<br />Better products.</h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-white/56">
            <p>The software industry often makes simple problems feel complicated. Slow handoffs, opaque pricing, and needless layers get between a good idea and a working product.</p>
            <p>We built SkaleKraft around a clearer model: senior thinking, direct collaboration, fast execution, and uncompromising attention to craft.</p>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section className="mt-16 grid grid-cols-2 gap-2 sm:gap-4 md:gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerGroup}>
          <motion.div 
            variants={springReveal}
            className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-[#101010] p-4 sm:rounded-[28px] sm:p-7 md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(128,89,72,0.1),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Rocket className="h-6 w-6 text-[#c19a88] sm:h-8 sm:w-8" />
            <h3 className="mt-5 text-base font-medium text-white sm:mt-6 sm:text-xl">Our Mission</h3>
            <p className="mt-3 hidden text-sm leading-relaxed text-white/60 sm:block md:text-base">
              To build software that feels calm, runs incredibly fast, and helps businesses scale effortlessly without adding technical debt.
            </p>
          </motion.div>
          
          <motion.div 
            variants={springReveal}
            className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-[#101010] p-4 sm:rounded-[28px] sm:p-7 md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.05),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Globe className="h-6 w-6 text-white/80 sm:h-8 sm:w-8" />
            <h3 className="mt-5 text-base font-medium text-white sm:mt-6 sm:text-xl">Our Vision</h3>
            <p className="mt-3 hidden text-sm leading-relaxed text-white/60 sm:block md:text-base">
              To become the default, undisputed engineering partner for forward-thinking brands, startups, and founders globally.
            </p>
          </motion.div>
        </motion.section>

        {/* Values */}
        <section className="mt-16 sm:mt-20">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Culture</p>
            <h2 className="mt-4 text-3xl font-medium sm:text-4xl">Our Core Values</h2>
          </div>
          <motion.div className="mt-7 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerGroup}>
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={value.title}
                  variants={springReveal}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] sm:p-6"
                >
                  <Icon className="h-6 w-6 text-[#805948]" />
                  <h3 className="mt-4 text-base font-medium text-white sm:mt-5 sm:text-lg">{value.title}</h3>
                  <p className="mt-2 hidden text-sm leading-relaxed text-white/50 sm:block">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* How you work */}
        <section className="mt-16 rounded-[28px] border border-white/10 bg-[#101010] p-5 sm:mt-20 sm:rounded-[32px] sm:p-8 md:p-10">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Process</p>
            <h2 className="mt-4 text-3xl font-medium sm:text-4xl">How we work</h2>
          </div>
          <motion.div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5 md:mt-10 md:gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={staggerGroup}>
            {steps.map((step, index) => (
              <motion.div 
                key={step.title}
                variants={springReveal}
                className="relative"
              >
                {index !== 3 && (
                  <div className="absolute left-6 top-8 hidden h-px w-full bg-white/10 md:block" />
                )}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#805948]/30 bg-[#805948]/10 text-sm font-medium text-[#c19a88]">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-sm font-medium leading-tight text-white sm:mt-6 sm:text-lg">{step.title}</h3>
                <p className="mt-3 hidden text-sm leading-relaxed text-white/50 sm:block">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Founders */}
        <section className="mt-20">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Leadership</p>
            <h2 className="mt-4 text-3xl font-medium sm:text-4xl">Founders</h2>
          </div>
          <motion.div className="mt-8 grid gap-4 md:grid-cols-2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} variants={staggerGroup}>
            <motion.div 
              variants={springReveal}
              className="flex flex-row items-center gap-5 rounded-[26px] border border-white/10 bg-[#101010] p-5 sm:p-6"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image src="/images/founders/syed-ateeb-fatmi.png" alt="Syed Ateeb Fatmi" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">Syed Ateeb Fatmi</h3>
                <p className="mt-1 text-sm text-[#c19a88]">Co-founder</p>
              </div>
            </motion.div>

            <motion.div 
              variants={springReveal}
              className="flex flex-row items-center gap-5 rounded-[26px] border border-white/10 bg-[#101010] p-5 sm:p-6"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image src="/images/founders/ateeb-mazhar.jpg" alt="Ateeb Mazhar" fill className="object-cover object-top" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">Ateeb Mazhar</h3>
                <p className="mt-1 text-sm text-[#c19a88]">Co-founder</p>
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
          className="mt-20 rounded-[28px] border border-white/10 bg-white/[0.025] px-6 py-12 text-center sm:px-10"
        >
          <h2 className="text-3xl font-medium sm:text-5xl">Ready to build?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/56">
            Stop worrying about tech debt and start focusing on your business. Let&apos;s talk about your next big project.
          </p>
          <GlassmorphismCta href="/contact" label="Start a Project" avatarSrc="/images/skalekraft-logo.png" avatarAlt="SkaleKraft logo" shimmerColor="rgba(193,154,136,0.75)" className="mx-auto mt-7" />
        </motion.section>

      </div>
    </main>
  );
}
