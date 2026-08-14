import type { Metadata } from "next";
import Link from "next/link";

import { comercioWaLink } from "@/lib/comercio";

/**
 * Guía de talles.
 *
 * Es la pregunta número uno del rubro y la causa número uno de cambios: una
 * compradora que no sabe su talle no compra, o compra mal y devuelve. Estática
 * a propósito (sin `dynamic`), así se cachea y carga instantánea desde la
 * ficha de producto, que es de donde llega casi todo el tráfico.
 */
export const metadata: Metadata = {
  title: "Guía de talles",
  description:
    "Cómo medirte para elegir el talle de corpiño y de bombacha, en centímetros, con tabla de conversión.",
};

/** Contorno bajo el busto (cm) → número de banda. */
const BANDAS = [
  { medida: "63 – 67 cm", talle: "70" },
  { medida: "68 – 72 cm", talle: "75" },
  { medida: "73 – 77 cm", talle: "80" },
  { medida: "78 – 82 cm", talle: "85" },
  { medida: "83 – 87 cm", talle: "90" },
  { medida: "88 – 92 cm", talle: "95" },
  { medida: "93 – 97 cm", talle: "100" },
  { medida: "98 – 102 cm", talle: "105" },
];

/** Diferencia entre contorno de busto y contorno bajo el busto (cm) → copa. */
const COPAS = [
  { diferencia: "10 – 12 cm", copa: "A" },
  { diferencia: "13 – 14 cm", copa: "B" },
  { diferencia: "15 – 16 cm", copa: "C" },
  { diferencia: "17 – 18 cm", copa: "D" },
  { diferencia: "19 – 20 cm", copa: "DD / E" },
];

const BOMBACHAS = [
  { talle: "S", cintura: "62 – 68 cm", cadera: "88 – 93 cm" },
  { talle: "M", cintura: "69 – 75 cm", cadera: "94 – 99 cm" },
  { talle: "L", cintura: "76 – 82 cm", cadera: "100 – 105 cm" },
  { talle: "XL", cintura: "83 – 90 cm", cadera: "106 – 112 cm" },
];

export default function GuiaDeTallesPage() {
  const waHref = comercioWaLink(
    "¡Hola! Me tomé las medidas pero no sé bien qué talle pedir, ¿me ayudás?"
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="eyebrow">Antes de comprar</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Guía de talles</h1>
      <p className="text-muted-foreground mt-4 max-w-[65ch] text-base leading-relaxed">
        Dos medidas alcanzan para el corpiño y una para la bombacha. Tomátelas con
        una cinta métrica de costura, parada derecha y sin apretar: la cinta tiene
        que apoyar, no marcar. Si no tenés cinta, serví un hilo, marcalo y medilo
        después con una regla.
      </p>

      {/* --- Corpiños ------------------------------------------------------ */}
      <section className="mt-14">
        <h2 className="text-3xl">Corpiños</h2>

        <ol className="mt-6 grid gap-5">
          <li className="border-border rounded-lg border p-5">
            <p className="font-medium">1. Contorno bajo el busto → el número</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Pasá la cinta justo <strong className="text-foreground">debajo</strong> del
              busto, donde apoya la banda del corpiño, bien horizontal y paralela al
              piso. Soltá el aire antes de leer el número. Ese contorno es el que
              define el 85, el 90 o el 95.
            </p>
          </li>
          <li className="border-border rounded-lg border p-5">
            <p className="font-medium">2. Contorno del busto → la copa</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Ahora medí por la parte más llena del busto, sin aplastar. Restá el
              primer número al segundo: esa diferencia es la copa. Ejemplo: 96 cm de
              busto − 82 cm bajo el busto = 14 cm →{" "}
              <strong className="text-foreground">copa B</strong>, con banda 85. Tu
              talle es 85B.
            </p>
          </li>
        </ol>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-xl">La banda</h3>
            <table className="mt-3 w-full text-sm">
              <thead className="text-muted-foreground border-border border-b text-left">
                <tr>
                  <th className="py-2 font-medium">Bajo el busto</th>
                  <th className="py-2 font-medium">Talle</th>
                </tr>
              </thead>
              <tbody>
                {BANDAS.map((fila) => (
                  <tr key={fila.talle} className="border-border/60 border-b">
                    <td className="text-muted-foreground py-2 tabular-nums">{fila.medida}</td>
                    <td className="py-2 font-medium tabular-nums">{fila.talle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-xl">La copa</h3>
            <table className="mt-3 w-full text-sm">
              <thead className="text-muted-foreground border-border border-b text-left">
                <tr>
                  <th className="py-2 font-medium">Diferencia</th>
                  <th className="py-2 font-medium">Copa</th>
                </tr>
              </thead>
              <tbody>
                {COPAS.map((fila) => (
                  <tr key={fila.copa} className="border-border/60 border-b">
                    <td className="text-muted-foreground py-2 tabular-nums">
                      {fila.diferencia}
                    </td>
                    <td className="py-2 font-medium">{fila.copa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-muted mt-8 rounded-lg p-5 text-sm leading-relaxed">
          <p className="font-medium">Tres cosas que conviene saber</p>
          <ul className="text-muted-foreground mt-3 grid gap-2">
            <li>
              · Un corpiño nuevo tiene que quedarte cómodo en el{" "}
              <strong className="text-foreground">gancho más flojo</strong>. Con el uso
              la banda cede, y ahí vas cerrando en los siguientes.
            </li>
            <li>
              · El peso lo sostiene la banda, no los breteles. Si tenés que ajustar
              mucho los breteles, la banda te está quedando grande.
            </li>
            <li>
              · Si quedás justo entre dos talles, pedí el más chico de banda y el más
              grande de copa (de 90B dudoso, andá a 85C).
            </li>
          </ul>
        </div>
      </section>

      {/* --- Bombachas ----------------------------------------------------- */}
      <section className="mt-14">
        <h2 className="text-3xl">Bombachas</h2>
        <p className="text-muted-foreground mt-3 max-w-[65ch] text-sm leading-relaxed">
          Acá manda la cadera: medila por la parte más ancha, con la cinta paralela
          al piso. La cintura es de referencia. Si las dos medidas te caen en talles
          distintos, guiate por la cadera.
        </p>

        <table className="mt-5 w-full text-sm">
          <thead className="text-muted-foreground border-border border-b text-left">
            <tr>
              <th className="py-2 font-medium">Talle</th>
              <th className="py-2 font-medium">Cintura</th>
              <th className="py-2 font-medium">Cadera</th>
            </tr>
          </thead>
          <tbody>
            {BOMBACHAS.map((fila) => (
              <tr key={fila.talle} className="border-border/60 border-b">
                <td className="py-2 font-medium">{fila.talle}</td>
                <td className="text-muted-foreground py-2 tabular-nums">{fila.cintura}</td>
                <td className="text-muted-foreground py-2 tabular-nums">{fila.cadera}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          Las medias siguen la misma tabla de cadera. Las que van hasta el muslo
          además dependen del largo de la pierna: si dudás, escribinos.
        </p>
      </section>

      {/* --- Cierre -------------------------------------------------------- */}
      <section className="border-border mt-14 border-t pt-8">
        <p className="text-muted-foreground text-sm leading-relaxed">
          Estas tablas son la referencia general del rubro y sirven para la enorme
          mayoría de los casos, pero el calce cambia un poco de modelo a modelo. En
          la ficha de cada producto avisamos cuando un corte va más chico o más
          grande de lo habitual.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
          {waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground rounded-md px-5 py-2.5 font-medium"
            >
              Consultanos tu talle por WhatsApp
            </a>
          ) : null}
          <Link href="/cambios" className="text-primary underline underline-offset-4">
            Cómo son los cambios
          </Link>
        </div>
      </section>
    </main>
  );
}
