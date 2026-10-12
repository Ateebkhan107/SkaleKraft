import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import PremiumCursor from "@/components/layout/PremiumCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skalekraft.in"),
  title: {
    default: "SkaleKraft — Software Studio | Web, Mobile Apps & AI Systems",
    template: "%s | SkaleKraft",
  },
  description:
    "SkaleKraft is an independent product studio engineering modern websites, mobile applications, AI agents, and scalable digital systems for ambitious brands.",
  applicationName: "SkaleKraft",
  authors: [{ name: "Syed Ateeb Fatmi" }, { name: "Ateeb Mazhar" }],
  creator: "SkaleKraft",
  publisher: "SkaleKraft",
  keywords: [
    "SkaleKraft",
    "Skale Kraft",
    "skalekraft.in",
    "website development",
    "web development agency",
    "custom website development",
    "app development",
    "mobile app development",
    "iOS and Android app development",
    "video editing",
    "video editing agency",
    "short-form video editing",
    "social media agency",
    "digital marketing",
    "digital marketing agency",
    "social media marketing",
    "AI agents",
    "AI automation",
    "software product studio",
    "Next.js agency",
    "React Native developers",
    "Syed Ateeb Fatmi",
    "Ateeb Mazhar",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "SkaleKraft — Software Studio | Web, Mobile Apps & AI Systems",
    description:
      "SkaleKraft is an independent product studio engineering modern websites, mobile applications, AI agents, and scalable digital systems for ambitious brands.",
    url: "https://skalekraft.in",
    siteName: "SkaleKraft",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SkaleKraft — Modern Software & AI Product Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkaleKraft — Software Studio | Web, Mobile Apps & AI Systems",
    description:
      "SkaleKraft is an independent product studio engineering modern websites, mobile applications, AI agents, and scalable digital systems for ambitious brands.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#090909",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://skalekraft.in/#organization",
      name: "SkaleKraft",
      alternateName: ["Skale Kraft", "SkaleKraft Studio", "SkaleKraft Technologies", "skalekraft.in"],
      url: "https://skalekraft.in",
      logo: {
        "@type": "ImageObject",
        url: "https://skalekraft.in/images/skalekraft-logo.png",
        caption: "SkaleKraft Logo",
      },
      image: "https://skalekraft.in/opengraph-image",
      description:
        "SkaleKraft is an independent software and AI product studio engineering websites, mobile applications, AI agents, and scalable digital systems.",
      email: "hello@skalekraft.in",
      sameAs: [
        "https://www.instagram.com/skalekraft.in/",
      ],
      founder: [
        {
          "@type": "Person",
          name: "Syed Ateeb Fatmi",
          jobTitle: "Co-Founder",
        },
        {
          "@type": "Person",
          name: "Ateeb Mazhar",
          jobTitle: "Co-Founder",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@skalekraft.in",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://skalekraft.in/#website",
      url: "https://skalekraft.in",
      name: "SkaleKraft",
      alternateName: ["Skale Kraft", "SkaleKraft Studio"],
      publisher: {
        "@id": "https://skalekraft.in/#organization",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://skalekraft.in/#service",
      name: "SkaleKraft",
      url: "https://skalekraft.in",
      parentOrganization: {
        "@id": "https://skalekraft.in/#organization",
      },
      priceRange: "$$$",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engineering & Creative Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Development",
              description: "Business websites, SaaS platforms, portals and landing pages built with Next.js and React.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App Development",
              description: "Cross-platform and native mobile applications for iOS and Android built with React Native.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Systems & Agents",
              description: "Autonomous AI agents, customer chatbots, workflows, and custom LLM integrations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Video Editing & Creative Studio",
              description: "Short-form video editing for Reels & Shorts, YouTube editing, motion graphics, and high-impact digital launch content.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Marketing & Social Media Agency",
              description: "Strategic social media management, search engine optimization (SEO), Google and Meta ad campaigns, and content growth.",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <PremiumCursor />
        {children}
      </body>
    </html>
  );
}
