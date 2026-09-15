import Image from "next/image";
import Link from "next/link";
import { categoryTileSrc, categoryTileAlt } from "@/lib/images";
import { HomeFade } from "@/components/home-video-hero";
import { t } from "@/i18n";

export function HomeCategoryShowcase({ categories }: { categories: readonly { id: number; slug: string; name: string }[] }) {
  return <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20"><HomeFade>
    <h2 className="font-serif text-[30px] font-medium">{t("home.categorias.titulo")}</h2>
    <p className="mt-2 text-sm text-muted-foreground">{t("home.categorias.texto")}</p>
    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {categories.map((category) => <Link key={category.id} href={`/categoria/${category.slug}`} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
        <Image src={categoryTileSrc(category.slug)} alt={categoryTileAlt(category.slug)} fill sizes="(min-width: 1024px) 270px, 50vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
        <span className="absolute inset-x-0 bottom-0 p-4 text-xs uppercase tracking-[0.06em] text-white sm:p-5">{category.name}</span>
      </Link>)}
    </div>
  </HomeFade></section>;
}