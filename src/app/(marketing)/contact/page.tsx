"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("source", "Contact page");

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Message failed");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      e.currentTarget.reset();
    } catch {
      setIsSubmitting(false);
      setError("Could not send right now. Please email us directly at skalekraft@gmail.com.");
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen relative">
      <div className="container mx-auto px-4 md:px-6">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6"
          >
            Let&apos;s <span className="text-primary">Build</span> Something
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Ready to scale? Fill out the form below and we&apos;ll get back to you within 24 hours to schedule a strategy call.
          </motion.p>
        </div>

        <div className="mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card border border-foreground/10 rounded-3xl p-8 md:p-10">
              {isSubmitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <CheckCircle className="text-primary w-24 h-24 mb-4" />
                  </motion.div>
                  <h3 className="text-3xl font-heading font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground text-lg max-w-md">
                    Thank you for reaching out. Our team will review your project details and get back to you shortly.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline" 
                    className="mt-8 border-foreground/20 hover:bg-foreground/5"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name *</label>
                      <input name="name" required type="text" className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address *</label>
                      <input name="email" required type="email" className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <input name="phone" type="tel" className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Company Name</label>
                      <input name="company" type="text" className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Service of Interest *</label>
                      <select name="service" required className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                        <option value="Website Development">Website Development</option>
                        <option value="App Development">App Development</option>
                        <option value="AI Agents">AI Agents</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Editing">Editing</option>
                        <option value="Automation">Automation</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Estimated Budget *</label>
                      <select name="budget" required className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                        <option value="<10k">Under $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Project Description *</label>
                    <textarea 
                      required 
                      name="message"
                      rows={4} 
                      className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none" 
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {error}
                    </p>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-primary text-primary-foreground text-lg rounded-xl flex items-center justify-center gap-2">
                    {isSubmitting ? "Sending..." : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
