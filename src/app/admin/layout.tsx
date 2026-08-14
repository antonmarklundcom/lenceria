import type { Metadata } from "next";
import type React from "react";

import { TIENDA } from "@/config/tienda";

/**
 * Layout raíz de `/admin`. A propósito no tiene guard: el login vive abajo de
 * esta misma rama (`/admin/login`) y un guard acá lo dejaría redirigiendo a sí
 * mismo para siempre. La puerta del panel está en `(panel)/layout.tsx`.
 */
export const metadata: Metadata = {
  title: { default: "Panel", template: `%s · Panel · ${TIENDA.nombre}` },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  // `contents` en vez de un div de verdad: la clase existe sólo para que
  // globals.css pase los títulos del panel de la serif de la vidriera a la
  // sans, y un div real acá cortaría la cadena de altura que usa el
  // `min-h-full` del layout de abajo.
  return <div className="admin-chrome contents">{children}</div>;
}
