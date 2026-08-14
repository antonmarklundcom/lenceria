import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  getBrands,
  getCategories,
  getCategoryBySlug,
  getCategoryProducts,
  getProductBySlug,
  searchProducts,
} from "@/db/queries";
import { reserveStock } from "@/domain/stock";

import { SEED_CATEGORIES, SEED_PRODUCTS } from "../../scripts/seed-data";
import { TEST_DATABASE_URL, closeTestDb, hasTestDb, resetTables } from "../helpers/db";
import { createOrder } from "../helpers/factories";

const run = promisify(execFile);

/**
 * Lo que se afirma sale del seed, no de una lista copiada.
 *
 * La versión anterior de este archivo tenía los slugs del catálogo de ejemplo
 * escritos a mano, así que cambiar el rubro de la tienda —justo lo que este
 * repo existe para hacer fácil— rompía nueve tests que no tenían nada que ver
 * con las queries. Lo que se prueba acá es el comportamiento de `queries.ts`;
 * el catálogo es apenas el material de prueba.
 */
const cheapestOf = (product: (typeof SEED_PRODUCTS)[number]) =>
  Math.min(...product.variants.map((variant) => variant.pricePyg));

const productsIn = (categorySlug: string) =>
  SEED_PRODUCTS.filter((product) => product.categorySlug === categorySlug);

/** Una categoría con varios productos, para poder paginarla de verdad. */
const PAGED = SEED_CATEGORIES.map((category) => category.slug).find(
  (slug) => productsIn(slug).length >= 5
)!;

describe.skipIf(!hasTestDb)("queries del catálogo", () => {
  beforeAll(async () => {
    await resetTables();
    await run("pnpm", ["exec", "tsx", "scripts/seed.ts"], {
      // Que no quede colgado para siempre si la DB no responde.
      timeout: 90_000,
      cwd: process.cwd(),
      env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
    });
  }, 120_000);
  afterAll(closeTestDb);

  it("lista las categorías activas en orden", async () => {
    const categories = await getCategories();
    expect(categories.map((category) => category.slug)).toEqual(
      [...SEED_CATEGORIES]
        .sort((a, b) => a.position - b.position)
        .map((category) => category.slug)
    );
  });

  it("pagina la categoría", async () => {
    const total = productsIn(PAGED).length;
    const perPage = total - 1;

    const first = await getCategoryProducts({ categorySlug: PAGED, perPage, page: 1 });
    expect(first.products).toHaveLength(perPage);
    expect(first.total).toBe(total);
    expect(first.totalPages).toBe(2);

    const second = await getCategoryProducts({ categorySlug: PAGED, perPage, page: 2 });
    expect(second.products).toHaveLength(1);

    const overlap = first.products.filter((product) =>
      second.products.some((other) => other.id === product.id)
    );
    expect(overlap).toEqual([]);
  });

  it("ordena por precio mínimo de las variantes", async () => {
    const asc = await getCategoryProducts({
      categorySlug: PAGED,
      sort: "precio-asc",
      perPage: 60,
    });
    const prices = asc.products.map((product) =>
      Math.min(...product.variants.map((variant) => variant.pricePyg))
    );
    expect([...prices]).toEqual([...prices].sort((a, b) => a - b));

    const masCaro = [...productsIn(PAGED)].sort((a, b) => cheapestOf(b) - cheapestOf(a))[0]!;
    const desc = await getCategoryProducts({
      categorySlug: PAGED,
      sort: "precio-desc",
      perPage: 60,
    });
    expect(desc.products[0]?.slug).toBe(masCaro.slug);
  });

  it("filtra por rango de precio y por marca", async () => {
    // Un techo que deja afuera al menos un producto de la categoría, para que
    // el filtro tenga algo real que filtrar.
    const enCategoria = productsIn(PAGED);
    const techo = Math.min(...enCategoria.map(cheapestOf));

    const baratos = await getCategoryProducts({
      categorySlug: PAGED,
      maxPricePyg: techo,
      perPage: 60,
    });
    expect(baratos.products.length).toBeLessThan(enCategoria.length);
    for (const product of baratos.products) {
      expect(Math.min(...product.variants.map((v) => v.pricePyg))).toBeLessThanOrEqual(techo);
    }

    const marca = enCategoria[0]!.brand;
    const brands = await getBrands(PAGED);
    expect(brands).toContain(marca);

    const soloMarca = await getCategoryProducts({
      categorySlug: PAGED,
      brand: marca,
      perPage: 60,
    });
    expect(soloMarca.products.every((product) => product.brand === marca)).toBe(true);
    expect(soloMarca.total).toBe(soloMarca.products.length);
  });

  it("trae la ficha del producto con sus variantes", async () => {
    const seeded = SEED_PRODUCTS[0]!;
    const product = await getProductBySlug(seeded.slug);
    expect(product).not.toBeNull();
    expect(product?.categorySlug).toBe(seeded.categorySlug);
    expect(product?.variants.map((variant) => variant.label).sort()).toEqual(
      seeded.variants.map((variant) => variant.label).sort()
    );
    expect(product?.variants[0]?.available).toBeGreaterThan(0);
  });

  it("un slug inexistente devuelve null, no explota", async () => {
    expect(await getProductBySlug("no-existe-este-producto")).toBeNull();
    expect(await getCategoryBySlug("tampoco-existe")).toBeNull();
  });

  it("la disponibilidad del listado descuenta reservas vigentes", async () => {
    // Un producto con stock de sobra, para que restarle 4 no lo deje en cero.
    const holgado = SEED_PRODUCTS.find((product) => product.variants[0]!.onHand > 10)!.slug;
    const before = await getProductBySlug(holgado);
    const variant = before?.variants[0];
    expect(variant).toBeDefined();

    const orderId = await createOrder();
    await reserveStock(orderId, [{ variantId: variant!.id, qty: 4 }], {
      expiresAt: new Date(Date.now() + 3600_000),
    });

    const after = await getProductBySlug(holgado);
    expect(after?.variants[0]?.available).toBe(variant!.available - 4);
  });

  it("busca por FULLTEXT y por prefijo", async () => {
    const exact = await searchProducts("pijama");
    expect(exact.map((product) => product.slug)).toContain("pijama-satinado-short");

    const prefix = await searchProducts("pijam");
    expect(prefix.map((product) => product.slug)).toContain("pijama-satinado-short");
  });

  it("cae al LIKE con términos cortos que FULLTEXT ignora", async () => {
    // "body" tiene 4 caracteres: entra justo en el mínimo de InnoDB, pero el
    // fallback por LIKE es lo que salva a la categoría entera si algún día
    // ft_min_word_len sube en el MySQL de Hostinger.
    const bodies = await searchProducts("body");
    expect(bodies.map((product) => product.slug)).toContain("body-encaje-manga-larga");
  });

  it("no devuelve nada con términos vacíos o de una letra", async () => {
    expect(await searchProducts("")).toEqual([]);
    expect(await searchProducts("a")).toEqual([]);
    expect(await searchProducts("   ")).toEqual([]);
  });

  it("no rompe con caracteres especiales del modo booleano", async () => {
    await expect(searchProducts('remera +-><()~*"@')).resolves.toBeInstanceOf(Array);
  });
});
