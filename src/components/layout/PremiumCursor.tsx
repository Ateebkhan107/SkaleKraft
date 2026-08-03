"use client";

import { useEffect, useRef, useState } from "react";

const sectionColors = {
  websites: "#D8A25A",
  apps: "#8B5CF6",
  ai: "#22D3EE",
  creative: "#F97316",
};

type CursorMode = "default" | "button" | "card" | "image" | "text";
type CursorState = {
  mode: CursorMode;
  color: string;
  visible: boolean;
};

const defaultColor = "rgba(255,255,255,0.76)";

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function getSectionColor(target: Element | null) {
  const section = target?.closest("#websites, #apps, #ai, #creative");
  if (!section?.id) return defaultColor;
  return sectionColors[section.id as keyof typeof sectionColors] || defaultColor;
}

function getMode(target: Element | null): CursorMode {
  if (!target) return "default";
  if (target.closest("button, a, [role='button'], select, summary")) return "button";
  if (target.closest("input, textarea, [contenteditable='true'], p, h1, h2, h3, h4, h5, h6, li, label")) return "text";
  if (target.closest("[data-cursor-image], img, picture")) return "image";
  if (target.closest("[data-cursor-card], article")) return "card";
  return "default";
}

export default function PremiumCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const dot = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const hoveredImage = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<CursorState>({ mode: "default", color: defaultColor, visible: false });

  useEffect(() => {
    const canUseCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canUseCursor || reduceMotion) return;

    let frame = 0;
    let mounted = true;

    document.documentElement.classList.add("premium-cursor-enabled");

    const resetInteractiveElement = (element: HTMLElement | null) => {
      if (!element) return;
      element.style.removeProperty("--cursor-glow-opacity");
    };

    const updateHoverState = (target: Element | null, event?: PointerEvent) => {
      const nextMode = getMode(target);
      const nextColor = getSectionColor(target);
      setState((current) => {
        if (current.mode === nextMode && current.color === nextColor && current.visible) return current;
        return { mode: nextMode, color: nextColor, visible: true };
      });

      const nextImage = target?.closest("[data-cursor-image], img, picture") as HTMLElement | null;
      if (hoveredImage.current !== nextImage) {
        resetInteractiveElement(hoveredImage.current);
        hoveredImage.current = nextImage;
      }

      if (event && nextMode === "image" && hoveredImage.current) {
        hoveredImage.current.style.setProperty("--cursor-glow-opacity", "1");
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const mode = getMode(target);
      const button = target?.closest("button, a, [role='button'], select, summary") as HTMLElement | null;

      let x = event.clientX;
      let y = event.clientY;

      if (mode === "button" && button) {
        const rect = button.getBoundingClientRect();
        x = lerp(x, rect.left + rect.width / 2, 0.16);
        y = lerp(y, rect.top + rect.height / 2, 0.16);
      }

      pointer.current = { x, y };
      updateHoverState(target, event);
    };

    const onPointerLeave = () => {
      setState((current) => ({ ...current, visible: false }));
      resetInteractiveElement(hoveredImage.current);
      hoveredImage.current = null;
    };

    const animate = () => {
      if (!mounted) return;

      dot.current.x = lerp(dot.current.x, pointer.current.x, state.mode === "text" ? 0.48 : 0.36);
      dot.current.y = lerp(dot.current.y, pointer.current.y, state.mode === "text" ? 0.48 : 0.36);
      ring.current.x = lerp(ring.current.x, dot.current.x, state.mode === "text" ? 0.34 : 0.18);
      ring.current.y = lerp(ring.current.y, dot.current.y, state.mode === "text" ? 0.34 : 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    frame = window.requestAnimationFrame(animate);

    return () => {
      mounted = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.documentElement.classList.remove("premium-cursor-enabled");
      resetInteractiveElement(hoveredImage.current);
    };
  }, [state.mode]);

  const size = state.mode === "button" ? 42 : state.mode === "image" ? 36 : state.mode === "card" ? 30 : state.mode === "text" ? 18 : 24;

  return (
    <>
      <div
        ref={ringRef}
        className="premium-cursor-ring"
        style={{
          borderColor: state.color,
          color: state.color,
          height: size,
          opacity: state.visible ? 1 : 0,
          width: size,
        }}
      />
      <div ref={dotRef} className="premium-cursor-dot" style={{ opacity: state.visible ? 1 : 0 }} />
    </>
  );
}
