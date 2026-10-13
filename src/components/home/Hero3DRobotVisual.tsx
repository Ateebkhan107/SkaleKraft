"use client";

import dynamic from "next/dynamic";

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
      {/* Soft atmospheric ambient glow without harsh boundaries */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,154,136,0.12)_0%,rgba(128,89,72,0.04)_45%,transparent_70%)] blur-3xl" />

      {/* 3D Spline Canvas - Multi-directional radial vignette mask to eliminate all edges & seams */}
      <div
        className="relative z-10 h-full w-full"
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 72% at 50% 42%, black 32%, rgba(0, 0, 0, 0.85) 50%, rgba(0, 0, 0, 0.3) 70%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 72% at 50% 42%, black 32%, rgba(0, 0, 0, 0.85) 50%, rgba(0, 0, 0, 0.3) 70%, transparent 92%)",
        }}
      >
        <SplineScene
          scene="/spline/robot.splinecode"
          className="h-full w-full"
        />
      </div>

      {/* Left edge feathered gradient to dissolve any tone difference into the text side */}
      <div
        className="pointer-events-none absolute inset-y-0 -left-6 z-20 w-36 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/75 to-transparent"
        aria-hidden="true"
      />

      {/* Right edge feathered gradient */}
      <div
        className="pointer-events-none absolute inset-y-0 -right-6 z-20 w-32 bg-gradient-to-l from-[#0B0B0B] via-[#0B0B0B]/75 to-transparent"
        aria-hidden="true"
      />

      {/* Bottom feathering gradient to dissolve legs seamlessly into page darkness */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/85 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
