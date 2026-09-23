import Link from "next/link";

import { TIENDA } from "@/config/tienda";
import { getCategories } from "@/db/queries";
import { getStoreSettings } from "@/domain/store-settings";
import { t } from "@/i18n";
import { contactoPublico } from "@/lib/comercio";
import { paginasActivas } from "@/lib/paginas";
import { formatPhonePY } from "@/lib/py";

const NOMBRE_RED = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
} as const;

export async function SiteFooter() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    categories = await getCategories();
  } catch {
    // idem SiteHeader: el pie no debería tirar la página abajo.
  }
  // Los tres de abajo no tiran: sin base, los ajustes son los de siempre.
  const [ajustes, contacto, paginas] = await Promise.all([
    getStoreSettings(),
    contactoPublico(),
    paginasActivas(),
  ]);
  const tagline = ajustes.marca.tagline ?? TIENDA.tagline;

  return (
    <footer className="border-border mt-16 border-t bg-secondary text-[#6B5450]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <p className="font-serif text-[22px]">{TIENDA.nombre}</p>
          <p className="mt-3 max-w-xs leading-relaxed">{tagline}</p>
          {contacto.redes.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3" aria-label={t("footer.redes")}>
              {contacto.redes.map((red) => (
                <li key={red.red}>
                  <a
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary underline-offset-2 hover:underline"
                  >
                    {NOMBRE_RED[red.red]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
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
            {contacto.whatsapp ? (
              <li>{t("footer.whatsapp", { telefono: formatPhonePY(contacto.whatsapp) })}</li>
            ) : null}
            {contacto.email ? (
              <li>
                <a href={`mailto:${contacto.email}`} className="hover:text-primary">
                  {contacto.email}
                </a>
              </li>
            ) : null}
            {contacto.direccion ? <li>{contacto.direccion}</li> : null}
            {contacto.horario ? <li>{contacto.horario}</li> : null}
            <li>
              <Link href="/pedido/buscar" className="hover:text-primary">
                {t("footer.seguirPedido")}
              </Link>
            </li>
          </ul>
        </div>

        {paginas.length > 0 ? (
          <div>
            <p className="text-foreground text-xs font-medium tracking-[0.16em] uppercase">
              {t("footer.ayuda")}
            </p>
            <ul className="mt-3 space-y-2">
              {paginas.map((pagina) => (
                <li key={pagina.slug}>
                  <Link href={`/${pagina.slug}`} className="hover:text-primary">
                    {pagina.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <p className="mx-auto max-w-6xl border-t border-border px-4 py-6 text-center text-xs sm:px-6">{t("footer.copyright", { nombre: TIENDA.nombre })}</p>
    </footer>
  );
}
