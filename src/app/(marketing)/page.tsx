import Hero from "@/components/hero/hero";
import TechStack from "@/components/home/tech-stack";
import ServiceEcosystem from "@/components/home/services";
import Process from "@/components/home/process";
import { Stats, CTA } from "@/components/home/stats-cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <TechStack />
      <ServiceEcosystem />
      <Process />
      <Stats />
      <CTA />
    </div>
  );
}
