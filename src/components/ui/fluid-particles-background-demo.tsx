import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";

export function DemoFluidParticlesBackground() {
  return (
    <FluidParticlesBackground theme="dark" className="bg-black dark:bg-black">
      <div className="z-10 space-y-4 text-center lg:space-y-6">
        <h1 className="text-4xl font-bold text-white lg:text-6xl">Fluid particles</h1>
      </div>
    </FluidParticlesBackground>
  );
}

