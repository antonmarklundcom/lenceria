/**
 * Identidad de la tienda — **el archivo que se edita en cada tienda nueva**.
 *
 * Todo lo que cambia de una tienda a otra y no es un secreto vive acá: el
 * nombre que se ve en el header, el pie y los títulos del navegador, la
 * descripción para buscadores y el idioma. Los datos que sí son secretos o
 * cambian por ambiente (WhatsApp, banco, Pagopar, Cloudinary) siguen en el
 * entorno — ver `.env.example` y `src/lib/comercio.ts`.
 *
 * Regla para no romper el template: nada del dominio (checkout, pedidos,
 * panel) lee este archivo. Es sólo presentación. Si aparece la tentación de
 * meter acá una regla de negocio, va en `src/domain/`.
 *
 * Ver NEW-STORE.md para el checklist completo de una tienda nueva.
 */
export type Tienda = {
  /** Nombre comercial. Header, pie y `siteName` de Open Graph. */
  nombre: string;
  /** Título de la home y default del `<title>`. */
  titulo: string;
  /** Meta description — 150/160 caracteres, en el idioma de la tienda. */
  descripcion: string;
  /** Una línea abajo del nombre en el pie. */
  tagline: string;
  /** `<html lang>`. */
  lang: string;
  /** `locale` de Open Graph. */
  ogLocale: string;
};

/**
 * Los valores con los que viene el template `ecom` recién clonado.
 *
 * No es decoración: `pnpm preflight` compara `TIENDA` contra esto y **bloquea**
 * el deploy si la tienda todavía se llama como el template. Publicar el dominio
 * de un cliente branded "TiendaPY" es el error exacto que este control existe
 * para hacer imposible — ver `src/domain/preflight.ts`.
 *
 * Al arrancar una tienda nueva no se toca esta constante: se cambia `TIENDA`.
 */
export const TIENDA_TEMPLATE: Tienda = {
  nombre: "TiendaPY",
  titulo: "TiendaPY — Comprá online en Paraguay",
  descripcion:
    "Tienda online paraguaya. Precios en guaraníes, IVA incluido, envíos a todo el país y atención por WhatsApp.",
  tagline: "Precios en guaraníes, IVA incluido. Enviamos a todo el país.",
  lang: "es-PY",
  ogLocale: "es_PY",
};

/**
 * Cuidado al elegir el `nombre`: `tests/unit/marca-centralizada.test.ts` busca
 * esa palabra en todo `src/` y `scripts/` para probar que no quedó escrita a
 * mano en ningún otro lado. Un nombre que además es vocabulario del rubro
 * ("Encaje", "Seda", "Malva") hace fallar ese test contra las descripciones de
 * producto, que legítimamente usan la palabra. Elegí un nombre propio.
 */
export const TIENDA: Tienda = {
  nombre: "lenceria.com.py",
  titulo: "lenceria.com.py — Lencería online en Paraguay",
  descripcion:
    "Lencería para todos los días y para los que no lo son. Precios en guaraníes con IVA incluido, envío discreto a todo el país y cambios sin vueltas.",
  tagline: "Lencería con envío discreto a todo el país. Guaraníes, IVA incluido.",
  lang: "es-PY",
  ogLocale: "es_PY",
};
