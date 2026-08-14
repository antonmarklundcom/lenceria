import type { Metadata } from "next";
import Link from "next/link";

/**
 * Envío discreto.
 *
 * En este rubro la privacidad es una objeción de compra, no un detalle: quien
 * duda de qué va a ver el portero, el vecino o la familia, no compra. Esto está
 * como página propia para poder linkearlo desde el checkout, donde la duda
 * aparece, y desde el pie.
 *
 * Ojo al editar: cada línea de acá es una promesa operativa. Si el comercio
 * cambia de courier o de empaque, esta página se cambia el mismo día.
 */
export const metadata: Metadata = {
  title: "Envío discreto",
  description:
    "Cómo viaja tu pedido: empaque opaco sin logo, sin detalle del contenido y sin que el repartidor sepa qué lleva.",
};

const PUNTOS = [
  {
    titulo: "Empaque opaco, sin logo",
    detalle:
      "Va en una bolsa o caja neutra, sin transparencias, sin marca y sin ninguna imagen. Por fuera no se lee ni se adivina qué hay adentro.",
  },
  {
    titulo: "Sin detalle del contenido por fuera",
    detalle:
      "La etiqueta lleva tu nombre, tu teléfono y tu dirección — nada más. El remito con el detalle de lo que compraste va adentro, en un sobre cerrado.",
  },
  {
    titulo: "El remitente no dice qué vendemos",
    detalle:
      "Figura sólo el nombre del comercio, que no menciona el rubro. Quien reciba el paquete en tu lugar no tiene por qué saber qué es.",
  },
  {
    titulo: "El repartidor tampoco sabe",
    detalle:
      "Le entregamos el paquete ya cerrado. No abre nada, no revisa nada y no lleva ninguna lista de lo que hay adentro.",
  },
  {
    titulo: "También si pagás contra entrega",
    detalle:
      "El monto a cobrar viaja en el sistema del courier, no escrito en la caja. Pagás y listo.",
  },
];

export default function EnvioDiscretoPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="eyebrow">Cómo te llega</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Envío discreto, siempre</h1>
      <p className="text-muted-foreground mt-4 max-w-[65ch] text-base leading-relaxed">
        No es un extra que se pide ni que se paga aparte: todos los pedidos salen
        así, sin que tengas que aclarar nada. Lo que comprás es asunto tuyo.
      </p>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-transparent">
        {PUNTOS.map((punto) => (
          <li key={punto.titulo} className="border-border border-b py-6 first:pt-0 last:border-b-0">
            <p className="font-medium">{punto.titulo}</p>
            <p className="text-muted-foreground mt-2 max-w-[65ch] text-sm leading-relaxed">
              {punto.detalle}
            </p>
          </li>
        ))}
      </ul>

      <section className="bg-muted mt-10 rounded-lg p-6">
        <h2 className="text-2xl">¿Y si es un regalo?</h2>
        <p className="text-muted-foreground mt-3 max-w-[65ch] text-sm leading-relaxed">
          Avisanos por WhatsApp cuando hagas el pedido y lo mandamos sin ningún
          papel con precios adentro. Si querés que llegue a una dirección distinta
          a la tuya, poné esa dirección en el checkout y aclaralo en la referencia.
        </p>
      </section>

      <p className="text-muted-foreground border-border mt-12 border-t pt-8 text-sm leading-relaxed">
        Antes de comprar, mirá la{" "}
        <Link href="/guia-de-talles" className="text-primary underline underline-offset-4">
          guía de talles
        </Link>{" "}
        — y si igual le errás,{" "}
        <Link href="/cambios" className="text-primary underline underline-offset-4">
          así son los cambios
        </Link>
        .
      </p>
    </main>
  );
}
