"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
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
      className={`group relative overflow-hidden rounded-[22px] border p-4 text-left transition duration-300 ${
        selected ? "border-[#805948]/70 bg-[#805948]/14 shadow-[0_0_34px_rgba(128,89,72,.14)]" : "border-white/10 bg-white/[0.025] hover:border-white/22 hover:bg-white/[0.045]"
      }`}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(128,89,72,.18),transparent_34%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <span className="relative flex items-center gap-3">
        {Icon && (
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/24">
            <Icon className={selected ? "h-5 w-5 text-[#c19a88]" : "h-5 w-5 text-white/52"} strokeWidth={1.7} />
          </span>
        )}
        <span className="font-medium text-white">{option.label}</span>
        {selected && <Check className="ml-auto h-4 w-4 text-[#c19a88]" />}
      </span>
    </motion.button>
  );
}

function ChoiceCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition duration-300 ${
        selected ? "border-[#805948]/70 bg-[#805948]/14 text-white shadow-[0_0_28px_rgba(128,89,72,.12)]" : "border-white/10 bg-white/[0.025] text-white/62 hover:border-white/22 hover:text-white"
      }`}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
    >
      {label}
    </motion.button>
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
        className="peer h-14 w-full rounded-2xl border border-white/10 bg-black/24 px-4 pt-5 text-white outline-none transition duration-300 focus:border-[#805948]/70 focus:shadow-[0_0_30px_rgba(128,89,72,.12)]"
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
      <button type="button" onClick={onClick} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-white">
        <span className="font-medium">{item.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-4 w-4 text-white/45" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
            <p className="px-5 pb-5 text-sm leading-6 text-white/52">{item.a}</p>
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
  const [startedAt] = useState(() => Date.now().toString());
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

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
    <main className="relative min-h-screen overflow-hidden bg-[#090909] px-4 pb-24 pt-28 text-white md:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(128,89,72,.14),transparent_34%),radial-gradient(circle_at_12%_72%,rgba(255,255,255,.045),transparent_28%)]" />
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
          animate={{ y: [0, -12, 0], opacity: [0.12, 0.34, 0.12] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative mx-auto max-w-[1500px]">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,.9fr)]">
          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="rounded-[32px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_30px_120px_rgba(0,0,0,.42)] backdrop-blur-xl md:p-8 lg:p-10">
              <p className="text-sm uppercase tracking-[0.26em] text-[#c19a88]">Start Project</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">Let&apos;s build something great.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/55">Tell us about your idea. We&apos;ll review it and get back to you within 24 hours.</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: "Reply within 24 hours", icon: Zap },
                  { label: "Working worldwide", icon: Globe2 },
                  { label: "NDA available on request", icon: ShieldCheck },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <span key={badge.label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/60">
                      <Icon className="h-4 w-4 text-[#c19a88]" />
                      {badge.label}
                    </span>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="mt-10 space-y-10">
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
                  <h2 className="text-sm uppercase tracking-[0.22em] text-white/42">Service</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {services.map((item) => (
                      <OptionCard key={item.value} option={item} selected={service === item.value} onClick={() => setService(item.value)} />
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-sm uppercase tracking-[0.22em] text-white/42">Budget</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
                    {budgets.map((item) => <ChoiceCard key={item} label={item} selected={budget === item} onClick={() => setBudget(item)} />)}
                  </div>
                </section>

                <section>
                  <h2 className="text-sm uppercase tracking-[0.22em] text-white/42">Timeline</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
                    {timelines.map((item) => <ChoiceCard key={item} label={item} selected={timeline === item} onClick={() => setTimeline(item)} />)}
                  </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                  <FloatingField label="Name" name="name" required value={name} onChange={setName} />
                  <FloatingField label="Email" name="email" type="email" required value={email} onChange={setEmail} />
                  <FloatingField label="Company" name="company" value={company} onChange={setCompany} />
                  <label className="group relative block md:col-span-2">
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder=" "
                      className="peer w-full resize-none rounded-2xl border border-white/10 bg-black/24 px-4 pt-7 text-white outline-none transition duration-300 focus:border-[#805948]/70 focus:shadow-[0_0_30px_rgba(128,89,72,.12)]"
                    />
                    <span className="pointer-events-none absolute left-4 top-6 text-sm text-white/42 transition duration-300 peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#c19a88] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs">
                      Description
                    </span>
                  </label>
                </section>

                {error && <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#805948] px-6 text-lg font-medium text-white shadow-[0_22px_70px_rgba(128,89,72,.18)] transition duration-300 hover:bg-[#936857] disabled:cursor-wait disabled:opacity-80"
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

            <section className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl md:p-7">
              <h2 className="text-2xl font-medium text-white">Frequently Asked Questions</h2>
              <div className="mt-5 space-y-3">
                {faqs.map((item, index) => (
                  <FAQItem key={item.q} item={item} open={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} />
                ))}
              </div>
            </section>
          </motion.section>

          <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }} className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_120px_rgba(0,0,0,.42)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-[#c19a88]">Project Preview</p>
              <div className="mt-7 space-y-5">
                {[
                  ["Project", service],
                  ["Budget", budget],
                  ["Timeline", timeline],
                ].map(([label, value]) => (
                  <motion.div key={label} layout className="flex items-center justify-between gap-6 border-b border-white/10 pb-4">
                    <span className="text-sm text-white/42">{label}</span>
                    <span className="text-right font-medium text-white">{value}</span>
                  </motion.div>
                ))}

                <div>
                  <p className="text-sm text-white/42">Recommended Stack</p>
                  <motion.div layout className="mt-3 flex flex-wrap gap-2">
                    {summary.stack.map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/62">{item}</span>)}
                  </motion.div>
                </div>

                <div>
                  <p className="text-sm text-white/42">Estimated Team</p>
                  <motion.div layout className="mt-3 flex flex-wrap gap-2">
                    {summary.team.map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/62">{item}</span>)}
                  </motion.div>
                </div>

                <div className="rounded-3xl border border-[#805948]/20 bg-[#805948]/10 p-5">
                  <p className="text-sm text-white/42">Estimated Duration</p>
                  <AnimatePresence mode="wait">
                    <motion.p key={summary.duration} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-2 text-3xl font-semibold text-white">
                      {summary.duration}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-7">
                <h3 className="text-lg font-medium text-white">What happens next</h3>
                <div className="mt-5 space-y-3">
                  {["We review your idea", "Discovery call", "Proposal", "Design", "Development", "Launch"].map((item, index) => (
                    <motion.div key={item} className="flex items-center gap-3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/24 text-xs text-[#c19a88]">{index + 1}</span>
                      <span className="text-sm text-white/62">{item}</span>
                      {index < 5 && <ArrowRight className="ml-auto h-4 w-4 text-white/18" />}
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
