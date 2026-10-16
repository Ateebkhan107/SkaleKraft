"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ServiceKey, accent } from "./data";
import { HeroSoftwareVisual } from "./HeroSoftwareVisual";

export function ServiceVisual({ serviceKey, compact = false }: { serviceKey: ServiceKey; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.28, margin: "-120px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const color = accent[serviceKey];
  const isMobile = useIsMobile();

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (compact || isMobile) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -7,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 7,
    });
  };

  return (
    <motion.div
      ref={ref}
      data-cursor-card
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`relative h-full w-full overflow-hidden ${
        compact
          ? "bg-transparent"
          : "min-h-[360px] rounded-[26px] border border-white/10 bg-[#0B0B0B] p-4 md:min-h-[430px]"
      }`}
      style={compact ? undefined : { boxShadow: `inset 0 0 0 1px rgba(${color.rgb},.08), 0 0 58px rgba(${color.rgb},.12)` }}
      animate={compact ? undefined : { rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.4 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),transparent_34%,rgba(255,255,255,0.025))]" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 68% 20%, rgba(${color.rgb}, .18), transparent 38%)` }} />
      <div className="relative h-full w-full">
        {serviceKey === "websites" && <WebsiteShowcase active={inView} compact={compact} />}
        {serviceKey === "apps" && <AppShowcase active={inView} compact={compact} />}
        {serviceKey === "ai" && <AIShowcase active={inView} compact={compact} />}
        {serviceKey === "creative" && <CreativeShowcase active={inView} compact={compact} />}
      </div>
    </motion.div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

function WebsiteShowcase({ active, compact }: { active: boolean; compact?: boolean }) {
  return <HeroSoftwareVisual embedded={true} active={active} compact={compact} />;
}

const phoneScreens = [
  { title: "Fitness", metric: "68%", color: "#8B5CF6", items: ["Workout", "Meals", "Sleep"] },
  { title: "Finance", metric: "$8.4k", color: "#22C55E", items: ["Budget", "Cards", "Invest"] },
  { title: "Travel", metric: "12", color: "#38BDF8", items: ["Trips", "Hotels", "Routes"] },
];

function PhoneMock({ index, side, active, loopRepeat }: { index: number; side: "left" | "center" | "right"; active: boolean; loopRepeat: number }) {
  const screen = phoneScreens[index % phoneScreens.length];
  const scale = side === "center" ? 1 : 0.78;
  const blur = side === "center" ? "" : "blur-[1px] opacity-55";
  const visibility = side === "center" ? "" : "hidden sm:block";

  return (
    <motion.div
      className={`relative h-[300px] w-[148px] shrink-0 rounded-[34px] border border-white/15 bg-[#050505] p-2 shadow-[0_30px_90px_rgba(0,0,0,.45)] ${blur} ${visibility}`}
      animate={active ? { y: side === "center" ? [0, -12, 0] : [10, 0, 10], rotate: side === "left" ? [-8, -5, -8] : side === "right" ? [8, 5, 8] : [-2, 2, -2], scale } : { scale }}
      transition={{ duration: 6, repeat: active ? loopRepeat : 0, ease: "easeInOut" }}
    >
      <div className="absolute left-1/2 top-3 h-5 w-16 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-full overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,#111,#050505)] p-4">
        <motion.div key={screen.title} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40">9:41</span>
            <span className="h-2 w-8 rounded-full" style={{ backgroundColor: screen.color }} />
          </div>
          <p className="mt-7 text-xs text-white/46">Good morning</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{screen.title}</h3>
          <div className="mt-5 rounded-2xl border border-white/10 p-3" style={{ background: `linear-gradient(135deg, ${screen.color}44, rgba(255,255,255,.03))` }}>
            <p className="text-[10px] text-white/52">Today</p>
            <p className="mt-1 text-3xl font-semibold text-white">{screen.metric}</p>
            <svg viewBox="0 0 120 40" className="mt-3 h-10 w-full">
              <motion.path d="M4 32 C 24 10, 32 36, 48 18 S 78 8, 92 22 S 110 16, 118 6" fill="none" stroke={screen.color} strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={active ? { pathLength: 1 } : { pathLength: 0.4 }} transition={{ duration: 2.4, repeat: active ? loopRepeat : 0, repeatType: "reverse" }} />
            </svg>
          </div>
          <div className="mt-4 space-y-2">
            {screen.items.map((item, itemIndex) => (
              <motion.div key={item} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.035] p-2" initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }} transition={{ delay: itemIndex * 0.12 }}>
                <span className="h-6 w-6 rounded-lg" style={{ backgroundColor: `${screen.color}33` }} />
                <span className="text-[11px] text-white/68">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AppShowcase({ active, compact }: { active: boolean; compact?: boolean }) {
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setScreen((current) => (current + 1) % phoneScreens.length), 5000);
    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(139,92,246,.22),transparent_38%)]" />
      <div className={`relative flex items-center gap-2 sm:gap-4 ${compact ? "scale-[0.68] sm:scale-[0.78] lg:scale-[0.86] origin-center" : ""}`}>
        <PhoneMock index={screen + 2} side="left" active={active} loopRepeat={Infinity} />
        <PhoneMock index={screen} side="center" active={active} loopRepeat={Infinity} />
        <PhoneMock index={screen + 1} side="right" active={active} loopRepeat={Infinity} />
      </div>
    </div>
  );
}

function AIShowcase({ active, compact }: { active: boolean; compact?: boolean }) {
  const nodes = ["Website", "Lead Agent", "CRM", "Database", "Email", "Analytics"];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-2">
      <div className={`relative h-[360px] w-[640px] max-w-none ${compact ? "scale-[0.56] sm:scale-[0.64] lg:scale-[0.72] origin-center" : "scale-[0.34] sm:scale-[0.58] lg:scale-100"}`}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 360" aria-hidden="true">
          <defs>
            <linearGradient id="ai-line" x1="0" x2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity=".16" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity=".72" />
            </linearGradient>
          </defs>
          {[[105,70,300,70], [340,86,510,142], [500,184,340,255], [300,255,112,215], [112,176,270,118]].map(([x1, y1, x2, y2], index) => (
            <g key={index}>
              <path d={`M${x1} ${y1} C ${(x1 + x2) / 2} ${y1 - 40}, ${(x1 + x2) / 2} ${y2 + 40}, ${x2} ${y2}`} stroke="url(#ai-line)" strokeWidth="2" fill="none" />
              <motion.circle r="4" fill="#22D3EE" initial={{ opacity: 0 }} animate={active ? { offsetDistance: ["0%", "100%"], opacity: [0, 1, 0] } : { opacity: 0 }} transition={{ duration: 3.2, delay: index * 0.55, repeat: active ? Infinity : 0, ease: "easeInOut" }} style={{ offsetPath: `path("M${x1} ${y1} C ${(x1 + x2) / 2} ${y1 - 40}, ${(x1 + x2) / 2} ${y2 + 40}, ${x2} ${y2}")` }} />
            </g>
          ))}
        </svg>
        {nodes.map((node, index) => {
          const positions = [[30, 35], [242, 35], [450, 104], [282, 230], [34, 186], [472, 254]][index];
          const statuses = ["Thinking...", "Processing...", "Completed"];
          return (
            <motion.div
              key={node}
              className="absolute w-36 rounded-2xl border border-cyan-300/15 bg-white/[0.045] p-3 shadow-[0_18px_54px_rgba(0,0,0,.32)] backdrop-blur-md"
              style={{ left: positions[0], top: positions[1] }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={active ? { opacity: 1, scale: [1, 1.025, 1] } : { opacity: 0.55, scale: 1 }}
              transition={{ duration: 3.4, delay: index * 0.08, repeat: active ? Infinity : 0, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_14px_rgba(34,211,238,.5)]" />
                <p className="text-sm font-medium text-white">{node}</p>
              </div>
              <motion.p className="mt-3 text-xs text-white/45" initial={{ opacity: 0.55 }} animate={active ? { opacity: [0.4, 0.8, 0.6] } : { opacity: 0.55 }} transition={{ duration: 2.4, delay: index * 0.2, repeat: active ? Infinity : 0 }}>
                {statuses[index % statuses.length]}
              </motion.p>
            </motion.div>
          );
        })}
        <motion.div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-cyan-300/10" initial={{ opacity: 0.45 }} animate={active ? { scale: [1, 1.18, 1], opacity: [0.45, 0.8, 0.45] } : { scale: 1, opacity: 0.45 }} transition={{ duration: 4, repeat: active ? Infinity : 0, ease: "easeInOut" }} />
      </div>
    </div>
  );
}

function CreativeShowcase({ active, compact }: { active: boolean; compact?: boolean }) {
  const loopRepeat = Infinity;
  const clips = [
    { label: "Intro", width: "22%", color: "#F97316" },
    { label: "Scene", width: "34%", color: "#8B5CF6" },
    { label: "Title", width: "26%", color: "#22D3EE" },
  ];

  return (
    <div className={`absolute inset-2 sm:inset-3 overflow-hidden rounded-[18px] border border-white/10 bg-[#080808] ${compact ? "scale-[0.92] sm:scale-[0.96] origin-center" : ""}`}>
      <div className="flex h-full">
        <div className="hidden w-14 border-r border-white/8 bg-white/[0.025] p-2 sm:block">
          {[0, 1, 2, 3].map((item) => <div key={item} className="mb-2 h-9 rounded-lg border border-white/8 bg-white/[0.04]" />)}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-white/8 px-3.5 py-2.5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#F97316]">Studio timeline</p>
            <div className="flex gap-2 text-[10px] text-white/42"><span>Video</span><span>Audio</span><span>Color</span></div>
          </div>
          <div className="grid flex-1 gap-2.5 p-3 lg:grid-cols-[1fr_150px]">
            <div className="flex flex-col gap-2.5">
              <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(135deg,#151515,#050505)] min-h-[90px]">
                <motion.div className="absolute inset-4 rounded-[20px] border border-orange-300/14 bg-orange-500/10" initial={{ opacity: 0.45 }} animate={active ? { scale: [1, 1.04, 1], opacity: [0.45, 0.75, 0.45] } : { scale: 1, opacity: 0.45 }} transition={{ duration: 4.5, repeat: active ? loopRepeat : 0 }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs text-white/78 backdrop-blur">Preview 4K</div>
                </div>
              </div>
              <div className="relative h-28 rounded-xl border border-white/10 bg-white/[0.035] p-2.5">
                <div className="absolute left-2.5 right-2.5 top-2 flex justify-between text-[9px] text-white/28">{["00:00", "00:05", "00:10", "00:15", "00:20"].map((tick) => <span key={tick}>{tick}</span>)}</div>
                <div className="mt-5 space-y-1.5">
                  {["Video", "Text", "Audio"].map((track, trackIndex) => (
                    <div key={track} className="flex items-center gap-2">
                      <span className="w-8 text-[9px] text-white/34">{track}</span>
                      <div className="flex h-5 flex-1 gap-1.5 overflow-hidden rounded-md bg-black/20 p-0.5">
                        {clips.map((clip, index) => (
                          <motion.span key={`${clip.label}-${track}`} className="flex items-center rounded px-1.5 text-[9px] text-white/80" style={{ width: clip.width, backgroundColor: `${clip.color}${trackIndex === 2 ? "55" : "77"}` }} initial={{ opacity: 0.82 }} animate={active && index === 1 ? { opacity: [0.65, 1, 0.65] } : { opacity: 0.82 }} transition={{ duration: 2.2, repeat: active ? loopRepeat : 0 }}>
                            {clip.label}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <motion.div className="absolute bottom-2 top-4 w-px bg-[#F97316] shadow-[0_0_14px_rgba(249,115,22,.6)]" animate={active ? { left: ["14%", "86%", "14%"] } : { left: "14%" }} transition={{ duration: 5.5, repeat: active ? loopRepeat : 0, ease: "easeInOut" }} />
              </div>
            </div>
            <div className="hidden rounded-xl border border-white/10 bg-white/[0.035] p-2.5 lg:block">
              {["Scale", "Opacity", "Contrast", "Warmth"].map((item, index) => (
                <div key={item} className="mb-3.5">
                  <div className="mb-1 flex justify-between text-[9px] text-white/42"><span>{item}</span><span>{[92, 78, 64, 48][index]}%</span></div>
                  <div className="h-1 rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-[#F97316]" animate={active ? { width: [`${[42, 58, 36, 72][index]}%`, `${[86, 72, 64, 52][index]}%`] } : { width: "50%" }} transition={{ duration: 3, delay: index * 0.25, repeat: active ? loopRepeat : 0, repeatType: "reverse" }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
