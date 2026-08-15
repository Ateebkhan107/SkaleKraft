import Image from "next/image";

type ProjectThumbnailProps = {
  src: string;
  title: string;
  sizes: string;
  priority?: boolean;
};

export default function ProjectThumbnail({ src, title, sizes, priority = false }: ProjectThumbnailProps) {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#080808] shadow-[0_24px_65px_rgba(0,0,0,.42)]">
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-white/[0.055] px-3 sm:h-10 sm:px-4">
        <span className="h-2 w-2 rounded-full bg-[#ff6b62]/80" />
        <span className="h-2 w-2 rounded-full bg-[#f7c94b]/75" />
        <span className="h-2 w-2 rounded-full bg-[#5ac76f]/75" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded-md border border-white/[0.06] bg-black/20 px-2.5 py-1 text-[9px] tracking-wide text-white/35 sm:ml-3 sm:text-[10px]">
          {title}
        </span>
      </div>
      <div className="relative aspect-video overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(128,89,72,.22),transparent_68%),#0d0d0d]">
        <Image
          src={src}
          alt={`${title} project preview`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain transition duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.045]" />
      </div>
    </div>
  );
}
