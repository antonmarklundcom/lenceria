import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n";

const cutouts = [
  { name: "ramito-lavanda-seca", width: 490, height: 972, from: "left", speed: .46, tau: 5, tilt: -8, position: "left-[3%] top-[8%] z-20" },
  { name: "encaje-nanduti-medallon-itaugua", width: 640, height: 636, from: "top", speed: .30, tau: 7, tilt: 6, position: "left-[24%] top-[4%] z-0 lg:left-[44%]" },
  { name: "flor-mburucuya-pasionaria", width: 720, height: 723, from: "right", speed: .60, tau: 4, tilt: 4, position: "right-[4%] top-[22%] z-20" },
  { name: "bordado-ao-poi-algodon", width: 720, height: 630, from: "bottom", speed: .18, tau: 8, tilt: 10, position: "right-[25%] bottom-[6%] z-0 lg:right-[8%]" },
  { name: "mono-saten-marfil", width: 720, height: 633, from: "bottom", speed: .42, tau: 6, tilt: -5, position: "left-[16%] bottom-[4%] z-20 lg:left-[40%]" },
];

export function HomeStory() {
  return <section data-story-collage className="relative isolate overflow-x-clip bg-secondary py-16 lg:py-48">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-3xl"><Image src="/img/bralette-crochet-terracota-detalle-tejido-a-mano-1280.webp" alt={t("home.story.alt")} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" /></div>
        <div aria-hidden="true" className="pointer-events-none relative h-[200px] lg:static lg:h-0">
          {cutouts.map((item, k) => <Image key={item.name} data-collage data-reveal="collage" data-from={item.from} data-speed={item.speed} data-tau={item.tau} data-tilt={item.tilt} data-k={k} src={`/img/recorte-${item.name}.webp`} alt="" aria-hidden="true" style={item.name === "flor-mburucuya-pasionaria" ? { transform: "scaleX(-1)" } : undefined} loading="lazy" unoptimized width={item.width} height={item.height} className={`absolute h-auto max-h-[106.667px] w-auto max-w-[106.667px] object-contain lg:max-h-[160px] lg:max-w-[160px] ${item.position}`} />)}
        </div>
        <div className="relative z-10 lg:col-start-2 lg:row-start-1 lg:pr-48"><p className="text-[10px] uppercase tracking-[0.28em] text-primary"><span data-split="lines">{t("home.story.eyebrow")}</span></p><h2 className="mt-4 max-w-sm font-serif text-[34px] leading-tight font-medium"><span data-split="lines">{t("home.story.titulo")}</span></h2><p className="mt-6 text-[15px] leading-7"><span data-split="lines">{t("home.story.p1")}</span></p><p className="mt-4 text-[15px] leading-7"><span data-split="lines">{t("home.story.p2")}</span></p><Link href="/categoria/conjuntos" className="mt-6 inline-flex min-h-12 items-center text-sm underline underline-offset-8">{t("home.story.link")}</Link></div>
      </div>
    </div>
  </section>;
}
