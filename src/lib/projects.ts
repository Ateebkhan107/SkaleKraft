export type ProjectCategory = "Websites" | "Apps" | "AI" | "Branding";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  short: string;
  story: string;
  image: string;
  gallery: string[];
  demoUrl: string;
  shelves: string[];
};

export const categories: Array<{
  label: ProjectCategory;
  icon: string;
  line: string;
}> = [
  { label: "Websites", icon: "🌐", line: "Sharp sites with room to breathe." },
  { label: "Apps", icon: "📱", line: "Tools people actually enjoy using." },
  { label: "AI", icon: "🤖", line: "Helpful systems, no weird theater." },
  { label: "Branding", icon: "🎨", line: "Identity work with a steady hand." },
];

export const projects: Project[] = [
  {
    slug: "northline",
    title: "Northline Studio",
    category: "Websites",
    short: "A calm booking site for a modern interiors team.",
    story:
      "Northline needed a place that felt edited, warm, and easy to move through. We kept the pages quiet, gave the work big breathing room, and made the enquiry path feel like a natural next step.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
    ],
    demoUrl: "https://example.com",
    shelves: ["Popular", "Recently Built", "Business Websites"],
  },
  {
    slug: "ledgerly",
    title: "Ledgerly",
    category: "Apps",
    short: "A finance dashboard for founders who hate clutter.",
    story:
      "Ledgerly turns messy numbers into a clean daily cockpit. The key was restraint: fewer panels, stronger hierarchy, and little touches that make repeated use feel lighter.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1400&auto=format&fit=crop",
    ],
    demoUrl: "https://example.com",
    shelves: ["Popular", "Recently Built", "Mobile Apps"],
  },
  {
    slug: "briefbot",
    title: "Briefbot",
    category: "AI",
    short: "An AI workspace that turns loose ideas into usable briefs.",
    story:
      "Briefbot was built for teams with too many half-formed ideas. It asks better questions, shapes the rough notes, and gives people a clean brief they can act on.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1664575198308-3959904fa430?q=80&w=1400&auto=format&fit=crop",
    ],
    demoUrl: "https://example.com",
    shelves: ["Popular", "AI Projects"],
  },
  {
    slug: "sable-market",
    title: "Sable Market",
    category: "Branding",
    short: "A food brand with a darker, more tactile feel.",
    story:
      "Sable Market wanted to look refined without becoming stiff. We built a brand system around rich contrast, simple packaging rules, and a voice that sounds like a person.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=1400&auto=format&fit=crop",
    ],
    demoUrl: "https://example.com",
    shelves: ["Recently Built", "Coming Soon"],
  },
  {
    slug: "clinicflow",
    title: "ClinicFlow",
    category: "Websites",
    short: "A fast patient intake site for a growing clinic.",
    story:
      "ClinicFlow keeps the front desk from becoming the bottleneck. The site answers common questions, captures the right details, and gets people booked without friction.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1400&auto=format&fit=crop",
    ],
    demoUrl: "https://example.com",
    shelves: ["Business Websites"],
  },
  {
    slug: "pocketchef",
    title: "PocketChef",
    category: "Apps",
    short: "A tiny meal-planning app with a friendly rhythm.",
    story:
      "PocketChef is for people who want dinner decided before 6pm. We designed quick picks, tidy grocery lists, and a mood that feels useful without getting loud.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1400&auto=format&fit=crop",
    ],
    demoUrl: "https://example.com",
    shelves: ["Mobile Apps", "Coming Soon"],
  },
];

export const shelves = [
  "Popular",
  "Recently Built",
  "AI Projects",
  "Business Websites",
  "Mobile Apps",
  "Coming Soon",
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
