import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skalekraft.com"),
  title: "SkaleKraft | Software Engineering & AI Studio",
  description: "SkaleKraft designs and engineers modern websites, mobile apps, AI solutions and business systems from idea to production.",
  openGraph: {
    title: "SkaleKraft | Software Engineering & AI Studio",
    description: "SkaleKraft designs and engineers modern websites, mobile apps, AI solutions and business systems from idea to production.",
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
