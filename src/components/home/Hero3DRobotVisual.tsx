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

// Masks only reduce the canvas's own opacity — they never paint a color —
// so the page background and particles stay visible right up to the robot.
const EDGE_MASK =
  "radial-gradient(ellipse 70% 62% at 50% 42%, black 55%, transparent 100%)";
const LEG_FADE_MASK =
  "linear-gradient(to bottom, black 0%, black 58%, transparent 92%)";

export function Hero3DRobotVisual() {
  return (
    <div className="relative flex h-[480px] w-full min-h-[420px] items-center justify-center overflow-visible sm:h-[540px] lg:h-[600px] xl:h-[660px]">
      <div
        className="relative h-full w-full"
        style={{ maskImage: LEG_FADE_MASK, WebkitMaskImage: LEG_FADE_MASK }}
      >
        <div
          className="h-full w-full"
          style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
        >
          <SplineScene scene="/spline/robot.splinecode" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
