"use client";

import type { AnchorHTMLAttributes, CSSProperties } from "react";
import { WandSparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export type GlassmorphismCtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  spread?: string;
  shimmerColor?: string;
  speed?: string;
  compact?: boolean;
  showIcon?: boolean;
};

export default function GlassmorphismCta({
  label = "Generate My Site",
  avatarSrc = "https://cdn.21st.dev/assets/localized/74b60d947205758ebb300e9b584c6d5a8e41be777b920890a34973cbe08ef163.jpg",
  avatarAlt = "Advisor headshot",
  spread = "90deg",
  shimmerColor = "rgba(255,255,255,0.6)",
  speed = "4s",
  compact = false,
  showIcon = true,
  className,
  href = "#",
  onClick,
  ...props
}: GlassmorphismCtaProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        if (href === "#") event.preventDefault();
        onClick?.(event);
      }}
      className={cn(
        "group isolate relative inline-flex cursor-pointer overflow-hidden rounded-full shadow-[0_8px_40px_rgba(128,89,72,0.24)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(193,154,136,0.28)]",
        className,
      )}
      style={
        {
          "--spread": spread,
          "--shimmer-color": shimmerColor,
          "--radius": "9999px",
          "--speed": speed,
          "--cut": "1px",
          "--bg": "rgba(128, 89, 72, 0.08)",
        } as CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-[-200%] h-[400%] w-[400%] [animation:rotate-gradient_var(--speed)_linear_infinite]">
          <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      <div className="absolute rounded-full [background:var(--bg)] [inset:var(--cut)] backdrop-blur" />
      <div
        className={cn(
          "relative z-10 flex w-full items-center overflow-hidden font-medium text-white sm:w-auto",
          compact ? "gap-2 px-3 py-2 text-sm" : "gap-3 px-4 py-3 text-base",
        )}
        style={{ borderRadius: "9999px" }}
      >
        <div
          className="absolute"
          style={{
            width: "200%",
            height: "200%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), rgba(255,255,255,0.2), rgba(255,255,255,0.2), rgba(255,255,255,0.2), transparent)",
            animation: "borderBeamRotation 4s infinite linear",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute"
          style={{
            inset: "1px",
            background: "rgba(17, 14, 13, 0.88)",
            borderRadius: "9999px",
            backdropFilter: "blur(8px)",
          }}
        />
        {/* The source is intentionally configurable for remote or local avatars. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt={avatarAlt}
          className={cn(
            "relative z-10 rounded-full object-cover ring-2 ring-white/10",
            compact ? "h-7 w-7" : "h-8 w-8",
          )}
        />
        <span className="relative z-10 whitespace-nowrap font-sans">{label}</span>
        {showIcon && (
          <span className="relative z-10 ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
            <WandSparkles className="h-4 w-6 text-white" strokeWidth={1.5} />
          </span>
        )}
      </div>
    </a>
  );
}
