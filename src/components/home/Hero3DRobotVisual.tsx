"use client";

import { memo, useCallback } from "react";
import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";

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
  "radial-gradient(ellipse 82% 72% at 50% 44%, black 38%, transparent 100%)";
const LEG_FADE_MASK =
  "linear-gradient(to bottom, black 0%, black 68%, transparent 96%)";

const HERO_ROBOT_ZOOM = 0.68;
const HERO_ROBOT_MOBILE_ZOOM = 0.44;

function Hero3DRobotVisualInner() {
  const handleSplineLoad = useCallback((app: Application) => {
    app.setZoom(window.innerWidth < 768 ? HERO_ROBOT_MOBILE_ZOOM : HERO_ROBOT_ZOOM);
  }, []);

  return (
    <div className="relative flex h-[350px] sm:h-[480px] md:h-[540px] lg:h-[600px] xl:h-[660px] w-full min-h-[300px] sm:min-h-[420px] items-center justify-center overflow-visible">
      {/* Ambient placeholder glow for instant paint before 3D loads */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(193,154,136,0.2)_0%,rgba(128,89,72,0.11)_42%,transparent_72%)] blur-2xl sm:h-64 sm:w-64 sm:blur-3xl" />
      </div>

      <div
        className="relative h-full w-full"
        style={{ maskImage: LEG_FADE_MASK, WebkitMaskImage: LEG_FADE_MASK }}
      >
        <div
          className="h-full w-full"
          style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
        >
          <SplineScene
            scene="/spline/robot.splinecode"
            className="h-full w-full"
            onLoad={handleSplineLoad}
          />
        </div>
      </div>
    </div>
  );
}

export const Hero3DRobotVisual = memo(Hero3DRobotVisualInner);
