import { freeShippingWithoutZone } from "@/domain/free-shipping";
import { listShippingZones } from "@/domain/shipping";
import { formatGs } from "@/lib/money";
import { t } from "@/i18n";
export async function HomeTrustStrip() {
  let shipping = t("home.trust.envios");
  try {
    const progress = freeShippingWithoutZone(await listShippingZones(), 0);
    if (progress.kind !== "sin_umbral") shipping = t("header.envioGratisDesde", { monto: formatGs(progress.thresholdPyg) });
  } catch {
    // Unavailable zones use the nationwide shipping fallback.
  }
  return <div className="border-y border-border"><ul className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-border px-4 py-5 text-center text-[11px] leading-5 sm:px-6 sm:text-xs"><li className="px-2 sm:px-5">{shipping}</li><li className="px-2 sm:px-5">{t("home.trust.pago")}</li><li className="px-2 sm:px-5">{t("home.trust.atencion")}</li></ul></div>;
}