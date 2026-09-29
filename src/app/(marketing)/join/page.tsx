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
    <main className="relative min-h-screen overflow-hidden bg-[#0B0B0B] px-5 pb-20 pt-20 text-white md:px-10 md:pt-24">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(128,89,72,.16),transparent_30%),radial-gradient(circle_at_88%_82%,rgba(193,154,136,.06),transparent_28%)]" />
      <FluidParticlesBackground
        theme="dark"
        particleCount={500}
        noiseIntensity={0.0024}
        particleSize={{ min: 0.45, max: 1.1 }}
        className="pointer-events-none fixed inset-0 z-0 h-screen bg-transparent opacity-50 dark:bg-transparent"
      />
      <section className="relative z-10 mx-auto max-w-[1180px]">
        <BackHomeLink />

        <div className="mt-10 grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c19a88]/20 bg-[#805948]/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[#c19a88]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" /> Open applications
            </div>
            <h1 className="mt-5 max-w-lg text-4xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-[3.65rem]">
              Do work you&apos;ll be <span className="text-[#a97862]">proud to show.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/55">
              We&apos;re looking for thoughtful makers who move with intent, care about craft, and leave every project better than they found it.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-3 border-y border-white/10 py-5">
              {["Small team", "Real ownership", "Remote-first"].map((item, index) => (
                <div key={item} className={index ? "border-l border-white/10 pl-4" : ""}>
                  <span className="text-[10px] text-[#c19a88]">0{index + 1}</span>
                  <p className="mt-1 text-xs text-white/55 sm:text-sm">{item}</p>
                </div>
              ))}
            </div>

            <a href="#application" className="group mt-7 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white lg:hidden">
              Apply below <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            id="application"
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(18,18,18,.96),rgba(13,13,13,.94))] p-5 shadow-[0_30px_100px_rgba(0,0,0,.32),inset_0_1px_0_rgba(255,255,255,.035)] sm:p-7 md:p-8"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#805948]/10 blur-[80px]" />
            {isSubmitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle className="mb-5 h-20 w-20 text-[#805948]" />
                <h2 className="text-3xl font-medium">Application sent.</h2>
                <p className="mt-3 max-w-md text-white/55">
                  Thanks for sharing your work. We&apos;ll read it and reach out if there&apos;s a fit.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-8 border-white/15 bg-transparent text-white hover:bg-white/5"
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
                className="relative space-y-5"
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="mb-7 flex items-start gap-3 border-b border-white/10 pb-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#c19a88]/20 bg-[#805948]/10"><BriefcaseBusiness className="h-4 w-4 text-[#c19a88]" /></span>
                  <div>
                    <div className="flex items-center gap-2"><h2 className="text-xl font-medium">Your application</h2><Sparkles className="h-3.5 w-3.5 text-[#c19a88]" /></div>
                    <p className="mt-1 text-sm text-white/38">A few essentials. No cover letter required.</p>
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Name *</label>
                    <input name="name" required placeholder="Your name" className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Email *</label>
                    <input name="email" type="email" required placeholder="you@email.com" className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35" />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Role *</label>
                    <input name="role" required placeholder="Designer, engineer…" className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Portfolio, GitHub, or LinkedIn *</label>
                    <input name="portfolio" type="text" required placeholder="https://" className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Skills *</label>
                  <textarea name="skills" required rows={3} placeholder="What are you exceptional at?" className="w-full resize-none rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">CV *</label>
                  <label className="flex cursor-pointer items-center justify-center gap-4 rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-5 text-left transition hover:border-[#a97862] hover:bg-black/30">
                    {fileName ? (
                      <>
                        <FileText className="h-6 w-6 shrink-0 text-[#a97862]" />
                        <span><span className="block text-sm font-medium text-white/90">{fileName}</span><span className="mt-1 block text-xs text-white/50">Click to change file</span></span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 shrink-0 text-[#c19a88]" />
                        <span><span className="block text-sm text-white/70">Upload CV or resume</span><span className="mt-1 block text-xs text-white/35">PDF, DOC, or DOCX · max 8MB</span></span>
                      </>
                    )}
                    <input name="cv" type="file" required accept=".pdf,.doc,.docx" className="sr-only" onChange={handleFileChange} />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Anything else?</label>
                  <textarea name="message" rows={2} placeholder="Anything worth knowing?" className="w-full resize-none rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/20 outline-none transition focus:border-[#a97862] focus:bg-black/35" />
                </div>

                {error && (
                  <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </p>
                )}

                <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-xl bg-[#805948] text-sm text-white shadow-[0_12px_35px_rgba(128,89,72,.2)] hover:bg-[#936857]">
                  {isSubmitting ? "Sending..." : (
                    <>
                      Send Application
                      <Send className="ml-2 h-4 w-4" />
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
