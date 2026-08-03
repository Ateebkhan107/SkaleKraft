"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, RefreshCw, TrendingUp, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiConsultantPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | {
    growth: string[];
    marketing: string[];
    tech: string[];
  }>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    setResult(null);

    // Simulate AI Generation
    setTimeout(() => {
      setResult({
        growth: [
          "Implement a freemium model to increase top-of-funnel acquisition.",
          "Partner with complementary non-competing SaaS businesses for co-marketing.",
          "Expand into the EU market leveraging localized landing pages."
        ],
        marketing: [
          "Launch an interactive lead magnet (e.g., a free ROI calculator).",
          "Double down on LinkedIn thought leadership for B2B lead gen.",
          "Set up automated email sequences for trial users with low engagement."
        ],
        tech: [
          "Migrate monolithic architecture to Next.js App Router for better SEO.",
          "Integrate an AI customer support agent to reduce response times by 80%.",
          "Automate CRM data entry using Zapier or Make.com."
        ]
      });
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-6">
            <Bot size={32} />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6"
          >
            AI Business <span className="text-primary">Consultant</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Describe your business, goals, and budget. Our AI will instantly generate a custom growth and technology strategy for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Input Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-foreground/10 rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Business Type</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. B2B SaaS, E-commerce, Real Estate Agency" 
                  className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Primary Goals</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="e.g. Increase leads by 2x, reduce customer churn, automate operations" 
                  className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Estimated Budget Range</label>
                <select className="w-full bg-background border border-foreground/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option value="<5k">Under $5,000</option>
                  <option value="5k-15k">$5,000 - $15,000</option>
                  <option value="15k-50k">$15,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
              <Button type="submit" disabled={isGenerating} className="w-full h-14 bg-primary text-primary-foreground text-lg rounded-xl flex items-center justify-center gap-2">
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" size={20} />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Strategy
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Results Area */}
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {!result && !isGenerating && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 border-2 border-dashed border-foreground/10 rounded-3xl flex flex-col items-center justify-center text-center p-8"
                >
                  <Bot size={48} className="text-foreground/20 mb-4" />
                  <p className="text-muted-foreground text-lg">
                    Fill out the form to generate your custom AI strategy report.
                  </p>
                </motion.div>
              )}

              {isGenerating && (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-card border border-foreground/10 rounded-3xl flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles size={24} className="text-primary animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">Generating Strategy</h3>
                  <p className="text-muted-foreground">Our AI is processing your inputs and crafting custom recommendations...</p>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-foreground/10 rounded-3xl p-8 space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="text-primary" size={20} />
                      Growth Suggestions
                    </h3>
                    <ul className="space-y-3">
                      {result.growth.map((item, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full h-[1px] bg-foreground/10"></div>

                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <Send className="text-secondary" size={20} />
                      Marketing Ideas
                    </h3>
                    <ul className="space-y-3">
                      {result.marketing.map((item, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground">
                          <span className="text-secondary mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full h-[1px] bg-foreground/10"></div>

                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <Monitor className="text-primary" size={20} />
                      Technology Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {result.tech.map((item, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
