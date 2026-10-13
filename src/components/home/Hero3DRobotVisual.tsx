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
        <div className="flex flex-col items-center gap-2.5">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#805948]/30 border-t-[#c19a88]" />
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">Loading 3D...</p>
        </div>
      </div>
    ),
  }
);

export function Hero3DRobotVisual() {
  return (
    <div className="relative flex h-[480px] w-full min-h-[420px] items-center justify-center overflow-visible sm:h-[540px] lg:h-[600px] xl:h-[660px]">
      {/* Seamless atmospheric lighting that blends naturally into the hero background */}
      <div className="pointer-events-none absolute -inset-6 sm:-inset-12 bg-[radial-gradient(ellipse_at_center,rgba(193,154,136,0.14)_0%,rgba(128,89,72,0.06)_45%,transparent_75%)] blur-3xl" />

      {/* Dynamic ambient cursor spotlight matching brand copper tones */}
      <Spotlight
        className="-top-32 left-0 md:left-20"
        fill="rgba(193, 154, 136, 0.35)"
      />

      {/* 3D Spline Canvas - Floating directly in hero space without bounding box */}
      <div className="relative z-10 h-full w-full">
        <SplineScene
          scene="/spline/robot.splinecode"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
