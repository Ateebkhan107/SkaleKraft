"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, ShieldCheck, Clock3, Activity } from "lucide-react";

interface Metric {
  id: string;
  icon: any;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sublabel: string;
  accentColor: string;
}

const metrics: Metric[] = [
  {
    id: "products",
    icon: Rocket,
    value: 15,
    suffix: "+",
    label: "Products & Systems Built",
    sublabel: "Websites, Native Apps & AI Agents",
    accentColor: "#c19a88",
  },
  {
    id: "uptime",
    icon: Activity,
    value: 99.99,
    suffix: "%",
    decimals: 2,
    label: "Production Uptime SLA",
    sublabel: "Multi-region Edge Architecture",
    accentColor: "#10B981",
  },
  {
    id: "response",
    icon: Clock3,
    value: 24,
    prefix: "<",
    suffix: "h",
    label: "Response & Sprint Time",
    sublabel: "Direct engineering communication",
    accentColor: "#38BDF8",
  },
  {
    id: "ownership",
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Full Source Code Ownership",
    sublabel: "Zero licensing traps or lock-in",
    accentColor: "#805948",
  },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
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
    <span className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function ImpactMetricsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section ref={containerRef} className="relative py-8 sm:py-12">
      {/* Background glow behind metrics */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(128,89,72,0.12),transparent_70%)] blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E0E]/90 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl sm:p-6 lg:p-8"
      >
        <div className="grid grid-cols-2 gap-4 divide-y divide-white/10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className={`flex flex-col justify-between p-2 sm:p-3 ${
                  idx !== 0 ? "pt-4 lg:pt-2 lg:pl-6" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#c19a88]"
                    style={{ color: m.accentColor }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {m.id === "uptime" && (
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <AnimatedCounter
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.decimals}
                    inView={isInView}
                  />
                  <h3 className="mt-1 text-xs font-semibold text-white/90 sm:text-sm">
                    {m.label}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-white/45 sm:text-xs">
                    {m.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
