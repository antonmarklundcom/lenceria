import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  getBrands,
  getCategories,
  getCategoryBySlug,
  getCategoryProducts,
  getProductBySlug,
  getSitemapEntries,
  searchProducts,
} from "@/db/queries";
import { getDb } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

import { reserveStock } from "@/domain/stock";
import { TIENDA } from "@/config/tienda";

import { TEST_DATABASE_URL, closeTestDb, hasTestDb, resetTables } from "../helpers/db";
import { createOrder } from "../helpers/factories";

import { runScript } from "../helpers/run-script";

describe.skipIf(!hasTestDb)("queries del catálogo", () => {
  beforeAll(async () => {
    await resetTables();
    await runScript("scripts/seed.ts", [], {
      // Que no quede colgado para siempre si la DB no responde.
      timeout: 90_000,
      cwd: process.cwd(),
      env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
    });
  }, 120_000);
  afterAll(closeTestDb);

  it("lista las categorías activas en orden", async () => {
    const categories = await getCategories();
    expect(categories.map((category) => category.slug)).toEqual([
      "conjuntos",
      "corpinos",
      "bombachas",
      "camisones-y-pijamas",
      "bodies",
      "batas-y-kimonos",
      "accesorios",
    ]);
  });

  it("pagina la categoría", async () => {
    const first = await getCategoryProducts({ categorySlug: "conjuntos", perPage: 1, page: 1 });
    expect(first.products).toHaveLength(1);
    expect(first.total).toBe(2);
    expect(first.totalPages).toBe(2);

    const second = await getCategoryProducts({ categorySlug: "conjuntos", perPage: 1, page: 2 });
    expect(second.products).toHaveLength(1);

    const overlap = first.products.filter((product) =>
      second.products.some((other) => other.id === product.id)
    );
    expect(overlap).toEqual([]);
  });

  it("ordena por precio mínimo de las variantes", async () => {
    const asc = await getCategoryProducts({
      categorySlug: "camisones-y-pijamas",
      sort: "precio-asc",
      perPage: 60,
    });
    const prices = asc.products.map((product) =>
      Math.min(...product.variants.map((variant) => variant.pricePyg))
    );
    expect([...prices]).toEqual([...prices].sort((a, b) => a - b));

    const desc = await getCategoryProducts({
      categorySlug: "camisones-y-pijamas",
      sort: "precio-desc",
      perPage: 60,
    });
    expect(desc.products[0]?.slug).toBe("camison-luna");
  });

  it("filtra por rango de precio y por marca", async () => {
    const baratos = await getCategoryProducts({
      categorySlug: "conjuntos",
      maxPricePyg: 180000,
      perPage: 60,
    });
    for (const product of baratos.products) {
      expect(Math.min(...product.variants.map((v) => v.pricePyg))).toBeLessThanOrEqual(180000);
    }

    const brands = await getBrands("conjuntos");
    const marca = brands.find((facet) => facet.brand === TIENDA.nombre);
    expect(marca).toBeDefined();

    const soloMarca = await getCategoryProducts({
      categorySlug: "conjuntos",
      brand: TIENDA.nombre,
      perPage: 60,
    });
    expect(soloMarca.products.every((product) => product.brand === TIENDA.nombre)).toBe(true);
    expect(soloMarca.total).toBe(soloMarca.products.length);

    // El conteo del filtro tiene que ser el mismo número que va a aparecer al
    // usarlo. Si se separan, el filtro deja de ser confiable para siempre.
    expect(marca?.total).toBe(soloMarca.total);
  });

  it("las marcas salen ordenadas y sin las de otras categorías", async () => {
    const conjuntos = await getBrands("conjuntos");
    const nombres = conjuntos.map((facet) => facet.brand);

    expect(nombres).toEqual([...nombres].sort((a, b) => a.localeCompare(b, "es")));
    expect(new Set(nombres).size).toBe(nombres.length);
    expect(conjuntos.every((facet) => facet.total > 0)).toBe(true);
    expect(nombres).toEqual([TIENDA.nombre]);

    const corpinosBrandFacets = await getBrands("corpinos");
    expect(corpinosBrandFacets.map((facet) => facet.brand)).toEqual([TIENDA.nombre]);
  });

  it("trae la ficha del producto con sus variantes", async () => {
    const product = await getProductBySlug("corpino-yvoty");
    expect(product).not.toBeNull();
    expect(product?.categorySlug).toBe("corpinos");
    expect(product?.variants.map((variant) => variant.label).sort()).toEqual([
      "Talle L",
      "Talle M",
      "Talle S",
    ]);
    expect(product?.variants[0]?.available).toBeGreaterThan(0);
  });

  it("un slug inexistente devuelve null, no explota", async () => {
    expect(await getProductBySlug("no-existe-este-producto")).toBeNull();
    expect(await getCategoryBySlug("tampoco-existe")).toBeNull();
  });

  it("la disponibilidad del listado descuenta reservas vigentes", async () => {
    const before = await getProductBySlug("bralette-tacuru");
    const variant = before?.variants[0];
    expect(variant).toBeDefined();

    const orderId = await createOrder();
    await reserveStock(orderId, [{ variantId: variant!.id, qty: 1 }], {
      expiresAt: new Date(Date.now() + 3600_000),
    });

    const after = await getProductBySlug("bralette-tacuru");
    expect(after?.variants[0]?.available).toBe(variant!.available - 1);
  });

  it("busca por FULLTEXT y por prefijo", async () => {
    const exact = await searchProducts("yvoty");
    expect(exact.map((product) => product.slug)).toContain("corpino-yvoty");

    const prefix = await searchProducts("yvot");
    expect(prefix.map((product) => product.slug)).toContain("corpino-yvoty");
  });

  it("cae al LIKE con términos cortos que FULLTEXT ignora", async () => {
    // "luna" tiene 4 caracteres: entra justo, pero el fallback es lo que
    // salva a los términos cortos si ft_min_word_len sube.
    const luna = await searchProducts("luna");
    expect(luna.map((product) => product.slug)).toContain("camison-luna");
  });

  it("no devuelve nada con términos vacíos o de una letra", async () => {
    expect(await searchProducts("")).toEqual([]);
    expect(await searchProducts("a")).toEqual([]);
    expect(await searchProducts("   ")).toEqual([]);
  });

  it("no rompe con caracteres especiales del modo booleano", async () => {
    await expect(searchProducts('remera +-><()~*"@')).resolves.toBeInstanceOf(Array);
  });

  /**
   * El sitemap le enseña al buscador qué existe. Un producto despublicado que
   * siga en el XML es una promesa de 404 —y peor, es publicar algo que el
   * comercio decidió esconder—, así que el filtro tiene que ser el mismo de la
   * vidriera y no una consulta paralela que se olvide de `published_at`.
   */
  it("el sitemap lista sólo lo que la vidriera muestra", async () => {
    const antes = await getSitemapEntries();
    expect(antes.categories.map((category) => category.slug)).toEqual([
      "conjuntos",
      "corpinos",
      "bombachas",
      "camisones-y-pijamas",
      "bodies",
      "batas-y-kimonos",
      "accesorios",
    ]);
    expect(antes.products.map((product) => product.slug)).toContain("conjunto-nanduti");

    await getDb()
      .update(products)
      .set({ publishedAt: null })
      .where(eq(products.slug, "conjunto-nanduti"));

    const despues = await getSitemapEntries();
    expect(despues.products.map((product) => product.slug)).not.toContain("conjunto-nanduti");
    expect(despues.products).toHaveLength(antes.products.length - 1);

    await getDb()
      .update(products)
      .set({ publishedAt: new Date() })
      .where(eq(products.slug, "conjunto-nanduti"));
  });
});
