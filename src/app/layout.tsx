import type { Metadata } from "next";
import type React from "react";
import localFont from "next/font/local";

import { TIENDA } from "@/config/tienda";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Analytics } from "@/components/analytics";
import { CartSheet } from "@/components/cart-sheet";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { Toaster } from "@/components/ui/sonner";
import { getStoreSettings } from "@/domain/store-settings";
import { linkSeguro } from "@/domain/store-settings-schema";
import { idiomaActivo } from "@/i18n";
import { siteOrigin } from "@/lib/site-url";
import "./globals.css";

// Fuentes servidas desde el repo (subset latin, variables): con next/font/google
// el build de Hostinger baja la CSS de Google en el momento y falla.
const karla = localFont({
  src: "./fonts/karla-latin.woff2",
  variable: "--font-karla",
  weight: "400 700",
  display: "swap",
});

const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  variable: "--font-cormorant",
  weight: "400 600",
  display: "swap",
});

/**
 * `generateMetadata` y no un `metadata` fijo: el título y la descripción de la
 * home se editan en `/admin/ajustes` ("Marca y portada"). Vacíos, mandan
 * `TIENDA.titulo` y `TIENDA.descripcion`, como siempre.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { marca } = await getStoreSettings();

  return {
    // Sin esto, la URL de la imagen de Open Graph sale relativa y ningún
    // scraper la resuelve: el link compartido queda sin foto (ver lib/site-url).
    metadataBase: siteOrigin() ?? undefined,
    title: {
      default: marca.seoTitulo ?? TIENDA.titulo,
      template: `%s · ${TIENDA.nombre}`,
    },
    description: marca.seoDescripcion ?? TIENDA.descripcion,
    openGraph: {
      type: "website",
      locale: TIENDA.ogLocale,
      siteName: TIENDA.nombre,
    },
    // La imagen sale de `opengraph-image.tsx` (o de la del producto, que la
    // pisa); acá sólo se pide que se muestre grande y no como miniatura.
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { anuncio } = await getStoreSettings();

  // El idioma **efectivo** y no el que dice el config: si `TIENDA.lang` apunta
  // a un catálogo que no existe, los textos salen en es-PY y el `lang` del
  // HTML tiene que decir es-PY. Un lector de pantalla leyendo español con
  // fonética inglesa es peor que no declarar nada.
  return (
    <html
      lang={idiomaActivo()}
      className={`${karla.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* Apagada o sin texto no se monta nada (y en /admin se esconde sola). */}
        {anuncio.activo && anuncio.texto ? (
          <AnnouncementBar texto={anuncio.texto} href={linkSeguro(anuncio.href)} />
        ) : null}
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <CartSheet />
        <WhatsAppFab />
        <Toaster />
        {/* Nada de terceros salvo que esta tienda configure medidores —
            src/lib/analytics.ts. Sin variables, esto no renderiza nada. */}
        <Analytics />
      </body>
    </html>
  );
}
