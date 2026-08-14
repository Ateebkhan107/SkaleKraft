import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackHomeLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-5 text-sm font-medium text-white/65 transition duration-300 hover:border-[#805948]/60 hover:bg-[#805948]/15 hover:text-white ${className}`}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
      Back to home
    </Link>
  );
}
