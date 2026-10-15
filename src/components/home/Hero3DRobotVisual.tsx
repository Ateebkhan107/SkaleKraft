"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
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

function Hero3DRobotVisualInner() {
  const [enableLive3D, setEnableLive3D] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reducedMotion) return;

    const windowWithIdle = window as Window & typeof globalThis & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const handle = windowWithIdle.requestIdleCallback
      ? windowWithIdle.requestIdleCallback(() => setEnableLive3D(true), { timeout: 900 })
      : window.setTimeout(() => setEnableLive3D(true), 450);

    return () => {
      if (windowWithIdle.cancelIdleCallback) windowWithIdle.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  const handleSplineLoad = useCallback((app: Application) => {
    app.setZoom(HERO_ROBOT_ZOOM);
  }, []);

  return (
    <div className="relative flex h-[350px] sm:h-[480px] md:h-[540px] lg:h-[600px] xl:h-[660px] w-full min-h-[300px] sm:min-h-[420px] items-center justify-center overflow-visible">
      {/* Ambient placeholder glow for instant paint before 3D loads */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-44 w-44 sm:h-64 sm:w-64 rounded-full bg-gradient-to-tr from-[#805948]/20 via-[#c19a88]/15 to-transparent blur-3xl opacity-60" />
      </div>

      <div
        className="relative h-full w-full"
        style={{ maskImage: LEG_FADE_MASK, WebkitMaskImage: LEG_FADE_MASK }}
      >
        <div
          className="h-full w-full"
          style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
        >
          {enableLive3D ? (
            <SplineScene
              scene="/spline/robot.splinecode"
              className="h-full w-full"
              onLoad={handleSplineLoad}
            />
          ) : (
            <Image
              src="/images/robot-preview.webp"
              alt="SkaleKraft 3D robot preview"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-contain opacity-95"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const Hero3DRobotVisual = memo(Hero3DRobotVisualInner);
