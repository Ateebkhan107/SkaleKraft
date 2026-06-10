import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkaleKraft | Enterprise AI & Software Agency",
  description: "We build world-class products, AI agents, and growth systems that help businesses scale faster.",
  openGraph: {
    title: "SkaleKraft | Enterprise AI & Software Agency",
    description: "We build world-class products, AI agents, and growth systems that help businesses scale faster.",
    url: "https://skalekraft.com",
    siteName: "SkaleKraft",
    images: [
      {
        url: "/images/og-image.jpg", // We will create this
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
