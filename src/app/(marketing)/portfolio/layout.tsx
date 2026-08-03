import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "SkaleKraft keeps private work private and does not publish invented case studies.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
