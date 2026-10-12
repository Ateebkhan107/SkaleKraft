import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development, App Development, AI & Video Editing Services",
  description:
    "SkaleKraft is a full-service software studio specializing in custom website development, iOS & Android mobile app development, short-form video editing, digital marketing, social media growth, and AI automation agents.",
  keywords: [
    "website development",
    "web development agency",
    "custom website development",
    "Next.js web development",
    "app development",
    "mobile app development",
    "iOS app development",
    "Android app development",
    "React Native development",
    "video editing",
    "video editing agency",
    "short-form video editing",
    "social media agency",
    "social media marketing",
    "digital marketing agency",
    "AI agents",
    "AI automation",
    "SkaleKraft services",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Website Development, App Development, AI & Video Editing | SkaleKraft",
    description:
      "Full-stack website development, custom mobile apps, video editing, social media marketing, and AI agent systems engineered to help businesses grow.",
    url: "https://skalekraft.in/services",
    siteName: "SkaleKraft",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SkaleKraft Engineering & Creative Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development, App Development, AI & Video Editing | SkaleKraft",
    description:
      "Full-stack website development, custom mobile apps, video editing, social media marketing, and AI agent systems engineered to help businesses grow.",
    images: ["/opengraph-image"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
