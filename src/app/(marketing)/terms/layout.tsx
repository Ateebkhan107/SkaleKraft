import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Basic terms for working with SkaleKraft.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
