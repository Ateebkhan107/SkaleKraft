import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Engineering Strategy",
  description:
    "Technical articles, engineering blueprints, and product design insights from the SkaleKraft team.",
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
