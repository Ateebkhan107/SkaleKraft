import {
  BrainCircuit,
  BriefcaseBusiness,
  Clapperboard,
  Home,
  Mail,
  MonitorSmartphone,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Stage = "selection" | "home";
export type ServiceKey = "websites" | "apps" | "ai" | "creative";
export type DestinationKey = ServiceKey | "everything";

export const ease = [0.16, 1, 0.3, 1] as const;

export const accent = {
  websites: { name: "Blue", rgb: "59,130,246", hex: "#3B82F6" },
  apps: { name: "Purple", rgb: "168,85,247", hex: "#A855F7" },
  ai: { name: "Cyan", rgb: "34,211,238", hex: "#22D3EE" },
  creative: { name: "Orange", rgb: "249,115,22", hex: "#F97316" },
};

export const services: Record<ServiceKey, {
  key: ServiceKey;
  title: string;
  label: string;
  selectionTitle: string;
  subtitle: string;
  short: string;
  icon: LucideIcon;
  capabilities: string[];
  why: string[];
  idealFor: string[];
  technology: string[];
  process: string[];
  timeline: string;
  pricing: string;
  faq: Array<{ q: string; a: string }>;
}> = {
  websites: {
    key: "websites",
    title: "Web Development",
    label: "Websites",
    selectionTitle: "Websites",
    subtitle: "Business websites, SaaS, landing pages and portals.",
    short: "Build websites that convert visitors into customers.",
    icon: MonitorSmartphone,
    capabilities: ["Business Websites", "Landing Pages", "E-Commerce", "SaaS Platforms", "Dashboards", "Portals", "Booking Systems", "CMS"],
    why: ["Fast", "Responsive", "SEO Ready", "Secure", "Scalable"],
    idealFor: ["Service businesses", "SaaS teams", "Founders", "E-commerce brands"],
    technology: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    process: ["Discovery", "Architecture", "Interface Design", "Development", "Testing", "Launch"],
    timeline: "2-8 weeks",
    pricing: "Project pricing starts from $1,500.",
    faq: [
      { q: "Can you build both marketing pages and app dashboards?", a: "Yes. We can build public websites, private dashboards, portals and custom web applications." },
      { q: "Will it work well on mobile?", a: "Yes. Responsive behavior is planned from the start, not patched in later." },
    ],
  },
  apps: {
    key: "apps",
    title: "Mobile Apps",
    label: "Apps",
    selectionTitle: "Apps",
    subtitle: "Android, iOS and cross platform apps.",
    short: "Native and cross-platform apps built for growth.",
    icon: Smartphone,
    capabilities: ["Android", "iOS", "Cross Platform", "React Native", "Flutter", "Backend APIs", "Deployment"],
    why: ["Clean flows", "Stable releases", "API ready", "Scalable backend", "Launch support"],
    idealFor: ["Consumer products", "Business tools", "SaaS apps", "Internal mobile workflows"],
    technology: ["React Native", "Flutter", "Node.js", "Supabase", "PostgreSQL"],
    process: ["Scope", "Product Flow", "Prototype", "Build", "QA", "Store Prep"],
    timeline: "4-12 weeks",
    pricing: "Project pricing starts from $3,000.",
    faq: [
      { q: "Can one app work for both Android and iOS?", a: "Yes. Cross-platform builds are often the right choice when speed and budget matter." },
      { q: "Do you handle backend APIs too?", a: "Yes. We can build the mobile app and the backend it depends on." },
    ],
  },
  ai: {
    key: "ai",
    title: "AI Systems",
    label: "AI",
    selectionTitle: "AI",
    subtitle: "AI agents, chatbots, automation and ML.",
    short: "Automate work using AI agents and intelligent software.",
    icon: BrainCircuit,
    capabilities: ["AI Agents", "Chatbots", "Voice AI", "Computer Vision", "RAG", "Machine Learning", "Automation", "Custom AI"],
    why: ["Useful workflows", "Human review", "Data aware", "Secure patterns", "Measurable output"],
    idealFor: ["Support teams", "Sales teams", "Ops teams", "Knowledge-heavy businesses"],
    technology: ["OpenAI", "Claude", "Gemini", "LangChain", "Python", "FastAPI"],
    process: ["Use Case", "Data Review", "Prototype", "Integration", "Testing", "Monitoring"],
    timeline: "2-10 weeks",
    pricing: "Project pricing starts from $2,000.",
    faq: [
      { q: "Can AI connect with our existing tools?", a: "Yes. Integrations are usually the most useful part of an AI system." },
      { q: "Do you build RAG systems?", a: "Yes. We can build retrieval systems for documents, knowledge bases and internal content." },
    ],
  },
  creative: {
    key: "creative",
    title: "Creative Studio",
    label: "Creative",
    selectionTitle: "Creative",
    subtitle: "Video editing, motion graphics and content.",
    short: "Professional editing and motion graphics.",
    icon: Clapperboard,
    capabilities: ["YouTube", "Instagram", "Ads", "Motion Graphics", "Color Grading", "Short-form Content"],
    why: ["Sharp pacing", "Clean story", "Platform ready", "Visual polish", "Fast iteration"],
    idealFor: ["Creators", "Product launches", "Brands", "Social campaigns"],
    technology: ["Premiere Pro", "After Effects", "Figma", "Photoshop"],
    process: ["Brief", "Asset Review", "Edit", "Motion", "Polish", "Export"],
    timeline: "2 days to 3 weeks",
    pricing: "Project pricing starts from $300.",
    faq: [
      { q: "Do you edit short-form content?", a: "Yes. Reels, Shorts and ad creatives are part of the studio offer." },
      { q: "Can you create thumbnails too?", a: "Yes. Thumbnail design can be included with editing work." },
    ],
  },
};

export const destinations: Array<{ key: DestinationKey; label: string; subtitle: string; icon: LucideIcon; target: string }> = [
  { key: "websites", label: "Websites", subtitle: services.websites.subtitle, icon: MonitorSmartphone, target: "websites" },
  { key: "apps", label: "Apps", subtitle: services.apps.subtitle, icon: Smartphone, target: "apps" },
  { key: "ai", label: "AI", subtitle: services.ai.subtitle, icon: BrainCircuit, target: "ai" },
  { key: "creative", label: "Creative", subtitle: services.creative.subtitle, icon: Clapperboard, target: "creative" },
  { key: "everything", label: "Explore Everything", subtitle: "Show me everything SkaleKraft offers.", icon: Sparkles, target: "home" },
];

export const sidebarLinks: Array<{ id: string; label: string; icon: LucideIcon; color?: ServiceKey }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "websites", label: "Websites", icon: MonitorSmartphone, color: "websites" },
  { id: "apps", label: "Apps", icon: Smartphone, color: "apps" },
  { id: "ai", label: "AI", icon: BrainCircuit, color: "ai" },
  { id: "creative", label: "Creative", icon: Clapperboard, color: "creative" },
  { id: "work", label: "Our Work", icon: BriefcaseBusiness },
  { id: "contact", label: "Contact", icon: Mail },
];

export const heroNotices = ["Deployment Successful", "Payment Received", "AI Agent Running", "Database Synced"];
export const heroCodeLines = ["> npm run deploy", "Build Complete", "Uploading...", "Live"];
