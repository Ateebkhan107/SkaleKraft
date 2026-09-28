"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BrainCircuit,
  Check,
  CheckCircle,
  ChevronDown,
  Clapperboard,
  Globe2,
  MonitorSmartphone,
  Palette,
  Send,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react";

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
      className={`group relative h-20 w-full overflow-hidden rounded-[18px] border p-3 text-left transition duration-300 sm:h-auto sm:min-h-14 sm:p-3 ${
        selected ? "border-[#805948]/70 bg-[#805948]/14 shadow-[0_0_34px_rgba(128,89,72,.14)]" : "border-white/10 bg-white/[0.025] hover:border-white/22 hover:bg-white/[0.045]"
      }`}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(128,89,72,.18),transparent_34%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <span className="relative flex h-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/24">
            <Icon className={selected ? "h-[18px] w-[18px] text-[#c19a88]" : "h-[18px] w-[18px] text-white/52"} strokeWidth={1.7} />
          </span>
        )}
        <span className="font-medium leading-tight text-white">{option.label}</span>
        {selected && <Check className="absolute right-0 top-0 h-4 w-4 text-[#c19a88] sm:static sm:ml-auto" />}
      </span>
    </motion.button>
  );
}

function ChoiceCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`flex min-h-10 w-full items-center rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition duration-300 ${
        selected ? "border-[#805948]/70 bg-[#805948]/14 text-white shadow-[0_0_28px_rgba(128,89,72,.12)]" : "border-white/10 bg-white/[0.025] text-white/62 hover:border-white/22 hover:text-white"
      }`}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
    >
      <span className="flex w-full items-center justify-between gap-2">
        {label}
        <span className={`h-1.5 w-1.5 rounded-full transition ${selected ? "bg-[#d3a58f] shadow-[0_0_10px_rgba(211,165,143,.8)]" : "bg-white/15"}`} />
      </span>
    </motion.button>
  );
}

function SectionTitle({ number, title, hint }: { number: string; title: string; hint: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-white/[0.07] pb-2.5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#c19a88]/25 bg-[#805948]/10 text-[9px] font-semibold text-[#d4a894]">{number}</span>
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-white/64">{title}</h2>
      </div>
      <span className="hidden text-[11px] text-white/28 sm:block">{hint}</span>
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
        className="peer h-12 w-full rounded-xl border border-white/10 bg-black/24 px-4 pt-4 text-sm text-white outline-none transition duration-300 focus:border-[#805948]/70 focus:shadow-[0_0_30px_rgba(128,89,72,.12)]"
      />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/42 transition duration-300 peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#c19a88] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </span>
    </label>
  );
}

function FAQItem({ item, open, onClick }: { item: (typeof faqs)[number]; open: boolean; onClick: () => void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025]">
      <button type="button" onClick={onClick} className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-white">
        <span className="font-medium">{item.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-4 w-4 text-white/45" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
            <p className="px-4 pb-4 text-sm leading-6 text-white/52">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [service, setService] = useState("AI System");
  const [budget, setBudget] = useState("$5k-$10k");
  const [timeline, setTimeline] = useState("1 Month");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startedAt, setStartedAt] = useState("");
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

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
      formData.set("budget", budget);
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
      setError(submissionError instanceof Error ? submissionError.message : "Could not send right now. Please email us directly at skalekraft@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090909] px-4 pb-16 pt-20 text-white sm:pt-24 md:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(166,111,87,.17),transparent_31%),radial-gradient(circle_at_8%_70%,rgba(255,255,255,.045),transparent_27%),linear-gradient(135deg,#080808_0%,#0b0908_52%,#090909_100%)]" />
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

      <div className="relative mx-auto max-w-[1240px]">
        <Link href="/?dest=everything" className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm text-white/45 transition hover:text-white sm:mb-7">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,.8fr)] xl:gap-6">
          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.022)_38%,rgba(128,89,72,.035))] p-5 shadow-[0_30px_120px_rgba(0,0,0,.42),inset_0_1px_0_rgba(255,255,255,.035)] backdrop-blur-xl md:p-7 lg:p-8">
              <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#805948]/12 blur-3xl" />
              <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.26em] text-[#c19a88]">Start Project</p>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-300/[0.045] px-3 py-1 text-[11px] text-emerald-100/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.75)]" />
                  Accepting new projects
                </span>
              </div>
              <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">Let&apos;s build something <span className="bg-gradient-to-r from-white via-[#e8c5b4] to-[#b87c62] bg-clip-text text-transparent">remarkable.</span></h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/55">Tell us about your idea. We&apos;ll review it and get back to you within 24 hours.</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { label: "Reply within 24 hours", icon: Zap },
                  { label: "Working worldwide", icon: Globe2 },
                  { label: "NDA available on request", icon: ShieldCheck },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <span key={badge.label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/60">
                      <Icon className="h-3.5 w-3.5 text-[#c19a88]" />
                      {badge.label}
                    </span>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-7">
                <input type="hidden" name="service" value={service} />
                <input type="hidden" name="budget" value={budget} />
                <input type="hidden" name="timeline" value={timeline} />
                <input type="hidden" name="startedAt" value={startedAt} />
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <section>
                  <SectionTitle number="01" title="Choose a service" hint="What can we create for you?" />
                  <div className="mt-3 grid grid-cols-2 gap-2 xl:grid-cols-3">
                    {services.map((item) => (
                      <OptionCard key={item.value} option={item} selected={service === item.value} onClick={() => setService(item.value)} />
                    ))}
                  </div>
                </section>

                <section>
                  <SectionTitle number="02" title="Set your budget" hint="A comfortable investment range" />
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
                    {budgets.map((item) => <ChoiceCard key={item} label={item} selected={budget === item} onClick={() => setBudget(item)} />)}
                  </div>
                </section>

                <section>
                  <SectionTitle number="03" title="Pick a timeline" hint="When would you like to launch?" />
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
                    {timelines.map((item) => <ChoiceCard key={item} label={item} selected={timeline === item} onClick={() => setTimeline(item)} />)}
                  </div>
                </section>

                <section>
                  <SectionTitle number="04" title="Tell us about you" hint="We only use this to reply" />
                  <div className="mt-3 grid gap-3 sm:gap-4 md:grid-cols-2">
                  <FloatingField label="Name" name="name" required value={name} onChange={setName} />
                  <FloatingField label="Email" name="email" type="email" required value={email} onChange={setEmail} />
                  <FloatingField label="Company" name="company" value={company} onChange={setCompany} />
                  <label className="group relative block md:col-span-2">
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder=" "
                      className="peer w-full resize-none rounded-xl border border-white/10 bg-black/24 px-4 pt-7 text-sm text-white outline-none transition duration-300 focus:border-[#805948]/70 focus:shadow-[0_0_30px_rgba(128,89,72,.12)]"
                    />
                    <span className="pointer-events-none absolute left-4 top-6 text-sm text-white/42 transition duration-300 peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#c19a88] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs">
                      Description
                    </span>
                  </label>
                  </div>
                </section>

                {error && <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#805948] px-6 text-base font-medium text-white shadow-[0_22px_70px_rgba(128,89,72,.18)] transition duration-300 hover:bg-[#936857] disabled:cursor-wait disabled:opacity-80"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                >
                  {isSubmitted ? (
                    <>
                      Project request received
                      <CheckCircle className="h-5 w-5" />
                    </>
                  ) : isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Project Request
                      <Send className="h-5 w-5 transition duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>

                {isSubmitted && <p className="text-center text-sm text-white/50">We&apos;ll contact you soon.</p>}
              </form>
              </div>
            </div>

            <section className="mt-5 rounded-[26px] border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl md:p-6">
              <h2 className="text-xl font-medium text-white">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-2">
                {faqs.map((item, index) => (
                  <FAQItem key={item.q} item={item} open={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} />
                ))}
              </div>
            </section>
          </motion.section>

          <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }} className="lg:sticky lg:top-20 lg:self-start">
            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(155deg,rgba(128,89,72,.10),rgba(255,255,255,.035)_35%,rgba(255,255,255,.018))] p-5 shadow-[0_30px_120px_rgba(0,0,0,.42),inset_0_1px_0_rgba(255,255,255,.04)] backdrop-blur-xl">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#805948]/15 blur-3xl" />
              <div className="relative flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.24em] text-[#c19a88]">Project Preview</p>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/28"><Sparkles className="h-3 w-3 text-[#c19a88]" /> Live</span>
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ["Project", service],
                  ["Budget", budget],
                  ["Timeline", timeline],
                ].map(([label, value]) => (
                  <motion.div key={label} layout className="flex items-center justify-between gap-5 border-b border-white/10 pb-3">
                    <span className="text-sm text-white/42">{label}</span>
                    <span className="text-right font-medium text-white">{value}</span>
                  </motion.div>
                ))}

                <div>
                  <p className="text-sm text-white/42">Recommended Stack</p>
                  <motion.div layout className="mt-3 flex flex-wrap gap-2">
                    {summary.stack.map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/62">{item}</span>)}
                  </motion.div>
                </div>

                <div>
                  <p className="text-sm text-white/42">Estimated Team</p>
                  <motion.div layout className="mt-3 flex flex-wrap gap-2">
                    {summary.team.map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/62">{item}</span>)}
                  </motion.div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-[#c19a88]/20 bg-[linear-gradient(135deg,rgba(128,89,72,.2),rgba(128,89,72,.07))] p-4">
                  <div className="absolute inset-y-0 right-0 w-24 bg-[radial-gradient(circle_at_100%_50%,rgba(193,154,136,.18),transparent_68%)]" />
                  <p className="text-sm text-white/42">Estimated Duration</p>
                  <AnimatePresence mode="wait">
                    <motion.p key={summary.duration} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-1.5 text-2xl font-semibold text-white">
                      {summary.duration}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-medium text-white">What happens next</h3>
                  <span className="text-[11px] text-white/28">A clear path to launch</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {["We review your idea", "Discovery call", "Proposal", "Design", "Development", "Launch"].map((item, index) => (
                    <motion.div key={item} className="flex min-h-12 items-center gap-2 rounded-xl border border-white/10 bg-black/18 px-2.5 py-2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/24 text-[11px] text-[#c19a88]">{index + 1}</span>
                      <span className="text-xs leading-4 text-white/62">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
