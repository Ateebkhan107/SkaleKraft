import {
  BrainCircuit,
  Clapperboard,
  Cpu,
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

export const accent: Record<string, { name: string; rgb: string; hex: string }> = {
  websites: { name: "Blue", rgb: "59,130,246", hex: "#3B82F6" },
  apps: { name: "Purple", rgb: "168,85,247", hex: "#A855F7" },
  ai: { name: "Cyan", rgb: "34,211,238", hex: "#22D3EE" },
  creative: { name: "Orange", rgb: "249,115,22", hex: "#F97316" },
  everything: { name: "Copper", rgb: "193,154,136", hex: "#c19a88" },
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
    title: "Website Development & Web Apps",
    label: "Websites",
    selectionTitle: "Websites",
    subtitle: "Strategy, design, and engineering for websites, e-commerce, SaaS products, portals, and custom web platforms.",
    short: "We create fast, responsive web experiences that explain your value clearly and guide people toward action. Every build combines thoughtful UX, distinctive visual design, scalable engineering, SEO foundations, analytics, and a content system your team can confidently manage.",
    icon: MonitorSmartphone,
    capabilities: ["Business Websites", "Landing Pages", "E-Commerce", "SaaS Platforms", "Dashboards", "Portals", "Booking Systems", "CMS & Integrations"],
    why: ["Fast", "Responsive", "SEO Ready", "Secure", "Scalable"],
    idealFor: ["Service businesses", "SaaS teams", "Founders", "E-commerce brands"],
    technology: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    process: ["Discovery", "Architecture", "Interface Design", "Development", "Testing", "Launch"],
    timeline: "2-8 weeks",
    pricing: "Project pricing starts from $1,500.",
    faq: [
      { q: "Can you build both marketing pages and app dashboards?", a: "Yes. We build public websites, e-commerce experiences, private dashboards, portals, and custom web applications as one connected product or as focused standalone projects." },
      { q: "Will it work well on mobile?", a: "Yes. Responsive behavior, accessibility, performance, and touch-friendly interaction are planned from the start rather than patched in later." },
      { q: "Can our team update the site after launch?", a: "Yes. When content changes regularly, we can include a practical CMS and provide a clear handover so your team can publish safely." },
    ],
  },
  apps: {
    key: "apps",
    title: "Mobile App Development",
    label: "Apps",
    selectionTitle: "Apps",
    subtitle: "End-to-end product design and development for dependable iOS, Android, and cross-platform mobile apps.",
    short: "We take mobile products from early concept to store-ready release. That includes product flows, interface design, app engineering, secure backend services, payments, notifications, offline behaviour, QA, and hands-on support through App Store and Play Store submission.",
    icon: Smartphone,
    capabilities: ["Android", "iOS", "Cross Platform", "React Native", "Flutter", "Backend APIs", "Deployment"],
    why: ["Clean flows", "Stable releases", "API ready", "Scalable backend", "Launch support"],
    idealFor: ["Consumer products", "Business tools", "SaaS apps", "Internal mobile workflows"],
    technology: ["React Native", "Flutter", "Node.js", "Supabase", "PostgreSQL"],
    process: ["Scope", "Product Flow", "Prototype", "Build", "QA", "Store Prep"],
    timeline: "4-12 weeks",
    pricing: "Project pricing starts from $3,000.",
    faq: [
      { q: "Can one app work for both Android and iOS?", a: "Yes. A well-planned cross-platform build can provide a native-feeling experience on both platforms while keeping development and ongoing maintenance efficient." },
      { q: "Do you handle backend APIs too?", a: "Yes. We can design the mobile experience and build the APIs, database, authentication, admin tools, and cloud infrastructure it depends on." },
      { q: "Will you help with launch?", a: "Yes. We prepare release builds, store assets and technical requirements, support review submissions, and stay available for post-launch fixes and iteration." },
    ],
  },
  ai: {
    key: "ai",
    title: "AI Systems",
    label: "AI",
    selectionTitle: "AI",
    subtitle: "Useful AI agents, assistants, document intelligence, and automated workflows connected to your real business systems.",
    short: "We identify where AI can create a measurable advantage, then build the complete workflow around it. Solutions can search private knowledge, qualify leads, support customers, process documents, trigger actions across your tools, and escalate to a person when judgment is required.",
    icon: BrainCircuit,
    capabilities: ["AI Agents", "Chatbots", "Voice AI", "Computer Vision", "RAG", "Machine Learning", "Automation", "Custom AI"],
    why: ["Useful workflows", "Human review", "Data aware", "Secure patterns", "Measurable output"],
    idealFor: ["Support teams", "Sales teams", "Ops teams", "Knowledge-heavy businesses"],
    technology: ["OpenAI", "Claude", "Gemini", "LangChain", "Python", "FastAPI"],
    process: ["Use Case", "Data Review", "Prototype", "Integration", "Testing", "Monitoring"],
    timeline: "2-10 weeks",
    pricing: "Project pricing starts from $2,000.",
    faq: [
      { q: "Can AI connect with our existing tools?", a: "Yes. We connect AI workflows to CRMs, databases, email, WhatsApp, help desks, internal tools, and custom APIs so the system can do useful work—not only generate text." },
      { q: "Do you build RAG systems?", a: "Yes. We build retrieval systems grounded in approved documents, knowledge bases, and internal content, with source references and permission-aware access where needed." },
      { q: "How do you keep AI reliable?", a: "We use scoped tasks, structured outputs, evaluations, human approval steps, fallbacks, logging, and monitoring based on the risk level of each workflow." },
    ],
  },
  creative: {
    key: "creative",
    title: "Video Editing & Creative Studio",
    label: "Creative",
    selectionTitle: "Creative",
    subtitle: "Editorial, motion, and visual design for social content, campaigns, product stories, and brand communication.",
    short: "We turn raw footage and rough ideas into clear, high-retention stories. Our studio handles short- and long-form editing, performance ads, motion graphics, titles, thumbnails, colour, sound, and platform-specific delivery while keeping every asset consistent with your brand.",
    icon: Clapperboard,
    capabilities: ["YouTube", "Instagram", "Ads", "Motion Graphics", "Color Grading", "Short-form Content"],
    why: ["Sharp pacing", "Clean story", "Platform ready", "Visual polish", "Fast iteration"],
    idealFor: ["Creators", "Product launches", "Brands", "Social campaigns"],
    technology: ["Premiere Pro", "After Effects", "Figma", "Photoshop"],
    process: ["Brief", "Asset Review", "Edit", "Motion", "Polish", "Export"],
    timeline: "2 days to 3 weeks",
    pricing: "Project pricing starts from $300.",
    faq: [
      { q: "Do you edit short-form content?", a: "Yes. We create Reels, Shorts, social cut-downs, and ad creatives with pacing, captions, hooks, and delivery formats tailored to each platform." },
      { q: "Can you create thumbnails too?", a: "Yes. Thumbnail design, title cards, campaign graphics, and reusable visual templates can be included to keep the full content system consistent." },
      { q: "Can you work from an existing brand system?", a: "Yes. We can follow established guidelines precisely or help define a flexible motion and content language when one does not yet exist." },
    ],
  },
};

export const destinations: Array<{
  key: DestinationKey;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  target: string;
  tagline: string;
  badges: string[];
  number: string;
}> = [
  {
    key: "websites",
    label: "Websites",
    subtitle: services.websites.subtitle,
    icon: MonitorSmartphone,
    target: "websites",
    tagline: "Web Architecture",
    badges: ["Next.js", "SaaS", "Fullstack"],
    number: "01",
  },
  {
    key: "apps",
    label: "Apps",
    subtitle: services.apps.subtitle,
    icon: Smartphone,
    target: "apps",
    tagline: "Mobile Systems",
    badges: ["iOS", "Android", "React Native"],
    number: "02",
  },
  {
    key: "ai",
    label: "AI",
    subtitle: services.ai.subtitle,
    icon: BrainCircuit,
    target: "ai",
    tagline: "Autonomous AI",
    badges: ["AI Agents", "LLMs", "RAG"],
    number: "03",
  },
  {
    key: "creative",
    label: "Creative",
    subtitle: services.creative.subtitle,
    icon: Clapperboard,
    target: "creative",
    tagline: "Motion & Video",
    badges: ["4K Motion", "Shorts", "Color"],
    number: "04",
  },
  {
    key: "everything",
    label: "Explore Everything",
    subtitle: "Experience all services, systems and studio showcases.",
    icon: Sparkles,
    target: "home",
    tagline: "Studio Tour",
    badges: ["All Services", "Live Showcase"],
    number: "05",
  },
];

export const sidebarLinks: Array<{ id: string; label: string; icon: LucideIcon; color?: ServiceKey }> = [
  { id: "home", label: "Home", icon: Home },
  { id: "websites", label: "Website", icon: MonitorSmartphone, color: "websites" },
  { id: "apps", label: "App", icon: Smartphone, color: "apps" },
  { id: "ai", label: "AI", icon: BrainCircuit, color: "ai" },
  { id: "creative", label: "Creative", icon: Clapperboard, color: "creative" },
  { id: "tech-stack", label: "Tech Stack", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];

export const heroNotices = ["Deployment Successful", "Payment Received", "AI Agent Running", "Database Synced"];
export const heroCodeLines = ["> npm run deploy", "Build Complete", "Uploading...", "Live"];
