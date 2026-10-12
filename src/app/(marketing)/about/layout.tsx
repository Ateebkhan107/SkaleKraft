import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about SkaleKraft — an engineering and creative product studio building websites, apps, and intelligent systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | SkaleKraft",
    description: "Learn about SkaleKraft — an engineering and creative product studio building websites, apps, and intelligent systems.",
    url: "https://skalekraft.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
