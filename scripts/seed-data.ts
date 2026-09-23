import type { IvaRate } from '@/db/schema';
import { TIENDA } from '@/config/tienda';

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

export const SEED_CATEGORIES = [
  { slug: 'conjuntos', name: 'Conjuntos', position: 1 },
  { slug: 'corpinos', name: 'Corpiños', position: 2 },
  { slug: 'bombachas', name: 'Bombachas', position: 3 },
  { slug: 'camisones-y-pijamas', name: 'Camisones y pijamas', position: 4 },
  { slug: 'bodies', name: 'Bodies', position: 5 },
  { slug: 'batas-y-kimonos', name: 'Batas y kimonos', position: 6 },
  { slug: 'accesorios', name: 'Accesorios', position: 7 },
] as const;

/** Catálogo real de la tienda, IVA incluido, en guaraníes enteros. */
export const SEED_PRODUCTS: SeedProduct[] = [
  // --- Conjuntos ---------------------------------------------------------------
  {
    slug: 'conjunto-nanduti',
    name: 'Conjunto Ñandutí',
    description:
      'Corpiño y bombacha en marfil con encaje ñandutí bordado a mano en Itauguá. Cada pieza lleva días de trabajo y ninguna es idéntica a otra.',
    categorySlug: 'conjuntos',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      { sku: 'LI-NAN-S', label: 'Talle S', pricePyg: 185000, onHand: 3 },
      { sku: 'LI-NAN-M', label: 'Talle M', pricePyg: 185000, onHand: 4 },
      { sku: 'LI-NAN-L', label: 'Talle L', pricePyg: 185000, onHand: 3 },
    ],
  },
  {
    slug: 'conjunto-amanecer',
    name: 'Conjunto Amanecer',
    description:
      'Bralette y culotte de encaje coral, tiro alto. Un conjunto alegre y cómodo, cosido a mano en Paraguay.',
    categorySlug: 'conjuntos',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      // Stock holgado a propósito: es el primer producto de la primera
      // categoría, el que compran los specs e2e (`completarCheckout` en
      // tests/e2e/helpers.ts) desde dos workers a la vez. Con 3-4 unidades la
      // reserva de uno dejaba al otro con "se quedó sin stock" y el pedido no
      // se creaba (flaky en CI). En la tienda real el stock se carga en el panel.
      { sku: 'LI-AMA-S', label: 'Talle S', pricePyg: 175000, onHand: 20 },
      { sku: 'LI-AMA-M', label: 'Talle M', pricePyg: 175000, onHand: 20 },
      { sku: 'LI-AMA-L', label: 'Talle L', pricePyg: 175000, onHand: 20 },
    ],
  },

  // --- Corpiños --------------------------------------------------------------
  {
    slug: 'corpino-yvoty',
    name: 'Corpiño Yvoty',
    description:
      "Triángulo sin aro en algodón ao po'i blanco, liviano y fresco para el calor de Asunción. Bordado a mano, cosido en casa.",
    categorySlug: 'corpinos',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      { sku: 'LI-YVO-S', label: 'Talle S', pricePyg: 95000, onHand: 4 },
      { sku: 'LI-YVO-M', label: 'Talle M', pricePyg: 95000, onHand: 5 },
      { sku: 'LI-YVO-L', label: 'Talle L', pricePyg: 95000, onHand: 4 },
    ],
  },
  {
    slug: 'bralette-tacuru',
    name: 'Bralette Tacurú',
    description:
      'Bralette tejido a crochet en algodón terracota, con tiras para anudar. Cada uno tarda una tarde entera en tejerse.',
    categorySlug: 'corpinos',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      { sku: 'LI-TAC-S', label: 'Talle S', pricePyg: 110000, onHand: 3 },
      { sku: 'LI-TAC-M', label: 'Talle M', pricePyg: 110000, onHand: 4 },
      { sku: 'LI-TAC-L', label: 'Talle L', pricePyg: 110000, onHand: 3 },
    ],
  },

  // --- Bombachas ---------------------------------------------------------------
  {
    slug: 'bombacha-ao-poi-clasica',
    name: "Bombacha Ao Po'i Clásica",
    description:
      "Bombacha clásica en algodón ao po'i beige con puntilla fina en la cintura. Cómoda para todos los días, hecha a mano.",
    categorySlug: 'bombachas',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      { sku: 'LI-AOP-S', label: 'Talle S', pricePyg: 45000, onHand: 6 },
      { sku: 'LI-AOP-M', label: 'Talle M', pricePyg: 45000, onHand: 8 },
      { sku: 'LI-AOP-L', label: 'Talle L', pricePyg: 45000, onHand: 6 },
    ],
  },

  {
    slug: 'pack-diario-sin-costura',
    name: 'Pack Diario x3 sin costura',
    description:
      'Tres bombachas tiro alto sin costura, en nude, negro y rosa viejo. Bordes cortados a láser que no marcan bajo la ropa y tela suave que acompaña todo el día.',
    categorySlug: 'bombachas',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      { sku: 'LI-PAK-S', label: 'Talle S', pricePyg: 89000, onHand: 5 },
      { sku: 'LI-PAK-M', label: 'Talle M', pricePyg: 89000, onHand: 8 },
      { sku: 'LI-PAK-L', label: 'Talle L', pricePyg: 89000, onHand: 8 },
      { sku: 'LI-PAK-XL', label: 'Talle XL', pricePyg: 89000, onHand: 5 },
    ],
  },

  // --- Camisones y pijamas -------------------------------------------------
  {
    slug: 'camison-luna',
    name: 'Camisón Luna',
    description:
      'Camisón de satén rosa viejo con breteles finos y escote de encaje. Suave, fresco y hecho a mano.',
    categorySlug: 'camisones-y-pijamas',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      { sku: 'LI-LUN-S', label: 'Talle S', pricePyg: 150000, onHand: 3 },
      { sku: 'LI-LUN-M', label: 'Talle M', pricePyg: 150000, onHand: 4 },
      { sku: 'LI-LUN-L', label: 'Talle L', pricePyg: 150000, onHand: 3 },
    ],
  },
  {
    slug: 'pijama-ysapy',
    name: 'Pijama Ysapy',
    description:
      'Musculosa y short de algodón lila con borde de puntilla. Para dormir fresca, hecho a mano.',
    categorySlug: 'camisones-y-pijamas',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      { sku: 'LI-YSA-S', label: 'Talle S', pricePyg: 135000, onHand: 3 },
      { sku: 'LI-YSA-M', label: 'Talle M', pricePyg: 135000, onHand: 4 },
      { sku: 'LI-YSA-L', label: 'Talle L', pricePyg: 135000, onHand: 3 },
    ],
  },

  // --- Bodies ----------------------------------------------------------------
  {
    slug: 'body-jazmin',
    name: 'Body Jazmín',
    description:
      'Body de encaje negro floral con transparencias y breteles finos regulables. Para una noche especial o debajo de un blazer.',
    categorySlug: 'bodies',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      { sku: 'LI-JAZ-S', label: 'Talle S', pricePyg: 165000, onHand: 2 },
      { sku: 'LI-JAZ-M', label: 'Talle M', pricePyg: 165000, onHand: 3 },
      { sku: 'LI-JAZ-L', label: 'Talle L', pricePyg: 165000, onHand: 2 },
    ],
  },

  // --- Batas y kimonos ---------------------------------------------------------
  {
    slug: 'kimono-mburucuya',
    name: 'Kimono Mburucuyá',
    description:
      'Bata corta de gasa marfil con flores de mburucuyá bordadas a mano en las mangas y cinto de satén. Talle único.',
    categorySlug: 'batas-y-kimonos',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [{ sku: 'LI-MBU-U', label: 'Talle único', pricePyg: 190000, onHand: 4 }],
  },

  // --- Accesorios --------------------------------------------------------------
  {
    slug: 'liga-nupcial-nanduti',
    name: 'Liga Nupcial Ñandutí',
    description:
      'Liga de novia en marfil con encaje ñandutí y un moñito de satén. El detalle paraguayo para el gran día. Talle único.',
    categorySlug: 'accesorios',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [{ sku: 'LI-LIG-U', label: 'Talle único', pricePyg: 60000, onHand: 5 }],
  },
  {
    slug: 'caja-regalo-nanduti',
    name: 'Caja Regalo Ñandutí',
    description:
      'El Conjunto Ñandutí y la Liga Ñandutí en una caja de regalo con papel de seda, cinta de satén y tarjeta para tu dedicatoria. Para el Día de la Madre, un aniversario o una novia.',
    categorySlug: 'accesorios',
    brand: TIENDA.nombre,
    ivaRate: 10,
    variants: [
      { sku: 'LI-CAJ-S', label: 'Conjunto talle S', pricePyg: 229000, compareAtPyg: 245000, onHand: 2 },
      { sku: 'LI-CAJ-M', label: 'Conjunto talle M', pricePyg: 229000, compareAtPyg: 245000, onHand: 3 },
      { sku: 'LI-CAJ-L', label: 'Conjunto talle L', pricePyg: 229000, compareAtPyg: 245000, onHand: 2 },
    ],
  },
];

export const SEED_SHIPPING_ZONES = [
  {
    slug: 'asuncion',
    name: 'Asunción',
    cities: ['Asunción'],
    pricePyg: 25000,
    freeThresholdPyg: 500000,
    position: 1,
  },
  {
    slug: 'gran-asuncion',
    name: 'Gran Asunción',
    cities: [
      'San Lorenzo',
      'Fernando de la Mora',
      'Luque',
      'Lambaré',
      'Capiatá',
      'Ñemby',
      'Mariano Roque Alonso',
      'Villa Elisa',
      'San Antonio',
      'Limpio',
      'Itauguá',
      'Areguá',
    ],
    pricePyg: 35000,
    freeThresholdPyg: 700000,
    position: 2,
  },
  {
    slug: 'ciudades-del-interior',
    name: 'Ciudades del interior',
    cities: [
      'Ciudad del Este',
      'Encarnación',
      'Coronel Oviedo',
      'Caaguazú',
      'Villarrica',
      'Pedro Juan Caballero',
      'Concepción',
      'Paraguarí',
      'San Juan Bautista',
      'Caacupé',
    ],
    pricePyg: 60000,
    freeThresholdPyg: 1500000,
    position: 3,
  },
  {
    slug: 'resto-del-pais',
    name: 'Resto del país',
    cities: [
      'Filadelfia',
      'Loma Plata',
      'Mariscal Estigarribia',
      'Pilar',
      'Salto del Guairá',
      'Ayolas',
      'Santa Rita',
      'Fuerte Olimpo',
    ],
    pricePyg: 95000,
    freeThresholdPyg: null,
    position: 4,
  },
] as const;
