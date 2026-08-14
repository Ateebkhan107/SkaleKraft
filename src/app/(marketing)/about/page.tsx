"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Paintbrush,
  Rocket,
  Target,
  Zap,
  Globe,
} from "lucide-react";
import Image from "next/image";
import BackHomeLink from "@/components/ui/BackHomeLink";

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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-[#805948]/30">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(128,89,72,0.15),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.02),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 pb-32 pt-28 md:px-10">
        <BackHomeLink className="mb-12" />

        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl font-medium tracking-tight sm:text-7xl lg:text-[5.5rem] leading-[1.1]">
            Not a boring<br />
            <span className="text-[#805948]">company history.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            We are an engineering and creative studio built for ambitious teams. We don&apos;t believe in corporate fluff—we believe in shipping fast, scalable, and incredibly beautiful products.
          </p>
        </motion.section>

        {/* Why SkaleKraft Exists */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-32 max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">The Problem</p>
          <h2 className="mt-4 text-3xl font-medium sm:text-4xl">Why SkaleKraft exists</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            The software industry is filled with agencies that overcomplicate simple problems, overcharge for basic solutions, and move too slowly. SkaleKraft was born to change that model entirely.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            We exist to provide transparent, high-velocity, and premium engineering to businesses that want to move fast without ever sacrificing quality or design aesthetics.
          </p>
        </motion.section>

        {/* Mission & Vision */}
        <section className="mt-32 grid gap-6 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#101010] p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(128,89,72,0.1),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Rocket className="h-8 w-8 text-[#c19a88]" />
            <h3 className="mt-8 text-2xl font-medium text-white">Our Mission</h3>
            <p className="mt-4 text-white/60 leading-relaxed">
              To build software that feels calm, runs incredibly fast, and helps businesses scale effortlessly without adding technical debt.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#101010] p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.05),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Globe className="h-8 w-8 text-white/80" />
            <h3 className="mt-8 text-2xl font-medium text-white">Our Vision</h3>
            <p className="mt-4 text-white/60 leading-relaxed">
              To become the default, undisputed engineering partner for forward-thinking brands, startups, and founders globally.
            </p>
          </motion.div>
        </section>

        {/* Values */}
        <section className="mt-32">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Culture</p>
            <h2 className="mt-4 text-3xl font-medium sm:text-4xl">Our Core Values</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
                >
                  <Icon className="h-6 w-6 text-[#805948]" />
                  <h3 className="mt-5 text-lg font-medium text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* How you work */}
        <section className="mt-32 rounded-[40px] border border-white/10 bg-[#101010] p-8 md:p-16">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Process</p>
            <h2 className="mt-4 text-3xl font-medium sm:text-4xl">How we work</h2>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index !== 3 && (
                  <div className="absolute left-6 top-8 hidden h-px w-full bg-white/10 md:block" />
                )}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#805948]/30 bg-[#805948]/10 text-sm font-medium text-[#c19a88]">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-lg font-medium text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Founders */}
        <section className="mt-32">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Leadership</p>
            <h2 className="mt-4 text-3xl font-medium sm:text-4xl">Founders</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-[#101010] p-8"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image src="/images/founders/syed-ateeb-fatmi.png" alt="Syed Ateeb Fatmi" fill className="object-cover" />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-medium text-white">Syed Ateeb Fatmi</h3>
                <p className="mt-1 text-sm text-[#c19a88]">Co-founder</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-[#101010] p-8"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image src="/images/founders/ateeb-mazhar.jpg" alt="Ateeb Mazhar" fill className="object-cover object-top" />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-medium text-white">Ateeb Mazhar</h3>
                <p className="mt-1 text-sm text-[#c19a88]">Co-founder</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 text-center"
        >
          <h2 className="text-3xl font-medium sm:text-5xl">Ready to build?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
            Stop worrying about tech debt and start focusing on your business. Let&apos;s talk about your next big project.
          </p>
          <Link href="/contact" className="group mx-auto mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[#805948] px-8 text-sm font-medium text-white transition hover:bg-[#936857]">
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.section>

      </div>
    </main>
  );
}
