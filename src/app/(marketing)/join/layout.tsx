import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join",
  description: "Send SkaleKraft your CV, skills, and portfolio links.",
  alternates: {
    canonical: "/join",
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
