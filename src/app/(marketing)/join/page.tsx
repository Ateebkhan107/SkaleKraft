"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        body: new FormData(e.currentTarget),
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
    <main className="min-h-screen bg-[#0B0B0B] px-5 pb-24 pt-28 text-white md:px-10">
      <section className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Join the agency</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-6xl">Show us what you can do.</h1>
            <p className="mt-6 text-lg leading-8 text-white/58">
              Send your CV, skills, and a few links. Keep it simple. We like people who make good things and care about the details.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[24px] border border-white/10 bg-[#101010] p-6 md:p-8"
          >
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Name *</label>
                    <input name="name" required className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-white outline-none transition focus:border-[#805948]" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Email *</label>
                    <input name="email" type="email" required className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-white outline-none transition focus:border-[#805948]" placeholder="you@email.com" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Role</label>
                    <input name="role" className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-white outline-none transition focus:border-[#805948]" placeholder="Designer, developer, editor..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Portfolio</label>
                    <input name="portfolio" type="url" className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-white outline-none transition focus:border-[#805948]" placeholder="https://yourwork.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Skills *</label>
                  <textarea name="skills" required rows={4} className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-white outline-none transition focus:border-[#805948]" placeholder="Next.js, UI design, editing, motion, AI automation..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">CV</label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#0B0B0B] px-4 py-8 text-center transition hover:border-[#805948]">
                    <Upload className="mb-3 h-6 w-6 text-[#c19a88]" />
                    <span className="text-sm text-white/70">Upload CV, resume, or profile PDF</span>
                    <span className="mt-1 text-xs text-white/35">PDF, DOC, or DOCX under 8MB</span>
                    <input name="cv" type="file" accept=".pdf,.doc,.docx" className="sr-only" />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Anything else?</label>
                  <textarea name="message" rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-white outline-none transition focus:border-[#805948]" placeholder="A short note is enough." />
                </div>

                {error && (
                  <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </p>
                )}

                <Button type="submit" disabled={isSubmitting} className="h-14 w-full rounded-xl bg-[#805948] text-base text-white hover:bg-[#936857]">
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
