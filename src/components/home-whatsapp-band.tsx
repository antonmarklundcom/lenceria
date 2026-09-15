import Image from "next/image";
import { TIENDA } from "@/config/tienda";
import { comercioWaLink } from "@/lib/comercio";
import { t } from "@/i18n";
export function HomeWhatsappBand() {
  const whatsapp = comercioWaLink(t("home.whatsapp.mensaje", { tienda: TIENDA.nombre }));
  return <section className="relative isolate overflow-hidden py-24 sm:py-32">
    <Image src="/img/lenceria-coral-balcon-asuncion-envios-paraguay-1280.webp" alt={t("home.whatsapp.alt")} fill sizes="100vw" className="-z-20 object-cover" />
    <div aria-hidden className="absolute inset-0 -z-10 bg-[#3B2B2B]/45" />
    <div className="mx-auto max-w-6xl px-4 text-center text-white sm:px-6"><div><h2 data-reveal="scroll" className="font-serif text-[36px] leading-tight font-medium">{t("home.whatsapp.titulo")}</h2><p data-reveal="scroll" className="mx-auto mt-4 max-w-md text-[15px] leading-7">{t("home.whatsapp.texto")}</p>{whatsapp ? <a data-reveal="scroll" href={whatsapp} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-8 py-4 text-sm text-foreground">{t("home.whatsapp.boton")}</a> : null}</div></div>
  </section>;
}