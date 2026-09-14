import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

/**
 * Valida la forma de `scripts/fotos-catalogo.json`, el insumo de
 * `pnpm fotos:catalogo`: cada entrada necesita slug, URL https y alt, y los
 * slugs no se pueden repetir (el script los usa como clave para resolver
 * contra `products`).
 */
const ARCHIVO = path.join(__dirname, '..', '..', 'scripts', 'fotos-catalogo.json');

type FotoCatalogo = { slug: string; url: string; alt: string };

describe('scripts/fotos-catalogo.json', () => {
  const items = JSON.parse(readFileSync(ARCHIVO, 'utf8')) as FotoCatalogo[];

  it('no está vacío', () => {
    expect(items.length).toBeGreaterThan(0);
  });

  it('cada entrada tiene slug, url https y alt no vacíos', () => {
    for (const item of items) {
      expect(typeof item.slug).toBe('string');
      expect(item.slug.trim()).not.toBe('');

      expect(typeof item.url).toBe('string');
      expect(item.url.startsWith('https://')).toBe(true);

      expect(typeof item.alt).toBe('string');
      expect(item.alt.trim()).not.toBe('');
    }
  });

  // Un mismo producto puede llevar varias fotos (una fila por foto): lo que no
  // se repite es el par slug + url.
  it('no hay pares slug + url repetidos', () => {
    const claves = items.map((item) => `${item.slug} ${item.url}`);
    expect(new Set(claves).size).toBe(claves.length);
  });
});
