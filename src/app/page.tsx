import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getCatalog, getCategories, type CatalogProduct } from "@/db/queries";
import { categoryPlaceholderSrc } from "@/lib/images";

/**
 * Home. ISR: el catálogo cambia poco y las redes móviles paraguayas
 * agradecen el HTML ya armado. La disponibilidad exacta se ve en la ficha.
 *
 * Composición (skill web-design-system, track EDITORIAL — sin colores nuevos:
 * sólo los tokens de `globals.css`, un acento vino y su blush):
 *
 *   1. Hero          P1 split asimétrico 7/5 · imagen arriba en mobile
 *   2. Categorías    grilla de fichas 3:4 con el nombre encima — es la
 *                    navegación real de este rubro, por eso va arriba de todo
 *   3. Confianza     P8 cinta a sangre, cuatro hechos
 *   4. Destacados    grilla con el card de producto de siempre
 *   5. Guía          P9 declaración grande sobre blush, a sangre
 *   6. Envío         P1 espejado 5/7 con el hueco de la foto real
 *
 * Casi todo el tráfico entra desde el navegador de Instagram en un teléfono:
 * el orden de arriba es el orden en que se scrollea con el pulgar, y no hay
 * carrusel ni animación de entrada que retrase el primer pintado.
 *
 * Fotos: todavía no hay ninguna. Cada hueco muestra la ilustración de
 * `public/placeholders/` —la misma que usa el resto del sitio, que dice "Foto
 * próximamente"— y está marcado acá abajo con `SLOT`. No se inventan imágenes
 * de producto.
 */
export const revalidate = 300;

/** Las cuatro objeciones que en lencería se responden antes de la compra. */
const CONFIANZA: { titulo: string; detalle: string; href?: string }[] = [
  {
    titulo: "Envío discreto",
    detalle: "Empaque opaco, sin logo ni detalle del contenido por fuera.",
    href: "/envio-discreto",
  },
  {
    titulo: "Cambio de talle en 7 días",
    detalle: "Sin uso, con la etiqueta puesta y en su empaque.",
    href: "/cambios",
  },
  {
    titulo: "Guía de talles",
    detalle: "Dos medidas con una cinta y sabés qué pedir.",
    href: "/guia-de-talles",
  },
  {
    titulo: "Pagás como quieras",
    detalle: "Transferencia, QR o contra entrega. IVA incluido.",
  },
];

export default async function HomePage() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let featured: CatalogProduct[] = [];
  let error: string | null = null;

  try {
    [categories, featured] = await Promise.all([getCategories(), getCatalog({ limit: 8 })]);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : String(cause);
  }

  // El botón del hero manda a la primera categoría; sin base todavía, a la
  // grilla de más abajo.
  const heroHref = categories[0] ? `/categoria/${categories[0].slug}` : "#categorias";

  return (
    <main>
      {/* --- 1. Hero -------------------------------------------------------- */}
      <section className="border-border/60 border-b">
        <div className="mx-auto grid w-full max-w-6xl min-h-[62vh] grid-cols-1 items-center gap-10 px-4 pt-6 pb-14 sm:min-h-[64vh] lg:min-h-[74vh] lg:grid-cols-12 lg:gap-14 lg:py-20">
          {/* SLOT hero — foto de campaña, 4:5 vertical. Hoy, ilustración. */}
          <div className="relative lg:col-span-5 lg:order-2">
            <div className="bg-accent relative h-[34vh] w-full overflow-hidden rounded-lg sm:h-[38vh] lg:aspect-[4/5] lg:h-auto">
              <Image
                src="/placeholders/conjuntos.svg"
                alt="Conjunto de lencería (foto de campaña próximamente)"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-contain p-8"
              />
            </div>
            <p className="border-border bg-background text-muted-foreground absolute -bottom-3 left-4 rounded-md border px-3 py-1.5 text-xs">
              Todos los pedidos salen en empaque discreto
            </p>
          </div>

          <div className="lg:col-span-7 lg:order-1">
            <p className="eyebrow">Lencería online en Paraguay</p>
            <h1 className="mt-3 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Para todos los días y para los que no lo son.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-[52ch] text-base leading-relaxed sm:text-lg">
              Precios en guaraníes con IVA incluido, envío discreto a todo el país y
              cambio de talle sin vueltas. Si dudás entre dos talles, escribinos antes
              de comprar.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href={heroHref}>Ver la colección</Link>
            </Button>
          </div>
        </div>
      </section>

      {error ? (
        <div className="border-border border-l-primary mx-auto mt-8 w-full max-w-6xl rounded-lg border border-l-2 p-4">
          <p className="text-sm">No pude leer el catálogo:</p>
          <p className="mt-1 font-mono text-xs break-all">{error}</p>
          <p className="text-muted-foreground mt-2 text-sm">
            Levantá la base con <code>docker compose up -d</code>, después{" "}
            <code>pnpm db:push &amp;&amp; pnpm db:seed</code>.
          </p>
        </div>
      ) : null}

      {/* --- 2. Categorías -------------------------------------------------- */}
      {categories.length > 0 ? (
        <section id="categorias" className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
          <p className="eyebrow">El catálogo</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Por dónde empezar</h2>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
                className="group focus-visible:ring-ring relative block aspect-3/4 overflow-hidden rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {/* SLOT categoría — foto vertical 3:4. Hoy, ilustración. */}
                <Image
                  src={categoryPlaceholderSrc(category.slug)}
                  alt={`${category.name} (sin foto todavía)`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                {/* El nombre va encima de la foto: sin este velo no se lee. */}
                <div className="from-foreground/80 via-foreground/25 absolute inset-0 bg-gradient-to-t to-transparent" />
                <h3 className="text-background absolute inset-x-0 bottom-0 p-3 text-xl sm:p-5 sm:text-2xl">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* --- 3. Confianza --------------------------------------------------- */}
      <section aria-label="Cómo comprás" className="bg-secondary border-border/60 border-y">
        <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:py-12 lg:grid-cols-4 lg:gap-x-10">
          {CONFIANZA.map((item) => (
            <li key={item.titulo}>
              <p className="text-sm font-medium sm:text-base">
                {item.href ? (
                  <Link href={item.href} className="underline-offset-4 hover:underline">
                    {item.titulo}
                  </Link>
                ) : (
                  item.titulo
                )}
              </p>
              <p className="text-muted-foreground mt-1.5 max-w-[32ch] text-sm leading-relaxed">
                {item.detalle}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* --- 4. Destacados -------------------------------------------------- */}
      {featured.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
          <p className="eyebrow">Selección</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Destacados</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : error ? null : (
        <section className="mx-auto w-full max-w-6xl px-4 py-14">
          <p className="text-muted-foreground text-sm">
            Todavía no hay productos publicados. Sembrá el catálogo con{" "}
            <code>pnpm db:seed</code>.
          </p>
        </section>
      )}

      {/* --- 5. Guía de talles ---------------------------------------------- */}
      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-24">
          <p className="eyebrow">Antes de comprar</p>
          <h2 className="mt-3 max-w-[18ch] text-4xl sm:text-6xl lg:text-7xl">
            El talle correcto se mide, no se adivina.
          </h2>
          <p className="mt-6 max-w-[58ch] text-base leading-relaxed sm:text-lg">
            Dos medidas con una cinta de costura y ya sabés qué pedir — corpiño y
            bombacha, con la tabla de conversión al lado. Y si dudás entre dos talles,
            preguntanos antes de comprar: sale más barato que un cambio.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/guia-de-talles">Ver la guía de talles</Link>
          </Button>
        </div>
      </section>

      {/* --- 6. Envío discreto ---------------------------------------------- */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* SLOT foto real del paquete cerrado, 4:3. Va una foto de verdad del
              empaque que usa el comercio — no una ilustración ni un render: es
              la prueba de una promesa operativa (ver /envio-discreto). */}
          <div className="lg:col-span-5">
            <div className="border-border bg-muted flex aspect-4/3 items-center justify-center rounded-lg border border-dashed p-8">
              <Image
                src="/placeholders/generico.svg"
                alt="El paquete cerrado, tal como te llega (foto próximamente)"
                width={240}
                height={240}
                className="h-full w-auto max-w-full object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow">Cómo te llega</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">
              Nadie tiene por qué saber qué pediste
            </h2>
            <p className="text-muted-foreground mt-5 max-w-[62ch] text-base leading-relaxed">
              Todos los pedidos salen en empaque opaco, sin logo y sin ninguna imagen.
              Por fuera van tu nombre, tu teléfono y tu dirección — nada más. El detalle
              de lo que compraste viaja adentro, en un sobre cerrado, y el repartidor
              tampoco sabe qué lleva.
            </p>
            <p className="text-muted-foreground mt-4 max-w-[62ch] text-base leading-relaxed">
              No es un extra que se pide ni que se paga aparte: es como sale todo,
              siempre, sin que tengas que aclarar nada.
            </p>
            <Link
              href="/envio-discreto"
              className="text-primary mt-6 inline-block text-sm underline underline-offset-4"
            >
              Cómo viaja tu pedido
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
