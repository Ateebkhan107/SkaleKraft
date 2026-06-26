"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  Code,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Founder {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image?: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const founders: Founder[] = [
  {
    name: "Syed Ateeb Fatmi",
    role: "Co-Founder & AI Engineer",
    bio: "Building AI agents, automation systems, SaaS products, and modern web applications. Passionate about AI-driven business solutions and scalable technology that delivers real outcomes.",
    skills: [
      "AI Agents",
      "Python",
      "Machine Learning",
      "Data Science",
      "Software Development",
      "MySQL",
      "OpenAI",
      "Product Strategy",
      "Business Growth",
    ],
    socials: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
  {
    name: "Ateeb Mazhar",
    role: "C0-Founder & Full-Stack Developer",
    bio: "Building scalable web applications, SaaS products, automation systems, and business solutions. Focused on delivering reliable technology and exceptional user experiences.",
    skills: [
      "Software Development",
      "Product Strategy",
      "Business Growth",
      "Automation",
      "Cloud Solutions",
      "System Design",
      "DevOps",
      "Next.js",
      "React",
    ],
    socials: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
];

const stats = [
  { value: "5+", label: "Yrs Combined Exp." },
  { value: "30+", label: "Projects Delivered" },
  { value: "20+", label: "Technologies" },
];

// ─── Avatar Placeholder ───────────────────────────────────────────────────────

function AvatarPlaceholder({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  const bgs = [
    "bg-gradient-to-br from-[#8B6A47] to-[#C49A6C]",
    "bg-gradient-to-br from-[#6B5240] to-[#A07850]",
  ];

  return (
    <div
      className={`w-full h-full rounded-full ${bgs[index]} flex items-center justify-center text-white font-bold text-2xl select-none`}
    >
      {initials}
    </div>
  );
}

// ─── Skill Badge ──────────────────────────────────────────────────────────────

function SkillBadge({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay }}
      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium
                 bg-[#8B6A47]/10 border border-[#8B6A47]/20 text-[#6B4F35]
                 hover:bg-[#8B6A47]/20 hover:border-[#8B6A47]/40
                 transition-all duration-200 cursor-default"
    >
      {skill}
    </motion.span>
  );
}

// ─── Social Link ──────────────────────────────────────────────────────────────

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center w-8 h-8 rounded-lg
                 bg-[#8B6A47]/10 border border-[#8B6A47]/20
                 hover:bg-[#8B6A47] hover:border-[#8B6A47]
                 transition-all duration-200"
    >
      <Icon
        size={14}
        className="text-[#8B6A47] group-hover:text-white transition-colors duration-200"
      />
    </a>
  );
}

// ─── Founder Card ─────────────────────────────────────────────────────────────

function FounderCard({
  founder,
  index,
  inView,
}: {
  founder: Founder;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [3, -3]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-3, 3]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default
                 bg-white border border-[#E8DDD4]
                 shadow-[0_2px_16px_rgba(139,106,71,0.06)]
                 hover:shadow-[0_8px_40px_rgba(139,106,71,0.14)]
                 hover:border-[#C49A6C]/50
                 transition-all duration-500"
    >
      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden rounded-t-2xl">
        <motion.div
          className={`h-full w-full bg-gradient-to-r ${
            index === 0
              ? "from-transparent via-[#8B6A47] to-[#C49A6C]"
              : "from-transparent via-[#C49A6C] to-[#8B6A47]"
          }`}
          initial={{ x: "-100%" }}
          animate={inView ? { x: "100%" } : {}}
          transition={{ duration: 1.6, delay: 0.5 + index * 0.2, ease: "easeInOut" }}
        />
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                     bg-gradient-to-r ${
                       index === 0
                         ? "from-[#8B6A47]/30 via-[#C49A6C] to-[#8B6A47]/30"
                         : "from-[#C49A6C]/30 via-[#8B6A47] to-[#C49A6C]/30"
                     }`}
        />
      </div>

      <div className="relative z-10 p-7 flex flex-col gap-5 h-full">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className={`w-16 h-16 rounded-full p-[2px] bg-gradient-to-br ${
                index === 0
                  ? "from-[#8B6A47] to-[#C49A6C]"
                  : "from-[#C49A6C] to-[#8B6A47]"
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                {founder.image ? (
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <AvatarPlaceholder name={founder.name} index={index} />
                )}
              </div>
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
          </div>

          {/* Name + role */}
          <div className="flex-1 min-w-0 pt-1">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#8B6A47]/70 mb-1">
              {index === 0 ? "// founder_01" : "// founder_02"}
            </p>
            <h3 className="text-[#1A1208] font-bold text-[17px] leading-tight tracking-tight">
              {founder.name}
            </h3>
            <p className="text-[#8B6A47] text-[13px] mt-0.5 font-medium">{founder.role}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-[#5C4A3A] text-[14px] leading-relaxed">{founder.bio}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {founder.skills.map((skill, i) => (
            <SkillBadge key={skill} skill={skill} delay={0.4 + i * 0.04} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-[#E8DDD4] flex items-center gap-2">
          {founder.socials.linkedin && (
            <SocialLink href={founder.socials.linkedin} icon={FaLinkedin} label="LinkedIn" />
          )}
          {founder.socials.github && (
            <SocialLink href={founder.socials.github} icon={FaGithub} label="GitHub" />
          )}
          {founder.socials.twitter && (
            <SocialLink href={founder.socials.twitter} icon={FaXTwitter} label="Twitter / X" />
          )}
          <span className="ml-auto font-mono text-[11px] text-[#B8A898] tracking-wider">
            {index === 0 ? "AI & Automation" : "Eng & Strategy"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.4 }}
      className="grid grid-cols-3 divide-x divide-[#E8DDD4]
                 rounded-2xl border border-[#E8DDD4] bg-white overflow-hidden
                 shadow-[0_2px_12px_rgba(139,106,71,0.05)]"
    >
      {stats.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center py-5 px-4 gap-0.5 hover:bg-[#FAF6F2] transition-colors duration-200"
        >
          <span className="text-2xl font-bold text-[#8B6A47] font-mono">{value}</span>
          <span className="text-[11px] text-[#B8A898] font-mono tracking-wider uppercase">{label}</span>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Trust Strip ──────────────────────────────────────────────────────────────

function TrustStrip({ inView }: { inView: boolean }) {
  const items = [
    { icon: Shield, text: "Founder-led on every project" },
    { icon: Zap, text: "No outsourcing, ever" },
    { icon: Code, text: "Production-grade code only" },
    { icon: Users, text: "Direct founder access" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="rounded-2xl border border-[#E8DDD4] bg-white px-6 py-6
                 shadow-[0_2px_12px_rgba(139,106,71,0.05)]"
    >
      <p className="text-[13px] text-[#7A6355] text-center leading-relaxed mb-5 max-w-xl mx-auto">
        We don&apos;t outsource strategy. Every project is directly led by the founders
        to ensure quality, speed, and measurable business outcomes.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.7 + i * 0.07 }}
            className="flex items-center gap-2.5 text-[12px] text-[#7A6355]"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#8B6A47]/10 border border-[#8B6A47]/20 shrink-0">
              <Icon size={13} className="text-[#8B6A47]" />
            </span>
            {text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FoundersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF6F2] py-24 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#8B6A47]/[0.04] rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4"
        >
          <p className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-[#8B6A47]/70">
            <span className="w-4 h-px bg-[#8B6A47]/40" />
            The Team
            <span className="w-4 h-px bg-[#8B6A47]/40" />
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1208] tracking-tight">
            Meet The{" "}
            <span className="text-[#8B6A47]">Founders</span>
          </h2>
          <p className="text-[#7A6355] text-[15px] max-w-lg mx-auto leading-relaxed">
            Two builders obsessed with creating AI-powered products, automation systems, and
            digital experiences that help businesses scale.
          </p>
        </motion.div>

        {/* Stats */}
        <StatsBar inView={inView} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ perspective: "1200px" }}>
          {founders.map((founder, index) => (
            <FounderCard key={founder.name} founder={founder} index={index} inView={inView} />
          ))}
        </div>

        {/* Trust Strip */}
        <TrustStrip inView={inView} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[14px] text-white
                       bg-[#8B6A47] hover:bg-[#7A5C3C]
                       shadow-[0_4px_16px_rgba(139,106,71,0.3)] hover:shadow-[0_6px_24px_rgba(139,106,71,0.4)]
                       transition-all duration-300"
          >
            Book a Strategy Call
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </a>
          <p className="text-[12px] text-[#B8A898] font-mono">
            Free · 30 min · No commitment
          </p>
        </motion.div>

      </div>
    </section>
  );
}