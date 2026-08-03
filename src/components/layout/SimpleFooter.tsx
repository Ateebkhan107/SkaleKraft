import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";

const links = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Join the Agency", href: "/join" },
  { label: "Contact", href: "/contact" },
];

export default function SimpleFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0B0B] px-5 py-10 text-white md:px-10">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold tracking-[0.24em] text-white">
            <Image
              src="/images/skalekraft-logo.png"
              alt=""
              width={42}
              height={42}
              className="h-10 w-10 rounded-xl object-cover shadow-[0_0_20px_rgba(128,89,72,0.16)]"
            />
            <span>SKALE<span className="text-[#805948]">KRAFT</span></span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
            We build cool stuff. Websites, apps, AI, and edits with a clean hand.
          </p>
        </div>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <div className="flex items-center gap-3">
            <a
              href="mailto:skalekraft@gmail.com"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition duration-300 hover:border-[#805948]/60 hover:bg-[#805948]/15 hover:text-white"
              aria-label="Email SkaleKraft"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/skalekraft"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition duration-300 hover:border-[#805948]/60 hover:bg-[#805948]/15 hover:text-white"
              aria-label="Open SkaleKraft on Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/55">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[1500px] text-xs text-white/35">
        © {new Date().getFullYear()} SkaleKraft. All rights reserved.
      </div>
    </footer>
  );
}
