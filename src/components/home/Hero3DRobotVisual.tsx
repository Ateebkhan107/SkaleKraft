"use client";

import dynamic from "next/dynamic";
import { Spotlight } from "@/components/ui/spotlight";

// Dynamically import SplineScene with ssr: false so it never blocks SSR or causes hydration mismatch
const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((mod) => mod.SplineScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-full w-full items-center justify-center pointer-events-none">
        <div className="h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(193,154,136,0.15)_0%,transparent_70%)] blur-3xl animate-pulse" />
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

      {/* 3D Spline Canvas - Floating with smooth bottom fade mask */}
      <div
        className="relative z-10 h-full w-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 50%, rgba(0, 0, 0, 0.75) 68%, rgba(0, 0, 0, 0.25) 84%, transparent 96%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 50%, rgba(0, 0, 0, 0.75) 68%, rgba(0, 0, 0, 0.25) 84%, transparent 96%)",
        }}
      >
        <SplineScene
          scene="/spline/robot.splinecode"
          className="h-full w-full"
        />
      </div>

      {/* Atmospheric dark gradient feathering at the bottom to eliminate hard crop line */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
