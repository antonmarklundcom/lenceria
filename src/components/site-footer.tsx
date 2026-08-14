import Link from "next/link";

import { TIENDA } from "@/config/tienda";
import { getCategories } from "@/db/queries";
import { comercioWhatsApp } from "@/lib/comercio";
import { formatPhonePY } from "@/lib/py";

/** Las páginas de ayuda que en este rubro deciden la compra. */
const AYUDA = [
  { href: "/guia-de-talles", label: "Guía de talles" },
  { href: "/cambios", label: "Cambios y devoluciones" },
  { href: "/envio-discreto", label: "Envío discreto" },
  { href: "/pedido/buscar", label: "Seguí tu pedido" },
];

export async function SiteFooter() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    categories = await getCategories();
  } catch {
    // idem SiteHeader: el pie no debería tirar la página abajo.
  }
  const phone = comercioWhatsApp();

  return (
    <footer className="border-border mt-24 border-t">
      <div className="text-muted-foreground mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-foreground font-display text-2xl leading-none">{TIENDA.nombre}</p>
          <p className="mt-3 max-w-[38ch] leading-relaxed">{TIENDA.tagline}</p>
        </div>

        <div>
          <p className="text-foreground text-xs font-medium tracking-[0.12em] uppercase">
            Categorías
          </p>
          <ul className="mt-4 space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/categoria/${category.slug}`} className="hover:text-foreground">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-foreground text-xs font-medium tracking-[0.12em] uppercase">Ayuda</p>
          <ul className="mt-4 space-y-2">
            {AYUDA.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-foreground text-xs font-medium tracking-[0.12em] uppercase">
            Contacto
          </p>
          <ul className="mt-4 space-y-2">
            {phone ? <li>WhatsApp {formatPhonePY(phone)}</li> : null}
            <li>Precios en guaraníes, IVA incluido.</li>
          </ul>
        </div>
      </div>

      {/* El envío discreto es argumento de venta en este rubro: va donde se lo
          ve sin buscarlo, no escondido en una página de ayuda. */}
      <div className="border-border border-t">
        <p className="text-muted-foreground mx-auto w-full max-w-6xl px-4 py-5 text-xs">
          Todos los pedidos viajan en{" "}
          <Link href="/envio-discreto" className="text-foreground underline underline-offset-4">
            empaque discreto
          </Link>
          , sin logo ni detalle del contenido por fuera.
        </p>
      </div>
    </footer>
  );
}
