"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

/**
 * Pure CSS/HTML splash — shown immediately, no JS needed.
 * Auto-dismisses after 2s via CSS animation so the user is
 * never stuck regardless of chunk load time.
 */
function StaticSplash() {
  return (
    <div className="skalekraft-static-splash fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#0B0B0B]">
      {/* Ambient glow */}
      <div className="skalekraft-splash-glow pointer-events-none absolute rounded-full bg-[#805948]/14 blur-[120px]"
        style={{ width: "min(80vw, 600px)", height: "min(80vw, 600px)" }}
      />
      {/* Logo */}
      <div className="skalekraft-splash-logo relative h-[min(42vw,300px)] w-[min(42vw,300px)]">
        <Image
          src="/images/skalekraft-logo.png"
          alt="SkaleKraft"
          fill
          sizes="(max-width: 768px) 42vw, 300px"
          className="object-contain"
          priority
        />
      </div>
      {/* Brand name */}
      <p className="skalekraft-splash-text mt-7 text-sm font-medium tracking-[0.32em] text-white/55 uppercase">
        SKALE<span className="text-[#c19a88]">KRAFT</span>
      </p>
      {/* Loading dots */}
      <div className="skalekraft-splash-dots mt-8 flex items-center gap-1.5">
        <span className="skalekraft-dot skalekraft-dot-1 h-1 w-1 rounded-full bg-[#805948]/70" />
        <span className="skalekraft-dot skalekraft-dot-2 h-1 w-1 rounded-full bg-[#805948]/70" />
        <span className="skalekraft-dot skalekraft-dot-3 h-1 w-1 rounded-full bg-[#805948]/70" />
      </div>
    </div>
  );
}

/**
 * StreamingExperience loaded with ssr:false — only mounts on the client.
 * Rendered WITHOUT a loading prop so it renders null (invisible) while
 * the chunk loads. The StaticSplash overlay covers it during that time.
 * No loading prop = no blocking — both are rendered simultaneously.
 */
const StreamingExperience = dynamic(
  () => import("./StreamingExperience"),
  { ssr: false }
);

export default function HomeClient() {
  return (
    <>
      {/* Splash overlay — auto-dismisses via CSS, no JS needed */}
      <StaticSplash />
      {/* Main app — mounts client-side only, always interactive on first render */}
      <StreamingExperience />
    </>
  );
}
