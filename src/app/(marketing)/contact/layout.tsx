import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell SkaleKraft about your website, app, AI system, or creative project.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
