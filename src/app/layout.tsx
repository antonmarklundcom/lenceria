import type { Metadata } from "next";
import type React from "react";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";

import { TIENDA } from "@/config/tienda";
import { CartSheet } from "@/components/cart-sheet";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { Toaster } from "@/components/ui/sonner";
import { siteOrigin } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Serif de titulares. Es la mitad del cambio de piel: los tokens de color de
 * `globals.css` son la otra.
 *
 * Sólo dos pesos: 400 para los titulares grandes y 500 para los chicos. Una
 * serif en 600/700 se lee a presupuesto, no a marca, así que directamente no
 * se cargan — lo que no está no se puede usar por accidente.
 *
 * Para vestir otra tienda se cambia la familia acá y `--font-display` en
 * `globals.css` la levanta sola.
 */
const displaySerif = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // Sin esto, la URL de la imagen de Open Graph sale relativa y ningún
  // scraper la resuelve: el link compartido queda sin foto (ver lib/site-url).
  metadataBase: siteOrigin() ?? undefined,
  title: {
    default: TIENDA.titulo,
    template: `%s · ${TIENDA.nombre}`,
  },
  description: TIENDA.descripcion,
  openGraph: {
    type: "website",
    locale: TIENDA.ogLocale,
    siteName: TIENDA.nombre,
  },
  // La imagen sale de `opengraph-image.tsx` (o de la del producto, que la
  // pisa); acá sólo se pide que se muestre grande y no como miniatura.
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={TIENDA.lang}
      className={`${geistSans.variable} ${geistMono.variable} ${displaySerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <CartSheet />
        <WhatsAppFab />
        <Toaster />
      </body>
    </html>
  );
}
