"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { heroCodeLines, heroNotices } from "./data";

export function HeroSoftwareVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-120px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [notice, setNotice] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const noticeTimer = window.setInterval(() => setNotice((current) => (current + 1) % heroNotices.length), 3200);
    const stepTimer = window.setInterval(() => setStep((current) => (current + 1) % heroCodeLines.length), 1500);
    return () => {
      window.clearInterval(noticeTimer);
      window.clearInterval(stepTimer);
    };
  }, [inView]);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -5,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 5,
    });
  };

  return (
    <motion.div
      ref={ref}
      data-cursor-card
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative min-h-[360px] overflow-hidden rounded-[34px] border border-white/10 bg-[#090909] p-4 shadow-[0_38px_110px_rgba(0,0,0,0.55)] sm:min-h-[460px] lg:min-h-[560px]"
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.45 }}
      style={{ boxShadow: "inset 0 0 76px rgba(128,89,72,.08), 0 38px 110px rgba(0,0,0,.55)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(128,89,72,.2),transparent_34%),radial-gradient(circle_at_20%_76%,rgba(255,255,255,.055),transparent_28%)]" />
      {[18, 34, 62, 78].map((left, index) => (
        <motion.span
          key={left}
          className="absolute h-1 w-1 rounded-full bg-white/35"
          style={{ left: `${left}%`, top: `${[18, 72, 28, 58][index]}%` }}
          initial={{ opacity: 0.18 }}
          animate={inView ? { opacity: [0.18, 0.55, 0.18], y: [0, -10, 0] } : { opacity: 0.18 }}
          transition={{ duration: 4 + index, delay: index * 0.45, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="absolute left-5 top-5 h-[72%] w-[72%] overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0d0d]/88 shadow-[0_24px_80px_rgba(0,0,0,.42)] backdrop-blur"
        animate={inView ? { y: [0, -7, 0] } : { y: 0 }}
        transition={{ duration: 7, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
      >
        <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/[0.035] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/65" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/65" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/65" />
          <div className="ml-3 h-5 flex-1 rounded-full border border-white/8 bg-black/28" />
        </div>
        <motion.div className="p-4" animate={inView ? { y: [0, -58, -58, 0] } : { y: 0 }} transition={{ duration: 9, repeat: inView ? Infinity : 0, ease: "easeInOut" }}>
          <div className="flex items-center justify-between text-[10px] text-white/40">
            <span className="font-semibold tracking-[0.2em] text-[#c19a88]">SKALE UI</span>
            <div className="flex gap-3"><span>Home</span><span>Work</span><span>Build</span></div>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-[1fr_.85fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/36">Production System</p>
              <h3 className="mt-2 max-w-[260px] text-2xl font-medium leading-tight text-white sm:text-3xl">Software that feels calm and fast.</h3>
              <div className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-medium text-black">Start Project</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
              <svg viewBox="0 0 220 110" className="h-24 w-full overflow-visible">
                <motion.path
                  d="M8 88 C 38 32, 58 80, 86 48 S 138 18, 166 44 S 194 72, 214 24"
                  fill="none"
                  stroke="#D8A25A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0.45 }}
                  transition={{ duration: 3.6, repeat: inView ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }}
                />
                {[8, 86, 166, 214].map((cx, index) => (
                  <motion.circle key={cx} cx={cx} cy={[88, 48, 44, 24][index]} r="4" fill="#D8A25A" initial={{ opacity: 0.7 }} animate={inView ? { scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] } : { scale: 1, opacity: 0.7 }} transition={{ duration: 2, delay: index * 0.22, repeat: inView ? Infinity : 0 }} />
                ))}
              </svg>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Speed", "Leads", "Health"].map((label, index) => (
              <motion.div key={label} className="rounded-xl border border-white/8 bg-black/24 p-3" initial={false} animate={inView ? { opacity: [0.55, 1, 0.72] } : { opacity: 0.7 }} transition={{ duration: 3, delay: index * 0.22, repeat: inView ? Infinity : 0 }}>
                <p className="text-[10px] text-white/36">{label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{[98, 42, 99][index]}%</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-5 top-14 w-44 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_70px_rgba(0,0,0,.38)] backdrop-blur-xl hidden sm:block"
        animate={inView ? { y: [0, 10, 0], x: [0, -4, 0] } : { y: 0, x: 0 }}
        transition={{ duration: 6, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
      >
        <p className="text-xs text-white/40">Revenue</p>
        <p className="mt-1 text-2xl font-semibold text-white">$24.8k</p>
        <p className="mt-2 text-xs text-emerald-300">up +24%</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-black/24 p-2"><p className="text-[10px] text-white/36">Projects</p><p className="text-sm text-white">148</p></div>
          <div className="rounded-xl bg-black/24 p-2"><p className="text-[10px] text-white/36">Users</p><p className="text-sm text-white">8.2k</p></div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={notice}
          className="absolute right-6 top-[46%] rounded-2xl border border-emerald-300/18 bg-emerald-300/10 px-4 py-3 text-sm text-white/82 shadow-[0_18px_58px_rgba(0,0,0,.4)] backdrop-blur-xl hidden md:block"
          initial={{ opacity: 0, x: 42, y: 8 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
          exit={{ opacity: 0, x: 24, y: -8 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-emerald-300">✓</span> {heroNotices[notice]}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute bottom-6 right-7 w-[250px] rounded-2xl border border-white/10 bg-black/45 p-4 font-mono text-xs text-white/70 shadow-[0_22px_70px_rgba(0,0,0,.42)] backdrop-blur-xl hidden sm:block"
        animate={inView ? { y: [0, -8, 0] } : { y: 0 }}
        transition={{ duration: 6.5, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
      >
        {heroCodeLines.map((line, index) => (
          <motion.p key={line} className={index === 0 ? "text-white" : "text-emerald-300/86"} initial={false} animate={{ opacity: index <= step ? 1 : 0.18, x: index <= step ? 0 : -8 }} transition={{ duration: 0.35 }}>
            {index === 0 ? line : `✓ ${line}`}
          </motion.p>
        ))}
      </motion.div>

      <div className="absolute bottom-8 left-8 w-[60%] sm:w-[42%] rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        <div className="mb-3 flex items-center justify-between text-xs text-white/45"><span>Live graph</span><span>12:48</span></div>
        <svg viewBox="0 0 260 110" className="h-16 sm:h-28 w-full overflow-visible">
          <motion.path d="M6 92 C 44 42, 58 82, 92 54 S 150 20, 174 52 S 222 84, 254 22" fill="none" stroke="#805948" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0.35 }} transition={{ duration: 4.4, repeat: inView ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }} />
          <motion.g animate={inView ? { x: [6, 254], y: [92, 22] } : { x: 6, y: 92 }} transition={{ duration: 4.4, repeat: inView ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }}>
            <rect x="-30" y="-34" width="62" height="24" rx="8" fill="rgba(255,255,255,.1)" />
            <text x="-20" y="-18" fill="rgba(255,255,255,.75)" fontSize="10">+18.6%</text>
            <circle r="5" fill="#805948" />
          </motion.g>
        </svg>
      </div>
    </motion.div>
  );
}
