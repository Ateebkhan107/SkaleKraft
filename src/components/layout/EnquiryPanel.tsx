"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

export default function EnquiryPanel() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-enquiry", handleOpen);
    return () => window.removeEventListener("open-enquiry", handleOpen);
  }, []);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-[22px] border-y border-l border-white/10 bg-[#101010] p-3 text-white shadow-[0_18px_50px_rgba(0,0,0,0.42)] transition-colors duration-300 hover:bg-[#805948] md:p-4"
        initial={{ x: 100 }}
        animate={{ x: isOpen ? 100 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Open contact panel"
      >
        <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed bottom-0 right-0 top-0 z-50 w-full overflow-y-auto border-l border-white/10 bg-[#050505] shadow-2xl md:w-[500px]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex min-h-full flex-col p-8 md:p-12">
                <div className="mb-12 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.26em] text-[#c19a88]">Let&apos;s make something.</p>
                    <h2 className="text-3xl font-light tracking-tight text-white">Tell us the rough idea.</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 text-white/50 transition-colors duration-300 hover:bg-white/5 hover:text-white"
                    aria-label="Close contact panel"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="flex flex-1 flex-col gap-6" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-white/50">Name</label>
                    <input type="text" required className="rounded-none border-b border-white/10 bg-transparent px-0 pb-3 text-white transition-colors placeholder:text-white/25 focus:border-[#805948] focus:outline-none" placeholder="Your name" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-white/50">Email</label>
                    <input type="email" required className="rounded-none border-b border-white/10 bg-transparent px-0 pb-3 text-white transition-colors placeholder:text-white/25 focus:border-[#805948] focus:outline-none" placeholder="you@email.com" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-white/50">Project idea</label>
                    <textarea required rows={5} className="resize-none rounded-none border-b border-white/10 bg-transparent px-0 pb-3 text-white transition-colors placeholder:text-white/25 focus:border-[#805948] focus:outline-none" placeholder="A few lines is plenty."></textarea>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-white/50">Budget</label>
                    <select className="cursor-pointer appearance-none rounded-none border-b border-white/10 bg-transparent px-0 pb-3 text-white transition-colors focus:border-[#805948] focus:outline-none">
                      <option className="bg-[#101010]" value="not-sure">Not sure yet</option>
                      <option className="bg-[#101010]" value="2k-5k">$2k - $5k</option>
                      <option className="bg-[#101010]" value="5k-10k">$5k - $10k</option>
                      <option className="bg-[#101010]" value="10k-plus">$10k+</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 rounded-full bg-white px-8 py-4 font-medium text-[#050505] transition duration-300 hover:scale-[0.98] hover:bg-[#805948] hover:text-white"
                  >
                    Send
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
