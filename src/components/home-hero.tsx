import type { CSSProperties } from "react";
import Link from "next/link";
import { HeroSlideshow } from "@/components/home-video-hero";
import { TIENDA, type Hero } from "@/config/tienda";
import Image from "next/image";
import { productImageUrl } from "@/lib/images";
import { comercioWaLink } from "@/lib/comercio";
import { t } from "@/i18n";

/**
 * Título, bajada y CTA que pisan los textos de siempre del collage
 * (`/admin/ajustes` → "Marca y portada"). Las fotos y el slideshow de esta
 * tienda no se tocan — sólo el texto. `undefined` en cualquier campo deja el
 * texto de `es-PY.ts` como está.
 */
type HeroOverrides = { titulo?: string; texto?: string; ctaLabel?: string; ctaHref?: string };

export function HomeHero(
  props:
    | { ctaHref: string | null; hero?: never; overrides?: HeroOverrides }
    | { hero: Hero; ctaHref?: never; overrides?: never },
) {
  // Retain the configurable hero contract for existing consumers.
  if (props.hero) {
    const { hero } = props;
    const src = productImageUrl(hero.imagen?.cloudinaryId, "hero");
    return <section className="relative isolate overflow-hidden rounded-3xl bg-secondary p-8 sm:p-12">
      {src ? <><Image src={src} alt={hero.imagen?.alt ?? ""} fill sizes="100vw" className="-z-20 object-cover" /><div aria-hidden className="absolute inset-0 -z-10 bg-background/85" /></> : null}
      <h1 className="font-serif text-[44px] font-medium">{hero.titulo}</h1>
      {hero.texto ? <p className="mt-4 text-sm">{hero.texto}</p> : null}
      {hero.cta ? <Link href={hero.cta.href} className="btn-primary mt-6 inline-flex min-h-12 items-center px-7 py-4">{hero.cta.label}</Link> : null}
    </section>;
  }
  const { ctaHref, overrides } = props;
  const whatsapp = comercioWaLink(t("home.whatsapp.mensaje", { tienda: TIENDA.nombre }));
  const titulo = overrides?.titulo ?? t("home.hero.titulo");
  const texto = overrides?.texto ?? t("home.hero.texto");
  const coleccionLabel = overrides?.ctaLabel ?? t("home.hero.coleccion");
  const coleccionHref = overrides?.ctaHref ?? ctaHref;
  return <div data-hero-scroll><section data-hero-stage className="grid bg-background px-4 pt-5 sm:px-6 lg:grid-cols-2 lg:px-0 lg:pt-0">
    <div className="lg:order-2"><HeroSlideshow /></div>
    <div className="flex flex-col justify-center py-12 lg:order-1 lg:py-20 lg:pl-[max(1.5rem,calc((100vw-1152px)/2+24px))] lg:pr-12">
      <p data-reveal="load" data-hero-exit="0" style={{ "--i": 0 } as CSSProperties} className="text-[10px] uppercase tracking-[0.28em] text-primary">{t("home.hero.eyebrow")}</p>
      <h1 data-reveal="load" data-hero-exit="1" style={{ "--i": 1 } as CSSProperties} className="mt-5 max-w-lg font-serif text-[44px] leading-[1.05] font-medium lg:text-[72px]">{titulo}</h1>
      <p data-reveal="load" data-hero-exit="2" style={{ "--i": 2 } as CSSProperties} className="mt-6 max-w-md text-[15px] leading-7 text-muted-foreground">{texto}</p>
      <div data-reveal="load" data-hero-exit="3" style={{ "--i": 3 } as CSSProperties} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {coleccionHref ? <Link href={coleccionHref} className="btn-primary inline-flex min-h-12 items-center px-7 py-4">{coleccionLabel}</Link> : null}
        {whatsapp ? <a href={whatsapp} className="inline-flex min-h-12 items-center text-sm underline decoration-primary/50 underline-offset-8">{t("home.hero.whatsapp")}</a> : null}
      </div>
    </div>
  </section></div>;
}
