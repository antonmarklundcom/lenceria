import Link from "next/link";

import { TIENDA } from "@/config/tienda";
import { getCategories } from "@/db/queries";
import { t } from "@/i18n";
import { comercioWhatsApp } from "@/lib/comercio";
import { formatPhonePY } from "@/lib/py";

export async function SiteFooter() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    categories = await getCategories();
  } catch {
    // idem SiteHeader: el pie no debería tirar la página abajo.
  }
  const phone = comercioWhatsApp();

  return (
    <footer className="border-border mt-16 border-t bg-secondary">
      <div className="text-muted-foreground mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 text-sm sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-foreground font-serif text-xl">{TIENDA.nombre}</p>
          <p className="mt-3 max-w-xs leading-relaxed">{TIENDA.tagline}</p>
        </div>

        <div>
          <p className="text-foreground text-xs font-medium tracking-[0.16em] uppercase">
            {t("footer.categorias")}
          </p>
          <ul className="mt-3 space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/categoria/${category.slug}`} className="hover:text-primary">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-foreground text-xs font-medium tracking-[0.16em] uppercase">
            {t("footer.contacto")}
          </p>
          <ul className="mt-3 space-y-2">
            {phone ? (
              <li className="border-border bg-background flex items-center gap-3 rounded-md border px-3 py-2.5">
                <span className="border-primary text-accent-foreground flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium">
                  W
                </span>
                {t("footer.whatsapp", { telefono: formatPhonePY(phone) })}
              </li>
            ) : null}
            <li>
              <Link href="/pedido/buscar" className="hover:text-primary">
                {t("footer.seguirPedido")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
