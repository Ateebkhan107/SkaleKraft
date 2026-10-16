"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, ShieldCheck, Clock3, Activity, CheckCircle2, type LucideIcon } from "lucide-react";

interface Metric {
  id: string;
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sublabel: string;
  badge: string;
  accentColor: string;
  gradientClass: string;
}

const metrics: Metric[] = [
  {
    id: "products",
    icon: Rocket,
    value: 15,
    suffix: "+",
    label: "Products & Systems Built",
    sublabel: "Websites, Native Apps & AI Agents",
    badge: "Production Verified",
    accentColor: "#c19a88",
    gradientClass: "from-white via-[#f2d9ce] to-[#c19a88]",
  },
  {
    id: "uptime",
    icon: Activity,
    value: 99.99,
    suffix: "%",
    decimals: 2,
    label: "Production Uptime SLA",
    sublabel: "Multi-region Edge Architecture",
    badge: "Live Monitoring",
    accentColor: "#10B981",
    gradientClass: "from-emerald-100 via-emerald-300 to-emerald-500",
  },
  {
    id: "response",
    icon: Clock3,
    value: 24,
    prefix: "<",
    suffix: "h",
    label: "Response & Sprint Time",
    sublabel: "Direct engineering communication",
    badge: "Agile SLA",
    accentColor: "#38BDF8",
    gradientClass: "from-sky-100 via-cyan-300 to-sky-500",
  },
  {
    id: "ownership",
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Full Code Ownership",
    sublabel: "Zero licensing traps or lock-in",
    badge: "Full Guarantee",
    accentColor: "#d2a28d",
    gradientClass: "from-white via-[#e8cbbf] to-[#805948]",
  },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  gradientClass,
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  gradientClass: string;
  inView: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !spanRef.current) return;
    hasAnimated.current = true;

    const span = spanRef.current;
    const duration = 1200;
    const startTime = performance.now();

    let animationFrame = 0;
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = value * ease;
      const formatted = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
      span.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      } else {
        const finalFormatted = decimals > 0 ? value.toFixed(decimals) : Math.floor(value);
        span.textContent = `${prefix}${finalFormatted}${suffix}`;
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, value, prefix, suffix, decimals]);

  return (
    <span
      ref={spanRef}
      className={`bg-gradient-to-br ${gradientClass} bg-clip-text font-mono text-[1.45rem] font-semibold leading-none tracking-[-0.05em] text-transparent sm:text-[2.7rem] lg:text-[3.15rem]`}
    >
      {prefix}0{suffix}
    </span>
  );
}

export default function ImpactMetricsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section ref={containerRef} className="relative py-4 sm:py-11">
      <div className="pointer-events-none absolute left-1/2 top-[62%] h-48 w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(128,89,72,0.12),transparent_70%)] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-3.5 sm:mb-5 flex items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="h-px w-5 sm:w-7 bg-[#c19a88]/70" />
            <p className="text-[9px] uppercase tracking-[0.26em] text-[#c19a88]/80 sm:text-xs">Built for production</p>
          </div>
          <h2 className="mt-1 sm:mt-2 text-lg sm:text-[1.7rem] font-medium tracking-tight text-white">Proof in the performance.</h2>
        </div>
        <p className="hidden max-w-xs text-right text-xs leading-5 text-white/35 md:block">Measurable reliability, direct collaboration, and complete ownership from day one.</p>
      </motion.div>

      <div className="relative grid grid-cols-2 overflow-hidden rounded-[18px] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(12,12,12,0.94)_38%,rgba(7,7,7,0.98))] shadow-[0_28px_90px_rgba(0,0,0,0.38)] sm:rounded-[28px] lg:grid-cols-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative flex min-h-[135px] flex-col overflow-hidden p-3 transition duration-500 hover:bg-white/[0.025] sm:min-h-[225px] sm:p-5 ${idx === 0 ? "border-b border-r border-white/[0.08] lg:border-b-0" : ""} ${idx === 1 ? "border-b border-white/[0.08] lg:border-b-0 lg:border-r" : ""} ${idx === 2 ? "border-r border-white/[0.08]" : ""}`}
            >
              <div
                className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-[48px] transition duration-700 group-hover:opacity-20 ${idx === 1 ? "opacity-[0.13]" : "opacity-[0.06]"}`}
                style={{ backgroundColor: m.accentColor }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.025),transparent_34%)]" />

              <div className="relative flex items-center justify-between gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <span className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl border border-white/[0.09] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_10px_30px_rgba(0,0,0,.2)]" style={{ color: m.accentColor }}>
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.7} />
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-white/22">0{idx + 1}</span>
                </div>
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/20 px-1.5 py-0.5 text-[6.5px] font-medium uppercase tracking-[0.12em] text-white/42 backdrop-blur-xl sm:px-2 sm:py-1 sm:text-[8px] sm:tracking-[0.14em]"
                >
                  {m.id === "uptime" ? (
                    <span className="relative flex h-1 w-1 sm:h-1.5 sm:w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                      <span className="relative inline-flex h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-400" />
                    </span>
                  ) : (
                    <CheckCircle2 className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-[#c19a88]/80" strokeWidth={1.8} />
                  )}
                  {m.badge}
                </span>
              </div>

              <div className="relative pb-1.5 pt-3 sm:pb-3 sm:pt-7">
                <AnimatedCounter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  gradientClass={m.gradientClass}
                  inView={isInView}
                />
              </div>

              <div className="relative mt-auto border-t border-white/[0.07] pt-2 sm:pt-3">
                <h3 className="text-[8px] sm:text-[11px] font-semibold uppercase leading-tight sm:leading-4 tracking-wider sm:tracking-[0.12em] text-white/82">
                  {m.label}
                </h3>
                <p className="mt-0.5 text-[7.5px] sm:text-[10px] font-light leading-tight sm:leading-4 text-white/34 line-clamp-1 sm:line-clamp-none">
                  {m.sublabel}
                </p>
              </div>

              <div className="absolute inset-x-3 sm:inset-x-5 bottom-0 h-px overflow-hidden">
                <motion.div
                  className="h-full origin-left"
                  style={{ background: `linear-gradient(90deg, transparent, ${m.accentColor}, transparent)` }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isInView ? { scaleX: 1, opacity: 0.55 } : {}}
                  transition={{ duration: 0.9, delay: 0.3 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
