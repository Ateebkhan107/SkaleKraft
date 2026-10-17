"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import {
  ArrowLeft,
  BrainCircuit,
  Check,
  CheckCircle,
  ChevronDown,
  Clapperboard,
  MonitorSmartphone,
  Palette,
  Send,
  Sparkles,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import InteractiveCanvas3D, { Object3DType } from "@/components/3d/InteractiveCanvas3D";

type Option = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

const services: Option[] = [
  { label: "Website", value: "Website Development", icon: MonitorSmartphone },
  { label: "Mobile App", value: "Mobile App", icon: Smartphone },
  { label: "AI System", value: "AI System", icon: BrainCircuit },
  { label: "Creative Studio", value: "Creative Studio", icon: Clapperboard },
  { label: "Brand Identity", value: "Brand Identity", icon: Palette },
];

const budgets = ["<$2k", "$2k-$5k", "$5k-$10k", "$10k+", "Custom"];
const timelines = ["ASAP", "2 Weeks", "1 Month", "2+ Months", "Flexible"];

const faqs = [
  { q: "How long does a project take?", a: "Simple launches can take a couple of weeks. Larger products usually take one to three months depending on scope." },
  { q: "How do payments work?", a: "Most projects start with a deposit, then continue through milestone-based payments as work is delivered." },
  { q: "Do you work internationally?", a: "Yes. We work remotely with businesses across time zones and keep communication clear from day one." },
  { q: "Can you sign an NDA?", a: "Yes. If your idea or business details need privacy, we can review and sign an NDA before discovery." },
];

const stacks: Record<string, string[]> = {
  "Website Development": ["React", "Next.js", "Tailwind", "Supabase"],
  "Mobile App": ["React Native", "Node.js", "Supabase", "Expo"],
  "AI System": ["React", "Next.js", "Python", "OpenAI", "Supabase"],
  "Creative Studio": ["Premiere", "After Effects", "Figma", "Motion"],
  "Brand Identity": ["Figma", "Illustrator", "Design System", "Web Kit"],
};

const teams: Record<string, string[]> = {
  "Website Development": ["Designer", "Frontend", "Backend"],
  "Mobile App": ["Product Designer", "Mobile", "Backend"],
  "AI System": ["Frontend", "Backend", "AI Engineer"],
  "Creative Studio": ["Editor", "Motion Designer", "Producer"],
  "Brand Identity": ["Brand Designer", "Art Direction", "UI Designer"],
};

const serviceTo3DType: Record<string, Object3DType> = {
  "Website Development": "torus-knot",
  "Mobile App": "torus-knot",
  "AI System": "neural-core",
  "Creative Studio": "cyber-sphere",
  "Brand Identity": "gyroscope",
};

function getDuration(service: string, timeline: string) {
  if (timeline === "ASAP") return "2-3 Weeks";
  if (timeline === "2 Weeks") return "2 Weeks";
  if (timeline === "1 Month") return "4-5 Weeks";
  if (timeline === "2+ Months") return "8+ Weeks";
  return service === "AI System" ? "5-8 Weeks" : "4-6 Weeks";
}

function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`group relative h-13 sm:h-14 w-full overflow-hidden rounded-[14px] border p-1.5 text-center transition duration-300 ${
        selected ? "border-[#805948]/70 bg-[#805948]/16 shadow-[0_0_24px_rgba(128,89,72,.16)]" : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]"
      }`}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(128,89,72,.18),transparent_34%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <span className="relative flex h-full flex-col items-center justify-center gap-1">
        {Icon && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/24">
            <Icon className={selected ? "h-3.5 w-3.5 text-[#c19a88]" : "h-3.5 w-3.5 text-white/50"} strokeWidth={1.7} />
          </span>
        )}
        <span className="text-[11px] font-medium leading-tight text-white truncate max-w-full">{option.label}</span>
        {selected && <Check className="absolute right-1 top-1 h-3.5 w-3.5 text-[#c19a88]" />}
      </span>
    </motion.button>
  );
}

function ChoiceCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`flex h-8 w-full items-center rounded-lg border px-2.5 py-1 text-left text-xs font-medium transition duration-300 ${
        selected ? "border-[#805948]/70 bg-[#805948]/16 text-white shadow-[0_0_20px_rgba(128,89,72,.14)]" : "border-white/10 bg-white/[0.025] text-white/60 hover:border-white/20 hover:text-white"
      }`}
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
    >
      <span className="flex w-full items-center justify-between gap-1.5">
        <span className="truncate">{label}</span>
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${selected ? "bg-[#d3a58f] shadow-[0_0_8px_rgba(211,165,143,.8)]" : "bg-white/15"}`} />
      </span>
    </motion.button>
  );
}

function SectionTitle({ number, title, hint }: { number: string; title: string; hint: string }) {
  return (
    <div className="flex items-end justify-between gap-3 border-b border-white/[0.07] pb-1 mb-1.5">
      <div className="flex items-center gap-2">
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#c19a88]/25 bg-[#805948]/10 text-[8px] font-semibold text-[#d4a894]">{number}</span>
        <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">{title}</h2>
      </div>
      <span className="hidden text-[10px] text-white/30 sm:block">{hint}</span>
    </div>
  );
}

function FloatingField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="group relative block">
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder=" "
        className="peer h-8 w-full rounded-lg border border-white/10 bg-black/24 px-3 pt-3 text-xs text-white outline-none transition duration-300 focus:border-[#805948]/70 focus:shadow-[0_0_20px_rgba(128,89,72,.12)]"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/40 transition duration-300 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:text-[#c19a88] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9px]">
        {label}
      </span>
    </label>
  );
}

function FAQItem({ item, open, onClick }: { item: (typeof faqs)[number]; open: boolean; onClick: () => void }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02]">
      <button type="button" onClick={onClick} className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-xs font-medium text-white">
        <span>{item.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5 text-white/40" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <p className="px-3 pb-2 text-[11px] leading-relaxed text-white/50">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [service, setService] = useState("AI System");
  const [budget, setBudget] = useState("$5k-$10k");
  const [customBudget, setCustomBudget] = useState("");
  const [isCustomSubmitted, setIsCustomSubmitted] = useState(false);
  const [timeline, setTimeline] = useState("1 Month");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startedAt, setStartedAt] = useState("");
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(-1);
  const [rightTab, setRightTab] = useState<"preview" | "faq">("preview");

  const effectiveBudget = useMemo(
    () => (budget === "Custom" ? (customBudget.trim() || "Custom") : budget),
    [budget, customBudget]
  );

  // Avoid SSR hydration mismatch by setting timestamp only on client
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartedAt(Date.now().toString());
  }, []);

  const summary = useMemo(() => ({
    stack: stacks[service] || stacks["Website Development"],
    team: teams[service] || teams["Website Development"],
    duration: getDuration(service, timeline),
  }), [service, timeline]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      formData.set("source", "Start project page");
      formData.set("service", service);
      formData.set("budget", effectiveBudget);
      formData.set("message", `${message}\n\nTimeline: ${timeline}`);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Message failed");
      }

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Could not send right now. Please email us directly at ateeb@skalekraft.in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0B0B0B] px-3 pb-12 pt-24 sm:pt-28 md:pt-32 md:px-6 flex flex-col justify-start text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(166,111,87,.17),transparent_31%),radial-gradient(circle_at_8%_70%,rgba(255,255,255,.045),transparent_27%),linear-gradient(135deg,#080808_0%,#0b0908_52%,#0B0B0B_100%)]" />
      <FluidParticlesBackground
        theme="dark"
        particleCount={520}
        noiseIntensity={0.0024}
        particleSize={{ min: 0.4, max: 1.15 }}
        className="pointer-events-none fixed inset-0 h-screen bg-transparent opacity-60 dark:bg-transparent"
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90vw,1100px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c19a88]/35 to-transparent" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        animate={{ backgroundPosition: ["0px 0px", "42px 42px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "42px 42px" }}
      />
      {[18, 58, 86].map((left, index) => (
        <motion.span
          key={left}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/25"
          style={{ left: `${left}%`, top: `${[24, 78, 38][index]}%` }}
          initial={{ opacity: 0.12 }}
          animate={{ y: [0, -12, 0], opacity: [0.12, 0.34, 0.12] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto w-full max-w-[1360px]">
        <Link href="/?dest=everything" className="group mb-2 inline-flex h-7.5 items-center gap-2 rounded-full border border-white/14 bg-black/35 px-3.5 text-xs font-medium text-white/75 shadow-[0_8px_24px_rgba(0,0,0,.2)] backdrop-blur-md transition duration-300 hover:border-[#c19a88]/40 hover:bg-[#805948]/12 hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5 text-[#c19a88] transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to home
        </Link>

        <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.022)_38%,rgba(128,89,72,.035))] p-3.5 shadow-[0_20px_80px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.035)] backdrop-blur-xl sm:p-4.5 flex flex-col justify-between">
              <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[#805948]/12 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#c19a88] font-mono">Start Project</p>
                    <span className="text-white/20">/</span>
                    <span className="text-[10px] text-white/60">Reply within 24h</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c19a88]" />
                    Accepting new projects
                  </span>
                </div>
                
                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                    Let&apos;s build something <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#e8c5b4] via-[#c19a88] to-[#805948] bg-clip-text text-transparent pb-1 inline-block">remarkable.</span>
                  </h1>
                  <span className="hidden text-[11px] text-white/40 xl:inline font-mono">NDA available on request</span>
                </div>

                <form onSubmit={handleSubmit} className="mt-2.5 space-y-2">
                  <input type="hidden" name="service" value={service} />
                  <input type="hidden" name="budget" value={effectiveBudget} />
                  <input type="hidden" name="timeline" value={timeline} />
                  <input type="hidden" name="startedAt" value={startedAt} />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                  <section>
                    <SectionTitle number="01" title="Choose a service" hint="What can we create for you?" />
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                      {services.map((item) => (
                        <OptionCard key={item.value} option={item} selected={service === item.value} onClick={() => setService(item.value)} />
                      ))}
                    </div>
                  </section>

                  <section>
                    <SectionTitle number="02" title="Set your budget" hint="A comfortable investment range" />
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                      {budgets.map((item) => {
                        const displayLabel = item === "Custom" && customBudget.trim() ? `Custom (${customBudget.trim()})` : item;
                        return (
                          <ChoiceCard
                            key={item}
                            label={displayLabel}
                            selected={budget === item}
                            onClick={() => {
                              setBudget(item);
                              if (item !== "Custom") {
                                setCustomBudget("");
                                setIsCustomSubmitted(false);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                    <AnimatePresence>
                      {budget === "Custom" && (
                        <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 6 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="relative flex items-center">
                            <input
                              type="text"
                              value={customBudget}
                              onChange={(event) => { setCustomBudget(event.target.value); setIsCustomSubmitted(false); }}
                              onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); if (customBudget.trim()) setIsCustomSubmitted(true); } }}
                              placeholder="Enter custom budget (e.g. $15,000)"
                              autoFocus
                              className="h-8 w-full rounded-lg border border-[#805948]/70 bg-black/35 pl-3 pr-28 text-xs text-white placeholder:text-white/35 outline-none focus:border-[#c19a88]"
                            />
                            <button
                              type="button"
                              onClick={() => { if (customBudget.trim()) setIsCustomSubmitted(true); }}
                              className="absolute right-1 flex h-6 items-center gap-1 rounded border border-[#805948]/70 bg-[#805948]/30 px-2 text-[10px] font-semibold text-white hover:bg-[#805948]"
                            >
                              {isCustomSubmitted || (customBudget.trim() && budget === "Custom") ? <>Set Amount <Check className="h-3 w-3 text-emerald-300" /></> : <>Confirm <Check className="h-3 w-3" /></>}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>

                  <section>
                    <SectionTitle number="03" title="Pick a timeline" hint="When would you like to launch?" />
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                      {timelines.map((item) => (
                        <ChoiceCard key={item} label={item} selected={timeline === item} onClick={() => setTimeline(item)} />
                      ))}
                    </div>
                  </section>

                  <section>
                    <SectionTitle number="04" title="Tell us about you" hint="We only use this to reply" />
                    <div className="grid gap-1.5 sm:grid-cols-3">
                      <FloatingField label="Name" name="name" required value={name} onChange={setName} />
                      <FloatingField label="Email" name="email" type="email" required value={email} onChange={setEmail} />
                      <FloatingField label="Company" name="company" value={company} onChange={setCompany} />
                      <label className="group relative block sm:col-span-3">
                        <textarea
                          name="message"
                          required
                          rows={2}
                          value={message}
                          onChange={(event) => setMessage(event.target.value)}
                          placeholder=" "
                          className="peer h-12.5 w-full resize-none rounded-lg border border-white/10 bg-black/24 px-3 pt-3.5 text-xs text-white outline-none transition duration-300 focus:border-[#805948]/70 focus:shadow-[0_0_20px_rgba(128,89,72,.12)]"
                        />
                        <span className="pointer-events-none absolute left-3 top-3 text-xs text-white/40 transition duration-300 peer-focus:top-1 peer-focus:text-[9px] peer-focus:text-[#c19a88] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[9px]">
                          Briefly describe your idea or requirements...
                        </span>
                      </label>
                    </div>
                  </section>

                  {error && <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-200">{error}</p>}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#805948] px-5 text-xs font-semibold text-white shadow-[0_12px_40px_rgba(128,89,72,.18)] transition duration-300 hover:bg-[#936857] disabled:cursor-wait disabled:opacity-80"
                    whileHover={{ scale: 1.008 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    {isSubmitted ? (
                      <>Project request received <CheckCircle className="h-4 w-4" /></>
                    ) : isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>Send Project Request <Send className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1" /></>
                    )}
                  </motion.button>
                  {isSubmitted && <p className="text-center text-xs text-white/50">We&apos;ll contact you within 24 hours.</p>}
                </form>
              </div>
            </div>
          </motion.section>

          <motion.aside initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }} className="h-full">
            <div className="relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(155deg,rgba(128,89,72,.10),rgba(255,255,255,.035)_35%,rgba(255,255,255,.018))] p-3.5 shadow-[0_20px_80px_rgba(0,0,0,.4),inset_0_1px_0_rgba(255,255,255,.04)] backdrop-blur-xl sm:p-4.5 flex flex-col justify-between">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#805948]/15 blur-3xl" />
              
              <div>
                {/* Header Switcher Tabs */}
                <div className="relative flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1 rounded-lg bg-black/40 border border-white/10 p-0.5">
                    <button
                      type="button"
                      onClick={() => setRightTab("preview")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        rightTab === "preview"
                          ? "bg-[#805948]/50 text-white border border-[#c19a88]/30 font-semibold shadow"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <Sparkles className="h-3 w-3 text-[#c19a88]" />
                      <span>Project Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRightTab("faq")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        rightTab === "faq"
                          ? "bg-[#805948]/50 text-white border border-[#c19a88]/30 font-semibold shadow"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <span>FAQs</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[9px] font-mono text-[#c19a88]">4</span>
                    </button>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#c19a88] font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c19a88]" /> Live
                  </span>
                </div>

                {rightTab === "preview" ? (
                  <div className="mt-2.5 space-y-2">
                    {/* 3 Metric Pills */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        ["Project", service],
                        ["Budget", effectiveBudget],
                        ["Timeline", timeline],
                      ].map(([label, value]) => (
                        <motion.div key={label} layout className="min-w-0 rounded-xl border border-white/10 bg-black/24 p-2 text-center">
                          <span className="text-[9px] uppercase tracking-[0.16em] text-white/35 block">{label}</span>
                          <span className="mt-0.5 block truncate text-xs font-semibold text-white" title={value}>{value}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Interactive 3D Project Artifact Token */}
                    <div className="relative flex h-20 sm:h-22 w-full items-center justify-between px-3 py-1.5">
                      <div className="pointer-events-none absolute right-0 top-1/2 h-20 w-28 -translate-y-1/2 rounded-full bg-[#805948]/12 blur-2xl" />
                      <div className="z-10 max-w-[60%]">
                        <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#c19a88]">3D Project Token</span>
                        <p className="mt-0.5 truncate text-xs font-medium text-white">{service}</p>
                        <span className="mt-0.5 inline-flex items-center gap-1 text-[9px] text-white/40">
                          <Sparkles className="h-2.5 w-2.5 text-[#c19a88]" /> Drag to inspect
                        </span>
                      </div>
                      <div className="relative h-full w-24 sm:w-28">
                        <InteractiveCanvas3D
                          key={service}
                          type={serviceTo3DType[service] || "neural-core"}
                          accentColor="#c19a88"
                          secondaryColor="#805948"
                          interactive={true}
                          autoRotateSpeed={1.4}
                          className="h-full w-full"
                        />
                      </div>
                    </div>

                    {/* Stack & Team */}
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/[0.08] bg-black/18 p-2.5">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-white/35">Recommended Stack</p>
                        <motion.div layout className="mt-1.5 flex flex-wrap gap-1">
                          {summary.stack.map((item) => (
                            <span key={item} className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-white/70">{item}</span>
                          ))}
                        </motion.div>
                      </div>

                      <div className="rounded-xl border border-white/[0.08] bg-black/18 p-2.5">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-white/35">Estimated Team</p>
                        <motion.div layout className="mt-1.5 flex flex-wrap gap-1">
                          {summary.team.map((item) => (
                            <span key={item} className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-white/70">{item}</span>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    {/* Estimated Duration */}
                    <div className="relative overflow-hidden rounded-xl border border-[#c19a88]/20 bg-[linear-gradient(135deg,rgba(128,89,72,.2),rgba(128,89,72,.07))] p-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-white/45 font-mono">Estimated Duration</p>
                          <AnimatePresence mode="wait">
                            <motion.p key={summary.duration} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-base font-semibold text-white">
                              {summary.duration}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                        <span className="text-[10px] font-mono text-[#c19a88] bg-[#805948]/20 px-2 py-0.5 rounded border border-[#805948]/30">Production Ready</span>
                      </div>
                    </div>

                    {/* What happens next */}
                    <div className="border-t border-white/10 pt-2">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-xs font-semibold text-white">What happens next</h3>
                        <span className="text-[10px] text-white/30">A clear path to launch</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {["We review your idea", "Discovery call", "Proposal", "Design", "Development", "Launch"].map((item, index) => (
                          <div key={item} className="flex h-7 items-center gap-1.5 rounded-lg border border-white/10 bg-black/18 px-2 py-1">
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/24 text-[9px] text-[#c19a88] font-mono">{index + 1}</span>
                            <span className="text-[10px] truncate text-white/65">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* FAQ Tab */
                  <div className="mt-2.5 space-y-1.5">
                    <div className="flex items-center justify-between pb-1 text-white/40 text-[10px] font-mono uppercase tracking-wider">
                      <span>Frequently Asked Questions</span>
                      <span>04 Answers</span>
                    </div>
                    {faqs.map((item, index) => (
                      <FAQItem key={item.q} item={item} open={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} />
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Quick Switch Link */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                {rightTab === "preview" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setRightTab("faq");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-white/45 hover:text-[#c19a88] transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Have questions about the process? View FAQs</span>
                    <span>→</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setRightTab("preview");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-white/45 hover:text-[#c19a88] transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>← Back to Live Project Preview</span>
                  </button>
                )}
                <span className="text-[10px] font-mono text-white/30">skalekraft.in</span>
              </div>

            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
