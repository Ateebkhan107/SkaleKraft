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

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "@id": "https://skalekraft.in/services/#services-list",
      name: "SkaleKraft Digital & Engineering Services",
      itemListElement: [
        {
          "@type": "Service",
          position: 1,
          name: "Website Development",
          serviceType: "Web Development",
          description:
            "Custom websites, high-converting landing pages, e-commerce stores, and SaaS web apps built using Next.js, React, and Tailwind CSS.",
          provider: {
            "@type": "Organization",
            name: "SkaleKraft",
            url: "https://skalekraft.in",
          },
          areaServed: "Worldwide",
        },
        {
          "@type": "Service",
          position: 2,
          name: "Mobile App Development",
          serviceType: "Mobile Application Development",
          description:
            "Native and cross-platform mobile apps for iOS and Android built with React Native and Expo, with scalable cloud backends.",
          provider: {
            "@type": "Organization",
            name: "SkaleKraft",
            url: "https://skalekraft.in",
          },
          areaServed: "Worldwide",
        },
        {
          "@type": "Service",
          position: 3,
          name: "AI Agents & Workflow Automation",
          serviceType: "Artificial Intelligence & Automation",
          description:
            "Autonomous AI chatbots, customer support agents, document intelligence, RAG systems, and internal workflow automations.",
          provider: {
            "@type": "Organization",
            name: "SkaleKraft",
            url: "https://skalekraft.in",
          },
          areaServed: "Worldwide",
        },
        {
          "@type": "Service",
          position: 4,
          name: "Video Editing & Creative Studio",
          serviceType: "Video Editing & Motion Graphics",
          description:
            "Professional short-form video editing for Reels, TikTok and Shorts, YouTube video editing, product launch visuals, and motion graphics.",
          provider: {
            "@type": "Organization",
            name: "SkaleKraft",
            url: "https://skalekraft.in",
          },
          areaServed: "Worldwide",
        },
        {
          "@type": "Service",
          position: 5,
          name: "Digital Marketing & Social Media Agency",
          serviceType: "Digital Marketing & Social Media Management",
          description:
            "Strategic social media growth campaigns, brand presence, search engine optimization (SEO), and targeted paid ad campaigns.",
          provider: {
            "@type": "Organization",
            name: "SkaleKraft",
            url: "https://skalekraft.in",
          },
          areaServed: "Worldwide",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://skalekraft.in/services/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What website development services does SkaleKraft offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SkaleKraft builds fast, custom websites, landing pages, SaaS platforms, portals, e-commerce stores, and dashboards using modern technologies like Next.js, React, TypeScript, and Supabase.",
          },
        },
        {
          "@type": "Question",
          name: "Can you build mobile apps for both iOS and Android?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We develop cross-platform and native mobile apps using React Native and Expo, allowing you to launch high-performance apps on both Apple App Store and Google Play from a unified codebase.",
          },
        },
        {
          "@type": "Question",
          name: "What does your video editing and creative studio service include?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our video editing services include short-form cuts for Instagram Reels, YouTube Shorts, and TikTok, long-form YouTube editing, high-converting ad creatives, motion graphics, color grading, and thumbnail design.",
          },
        },
        {
          "@type": "Question",
          name: "What digital marketing and social media services do you provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We provide social media strategy and content management, search engine optimization (SEO), performance marketing on Google and Meta Ads, and email marketing funnels.",
          },
        },
        {
          "@type": "Question",
          name: "How can custom AI agents and automation help my business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We build custom AI chatbots, autonomous customer service agents, internal document search (RAG) tools, and automated workflows that eliminate repetitive tasks and streamline operations.",
          },
        },
      ],
    },
  ],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {children}
    </>
  );
}
