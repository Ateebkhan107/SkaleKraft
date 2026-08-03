import Link from "next/link";

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
          <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-white">
            SKALE<span className="text-[#805948]">KRAFT</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
            We build cool stuff. Websites, apps, AI, and brands with a clean hand.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/55">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[1500px] text-xs text-white/35">
        © {new Date().getFullYear()} SkaleKraft. All rights reserved.
      </div>
    </footer>
  );
}
