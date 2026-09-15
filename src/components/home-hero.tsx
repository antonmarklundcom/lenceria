import Link from "next/link";
import { HeroSlideshow } from "@/components/home-video-hero";
import { TIENDA, type Hero } from "@/config/tienda";
import Image from "next/image";
import { productImageUrl } from "@/lib/images";
import { comercioWaLink } from "@/lib/comercio";
import { t } from "@/i18n";

export function HomeHero(props: { ctaHref: string | null; hero?: never } | { hero: Hero; ctaHref?: never }) {
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
  const { ctaHref } = props;
  const whatsapp = comercioWaLink(t("home.whatsapp.mensaje", { tienda: TIENDA.nombre }));
  return <section className="grid bg-background px-4 pt-5 sm:px-6 lg:grid-cols-2 lg:px-0 lg:pt-0">
    <div className="lg:order-2"><HeroSlideshow /></div>
    <div className="flex flex-col justify-center py-12 lg:order-1 lg:py-20 lg:pl-[max(1.5rem,calc((100vw-1152px)/2+24px))] lg:pr-12">
      <p className="text-[10px] uppercase tracking-[0.28em] text-primary">{t("home.hero.eyebrow")}</p>
      <h1 className="mt-5 max-w-lg font-serif text-[44px] leading-[1.05] font-medium lg:text-[72px]">{t("home.hero.titulo")}</h1>
      <p className="mt-6 max-w-md text-[15px] leading-7 text-muted-foreground">{t("home.hero.texto")}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {ctaHref ? <Link href={ctaHref} className="btn-primary inline-flex min-h-12 items-center px-7 py-4">{t("home.hero.coleccion")}</Link> : null}
        {whatsapp ? <a href={whatsapp} className="inline-flex min-h-12 items-center text-sm underline decoration-primary/50 underline-offset-8">{t("home.hero.whatsapp")}</a> : null}
      </div>
    </div>
  </section>;
}
