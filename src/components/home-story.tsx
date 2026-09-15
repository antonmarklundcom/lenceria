import Image from "next/image";
import Link from "next/link";
import { t } from "@/i18n";
export function HomeStory() {
  return <section className="bg-secondary py-16 lg:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6"><div><div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl"><Image src="/img/bralette-crochet-terracota-detalle-tejido-a-mano-1280.webp" alt={t("home.story.alt")} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" /></div>
    <div><p className="text-[10px] uppercase tracking-[0.28em] text-primary"><span data-split="lines">{t("home.story.eyebrow")}</span></p><h2 className="mt-4 max-w-sm font-serif text-[34px] leading-tight font-medium"><span data-split="lines">{t("home.story.titulo")}</span></h2><p className="mt-6 text-[15px] leading-7"><span data-split="lines">{t("home.story.p1")}</span></p><p className="mt-4 text-[15px] leading-7"><span data-split="lines">{t("home.story.p2")}</span></p><Link href="/categoria/conjuntos" className="mt-6 inline-flex min-h-12 items-center text-sm underline underline-offset-8">{t("home.story.link")}</Link></div>
  </div></div></div></section>;
}