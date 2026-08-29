import Image from "next/image";

import { t } from "@/i18n";
import { categoryPlaceholderSrc, productImageUrl, type ImageSize } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { CatalogImage } from "@/db/queries";

/**
 * Imagen de producto con placeholder.
 *
 * `unoptimized`: Cloudinary ya entrega `f_auto,q_auto` en el tamaño pedido,
 * así que pasarlo otra vez por el optimizador de Next sólo gasta CPU del slot
 * de Hostinger (ARCH.md §6).
 */
export function ProductImage({
  image,
  alt,
  categorySlug,
  size = "card",
  className,
  imgClassName,
  priority = false,
  sizes,
}: {
  image: CatalogImage | null;
  alt: string;
  categorySlug: string;
  size?: ImageSize;
  className?: string;
  /** Clase para la `<Image>` en sí, no su marco — el hover-zoom de una card va acá. */
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const url = productImageUrl(image?.cloudinaryId, size);
  const wrapper = cn("bg-muted relative aspect-square overflow-hidden rounded-lg", className);
  const img = cn("object-cover", imgClassName);

  if (!url) {
    return (
      <div className={wrapper}>
        <Image
          src={categoryPlaceholderSrc(categorySlug)}
          alt={t("catalogo.sinFoto", { nombre: alt })}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 640px) 50vw, 300px"}
          className={img}
        />
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <Image
        src={url}
        alt={image?.alt ?? alt}
        fill
        unoptimized
        priority={priority}
        sizes={sizes ?? "(max-width: 640px) 50vw, 300px"}
        className={img}
        placeholder={image?.blurDataUrl ? "blur" : "empty"}
        blurDataURL={image?.blurDataUrl ?? undefined}
      />
    </div>
  );
}
