"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";

import { useInView } from "@/hooks/use-in-view";

const SLIDE_MS = 5000;

// Placeholders autohospedados (public/placeholders/) a reemplazar por
// fotografía propia una vez elegida la dirección (ver conversación de
// diseño).
const HERO_IMAGE = "/placeholders/generico.svg";

const HERO_SLIDES = [
  "/placeholders/corpinos.svg",
  "/placeholders/conjuntos.svg",
  "/placeholders/pijamas.svg",
];

function HeroSlideshow() {
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  return (
    <div className="relative min-h-[40vh] w-full overflow-hidden bg-black lg:min-h-0 lg:w-1/2">
      {HERO_SLIDES.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-opacity duration-700 ${
            index === slide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute right-6 bottom-6 z-20 flex items-center gap-3">
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Escena ${index + 1}`}
              onClick={() => setSlide(index)}
              className={`h-2 w-2 rounded-full transition-transform ${
                index === slide ? "scale-125 bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={playing ? "Pausar" : "Reproducir"}
          onClick={() => setPlaying((value) => !value)}
          className="flex size-8 items-center justify-center rounded-full border border-white/50 text-white"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
    </div>
  );
}

export function HomeVideoHero({ ctaHref }: { ctaHref: string | null }) {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section className="relative flex min-h-screen flex-col lg:flex-row">
      <div className="relative min-h-[60vh] w-full overflow-hidden lg:min-h-0 lg:w-1/2">
        <Image src={HERO_IMAGE} alt="" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/25" aria-hidden />

        <div
          ref={ref}
          className={`relative z-10 flex h-full flex-col justify-end px-6 pt-32 pb-16 transition-all duration-1000 sm:px-10 sm:pb-20 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="mb-6 font-serif text-4xl leading-[1.1] font-medium text-white sm:text-5xl lg:text-[clamp(3rem,4.5vw,5.5rem)]">
            seda que abriga,
            <br />
            <span className="relative inline-block">
              encaje que enamora.
              <svg
                className="absolute -bottom-1 left-0 h-4 w-full"
                viewBox="0 0 300 20"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M0 10 Q 37.5 2, 75 10 T 150 10 T 225 10 T 300 10" stroke="#c6a667" strokeWidth="2" />
                <path d="M0 14 Q 37.5 8, 75 14 T 150 14 T 225 14 T 300 14" stroke="#c6a667" strokeWidth="1.5" />
                <path d="M0 17 Q 37.5 13, 75 17 T 150 17 T 225 17 T 300 17" stroke="#c6a667" strokeWidth="1" />
              </svg>
            </span>
          </h1>

          <p className="mb-10 max-w-md text-sm text-white/80 sm:text-base">
            Piezas seleccionadas para acompañarte todos los días, no sólo los especiales.
          </p>

          {ctaHref ? (
            <Link
              href={ctaHref}
              className="btn-primary self-start rounded-full bg-white px-10 py-4 text-sm text-black"
            >
              ver colección
            </Link>
          ) : null}
        </div>
      </div>

      <HeroSlideshow />
    </section>
  );
}
