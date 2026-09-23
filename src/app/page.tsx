import { ScrollMotion } from "@/components/scroll-motion";
import { HomeHero } from "@/components/home-hero";
import { HomeStory } from "@/components/home-story";
import { HomeHowToBuy } from "@/components/home-how-to-buy";
import { HomeWhatsappBand } from "@/components/home-whatsapp-band";
import { HomeTrustStrip } from "@/components/home-trust-strip";
import { HomeBestSellers, HomeConjuntos } from "@/components/home-best-sellers";
import { HomeCategoryShowcase } from "@/components/home-category-showcase";
import { TIENDA } from "@/config/tienda";
import { getCatalog, getCategories, type CatalogProduct } from "@/db/queries";
import { getStoreSettings } from "@/domain/store-settings";
import { linkSeguro } from "@/domain/store-settings-schema";
import { t } from "@/i18n";
import { contactoPublico } from "@/lib/comercio";
import { jsonLdScript, organizationJsonLd } from "@/lib/seo";
import { siteOrigin } from "@/lib/site-url";

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
    console.error(cause);
    error = cause instanceof Error ? cause.message : String(cause);
  }

  // El CTA del hero necesita un destino que exista; sin categorías todavía
  // —una tienda recién clonada— sale sin botón antes que llevar a un 404.
  const ctaHref = categories[0] ? `/categoria/${categories[0].slug}` : null;

  // Los ajustes del panel (`/admin/ajustes` → "Marca y portada") pisan sólo el
  // texto y el CTA del collage de esta tienda; las fotos y el slideshow son
  // piel propia y no se tocan. Sin nada cargado (o con la portada apagada),
  // el hero sale igual que siempre.
  const [ajustes, contacto] = await Promise.all([getStoreSettings(), contactoPublico()]);
  const heroOverrides = ajustes.marca.heroActivo
    ? {
        titulo: ajustes.marca.heroTitulo ?? undefined,
        texto: ajustes.marca.heroTexto ?? undefined,
        ctaLabel: ajustes.marca.heroCtaLabel ?? undefined,
        ctaHref: linkSeguro(ajustes.marca.heroCtaHref) ?? undefined,
      }
    : undefined;

  // Quién es la tienda, para Google. Sin dominio configurado no sale (ver
  // `organizationJsonLd`).
  const organizacion = organizationJsonLd({
    origin: siteOrigin(),
    name: TIENDA.nombre,
    telephone: contacto.whatsapp,
    email: contacto.email,
    sameAs: contacto.redes.map((red) => red.url),
  });

  return (
    <main>
      {organizacion ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizacion) }}
        />
      ) : null}
      <HomeHero ctaHref={ctaHref} overrides={heroOverrides} />
      <HomeTrustStrip />

      {error ? (
        <div className="border-l-primary bg-background mx-auto max-w-3xl border-l-2 p-6">
          <p className="text-sm">{t("home.errorCatalogo")}</p>
          {process.env.NODE_ENV === "production" ? (
            <p className="text-muted-foreground mt-2 text-sm">{t("home.errorCatalogo.publico")}</p>
          ) : (
            <>
              <p className="mt-1 font-mono text-xs break-all">{error}</p>
              <p className="text-muted-foreground mt-2 text-sm">{t("home.errorCatalogo.ayuda")}</p>
            </>
          )}
        </div>
      ) : (
        <>
          <HomeCategoryShowcase categories={categories} />
          <HomeBestSellers destacados={destacados} ctaHref={ctaHref} />
          <HomeStory />
          <HomeHowToBuy />
          <HomeConjuntos conjuntos={conjuntos} />
          <HomeWhatsappBand />
        </>
      )}
      <ScrollMotion />
    </main>
  );
}
