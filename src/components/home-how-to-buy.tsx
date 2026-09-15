import type { CSSProperties } from "react";
import { t } from "@/i18n";
export function HomeHowToBuy() {
  return <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24"><div>
    <h2 data-reveal="scroll" className="mb-8 font-serif text-[30px] font-medium">{t("home.comprar.titulo")}</h2>
    <ol className="grid gap-4 lg:grid-cols-3 lg:gap-6">{([["home.comprar.numero1", "home.comprar.paso1"], ["home.comprar.numero2", "home.comprar.paso2"], ["home.comprar.numero3", "home.comprar.paso3"]] as const).map(([number, text], index) => <li data-reveal="card" style={{ "--i": index } as CSSProperties} key={number} className="rounded-2xl border border-border bg-white p-7"><span className="font-serif text-4xl text-primary">{t(number)}</span><p className="mt-5 text-[15px] leading-7">{t(text)}</p></li>)}</ol>
    <p className="mt-6 text-center text-sm leading-6 text-muted-foreground">{t("home.comprar.nota")}</p>
  </div></section>;
}