import type { IvaRate } from "@/db/schema";

export type SeedVariant = {
  sku: string;
  label: string;
  pricePyg: number;
  compareAtPyg?: number;
  onHand: number;
};

export type SeedProduct = {
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  brand: string;
  ivaRate: IvaRate;
  variants: SeedVariant[];
};

/**
 * Catálogo de ejemplo — **datos de relleno, no el catálogo real.**
 *
 * Existe para que la tienda se pueda mirar, medir y demostrar antes de que la
 * dueña cargue sus productos desde `/admin/productos`. Las marcas son
 * inventadas a propósito (no hay ninguna marca real acá) y los precios son
 * órdenes de magnitud plausibles de góndola paraguaya, no una lista vigente.
 *
 * Convenciones que sí hay que respetar al reemplazarlo:
 *
 *  - **Guaraníes enteros.** Sin centavos, sin decimales: `src/lib/money.ts`
 *    tira `MoneyError` si se cuela un float. ₲ 145.000 se escribe `145000`.
 *  - **IVA incluido, tasa 10.** La lencería no está en la canasta básica ni
 *    exenta: va toda al 10%. El precio de góndola ya lo trae adentro, no se
 *    suma encima.
 *  - **`label` es un solo campo plano** — el schema no tiene talle y color por
 *    separado. Convención de esta tienda: `"TALLE / COLOR"`, con la barra
 *    rodeada de espacios (`"90B / Negro"`, `"M / Rojo"`). Es lo que la
 *    compradora ve en el selector, en el carrito y en el pedido, así que
 *    escribirlo distinto en dos productos se nota.
 *  - **`compareAtPyg` sólo si el precio de antes fue real.** Dibuja el precio
 *    tachado. Un tachado inventado es publicidad engañosa, y además gasta el
 *    recurso: si todo está en oferta, nada lo está.
 */
export const SEED_CATEGORIES = [
  { slug: "corpinos", name: "Corpiños", position: 1 },
  { slug: "bombachas", name: "Bombachas", position: 2 },
  { slug: "conjuntos", name: "Conjuntos", position: 3 },
  { slug: "body", name: "Body", position: 4 },
  { slug: "pijamas", name: "Pijamas", position: 5 },
  { slug: "medias", name: "Medias", position: 6 },
] as const;

export const SEED_PRODUCTS: SeedProduct[] = [
  // --- Corpiños -------------------------------------------------------------
  {
    slug: "corpino-push-up-encaje",
    name: "Corpiño push-up de encaje",
    description:
      "Copa con relleno liviano y aro forrado. Encaje en la copa y espalda de tul elastizado. Breteles regulables y cierre de tres posiciones.",
    categorySlug: "corpinos",
    brand: "Bella Notte",
    ivaRate: 10,
    variants: [
      { sku: "COR-PSH-85B-NEG", label: "85B / Negro", pricePyg: 145000, compareAtPyg: 179000, onHand: 12 },
      { sku: "COR-PSH-90B-NEG", label: "90B / Negro", pricePyg: 145000, compareAtPyg: 179000, onHand: 15 },
      { sku: "COR-PSH-90C-NEG", label: "90C / Negro", pricePyg: 152000, onHand: 9 },
      { sku: "COR-PSH-90B-ROS", label: "90B / Rosa viejo", pricePyg: 145000, onHand: 7 },
      { sku: "COR-PSH-95C-NEG", label: "95C / Negro", pricePyg: 152000, onHand: 5 },
    ],
  },
  {
    slug: "corpino-triangulo-sin-aro",
    name: "Corpiño triángulo sin aro",
    description:
      "Sin aro y sin relleno, de algodón con elastano. El de todos los días: liviano, cómodo para el calor y sin costuras que se marquen.",
    categorySlug: "corpinos",
    brand: "Íntima",
    ivaRate: 10,
    variants: [
      { sku: "COR-TRI-S-NEG", label: "S / Negro", pricePyg: 89000, onHand: 20 },
      { sku: "COR-TRI-M-NEG", label: "M / Negro", pricePyg: 89000, onHand: 26 },
      { sku: "COR-TRI-M-BLA", label: "M / Blanco", pricePyg: 89000, onHand: 18 },
      { sku: "COR-TRI-L-BLA", label: "L / Blanco", pricePyg: 89000, onHand: 14 },
      { sku: "COR-TRI-L-VIN", label: "L / Vino", pricePyg: 95000, onHand: 8 },
    ],
  },
  {
    slug: "corpino-balconet-tul",
    name: "Corpiño balconet de tul bordado",
    description:
      "Corte balconet con escote recto, tul bordado y aro. Levanta sin relleno, pensado para escotes cuadrados.",
    categorySlug: "corpinos",
    brand: "Ñandutí",
    ivaRate: 10,
    variants: [
      { sku: "COR-BAL-85B-NEG", label: "85B / Negro", pricePyg: 168000, onHand: 6 },
      { sku: "COR-BAL-90B-NEG", label: "90B / Negro", pricePyg: 168000, onHand: 9 },
      { sku: "COR-BAL-90C-MAR", label: "90C / Marfil", pricePyg: 175000, onHand: 4 },
      { sku: "COR-BAL-95C-MAR", label: "95C / Marfil", pricePyg: 175000, onHand: 3 },
    ],
  },
  {
    slug: "corpino-deportivo-alto-impacto",
    name: "Corpiño deportivo de alto impacto",
    description:
      "Tela técnica que seca rápido, espalda cruzada y banda ancha bajo el busto. Aguanta running y funcional sin aro.",
    categorySlug: "corpinos",
    brand: "Aurora",
    ivaRate: 10,
    variants: [
      { sku: "COR-DEP-S-NEG", label: "S / Negro", pricePyg: 118000, onHand: 16 },
      { sku: "COR-DEP-M-NEG", label: "M / Negro", pricePyg: 118000, onHand: 21 },
      { sku: "COR-DEP-M-GRI", label: "M / Gris", pricePyg: 118000, onHand: 11 },
      { sku: "COR-DEP-L-NEG", label: "L / Negro", pricePyg: 124000, onHand: 13 },
    ],
  },
  {
    slug: "corpino-strapless-siliconado",
    name: "Corpiño strapless siliconado",
    description:
      "Sin breteles, con banda siliconada interna y varillas laterales para que no se baje. Incluye breteles desmontables.",
    categorySlug: "corpinos",
    brand: "Bella Notte",
    ivaRate: 10,
    variants: [
      { sku: "COR-STR-85B-NEG", label: "85B / Negro", pricePyg: 159000, onHand: 5 },
      { sku: "COR-STR-90B-NEG", label: "90B / Negro", pricePyg: 159000, onHand: 8 },
      { sku: "COR-STR-90B-PIE", label: "90B / Piel", pricePyg: 159000, onHand: 10 },
      { sku: "COR-STR-95C-PIE", label: "95C / Piel", pricePyg: 166000, onHand: 4 },
    ],
  },

  // --- Bombachas ------------------------------------------------------------
  {
    slug: "bombacha-colaless-encaje",
    name: "Bombacha colaless de encaje",
    description:
      "Colaless de encaje elastizado con cavado alto. Cintura media, sin costura en las piernas para que no se marque.",
    categorySlug: "bombachas",
    brand: "Bella Notte",
    ivaRate: 10,
    variants: [
      { sku: "BOM-COL-S-NEG", label: "S / Negro", pricePyg: 45000, onHand: 30 },
      { sku: "BOM-COL-M-NEG", label: "M / Negro", pricePyg: 45000, onHand: 38 },
      { sku: "BOM-COL-M-ROJ", label: "M / Rojo", pricePyg: 45000, onHand: 22 },
      { sku: "BOM-COL-L-NEG", label: "L / Negro", pricePyg: 45000, onHand: 25 },
      { sku: "BOM-COL-L-ROJ", label: "L / Rojo", pricePyg: 45000, onHand: 17 },
    ],
  },
  {
    slug: "pack-3-bombachas-algodon",
    name: "Pack de 3 bombachas de algodón",
    description:
      "Tres bombachas clásicas de algodón peinado con cintura elastizada forrada. El pack sale más barato que las tres sueltas.",
    categorySlug: "bombachas",
    brand: "Íntima",
    ivaRate: 10,
    variants: [
      { sku: "BOM-PK3-S-SUR", label: "S / Surtido", pricePyg: 105000, compareAtPyg: 135000, onHand: 18 },
      { sku: "BOM-PK3-M-SUR", label: "M / Surtido", pricePyg: 105000, compareAtPyg: 135000, onHand: 24 },
      { sku: "BOM-PK3-L-SUR", label: "L / Surtido", pricePyg: 105000, compareAtPyg: 135000, onHand: 20 },
      { sku: "BOM-PK3-XL-SUR", label: "XL / Surtido", pricePyg: 112000, onHand: 12 },
    ],
  },
  {
    slug: "bombacha-tiro-alto-control",
    name: "Bombacha de tiro alto con control",
    description:
      "Tiro alto que llega arriba del ombligo, con panel de compresión suave al frente. Se usa debajo de vestidos ajustados.",
    categorySlug: "bombachas",
    brand: "Aurora",
    ivaRate: 10,
    variants: [
      { sku: "BOM-TAL-M-NEG", label: "M / Negro", pricePyg: 72000, onHand: 15 },
      { sku: "BOM-TAL-L-NEG", label: "L / Negro", pricePyg: 72000, onHand: 19 },
      { sku: "BOM-TAL-L-PIE", label: "L / Piel", pricePyg: 72000, onHand: 13 },
      { sku: "BOM-TAL-XL-PIE", label: "XL / Piel", pricePyg: 78000, onHand: 9 },
    ],
  },
  {
    slug: "vedetina-microfibra",
    name: "Vedetina de microfibra",
    description:
      "Cobertura completa en microfibra sin costuras. Invisible bajo la ropa y de las más pedidas para el día a día.",
    categorySlug: "bombachas",
    brand: "Íntima",
    ivaRate: 10,
    variants: [
      { sku: "BOM-VED-S-NEG", label: "S / Negro", pricePyg: 52000, onHand: 28 },
      { sku: "BOM-VED-M-NEG", label: "M / Negro", pricePyg: 52000, onHand: 34 },
      { sku: "BOM-VED-M-PIE", label: "M / Piel", pricePyg: 52000, onHand: 26 },
      { sku: "BOM-VED-L-PIE", label: "L / Piel", pricePyg: 52000, onHand: 21 },
    ],
  },

  // --- Conjuntos ------------------------------------------------------------
  {
    slug: "conjunto-encaje-corpino-bombacha",
    name: "Conjunto de encaje: corpiño y bombacha",
    description:
      "Corpiño con aro y colaless al tono, en encaje floral con detalle de moño. Se vende como conjunto, en la misma caja.",
    categorySlug: "conjuntos",
    brand: "Bella Notte",
    ivaRate: 10,
    variants: [
      { sku: "CON-ENC-85B-NEG", label: "85B / Negro", pricePyg: 245000, compareAtPyg: 298000, onHand: 6 },
      { sku: "CON-ENC-90B-NEG", label: "90B / Negro", pricePyg: 245000, compareAtPyg: 298000, onHand: 8 },
      { sku: "CON-ENC-90B-VIN", label: "90B / Vino", pricePyg: 245000, onHand: 5 },
      { sku: "CON-ENC-90C-VIN", label: "90C / Vino", pricePyg: 252000, onHand: 3 },
    ],
  },
  {
    slug: "conjunto-algodon-basico",
    name: "Conjunto básico de algodón",
    description:
      "Triángulo sin aro y vedetina en algodón con elastano, con la cintura a la vista. Cómodo para todos los días.",
    categorySlug: "conjuntos",
    brand: "Íntima",
    ivaRate: 10,
    variants: [
      { sku: "CON-ALG-S-GRI", label: "S / Gris", pricePyg: 138000, onHand: 12 },
      { sku: "CON-ALG-M-GRI", label: "M / Gris", pricePyg: 138000, onHand: 16 },
      { sku: "CON-ALG-M-NEG", label: "M / Negro", pricePyg: 138000, onHand: 14 },
      { sku: "CON-ALG-L-NEG", label: "L / Negro", pricePyg: 138000, onHand: 11 },
    ],
  },
  {
    slug: "conjunto-tul-bordado-tres-piezas",
    name: "Conjunto de tul bordado (3 piezas)",
    description:
      "Corpiño balconet, colaless y liguero al tono en tul bordado. Viene en caja de regalo, listo para regalar.",
    categorySlug: "conjuntos",
    brand: "Ñandutí",
    ivaRate: 10,
    variants: [
      { sku: "CON-TUL-85B-NEG", label: "85B / Negro", pricePyg: 335000, onHand: 4 },
      { sku: "CON-TUL-90B-NEG", label: "90B / Negro", pricePyg: 335000, onHand: 5 },
      { sku: "CON-TUL-90B-MAR", label: "90B / Marfil", pricePyg: 335000, onHand: 3 },
    ],
  },
  {
    slug: "conjunto-deportivo-top-calza",
    name: "Conjunto deportivo: top y calza",
    description:
      "Top sin aro y calza de tiro alto en tela técnica opaca. Se puede usar suelto o como primera capa.",
    categorySlug: "conjuntos",
    brand: "Aurora",
    ivaRate: 10,
    variants: [
      { sku: "CON-DEP-S-NEG", label: "S / Negro", pricePyg: 215000, onHand: 9 },
      { sku: "CON-DEP-M-NEG", label: "M / Negro", pricePyg: 215000, onHand: 13 },
      { sku: "CON-DEP-M-VER", label: "M / Verde oliva", pricePyg: 215000, onHand: 7 },
      { sku: "CON-DEP-L-NEG", label: "L / Negro", pricePyg: 222000, onHand: 10 },
    ],
  },

  // --- Body -----------------------------------------------------------------
  {
    slug: "body-encaje-manga-larga",
    name: "Body de encaje manga larga",
    description:
      "Encaje elastizado con manga larga y broches en la entrepierna. Se usa como ropa interior o como prenda, con jean o pollera.",
    categorySlug: "body",
    brand: "Bella Notte",
    ivaRate: 10,
    variants: [
      { sku: "BOD-ENC-S-NEG", label: "S / Negro", pricePyg: 210000, compareAtPyg: 249000, onHand: 7 },
      { sku: "BOD-ENC-M-NEG", label: "M / Negro", pricePyg: 210000, compareAtPyg: 249000, onHand: 10 },
      { sku: "BOD-ENC-M-VIN", label: "M / Vino", pricePyg: 210000, onHand: 6 },
      { sku: "BOD-ENC-L-NEG", label: "L / Negro", pricePyg: 218000, onHand: 8 },
    ],
  },
  {
    slug: "body-microfibra-escote-v",
    name: "Body de microfibra escote en V",
    description:
      "Microfibra lisa sin costuras visibles, escote en V y espalda cavada. Liso abajo de la ropa, sin marcar.",
    categorySlug: "body",
    brand: "Íntima",
    ivaRate: 10,
    variants: [
      { sku: "BOD-MIC-S-PIE", label: "S / Piel", pricePyg: 165000, onHand: 11 },
      { sku: "BOD-MIC-M-PIE", label: "M / Piel", pricePyg: 165000, onHand: 15 },
      { sku: "BOD-MIC-M-NEG", label: "M / Negro", pricePyg: 165000, onHand: 12 },
      { sku: "BOD-MIC-L-NEG", label: "L / Negro", pricePyg: 172000, onHand: 9 },
    ],
  },
  {
    slug: "body-tul-transparencias",
    name: "Body de tul con transparencias",
    description:
      "Tul con apliques de encaje en el pecho y la cintura, espalda descubierta. Para ocasión, no para todos los días.",
    categorySlug: "body",
    brand: "Ñandutí",
    ivaRate: 10,
    variants: [
      { sku: "BOD-TUL-S-NEG", label: "S / Negro", pricePyg: 268000, onHand: 4 },
      { sku: "BOD-TUL-M-NEG", label: "M / Negro", pricePyg: 268000, onHand: 6 },
      { sku: "BOD-TUL-M-ROJ", label: "M / Rojo", pricePyg: 268000, onHand: 3 },
    ],
  },

  // --- Pijamas --------------------------------------------------------------
  {
    slug: "pijama-satinado-short",
    name: "Pijama satinado short y camisa",
    description:
      "Camisa de manga corta con vivo contrastante y short al tono, en satén liviano. Fresco para el verano asunceno.",
    categorySlug: "pijamas",
    brand: "Luz de Luna",
    ivaRate: 10,
    variants: [
      { sku: "PIJ-SAT-S-VIN", label: "S / Vino", pricePyg: 245000, onHand: 8 },
      { sku: "PIJ-SAT-M-VIN", label: "M / Vino", pricePyg: 245000, onHand: 12 },
      { sku: "PIJ-SAT-M-NEG", label: "M / Negro", pricePyg: 245000, onHand: 10 },
      { sku: "PIJ-SAT-L-NEG", label: "L / Negro", pricePyg: 252000, onHand: 7 },
    ],
  },
  {
    slug: "camison-algodon-tiras",
    name: "Camisón de algodón con tiras",
    description:
      "Camisón corto de algodón con tiras regulables y detalle de puntilla en el ruedo. El más fresco para dormir.",
    categorySlug: "pijamas",
    brand: "Luz de Luna",
    ivaRate: 10,
    variants: [
      { sku: "PIJ-CAM-S-BLA", label: "S / Blanco", pricePyg: 135000, onHand: 14 },
      { sku: "PIJ-CAM-M-BLA", label: "M / Blanco", pricePyg: 135000, onHand: 18 },
      { sku: "PIJ-CAM-M-ROS", label: "M / Rosa viejo", pricePyg: 135000, onHand: 13 },
      { sku: "PIJ-CAM-L-ROS", label: "L / Rosa viejo", pricePyg: 142000, onHand: 10 },
    ],
  },
  {
    slug: "bata-satinada-corta",
    name: "Bata satinada corta",
    description:
      "Bata a la rodilla con cinto al tono y manga tres cuartos. Combina con el pijama satinado y con el camisón.",
    categorySlug: "pijamas",
    brand: "Luz de Luna",
    ivaRate: 10,
    variants: [
      { sku: "PIJ-BAT-SM-NEG", label: "S/M / Negro", pricePyg: 189000, onHand: 9 },
      { sku: "PIJ-BAT-SM-VIN", label: "S/M / Vino", pricePyg: 189000, onHand: 6 },
      { sku: "PIJ-BAT-LX-NEG", label: "L/XL / Negro", pricePyg: 196000, onHand: 8 },
    ],
  },
  {
    slug: "pijama-algodon-pantalon-largo",
    name: "Pijama de algodón con pantalón largo",
    description:
      "Remera de algodón y pantalón largo con cintura elastizada y cordón. Para el invierno o el aire acondicionado.",
    categorySlug: "pijamas",
    brand: "Íntima",
    ivaRate: 10,
    variants: [
      { sku: "PIJ-ALG-S-GRI", label: "S / Gris", pricePyg: 178000, onHand: 10 },
      { sku: "PIJ-ALG-M-GRI", label: "M / Gris", pricePyg: 178000, onHand: 15 },
      { sku: "PIJ-ALG-L-GRI", label: "L / Gris", pricePyg: 178000, onHand: 12 },
      { sku: "PIJ-ALG-XL-GRI", label: "XL / Gris", pricePyg: 185000, onHand: 7 },
    ],
  },

  // --- Medias ---------------------------------------------------------------
  {
    slug: "media-can-can-20-den",
    name: "Media can-can 20 den",
    description:
      "Can-can liviana de 20 den con cintura reforzada y puntera invisible. La de todos los días para la oficina.",
    categorySlug: "medias",
    brand: "Aurora",
    ivaRate: 10,
    variants: [
      { sku: "MED-CAN-M-NEG", label: "M / Negro", pricePyg: 48000, onHand: 40 },
      { sku: "MED-CAN-L-NEG", label: "L / Negro", pricePyg: 48000, onHand: 35 },
      { sku: "MED-CAN-M-PIE", label: "M / Piel", pricePyg: 48000, onHand: 28 },
      { sku: "MED-CAN-L-PIE", label: "L / Piel", pricePyg: 48000, onHand: 24 },
    ],
  },
  {
    slug: "media-red-clasica",
    name: "Media de red clásica",
    description:
      "Red de trama media con cintura elastizada ancha. Se usa sola o abajo de un jean roto.",
    categorySlug: "medias",
    brand: "Ñandutí",
    ivaRate: 10,
    variants: [
      { sku: "MED-RED-U-NEG", label: "Único / Negro", pricePyg: 62000, onHand: 22 },
      { sku: "MED-RED-U-VIN", label: "Único / Vino", pricePyg: 62000, onHand: 11 },
    ],
  },
  {
    slug: "media-hasta-el-muslo-encaje",
    name: "Media hasta el muslo con encaje",
    description:
      "Media alta que termina en una banda de encaje siliconada para que se sostenga sola, sin liguero.",
    categorySlug: "medias",
    brand: "Bella Notte",
    ivaRate: 10,
    variants: [
      { sku: "MED-MUS-M-NEG", label: "M / Negro", pricePyg: 78000, compareAtPyg: 95000, onHand: 14 },
      { sku: "MED-MUS-L-NEG", label: "L / Negro", pricePyg: 78000, compareAtPyg: 95000, onHand: 12 },
      { sku: "MED-MUS-M-MAR", label: "M / Marfil", pricePyg: 78000, onHand: 6 },
    ],
  },
  {
    slug: "soquete-encaje-pack-2",
    name: "Soquete de encaje (pack de 2)",
    description: "Dos pares de soquetes cortos con puño de encaje, en algodón con elastano.",
    categorySlug: "medias",
    brand: "Íntima",
    ivaRate: 10,
    variants: [
      { sku: "MED-SOQ-U-BLA", label: "Único / Blanco", pricePyg: 38000, onHand: 30 },
      { sku: "MED-SOQ-U-NEG", label: "Único / Negro", pricePyg: 38000, onHand: 33 },
    ],
  },
];

/**
 * Zonas de envío de ejemplo.
 *
 * Los precios son de relleno: la grilla real depende de con qué courier
 * trabaje el comercio, y es uno de los pendientes de la dueña (ver README).
 * Se cambian desde acá y se re-siembra, o a mano en la tabla `shipping_zones`.
 */
export const SEED_SHIPPING_ZONES = [
  {
    slug: "asuncion",
    name: "Asunción",
    cities: ["Asunción"],
    pricePyg: 25000,
    freeThresholdPyg: 350000,
    position: 1,
  },
  {
    slug: "gran-asuncion",
    name: "Gran Asunción",
    cities: [
      "San Lorenzo",
      "Fernando de la Mora",
      "Luque",
      "Lambaré",
      "Capiatá",
      "Ñemby",
      "Mariano Roque Alonso",
      "Villa Elisa",
      "San Antonio",
      "Limpio",
      "Itauguá",
      "Areguá",
    ],
    pricePyg: 35000,
    freeThresholdPyg: 450000,
    position: 2,
  },
  {
    slug: "ciudades-del-interior",
    name: "Ciudades del interior",
    cities: [
      "Ciudad del Este",
      "Encarnación",
      "Coronel Oviedo",
      "Caaguazú",
      "Villarrica",
      "Pedro Juan Caballero",
      "Concepción",
      "Paraguarí",
      "San Juan Bautista",
      "Caacupé",
    ],
    pricePyg: 60000,
    freeThresholdPyg: 800000,
    position: 3,
  },
  {
    slug: "resto-del-pais",
    name: "Resto del país",
    cities: [
      "Filadelfia",
      "Loma Plata",
      "Mariscal Estigarribia",
      "Pilar",
      "Salto del Guairá",
      "Ayolas",
      "Santa Rita",
      "Fuerte Olimpo",
    ],
    pricePyg: 95000,
    freeThresholdPyg: null,
    position: 4,
  },
] as const;
