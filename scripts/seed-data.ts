import type { IvaRate } from '@/db/schema';

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
  { slug: 'corpinos', name: 'Corpiños', position: 1 },
  { slug: 'bombachas', name: 'Bombachas', position: 2 },
  { slug: 'conjuntos', name: 'Conjuntos', position: 3 },
  { slug: 'pijamas', name: 'Pijamas y Batas', position: 4 },
] as const;

/** Precios reales de góndola paraguaya, IVA incluido, en guaraníes enteros. */
export const SEED_PRODUCTS: SeedProduct[] = [
  // --- Corpiños --------------------------------------------------------------
  {
    slug: 'corpino-clasico-realce',
    name: 'Corpiño clásico con realce',
    description: 'Corpiño con aros y relleno leve, breteles regulables y espalda tradicional.',
    categorySlug: 'corpinos',
    brand: 'Ñandutí Íntima',
    ivaRate: 10,
    variants: [
      { sku: 'COR-REA-NEG', label: 'Negro', pricePyg: 95000, onHand: 24 },
      { sku: 'COR-REA-BLA', label: 'Blanco', pricePyg: 95000, onHand: 18 },
    ],
  },
  {
    slug: 'corpino-triangulo-algodon',
    name: 'Corpiño triángulo de algodón',
    description: 'Corpiño sin aros en algodón peinado, ideal para uso diario.',
    categorySlug: 'corpinos',
    brand: 'Bella Piel',
    ivaRate: 10,
    variants: [
      { sku: 'COR-TRI-85B', label: '85B', pricePyg: 65000, onHand: 30 },
      { sku: 'COR-TRI-90B', label: '90B', pricePyg: 65000, onHand: 22 },
    ],
  },
  {
    slug: 'corpino-balconet-encaje',
    name: 'Corpiño balconet de encaje',
    description: 'Corpiño balconet con copa preformada y encaje floral en el borde.',
    categorySlug: 'corpinos',
    brand: 'Ñandutí Íntima',
    ivaRate: 10,
    variants: [
      { sku: 'COR-BAL-90B', label: '90B', pricePyg: 120000, compareAtPyg: 150000, onHand: 15 },
      { sku: 'COR-BAL-95B', label: '95B', pricePyg: 120000, onHand: 11 },
    ],
  },
  {
    slug: 'corpino-deportivo-top',
    name: 'Corpiño deportivo tipo top',
    description: 'Top deportivo de sujeción media, tela transpirable de secado rápido.',
    categorySlug: 'corpinos',
    brand: 'FitLace',
    ivaRate: 10,
    variants: [
      { sku: 'COR-DEP-S', label: 'Talle S', pricePyg: 78000, onHand: 40 },
      { sku: 'COR-DEP-M', label: 'Talle M', pricePyg: 78000, onHand: 35 },
      { sku: 'COR-DEP-L', label: 'Talle L', pricePyg: 78000, onHand: 20 },
    ],
  },
  {
    slug: 'corpino-sin-aros-comfort',
    name: 'Corpiño sin aros comfort',
    description: 'Corpiño sin aros con banda ancha, pensado para todo el día.',
    categorySlug: 'corpinos',
    brand: 'Bella Piel',
    ivaRate: 10,
    variants: [{ sku: 'COR-COM-UNI', label: 'Único ajustable', pricePyg: 58000, onHand: 26 }],
  },
  {
    slug: 'corpino-strapless-silicona',
    name: 'Corpiño strapless de silicona',
    description: 'Corpiño sin breteles con banda de silicona antideslizante.',
    categorySlug: 'corpinos',
    brand: 'Ñandutí Íntima',
    ivaRate: 10,
    variants: [{ sku: 'COR-STR-8590', label: '85-90', pricePyg: 135000, onHand: 12 }],
  },

  // --- Bombachas ---------------------------------------------------------------
  {
    slug: 'bombacha-algodon-basica',
    name: 'Bombacha de algodón básica',
    description: 'Bombacha clásica de algodón elastizado, pack individual.',
    categorySlug: 'bombachas',
    brand: 'Bella Piel',
    ivaRate: 10,
    variants: [
      { sku: 'BOM-BAS-S', label: 'Talle S', pricePyg: 28000, onHand: 40 },
      { sku: 'BOM-BAS-M', label: 'Talle M', pricePyg: 28000, onHand: 45 },
      { sku: 'BOM-BAS-L', label: 'Talle L', pricePyg: 28000, onHand: 38 },
      { sku: 'BOM-BAS-XL', label: 'Talle XL', pricePyg: 30000, onHand: 20 },
    ],
  },
  {
    slug: 'bombacha-encaje-francesa',
    name: 'Bombacha de encaje afrancesada',
    description: 'Bombacha con vivo de encaje francés y tela suave al tacto.',
    categorySlug: 'bombachas',
    brand: 'Ñandutí Íntima',
    ivaRate: 10,
    variants: [
      { sku: 'BOM-FRA-S', label: 'Talle S', pricePyg: 35000, onHand: 20 },
      { sku: 'BOM-FRA-M', label: 'Talle M', pricePyg: 35000, onHand: 17 },
    ],
  },
  {
    slug: 'bombacha-tanga-microfibra',
    name: 'Bombacha tanga de microfibra',
    description: 'Tanga sin costuras de microfibra, invisible bajo la ropa.',
    categorySlug: 'bombachas',
    brand: 'FitLace',
    ivaRate: 10,
    variants: [
      { sku: 'BOM-TAN-S', label: 'Talle S', pricePyg: 25000, onHand: 33 },
      { sku: 'BOM-TAN-M', label: 'Talle M', pricePyg: 25000, onHand: 29 },
      { sku: 'BOM-TAN-L', label: 'Talle L', pricePyg: 25000, onHand: 24 },
    ],
  },
  {
    slug: 'bombacha-culotte-alta',
    name: 'Bombacha culotte tiro alto',
    description: 'Culotte de tiro alto, cintura ancha que no marca.',
    categorySlug: 'bombachas',
    brand: 'Bella Piel',
    ivaRate: 10,
    variants: [
      { sku: 'BOM-CUL-M', label: 'Talle M', pricePyg: 32000, onHand: 18 },
      { sku: 'BOM-CUL-L', label: 'Talle L', pricePyg: 32000, onHand: 14 },
    ],
  },
  {
    slug: 'bombacha-brasilera-lisa',
    name: 'Bombacha brasilera lisa',
    description: 'Corte brasilero clásico en algodón liso, sin costuras laterales.',
    categorySlug: 'bombachas',
    brand: 'Bella Piel',
    ivaRate: 10,
    variants: [
      { sku: 'BOM-BRA-S', label: 'Talle S', pricePyg: 26000, onHand: 50 },
      { sku: 'BOM-BRA-M', label: 'Talle M', pricePyg: 26000, onHand: 60 },
      { sku: 'BOM-BRA-L', label: 'Talle L', pricePyg: 26000, onHand: 40 },
    ],
  },
  {
    slug: 'bombacha-control-suave',
    name: 'Bombacha faja control suave',
    description: 'Bombacha moldeadora de compresión suave, cintura alta.',
    categorySlug: 'bombachas',
    brand: 'Moldea PY',
    ivaRate: 10,
    variants: [
      { sku: 'BOM-CTR-M', label: 'Talle M', pricePyg: 68000, compareAtPyg: 85000, onHand: 15 },
      { sku: 'BOM-CTR-L', label: 'Talle L', pricePyg: 68000, onHand: 10 },
    ],
  },

  // --- Conjuntos ---------------------------------------------------------------
  {
    slug: 'conjunto-basico-algodon',
    name: 'Conjunto básico de algodón',
    description: 'Conjunto de corpiño y bombacha en algodón, para el uso de todos los días.',
    categorySlug: 'conjuntos',
    brand: 'Básicos Íntimos',
    ivaRate: 10,
    variants: [
      { sku: 'CNJ-BAS-S', label: 'Talle S', pricePyg: 89000, onHand: 20 },
      { sku: 'CNJ-BAS-M', label: 'Talle M', pricePyg: 89000, onHand: 25 },
      { sku: 'CNJ-BAS-L', label: 'Talle L', pricePyg: 89000, onHand: 15 },
    ],
  },
  {
    slug: 'conjunto-encaje-seda',
    name: 'Conjunto de encaje y seda',
    description: 'Conjunto de dos piezas en seda con detalles de encaje bordado.',
    categorySlug: 'conjuntos',
    brand: 'Ñandutí Íntima',
    ivaRate: 10,
    variants: [
      { sku: 'CNJ-SED-S', label: 'Talle S', pricePyg: 245000, onHand: 8 },
      { sku: 'CNJ-SED-M', label: 'Talle M', pricePyg: 245000, onHand: 13 },
    ],
  },
  {
    slug: 'conjunto-lenceria-cordones',
    name: 'Conjunto de lencería con cordones',
    description: 'Conjunto con detalles de cordones ajustables y transparencias sutiles.',
    categorySlug: 'conjuntos',
    brand: 'Viena Lencería',
    ivaRate: 10,
    variants: [
      { sku: 'CNJ-COR-S', label: 'Talle S', pricePyg: 198000, onHand: 9 },
      { sku: 'CNJ-COR-M', label: 'Talle M', pricePyg: 198000, onHand: 14 },
      { sku: 'CNJ-COR-L', label: 'Talle L', pricePyg: 198000, onHand: 11 },
    ],
  },
  {
    slug: 'conjunto-babydoll-transparencia',
    name: 'Conjunto babydoll con transparencias',
    description: 'Babydoll corto con tul transparente y bombacha a juego.',
    categorySlug: 'conjuntos',
    brand: 'Ñandutí Íntima',
    ivaRate: 10,
    variants: [
      { sku: 'CNJ-BAB-UNI', label: 'Único', pricePyg: 175000, compareAtPyg: 210000, onHand: 8 },
    ],
  },
  {
    slug: 'conjunto-deportivo-top-bombacha',
    name: 'Conjunto deportivo top y bombacha',
    description: 'Conjunto deportivo de top de sujeción media y bombacha a tono.',
    categorySlug: 'conjuntos',
    brand: 'FitLace',
    ivaRate: 10,
    variants: [
      { sku: 'CNJ-DEP-S', label: 'Talle S', pricePyg: 115000, onHand: 17 },
      { sku: 'CNJ-DEP-M', label: 'Talle M', pricePyg: 115000, onHand: 12 },
    ],
  },
  {
    slug: 'conjunto-saten-dos-piezas',
    name: 'Conjunto de satén dos piezas',
    description: 'Conjunto de satén brillante con breteles finos regulables.',
    categorySlug: 'conjuntos',
    brand: 'Viena Lencería',
    ivaRate: 10,
    variants: [{ sku: 'CNJ-SAT-UNI', label: 'Único', pricePyg: 225000, onHand: 50 }],
  },

  // --- Pijamas y batas -----------------------------------------------------
  {
    slug: 'bata-seda-larga',
    name: 'Bata de seda larga',
    description: 'Bata larga de seda con cinturón para anudar y caída fluida.',
    categorySlug: 'pijamas',
    brand: 'Ñandutí Íntima',
    ivaRate: 10,
    variants: [
      { sku: 'BAT-SED-NEG', label: 'Negro', pricePyg: 310000, compareAtPyg: 350000, onHand: 4 },
      { sku: 'BAT-SED-MAR', label: 'Marfil', pricePyg: 310000, onHand: 3 },
    ],
  },
  {
    slug: 'pijama-algodon-dos-piezas',
    name: 'Pijama de algodón dos piezas',
    description: 'Pijama de remera y short en algodón suave para el verano.',
    categorySlug: 'pijamas',
    brand: 'Bella Piel',
    ivaRate: 10,
    variants: [
      { sku: 'PIJ-ALG-S', label: 'Talle S', pricePyg: 135000, onHand: 7 },
      { sku: 'PIJ-ALG-M', label: 'Talle M', pricePyg: 135000, onHand: 10 },
      { sku: 'PIJ-ALG-L', label: 'Talle L', pricePyg: 135000, onHand: 6 },
    ],
  },
  {
    slug: 'camison-encaje-noche',
    name: 'Camisón de encaje de noche',
    description: 'Camisón corto con escote de encaje y breteles finos.',
    categorySlug: 'pijamas',
    brand: 'Ñandutí Íntima',
    ivaRate: 10,
    variants: [
      { sku: 'CAM-ENC-S', label: 'Talle S', pricePyg: 145000, onHand: 13 },
      { sku: 'CAM-ENC-M', label: 'Talle M', pricePyg: 145000, onHand: 9 },
    ],
  },
  {
    slug: 'bata-cruzada-microfibra',
    name: 'Bata cruzada de microfibra',
    description: 'Bata cruzada corta de microfibra suave, con bolsillos laterales.',
    categorySlug: 'pijamas',
    brand: 'Bella Piel',
    ivaRate: 10,
    variants: [{ sku: 'BAT-MIC-UNI', label: 'Único', pricePyg: 98000, onHand: 21 }],
  },
  {
    slug: 'pijama-short-conjunto',
    name: 'Pijama short conjunto',
    description: 'Conjunto de musculosa y short para dormir, en algodón elastizado.',
    categorySlug: 'pijamas',
    brand: 'FitLace',
    ivaRate: 10,
    variants: [
      { sku: 'PIJ-SHO-S', label: 'Talle S', pricePyg: 92000, onHand: 19 },
      { sku: 'PIJ-SHO-M', label: 'Talle M', pricePyg: 92000, onHand: 14 },
    ],
  },
  {
    slug: 'kimono-saten-corto',
    name: 'Kimono satén corto',
    description: 'Kimono corto de satén con mangas anchas y lazo a la cintura.',
    categorySlug: 'pijamas',
    brand: 'Viena Lencería',
    ivaRate: 10,
    variants: [{ sku: 'KIM-SAT-UNI', label: 'Único', pricePyg: 115000, onHand: 16 }],
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
