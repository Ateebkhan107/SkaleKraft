import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skalekraft.com"),
  title: "SkaleKraft",
  description: "Websites, apps, AI, and branding. We build cool stuff.",
  openGraph: {
    title: "SkaleKraft",
    description: "Websites, apps, AI, and branding. We build cool stuff.",
    url: "https://skalekraft.com",
    siteName: "SkaleKraft",
    images: [
      {
        url: "/images/og-image.jpg", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
