"use client";

import dynamic from "next/dynamic";

// Dynamically import SplineScene with ssr: false so it never blocks SSR or causes hydration mismatch
const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((mod) => mod.SplineScene),
  {
    ssr: false,
    loading: () => null,
  }
);

export function Hero3DRobotVisual() {
  return (
    <div className="relative flex h-[480px] w-full min-h-[420px] items-center justify-center overflow-visible sm:h-[540px] lg:h-[600px] xl:h-[660px]">
      {/* Ambient warm backlight behind robot for seamless depth and integration */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(193,154,136,0.12)_0%,rgba(128,89,72,0.05)_45%,transparent_70%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* 3D Spline Canvas with 360-degree seamless feathered vignette */}
      <div
        className="relative z-10 h-full w-full"
        style={{
          maskImage:
            "radial-gradient(ellipse 82% 80% at 50% 48%, black 44%, rgba(0, 0, 0, 0.7) 68%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 82% 80% at 50% 48%, black 44%, rgba(0, 0, 0, 0.7) 68%, transparent 95%)",
        }}
      >
        <SplineScene
          scene="/spline/robot.splinecode"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
