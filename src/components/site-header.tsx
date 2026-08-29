import { Suspense } from "react";
import Link from "next/link";
import { User } from "lucide-react";

import { TIENDA } from "@/config/tienda";
import { CartButton } from "@/components/cart-button";
import { CuentaHeaderEntry } from "@/components/cuenta/header-entry";
import { MobileMenu } from "@/components/mobile-menu";
import { SearchBox } from "@/components/search-box";
import { getCategories } from "@/db/queries";
import { freeShippingWithoutZone } from "@/domain/free-shipping";
import { listShippingZones } from "@/domain/shipping";
import { t } from "@/i18n";
import { formatGs } from "@/lib/money";

/**
 * El anuncio de arriba de todo. El monto de envío gratis nunca se inventa: si
 * las zonas activas no coinciden en un umbral —o no hay ninguna con
 * envío gratis— no hay número honesto que mostrar, y cae al tagline de
 * `tienda.ts` en su lugar. Ver `src/domain/free-shipping.ts`.
 */
async function AnnouncementText() {
  let zones: Awaited<ReturnType<typeof listShippingZones>> = [];
  try {
    zones = await listShippingZones();
  } catch {
    return <>{TIENDA.tagline}</>;
  }

  const progress = freeShippingWithoutZone(zones, 0);
  if (progress.kind === "sin_umbral") return <>{TIENDA.tagline}</>;

  return <>{t("header.envioGratisDesde", { monto: formatGs(progress.thresholdPyg) })}</>;
}

export async function SiteHeader() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    categories = await getCategories();
  } catch {
    // Sin base todavía: el header se dibuja igual, sin el menú.
  }

  return (
    <header className="bg-background text-foreground sticky top-0 z-30">
      <div className="border-border/60 bg-secondary border-b px-4 py-2.5 text-center text-xs sm:py-3">
        <Suspense fallback={TIENDA.tagline}>
          <AnnouncementText />
        </Suspense>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-serif text-lg tracking-[0.06em] sm:text-xl"
        >
          {TIENDA.nombre}
        </Link>

        <nav aria-label={t("header.categorias")} className="ml-8 hidden gap-7 md:flex">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="text-muted-foreground hover:text-foreground group relative text-sm tracking-wide transition-colors"
            >
              {category.name}
              <span className="bg-primary absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Suspense fallback={null}>
            <SearchBox className="hidden w-full max-w-sm sm:block" />
          </Suspense>
          <Suspense fallback={null}>
            <CuentaHeaderEntry />
          </Suspense>
          <User size={18} className="text-muted-foreground hidden sm:block" aria-hidden />
          <CartButton />
          <MobileMenu categories={categories} />
        </div>
      </div>

      <div className="border-border/60 border-t px-4 py-2 sm:hidden">
        <Suspense fallback={null}>
          <SearchBox />
        </Suspense>
      </div>
    </header>
  );
}
