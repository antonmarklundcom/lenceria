import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { t } from "@/i18n";

const slides = [
  { src: "/img/lenceria-conjunto-nanduti-encaje-marfil-asuncion-1280.webp", alt: "home.hero.alt1" },
  { src: "/img/camison-saten-rosa-viejo-hecho-a-mano-paraguay-1280.webp", alt: "home.hero.alt2" },
  { src: "/img/kimono-gasa-marfil-flores-mburucuya-bordadas-1280.webp", alt: "home.hero.alt3" },
] as const;
export function HeroSlideshow() {
  const slide = 0;
  const playing = true;
  return <div data-slideshow className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary lg:rounded-none">
    {slides.map(({ src, alt }, index) => <Image data-slide={index} key={src} src={src} alt={t(alt)} aria-hidden={index !== slide} fill priority={index === 0} sizes="(min-width: 1024px) 50vw, 100vw" className={`object-cover motion-safe:transition-opacity motion-safe:duration-700 ${index === slide ? "opacity-100" : "opacity-0"}`} />)}
    <div className="absolute bottom-4 right-4 flex items-center rounded-full bg-foreground/60 px-2 text-white">
      {slides.map((item, index) => <button key={item.src} type="button" aria-label={t("home.hero.escena", { n: index + 1 })} aria-pressed={slide === index} data-slide-button={index} className="flex size-12 items-center justify-center rounded-full"><span className={`size-2 rounded-full ${slide === index ? "bg-white" : "bg-white/40"}`} /></button>)}
      <button type="button" aria-label={t(playing ? "home.hero.pausar" : "home.hero.reproducir")} data-slide-toggle data-pause-label={t("home.hero.pausar")} data-play-label={t("home.hero.reproducir")} className="flex size-12 items-center justify-center rounded-full"><span data-pause-icon><Pause size={16} /></span><span data-play-icon hidden><Play size={16} /></span></button>
    </div>
  </div>;
}