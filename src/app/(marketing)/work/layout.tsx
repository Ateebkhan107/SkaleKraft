import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Case Studies | Websites, Mobile Apps & AI Platforms",
  description:
    "Explore SkaleKraft's production portfolio of custom websites, EdTech platforms, mobile applications, healthcare AI models, and video creative launches.",
  keywords: [
    "SkaleKraft portfolio",
    "website development portfolio",
    "mobile app case studies",
    "AI platform showcase",
    "web development projects",
    "Next.js case studies",
    "React Native apps",
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work & Case Studies | SkaleKraft Software Studio",
    description:
      "Explore SkaleKraft's production portfolio of custom websites, EdTech platforms, mobile applications, healthcare AI models, and video creative launches.",
    url: "https://skalekraft.in/work",
    siteName: "SkaleKraft",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SkaleKraft Portfolio & Case Studies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work & Case Studies | SkaleKraft Software Studio",
    description:
      "Explore SkaleKraft's production portfolio of custom websites, EdTech platforms, mobile applications, healthcare AI models, and video creative launches.",
    images: ["/opengraph-image"],
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
