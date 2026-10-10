"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, ShieldCheck, Clock3, Activity, CheckCircle2 } from "lucide-react";

interface Metric {
  id: string;
  icon: any;
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
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1600; // ms
    const steps = 40;
    const increment = value / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <span
      className={`bg-gradient-to-r ${gradientClass} bg-clip-text font-mono text-2xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-5xl`}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function ImpactMetricsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section ref={containerRef} className="relative py-4 sm:py-10">
      {/* Background luxury ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(128,89,72,0.15),transparent_70%)] blur-3xl" />

      {/* Grid of Luxury Bento Metric Cards */}
      <div className="relative grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
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
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.035)_0%,rgba(14,14,14,0.92)_50%,rgba(8,8,8,0.98)_100%)] p-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition duration-500 hover:-translate-y-1.5 hover:border-[#805948]/50 hover:shadow-[0_25px_80px_rgba(128,89,72,0.15)] sm:rounded-2xl sm:p-6"
            >
              {/* Subtle hover accent illumination */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-25"
                style={{ backgroundColor: m.accentColor }}
              />

              {/* Top Header: Icon & Luxury Status Badge */}
              <div className="flex items-center justify-between gap-1">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition duration-300 group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-xl"
                  style={{ color: m.accentColor }}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>

                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white/60 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[10px]">
                  {m.id === "uptime" ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ) : (
                    <CheckCircle2 className="h-2.5 w-2.5 text-[#c19a88] sm:h-3 sm:w-3" />
                  )}
                  {m.badge}
                </span>
              </div>

              {/* Counter Value */}
              <div className="mt-3 sm:mt-6">
                <AnimatedCounter
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                  gradientClass={m.gradientClass}
                  inView={isInView}
                />
              </div>

              {/* Label & Description */}
              <div className="mt-2 border-t border-white/[0.08] pt-2 sm:mt-3 sm:pt-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/90 sm:text-sm">
                  {m.label}
                </h3>
                <p className="mt-0.5 text-[10px] font-light leading-relaxed text-white/50 sm:text-xs">
                  {m.sublabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
