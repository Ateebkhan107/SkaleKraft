"use client";

import { Mail } from "lucide-react";
import Link from "next/link";

export default function ContactTrigger() {
  return (
    <Link
      href="/contact"
      className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/65 transition duration-300 hover:border-[#805948] hover:bg-[#805948]/15 hover:text-white"
    >
      <Mail className="h-4 w-4" />
      Start
    </Link>
  );
}
