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
    <footer className="border-border mt-16 border-t bg-secondary text-[#6B5450]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <p className="font-serif text-[22px]">{TIENDA.nombre}</p>
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
            {t("footer.ayuda")}
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/pedido/buscar" className="hover:text-primary">
                {t("footer.seguirPedido")}
              </Link>
            </li>
            <li>{t("footer.envios")}</li>
            <li>{t("footer.cambios")}</li>
          </ul>
        </div>
        {phone ? (
          <div className="flex items-center gap-3 self-start rounded-2xl bg-white p-4">
            <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] font-bold text-white">{t("footer.whatsappBadge")}</span>
            <div>
              <p>{t("footer.whatsapp", { telefono: formatPhonePY(phone) })}</p>
              <p className="mt-1 text-xs">{t("footer.horarios")}</p>
            </div>
          </div>
        ) : null}
      </div>
      <p className="mx-auto max-w-6xl border-t border-border px-4 py-6 text-center text-xs sm:px-6">{t("footer.copyright", { nombre: TIENDA.nombre })}</p>
    </footer>
  );
}
