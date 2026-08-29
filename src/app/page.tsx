import { HomeVideoHero } from "@/components/home-video-hero";
import { HomeBestSellers } from "@/components/home-best-sellers";
import { HomeCategoryShowcase } from "@/components/home-category-showcase";
import { getCatalog, getCategories, type CatalogProduct } from "@/db/queries";
import { t } from "@/i18n";

/**
 * Home. ISR: el catálogo cambia poco y las redes móviles paraguayas
 * agradecen el HTML ya armado. La disponibilidad exacta se ve en la ficha.
 */
export const revalidate = 300;

/** Categoría curada para el segundo tab de destacados — ver home-best-sellers.tsx. */
const CATEGORIA_CONJUNTOS = "conjuntos";

export default async function HomePage() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let destacados: CatalogProduct[] = [];
  let conjuntos: CatalogProduct[] = [];
  let error: string | null = null;

  try {
    [categories, destacados, conjuntos] = await Promise.all([
      getCategories(),
      getCatalog({ limit: 8 }),
      getCatalog({ categorySlug: CATEGORIA_CONJUNTOS, limit: 8 }),
    ]);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : String(cause);
  }

  // El CTA del hero necesita un destino que exista; sin categorías todavía
  // —una tienda recién clonada— sale sin botón antes que llevar a un 404.
  const ctaHref = categories[0] ? `/categoria/${categories[0].slug}` : null;

  return (
    <main>
      <HomeVideoHero ctaHref={ctaHref} />

      {error ? (
        <div className="border-l-primary bg-background mx-auto max-w-3xl border-l-2 p-6">
          <p className="text-sm">{t("home.errorCatalogo")}</p>
          <p className="mt-1 font-mono text-xs break-all">{error}</p>
          <p className="text-muted-foreground mt-2 text-sm">{t("home.errorCatalogo.ayuda")}</p>
        </div>
      ) : (
        <>
          <HomeBestSellers destacados={destacados} conjuntos={conjuntos} />
          {destacados.length === 0 ? (
            <p className="text-muted-foreground px-4 py-10 text-center text-sm">{t("home.sinProductos")}</p>
          ) : null}
          <HomeCategoryShowcase categories={categories.slice(0, 3)} />
        </>
      )}
    </main>
  );
}
