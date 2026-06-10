"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate server action delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6"
          >
            Let's <span className="text-primary">Build</span> Something
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Ready to scale? Fill out the form below and we'll get back to you within 24 hours to schedule a strategy call.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-card border border-foreground/10 rounded-3xl p-8 space-y-8 h-full">
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6">Contact Info</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a href="mailto:hello@skalekraft.com" className="text-foreground hover:text-primary transition-colors font-medium">
                        hello@skalekraft.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <Phone className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <a href="tel:+1234567890" className="text-foreground hover:text-secondary transition-colors font-medium">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center shrink-0">
                      <MapPin className="text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Office</p>
                      <p className="text-foreground font-medium">
                        San Francisco, CA<br />Remote Worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
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
                      <input required type="text" className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address *</label>
                      <input required type="email" className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <input type="tel" className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Company Name</label>
                      <input type="text" className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Acme Corp" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Service of Interest *</label>
                      <select required className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                        <option value="">Select a service</option>
                        <option value="Website Development">Website Development</option>
                        <option value="App Development">App Development</option>
                        <option value="AI Agents">AI Agents</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Branding">Branding</option>
                        <option value="Automation">Automation</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Estimated Budget *</label>
                      <select required className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                        <option value="">Select budget range</option>
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
                      rows={4} 
                      className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none" 
                      placeholder="Tell us about your goals, current challenges, and timeline..."
                    />
                  </div>

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
