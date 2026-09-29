"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";
import { services, accent, ease, ServiceKey } from "./data";

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/58">
      <Check className="h-3 w-3 text-[#c19a88]" />
      {label}
    </span>
  );
}

function InfoGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[18px] border border-white/10 bg-[#0B0B0B] p-4">
      <h3 className="text-xs uppercase tracking-[0.2em] text-white/40">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ServiceModal({ serviceKey, onClose }: { serviceKey: ServiceKey; onClose: () => void }) {
  const service = services[serviceKey];
  const Icon = service.icon;
  const color = accent[service.key];
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 backdrop-blur-xl md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} details`}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-auto flex max-h-[82vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#101010] shadow-[0_40px_140px_rgba(0,0,0,.65)]"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.5, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3">
          <Link href="/" className="flex min-h-11 items-center gap-3 text-sm font-semibold tracking-[0.24em] text-white">
            <Image
              src="/images/skalekraft-logo.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-cover shadow-[0_0_18px_rgba(128,89,72,0.16)]"
            />
            <span>SKALE<span className="text-[#805948]">KRAFT</span></span>
          </Link>
          <button ref={closeButtonRef} type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-white/25 hover:text-white" aria-label="Close service details">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto overflow-x-hidden">
          <div className="p-5 md:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-7 w-7" style={{ color: color.hex }} strokeWidth={1.7} />
                </div>
                <h2 className="mt-5 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">{service.title}</h2>
                <p className="mt-4 text-base leading-7 text-white/58">{service.short}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <GlassmorphismCta
                    href="/contact"
                    label={service.key === "websites" ? "Start Your Website" : "Start Project"}
                    avatarSrc="/images/skalekraft-logo.png"
                    avatarAlt="SkaleKraft logo"
                    shimmerColor={color.hex}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <InfoGroup title="Overview">
                  <p className="leading-7 text-white/58">{service.subtitle}</p>
                </InfoGroup>
                <InfoGroup title="Capabilities">
                  <div className="flex flex-wrap gap-2">{service.capabilities.map((item) => <Pill key={item} label={item} />)}</div>
                </InfoGroup>
                <InfoGroup title="Ideal For">
                  <div className="flex flex-wrap gap-2">{service.idealFor.map((item) => <Pill key={item} label={item} />)}</div>
                </InfoGroup>
                <InfoGroup title="Technology Used">
                  <div className="flex flex-wrap gap-2">{service.technology.map((item) => <Pill key={item} label={item} />)}</div>
                </InfoGroup>
                <InfoGroup title="Development Process">
                  <div className="grid gap-2">{service.process.map((item, index) => <p key={item} className="text-sm text-white/58">{String(index + 1).padStart(2, "0")} / {item}</p>)}</div>
                </InfoGroup>
                <InfoGroup title="Typical Timeline">
                  <p className="text-2xl font-medium text-white">{service.timeline}</p>
                </InfoGroup>
                <InfoGroup title="Frequently Asked Questions">
                  <div className="space-y-4">{service.faq.map((item) => <div key={item.q}><p className="font-medium text-white">{item.q}</p><p className="mt-1 text-sm leading-6 text-white/52">{item.a}</p></div>)}</div>
                </InfoGroup>
                <InfoGroup title="Pricing starts from">
                  <p className="text-lg font-medium text-white">{service.pricing}</p>
                </InfoGroup>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
