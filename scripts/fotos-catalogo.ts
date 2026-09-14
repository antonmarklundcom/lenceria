import '@/lib/load-env';

import { readFileSync } from 'node:fs';

import { inArray, sql } from 'drizzle-orm';

import { closePool, getDb } from '@/db';
import { productImages, products } from '@/db/schema';
import { addProductImage } from '@/domain/admin-products';
import { CLOUDINARY_PRODUCTS_FOLDER, cloudinary, cloudinaryConfigured } from '@/lib/cloudinary';

/**
 * `pnpm fotos:catalogo <archivo.json> [--aplicar] [--pisar]` — carga masiva,
 * de una sola vez, de fotos de producto desde URLs remotas.
 *
 * Pensado para correrse **una vez**, después de que existan las variables de
 * Cloudinary, contra la base de producción (Remote MySQL — `import
 * '@/lib/load-env'`, igual que `scripts/seed.ts`). No es la forma normal de
 * cargar fotos: eso es `/admin/productos`, que es quien habla con Cloudinary
 * en el día a día. Esto existe para no subir cien fotos a mano la primera vez.
 *
 * El archivo es un array de `{ slug, url, alt }` (ver
 * `scripts/fotos-catalogo.json`). Cloudinary acepta una URL https remota
 * directo como argumento de `upload`, así que no hay descarga local.
 *
 * **Ensayo por defecto**: sin `--aplicar` sólo resuelve los slugs contra la
 * base y muestra qué haría, no sube ni escribe nada (misma convención que
 * `scripts/importar-productos.ts`).
 *
 * **Idempotente**: un producto que ya tiene al menos una fila en
 * `product_images` se salta ("ya tiene foto"), salvo que se pida
 * `--pisar`, que la agrega igual (no reemplaza las que ya había).
 *
 * Slugs que no existen en la base se listan todos juntos al final y hacen
 * que el proceso termine con código de salida 1.
 */

type FotoCatalogo = { slug: string; url: string; alt: string };

const APLICAR = process.argv.includes('--aplicar');
const PISAR = process.argv.includes('--pisar');

async function main(): Promise<void> {
  const archivo = process.argv.slice(2).find((arg) => !arg.startsWith('-'));
  if (!archivo) {
    console.error('Uso: pnpm fotos:catalogo <archivo.json> [--aplicar] [--pisar]');
    process.exitCode = 1;
    return;
  }

  let items: FotoCatalogo[];
  try {
    const texto = readFileSync(archivo, 'utf8');
    items = JSON.parse(texto) as FotoCatalogo[];
  } catch (error) {
    console.error(`No pude leer/parsear "${archivo}": ${(error as Error).message}`);
    process.exitCode = 1;
    return;
  }

  if (APLICAR && !cloudinaryConfigured()) {
    console.error(
      'Faltan las variables de Cloudinary (CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / ' +
        'CLOUDINARY_API_SECRET). Completalas en el entorno antes de correr con --aplicar — ' +
        'ver .env.example.',
    );
    process.exitCode = 1;
    return;
  }

  const db = getDb();

  const slugs = items.map((item) => item.slug);
  const productRows = await db
    .select({ id: products.id, slug: products.slug })
    .from(products)
    .where(inArray(products.slug, slugs));
  const productoPorSlug = new Map(productRows.map((row) => [row.slug, row.id]));

  const desconocidos = slugs.filter((slug) => !productoPorSlug.has(slug));

  const productIds = [...productoPorSlug.values()];
  const conteoRows = productIds.length
    ? await db
        .select({ productId: productImages.productId, total: sql<number>`COUNT(*)` })
        .from(productImages)
        .where(inArray(productImages.productId, productIds))
        .groupBy(productImages.productId)
    : [];
  const yaTieneFoto = new Set(conteoRows.filter((row) => row.total > 0).map((row) => row.productId));

  console.log(`Archivo: ${items.length} fotos`);
  if (!APLICAR) {
    console.log('Ensayo: no se sube ni se escribe nada. Agregá --aplicar para escribir.\n');
  }

  for (const item of items) {
    const productId = productoPorSlug.get(item.slug);
    if (productId === undefined) continue; // se lista al final

    if (yaTieneFoto.has(productId) && !PISAR) {
      console.log(`· ${item.slug}: ya tiene foto`);
      continue;
    }

    if (!APLICAR) {
      console.log(`· ${item.slug}: se subiría desde ${item.url}`);
      continue;
    }

    const uploaded = await cloudinary.uploader.upload(item.url, {
      folder: CLOUDINARY_PRODUCTS_FOLDER,
      resource_type: 'image',
      overwrite: false,
    });

    await addProductImage({
      productId,
      cloudinaryId: uploaded.public_id,
      alt: item.alt.slice(0, 255),
    });

    console.log(`✓ ${item.slug}: ${uploaded.public_id}`);
  }

  if (desconocidos.length > 0) {
    console.error(`\nSlugs no encontrados en la base (${desconocidos.length}):`);
    for (const slug of desconocidos) console.error(`  ✗ ${slug}`);
    process.exitCode = 1;
  }
}

main()
  .then(() => closePool())
  .catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
    await closePool();
  });
