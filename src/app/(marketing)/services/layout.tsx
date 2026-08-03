import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the websites, apps, AI systems, backend tools, and creative work SkaleKraft builds.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
