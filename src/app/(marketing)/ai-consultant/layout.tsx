import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Systems",
  description: "Explore practical AI systems, agents, automation, and integrations with SkaleKraft.",
  alternates: {
    canonical: "/ai-consultant",
  },
};

export default function AiConsultantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
