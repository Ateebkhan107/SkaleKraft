"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Menu,
  X,
  UserPlus,
  Home,
  Briefcase,
  Layers3,
  Info,
  Globe,
  Smartphone,
  Cpu,
  Video,
} from "lucide-react";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Join", href: "/join", icon: UserPlus },
];

const mobileMainLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Work", href: "/work", icon: Layers3 },
  { label: "About", href: "/about", icon: Info },
  { label: "Join the Team", href: "/join", icon: UserPlus },
];

const serviceSectionShortcuts = [
  { label: "Custom Websites", href: "/#websites", icon: Globe, color: "#c19a88" },
  { label: "Mobile Apps (iOS & Android)", href: "/#apps", icon: Smartphone, color: "#60a5fa" },
  { label: "AI Systems & Agents", href: "/#ai", icon: Cpu, color: "#34d399" },
  { label: "Creative & Video Motion", href: "/#creative", icon: Video, color: "#f472b6" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile drawer when route changes without cascading effect renders
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isHome = pathname === "/";

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (isHome) {
      if (href === "/work") {
        const el = document.getElementById("work");
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
  };

  const handleShortcutClick = (e: React.MouseEvent, href: string) => {
    setIsMobileMenuOpen(false);
    if (isHome && href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isItemActive = (href: string) => {
    if (href === "/work") {
      return pathname === "/work" || pathname === "/portfolio";
    }
    return pathname === href;
  };

  return (
    <>
      {/* Top scroll progress indicator */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#805948] via-[#c19a88] to-white pointer-events-none"
        style={{ scaleX }}
      />

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/15 bg-[#0B0B0B]/95 shadow-[0_14px_45px_rgba(0,0,0,0.6)] md:bg-[#0B0B0B]/88 md:backdrop-blur-2xl"
            : "border-b border-white/10 bg-[#0B0B0B]/90 md:bg-[#0B0B0B]/72 md:backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex min-h-20 max-w-[1500px] items-center justify-between gap-4 px-5 py-4 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            aria-label="SkaleKraft Home"
            className="flex items-center gap-3 text-lg font-semibold tracking-[0.24em] text-white shrink-0"
          >
            <Image
              src="/images/skalekraft-logo.png"
              alt="SkaleKraft logo"
              width={42}
              height={42}
              className="h-10 w-10 rounded-xl object-cover shadow-[0_0_22px_rgba(128,89,72,0.18)]"
              priority
            />
            <span>
              SKALE<span className="text-[#c19a88]">KRAFT</span>
            </span>
          </Link>

          {/* Right Action / Navigation Cluster */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3">
            {/* Live studio status indicator (hidden on small/medium screens) */}
            <div className="hidden items-center px-2 text-white/60 lg:inline-flex">
              <span className="text-xs font-normal tracking-wide">
                Engineering software that scales
              </span>
            </div>

            {/* Nav Pill Capsule: Services, Work, About & Join */}
            <nav
              aria-label="Main Navigation"
              className="hidden items-center rounded-full border border-white/10 bg-white/[0.03] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:inline-flex"
            >
              {navItems.map((item, index) => {
                const active = isItemActive(item.href);
                const Icon = item.icon;
                return (
                  <div key={item.href} className="flex items-center">
                    {index > 0 && <span className="h-3.5 w-px bg-white/10" />}
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex h-8 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium tracking-wide transition-all duration-200 ${
                        active
                          ? "bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
                          : "text-white/65 hover:bg-white/[0.07] hover:text-white"
                      }`}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 text-[#c19a88]" />}
                      <span>{item.label}</span>
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Action CTA */}
            <GlassmorphismCta
              href="/contact"
              label="Start Project"
              avatarSrc="/images/skalekraft-logo.png"
              avatarAlt="SkaleKraft logo"
              shimmerColor="rgba(193,154,136,0.85)"
              className="hidden sm:inline-flex"
            />

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/25 hover:text-white md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav-drawer"
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-[#0B0B0B]/95 p-5 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2.5 text-base font-semibold tracking-[0.2em] text-white"
              >
                <Image
                  src="/images/skalekraft-logo.png"
                  alt="SkaleKraft logo"
                  width={34}
                  height={34}
                  className="h-8 w-8 rounded-lg object-cover"
                />
                <span>
                  SKALE<span className="text-[#c19a88]">KRAFT</span>
                </span>
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Primary Navigation Links */}
            <div className="mt-6 flex flex-col gap-2">
              <p className="px-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
                Navigation
              </p>
              {mobileMainLinks.map((link) => {
                const Icon = link.icon;
                const active = isItemActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleNavClick(e, link.href);
                    }}
                    className={`flex h-12 items-center gap-3.5 rounded-xl px-3.5 text-base font-medium transition duration-200 ${
                      active
                        ? "bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                        : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5 text-[#c19a88]" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Service Capabilities Quick Jump */}
            <div className="mt-6 flex flex-col gap-2">
              <p className="px-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/40">
                Capabilities
              </p>
              {serviceSectionShortcuts.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleShortcutClick(e, item.href)}
                    className="flex h-11 items-center gap-3 rounded-xl px-3.5 text-sm text-white/55 transition duration-200 hover:bg-white/[0.04] hover:text-white"
                  >
                    <Icon className="h-4 w-4 shrink-0" style={{ color: item.color }} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="mt-8 flex flex-col gap-3 pb-8 pt-4 border-t border-white/10">
              <GlassmorphismCta
                href="/contact"
                label="Start a Project"
                avatarSrc="/images/skalekraft-logo.png"
                avatarAlt="SkaleKraft logo"
                shimmerColor="rgba(193,154,136,0.85)"
                className="w-full justify-center"
              />
              <p className="text-center text-xs text-white/40 pt-2">
                Engineering modern digital systems for ambitious brands.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
