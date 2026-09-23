import Link from "next/link";

import { PriceTag } from "@/components/price-tag";
import { RatingStars, formatRating } from "@/components/rating-stars";
import { ProductImage } from "@/components/product-image";
import { StockBadge } from "@/components/stock-badge";
import { WishlistButton } from "@/components/wishlist-button";
import type { CatalogProduct } from "@/db/queries";
import { t, tPlural } from "@/i18n";
import { TESTIDS } from "@/lib/testids";

export function ProductCard({
  product,
  priority = false,
  showRating = false,
}: {
  product: CatalogProduct;
  priority?: boolean;
  /** Estrellas bajo el nombre (Ajustes → Vidriera); las páginas de listado lo pasan. */
  showRating?: boolean;
}) {
  // El precio "desde" es el de la variante más barata disponible; si no hay
  // ninguna con stock, igual mostramos el más barato para no dejar el card mudo.
  const inStock = product.variants.filter((variant) => variant.available > 0);
  const shown = (inStock.length > 0 ? inStock : product.variants).reduce<
    CatalogProduct["variants"][number] | undefined
  >((cheapest, variant) => (!cheapest || variant.pricePyg < cheapest.pricePyg ? variant : cheapest), undefined);

  const totalAvailable = product.variants.reduce((total, variant) => total + variant.available, 0);
  const hasVariantRange = product.variants.length > 1;

  return (
    <Link
      href={`/producto/${product.slug}`}
      data-testid={TESTIDS.productCard}
      data-slug={product.slug}
      className="group focus-visible:ring-ring flex flex-col rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="relative">
        <ProductImage
          image={product.image}
          alt={product.name}
          categorySlug={product.categorySlug}
          priority={priority}
          className="aspect-[3/4] rounded-2xl border border-border overflow-hidden"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <WishlistButton slug={product.slug} name={product.name} sku={shown?.sku} pricePyg={shown?.pricePyg} />
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1 text-left">
        <p className="text-muted-foreground text-[9px] uppercase tracking-[0.14em]">{product.brand ?? product.categoryName}</p>
        <h3 className="line-clamp-2 font-sans text-sm">{product.name}</h3>
        {showRating && product.rating && product.rating.count >= 1 ? (
          <p className="text-muted-foreground flex items-center gap-1 text-xs">
            <RatingStars value={product.rating.average} size={12} />
            <span aria-hidden>{formatRating(product.rating.average)}</span>
            <span>({tPlural("catalogo.resenas", product.rating.count)})</span>
          </p>
        ) : null}

        <div className="mt-auto flex flex-col items-start gap-1.5 pt-2">
          {shown ? <PriceTag pricePyg={shown.pricePyg} compareAtPyg={shown.compareAtPyg} size="sm" className="[&_.font-semibold]:font-bold [&_.text-emerald-400]:text-accent-foreground" /> : null}
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground [&_[data-slot=badge]]:border-0 [&_[data-slot=badge]]:bg-transparent [&_[data-slot=badge]]:p-0 [&_[data-slot=badge]]:text-[10px] [&_[data-slot=badge]]:text-muted-foreground">
            <StockBadge available={totalAvailable} />
            {hasVariantRange ? (
              <span className="text-muted-foreground text-[10px]">
                {t("catalogo.opciones", { n: product.variants.length })}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl">
      <div className="bg-muted mb-2 h-3 w-1/3 animate-pulse rounded" />
      <div className="bg-muted aspect-[3/4] animate-pulse rounded-2xl border border-border" />
      <div className="mt-3 space-y-2">
        <div className="bg-muted h-4 w-4/5 animate-pulse rounded" />
        <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
      </div>
    </div>
  );
}
