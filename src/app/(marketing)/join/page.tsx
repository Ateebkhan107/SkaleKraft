"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send, Upload, FileText, Sparkles, ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackHomeLink from "@/components/ui/BackHomeLink";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const startedAt = useRef("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("startedAt", startedAt.current || (Date.now() - 3000).toString());
      const response = await fetch("/api/join", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Application failed");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      e.currentTarget.reset();
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : "Could not send right now.");
    }
  };

  return (
    <main className="relative min-h-[calc(100dvh-5rem)] flex flex-col justify-center overflow-x-hidden bg-[#0B0B0B] px-4 pt-20 pb-6 text-white sm:px-6 md:px-10 lg:pt-20 lg:pb-6">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(128,89,72,.16),transparent_30%),radial-gradient(circle_at_88%_82%,rgba(193,154,136,.06),transparent_28%)]" />
      <FluidParticlesBackground
        theme="dark"
        particleCount={450}
        noiseIntensity={0.0024}
        particleSize={{ min: 0.45, max: 1.1 }}
        className="pointer-events-none fixed inset-0 z-0 h-screen bg-transparent opacity-50 dark:bg-transparent"
      />
      <section className="relative z-10 mx-auto w-full max-w-[1140px] my-auto">
        <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-10">
          {/* Left Column: Heading & Value Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2.5 sm:mb-4">
              <BackHomeLink className="!h-8 !px-3 !text-xs" />
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c19a88]/20 bg-[#805948]/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#c19a88]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,.8)]" />
                Open applications
              </div>
            </div>

            <h1 className="max-w-lg text-2xl font-medium leading-[1.12] tracking-tight sm:text-3xl lg:text-[2.4rem]">
              Do work you&apos;ll be <span className="text-[#a97862]">proud to show.</span>
            </h1>
            <p className="mt-2.5 max-w-sm text-xs leading-relaxed text-white/55 sm:text-sm">
              We&apos;re looking for thoughtful makers who move with intent, care about craft, and leave every project better than they found it.
            </p>

            <div className="mt-4 grid max-w-sm grid-cols-3 border-y border-white/10 py-2.5">
              {["Small team", "Real ownership", "Remote-first"].map((item, index) => (
                <div key={item} className={index ? "border-l border-white/10 pl-3 sm:pl-4" : ""}>
                  <span className="text-[10px] text-[#c19a88]">0{index + 1}</span>
                  <p className="mt-0.5 text-xs text-white/55">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="#application"
              className="group mt-4 inline-flex items-center gap-1.5 text-xs text-white/70 transition hover:text-white lg:hidden"
            >
              Apply below <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          {/* Right Column: Application Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            id="application"
            className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(145deg,rgba(18,18,18,.96),rgba(13,13,13,.94))] p-4 shadow-[0_24px_80px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.035)] sm:p-5 lg:p-5"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#805948]/10 blur-[80px]" />
            {isSubmitted ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <CheckCircle className="mb-4 h-14 w-14 text-[#805948]" />
                <h2 className="text-2xl font-medium">Application sent.</h2>
                <p className="mt-2 max-w-md text-xs sm:text-sm text-white/55">
                  Thanks for sharing your work. We&apos;ll read it and reach out if there&apos;s a fit.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-6 h-9 border-white/15 bg-transparent px-4 text-xs text-white hover:bg-white/5"
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                onFocusCapture={() => {
                  if (!startedAt.current) startedAt.current = Date.now().toString();
                }}
                className="relative space-y-2.5"
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Card Header */}
                <div className="mb-3 flex items-center gap-3 border-b border-white/10 pb-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#c19a88]/20 bg-[#805948]/10">
                    <BriefcaseBusiness className="h-4 w-4 text-[#c19a88]" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-medium">Your application</h2>
                      <Sparkles className="h-3 w-3 text-[#c19a88]" />
                    </div>
                    <p className="text-[11px] text-white/40">A few essentials. No cover letter required.</p>
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-white/80">Name *</label>
                    <input
                      name="name"
                      required
                      placeholder="Your name"
                      className="h-9 w-full rounded-lg border border-white/10 bg-black/25 px-3 text-xs sm:text-sm text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-white/80">Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className="h-9 w-full rounded-lg border border-white/10 bg-black/25 px-3 text-xs sm:text-sm text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35"
                    />
                  </div>
                </div>

                {/* Role & Portfolio */}
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-white/80">Role *</label>
                    <input
                      name="role"
                      required
                      placeholder="Designer, engineer…"
                      className="h-9 w-full rounded-lg border border-white/10 bg-black/25 px-3 text-xs sm:text-sm text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-white/80">Portfolio, GitHub, or LinkedIn *</label>
                    <input
                      name="portfolio"
                      type="text"
                      required
                      placeholder="https://"
                      className="h-9 w-full rounded-lg border border-white/10 bg-black/25 px-3 text-xs sm:text-sm text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-white/80">Skills *</label>
                  <input
                    name="skills"
                    required
                    placeholder="What are you exceptional at? (e.g. Next.js, Motion, Python)"
                    className="h-9 w-full rounded-lg border border-white/10 bg-black/25 px-3 text-xs sm:text-sm text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35"
                  />
                </div>

                {/* CV & Message */}
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-white/80">CV / Resume *</label>
                    <label className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-black/20 px-3 transition hover:border-[#a97862] hover:bg-black/30">
                      {fileName ? (
                        <>
                          <FileText className="h-3.5 w-3.5 shrink-0 text-[#a97862]" />
                          <span className="truncate text-xs text-white/90">{fileName}</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-3.5 w-3.5 shrink-0 text-[#c19a88]" />
                          <span className="truncate text-xs text-white/60">Upload CV (PDF, DOCX)</span>
                        </>
                      )}
                      <input
                        name="cv"
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-white/80">Anything else?</label>
                    <input
                      name="message"
                      placeholder="Optional notes or details…"
                      className="h-9 w-full rounded-lg border border-white/10 bg-black/25 px-3 text-xs sm:text-sm text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 h-10 w-full rounded-lg bg-[#805948] text-xs sm:text-sm text-white shadow-[0_10px_28px_rgba(128,89,72,.22)] transition hover:bg-[#936857]"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Application
                      <Send className="ml-2 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
