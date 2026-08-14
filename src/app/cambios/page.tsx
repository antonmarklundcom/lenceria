import type { Metadata } from "next";
import Link from "next/link";

import { comercioWaLink } from "@/lib/comercio";

/**
 * Cambios y devoluciones.
 *
 * En lencería la regla de higiene no es un capricho del comercio: hay prendas
 * que directamente no se pueden volver a vender. Decirlo antes de la compra —y
 * decirlo claro, no escondido en un pie de página— evita el reclamo que empieza
 * con "nadie me avisó".
 */
export const metadata: Metadata = {
  title: "Cambios y devoluciones",
  description:
    "Qué se puede cambiar y qué no, por qué, y cómo pedir un cambio de talle. Prendas sin uso, con etiqueta y en su empaque.",
};

export default function CambiosPage() {
  const waHref = comercioWaLink(
    "¡Hola! Quiero hacer un cambio. Mi número de pedido es:"
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="eyebrow">Después de comprar</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Cambios y devoluciones</h1>
      <p className="text-muted-foreground mt-4 max-w-[65ch] text-base leading-relaxed">
        Si le erraste al talle, te lo cambiamos. Lo que sigue es exactamente qué
        entra, qué no y por qué — sin letra chica.
      </p>

      {/* --- Sí / No -------------------------------------------------------- */}
      <section className="mt-12 grid gap-5 sm:grid-cols-2">
        <div className="border-border rounded-lg border p-5">
          <p className="font-medium">Se cambia</p>
          <ul className="text-muted-foreground mt-3 grid gap-2 text-sm leading-relaxed">
            <li>· Corpiños</li>
            <li>· Conjuntos (completos, con todas sus piezas)</li>
            <li>· Bodies</li>
            <li>· Pijamas, camisones y batas</li>
          </ul>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Siempre <strong className="text-foreground">sin uso</strong>, con la
            etiqueta puesta y en su empaque original.
          </p>
        </div>

        <div className="border-border rounded-lg border p-5">
          <p className="font-medium">No se cambia</p>
          <ul className="text-muted-foreground mt-3 grid gap-2 text-sm leading-relaxed">
            <li>· Bombachas, colaless y vedetinas</li>
            <li>· Medias, can-can y soquetes</li>
            <li>· Cualquier prenda con la etiqueta cortada</li>
            <li>· Packs abiertos</li>
          </ul>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Por higiene, y sin excepciones. Un pack cerrado y sin abrir sí se puede
            cambiar.
          </p>
        </div>
      </section>

      {/* --- Condiciones ---------------------------------------------------- */}
      <section className="mt-12">
        <h2 className="text-3xl">Las condiciones</h2>
        <dl className="mt-6 grid gap-6 text-sm leading-relaxed">
          <div>
            <dt className="font-medium">Tenés 7 días corridos</dt>
            <dd className="text-muted-foreground mt-1">
              Se cuentan desde que recibís el pedido. Escribinos dentro de esos 7
              días aunque después coordinemos la entrega para más adelante.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Sin uso, con etiqueta, en su empaque</dt>
            <dd className="text-muted-foreground mt-1">
              Probártela por encima de tu ropa interior está perfecto y es lo que
              recomendamos. Lo que no podemos aceptar es una prenda usada, lavada,
              perfumada o con la etiqueta cortada: no se puede volver a vender y no
              se la vamos a vender a nadie más.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Es un cambio, no una devolución de plata</dt>
            <dd className="text-muted-foreground mt-1">
              Cambiás por otro talle, otro color u otro producto. Si el nuevo cuesta
              más, pagás la diferencia; si cuesta menos, te queda a favor para tu
              próxima compra. Devolvemos el dinero sólo cuando la prenda vino
              fallada y no tenemos con qué reemplazarla.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Falla de fábrica</dt>
            <dd className="text-muted-foreground mt-1">
              Una costura abierta, un aro salido, un broche que no cierra: eso lo
              cubrimos nosotros, incluido el envío, y no cuenta contra las reglas de
              higiene de arriba. Mandanos una foto por WhatsApp y lo resolvemos. Es
              además tu derecho como consumidora bajo la Ley 1334/98 de Defensa del
              Consumidor.
            </dd>
          </div>
          <div>
            <dt className="font-medium">El envío del cambio</dt>
            <dd className="text-muted-foreground mt-1">
              Si el cambio es porque te erraste el talle, el envío de ida y vuelta
              corre por tu cuenta. Si el error fue nuestro —te mandamos otra cosa o
              vino fallada— lo pagamos nosotros.
            </dd>
          </div>
        </dl>
      </section>

      {/* --- Cómo se hace --------------------------------------------------- */}
      <section className="mt-12">
        <h2 className="text-3xl">Cómo se hace</h2>
        <ol className="mt-6 grid gap-4 text-sm leading-relaxed">
          <li className="flex gap-4">
            <span className="text-primary font-display text-2xl leading-none">1</span>
            <span className="text-muted-foreground">
              Escribinos por WhatsApp con tu número de pedido y qué querés cambiar.
              Si es una falla, sumá una foto.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-display text-2xl leading-none">2</span>
            <span className="text-muted-foreground">
              Te confirmamos si hay stock del talle que necesitás y coordinamos el
              retiro o el punto de entrega.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="text-primary font-display text-2xl leading-none">3</span>
            <span className="text-muted-foreground">
              Revisamos la prenda y te mandamos el cambio, en el mismo{" "}
              <Link href="/envio-discreto" className="text-primary underline underline-offset-4">
                empaque discreto
              </Link>{" "}
              de siempre.
            </span>
          </li>
        </ol>
      </section>

      <section className="border-border mt-12 border-t pt-8">
        <p className="text-muted-foreground text-sm leading-relaxed">
          La mejor forma de no necesitar nada de esto es acertarle al talle a la
          primera. Nuestra{" "}
          <Link href="/guia-de-talles" className="text-primary underline underline-offset-4">
            guía de talles
          </Link>{" "}
          se toma dos minutos, y si dudás entre dos, preguntanos antes de comprar.
        </p>

        {waHref ? (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground mt-6 inline-block rounded-md px-5 py-2.5 text-sm font-medium"
          >
            Pedir un cambio por WhatsApp
          </a>
        ) : null}
      </section>
    </main>
  );
}
