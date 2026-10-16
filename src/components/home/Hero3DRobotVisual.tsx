"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";
import { attachRobotEyes } from "./RobotEyes";

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

function Hero3DRobotVisualInner() {
  const [isMobile, setIsMobile] = useState<boolean | null>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    }
    return null;
  });
  const cleanupEyesRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const check = () => {
      const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
      setIsMobile(mobile);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    return () => {
      cleanupEyesRef.current?.();
      cleanupEyesRef.current = null;
    };
  }, []);

  const handleSplineLoad = useCallback((app: Application) => {
    app.setZoom(HERO_ROBOT_ZOOM);
    cleanupEyesRef.current?.();
    cleanupEyesRef.current = attachRobotEyes(app);
  }, []);

  // Completely unmount on mobile so zero WebGL context, shaders, or 3D loops run
  if (isMobile) {
    return null;
  }

  return (
    <div className="relative hidden md:flex h-[480px] md:h-[540px] lg:h-[600px] xl:h-[660px] w-full items-center justify-center overflow-visible pointer-events-auto">
      {/* Ambient placeholder glow for instant paint before 3D loads */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(193,154,136,0.2)_0%,rgba(128,89,72,0.11)_42%,transparent_72%)] blur-3xl" />
      </div>

      <div
        className="relative h-full w-full pointer-events-auto"
        style={{ maskImage: LEG_FADE_MASK, WebkitMaskImage: LEG_FADE_MASK }}
      >
        <div
          className="h-full w-full pointer-events-auto"
          style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
        >
          <SplineScene
            scene="/spline/robot.splinecode"
            className="h-full w-full pointer-events-auto"
            onLoad={handleSplineLoad}
          />
        </div>
      </div>
    </div>
  );
}

export const Hero3DRobotVisual = memo(Hero3DRobotVisualInner);
