"use client";
import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { t } from "@/i18n";

export function HomeFade({ children }: { children: ReactNode }) {
  const { ref, isVisible } = useInView<HTMLDivElement>(0.05);
  return <div ref={ref} className={`motion-safe:transition-[opacity,transform] motion-safe:duration-700 ${isVisible ? "" : "motion-safe:translate-y-3 motion-safe:opacity-0"}`}>{children}</div>;
}
const slides = [
  { src: "/img/lenceria-conjunto-nanduti-encaje-marfil-asuncion-1280.webp", alt: "home.hero.alt1" },
  { src: "/img/camison-saten-rosa-viejo-hecho-a-mano-paraguay-1280.webp", alt: "home.hero.alt2" },
  { src: "/img/kimono-gasa-marfil-flores-mburucuya-bordadas-1280.webp", alt: "home.hero.alt3" },
] as const;
export function HeroSlideshow() {
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setSlide((value) => (value + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [playing]);
  return <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary lg:rounded-none">
    {slides.map(({ src, alt }, index) => <Image key={src} src={src} alt={t(alt)} aria-hidden={index !== slide} fill priority={index === 0} sizes="(min-width: 1024px) 50vw, 100vw" className={`object-cover motion-safe:transition-opacity motion-safe:duration-700 ${index === slide ? "opacity-100" : "opacity-0"}`} />)}
    <div className="absolute bottom-4 right-4 flex items-center rounded-full bg-foreground/60 px-2 text-white">
      {slides.map((item, index) => <button key={item.src} type="button" aria-label={t("home.hero.escena", { n: index + 1 })} aria-pressed={slide === index} onClick={() => setSlide(index)} className="flex size-12 items-center justify-center rounded-full"><span className={`size-2 rounded-full ${slide === index ? "bg-white" : "bg-white/40"}`} /></button>)}
      <button type="button" aria-label={t(playing ? "home.hero.pausar" : "home.hero.reproducir")} onClick={() => setPlaying((value) => !value)} className="flex size-12 items-center justify-center rounded-full">{playing ? <Pause size={16} /> : <Play size={16} />}</button>
    </div>
  </div>;
}