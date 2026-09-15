import type { CSSProperties } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import type { CatalogProduct } from "@/db/queries";
import { t } from "@/i18n";

export function HomeBestSellers({ destacados, ctaHref }: { destacados: CatalogProduct[]; ctaHref: string | null }) {
  return <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24"><div>
    <div className="mb-8 flex items-center justify-between gap-4"><h2 data-reveal="scroll" className="font-serif text-[30px] font-medium">{t("home.destacados")}</h2>{ctaHref ? <Link href={ctaHref} className="inline-flex min-h-12 items-center text-[11px] uppercase tracking-widest text-primary">{t("home.verTodo")}</Link> : null}</div>
    {destacados.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">{destacados.slice(0, 8).map((product, index) => <div data-reveal="card" style={{ "--i": index % 4 } as CSSProperties} key={product.id} className="min-w-0"><ProductCard product={product} /></div>)}</div> : <p className="py-10 text-center text-sm text-muted-foreground">{t("home.sinProductos")}</p>}
  </div></section>;
}
export function HomeConjuntos({ conjuntos }: { conjuntos: CatalogProduct[] }) {
  if (!conjuntos.length) return null;
  return <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24"><div>
    <div className="mb-8 flex items-center justify-between gap-4"><h2 data-reveal="scroll" className="font-serif text-[30px] font-medium">{t("home.conjuntos")}</h2><Link href="/categoria/conjuntos" className="inline-flex min-h-12 items-center text-[11px] uppercase tracking-widest text-primary">{t("home.verTodos")}</Link></div>
    <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5">{conjuntos.map((product, index) => <div data-reveal="card" style={{ "--i": index % 4 } as CSSProperties} key={product.id} className="w-64 shrink-0 snap-start"><ProductCard product={product} /></div>)}</div>
  </div></section>;
}