import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Explore SkaleKraft's selected websites, apps, AI systems, and creative launches.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
