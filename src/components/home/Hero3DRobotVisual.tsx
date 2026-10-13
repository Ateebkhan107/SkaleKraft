"use client";

import dynamic from "next/dynamic";
import { Spotlight } from "@/components/ui/spotlight";

// Dynamically import SplineScene with ssr: false so it never blocks SSR or causes hydration mismatch
const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((mod) => mod.SplineScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#805948]/30 border-t-[#c19a88]" />
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">Initializing 3D Robot...</p>
        </div>
      </div>
    ),
  }
);

export function Hero3DRobotVisual() {
  return (
    <div
      data-cursor-card
      className="group relative flex h-[460px] w-full min-h-[420px] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#090909] shadow-[0_38px_110px_rgba(0,0,0,0.55)] sm:h-[520px] sm:rounded-[34px] lg:h-[580px] xl:h-[620px]"
      style={{
        boxShadow: "inset 0 0 76px rgba(128,89,72,.1), 0 38px 110px rgba(0,0,0,.6)",
      }}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(128,89,72,.25),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,.03),transparent_40%)]" />

      {/* Dynamic interactive cursor spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-32 md:-top-20"
        fill="rgba(193, 154, 136, 0.45)"
      />

      {/* Top overlay badge bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 sm:p-6">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-medium tracking-wider text-white/80 uppercase">
            Interactive 3D Robot
          </span>
        </div>

        <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/50 backdrop-blur-md sm:block">
          Click & Drag to Interact
        </div>
      </div>

      {/* 3D Spline Canvas Container */}
      <div className="relative z-10 h-full w-full">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="h-full w-full"
        />
      </div>

      {/* Bottom overlay info banner */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-white/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 backdrop-blur-xs sm:p-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#c19a88]">Real-time Spatial Physics</p>
          <p className="mt-0.5 text-xs text-white/60">Autonomous Intelligence & Interactive 3D</p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/35">
          <span>60 FPS</span>
          <span>·</span>
          <span>WebGL</span>
        </div>
      </div>
    </div>
  );
}
