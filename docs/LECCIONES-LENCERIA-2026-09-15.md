# Lecciones del lanzamiento de lenceria.com.py (2026-09-13 → 2026-09-15)

Primera tienda real salida del template `antonmarklundcom/ecom`. Repo
`antonmarklundcom/lenceria`, Hostinger Websites (Node.js + MySQL), Cloudinary
Free, WhatsApp-first. Este archivo junta todo lo que rompió, lo que faltó y lo
que se resolvió a mano, para decidir qué vuelve al template. Cada lección trae
el síntoma, la causa, cómo se resolvió en lenceria y una propuesta concreta para
el template (código, doc, script o test). Las propuestas están marcadas con
**T-nn** para poder referirlas desde un prompt.

Estado final: tienda viva con catálogo real (10 productos, 26 variantes, 30
fotos en Cloudinary), rediseño Blush Romantic con home larga, scroll-motion y
collage, admin operativo. Pendiente del dueño: datos bancarios, cron jobs,
rotación de secretos.

---

## A. Bugs y trampas del template (código)

### A1. Los tests de integración lanzan `pnpm` como proceso y mueren en Windows
- **Síntoma:** `spawn pnpm ENOENT` en `tests/integration/seed.test.ts`,
  `catalog.test.ts` e `importar-productos.test.ts`. Las tres suites nunca
  habían corrido contra una base en la PC de Anton.
- **Causa:** `execFile('pnpm', ['exec', 'tsx', ...])` sin shell no resuelve
  `pnpm.cmd` en Windows.
- **Fix en lenceria:** `tests/helpers/run-script.ts` lanza el CLI de tsx con
  `process.execPath` (`createRequire(import.meta.url).resolve('tsx/cli')`), sin
  pnpm ni shell. Aserciones intactas.
- **T-01 (template):** cherry-pick del helper y de los tres tests. Commit
  `9b62de8` en lenceria.

### A2. La home publicaba la consulta SQL y el consejo de `docker compose` al público
- **Síntoma:** con la base sin migrar, la portada de producción mostraba
  `Failed query: select ... from categories` y "Levantá la base con docker
  compose up -d".
- **Causa:** el `catch` de `src/app/page.tsx` renderizaba `error.message` y
  `home.errorCatalogo.ayuda` sin mirar `NODE_ENV`.
- **Fix en lenceria:** en producción sólo el título + `home.errorCatalogo.publico`
  ("Estamos acomodando el catálogo..."); fuera de producción igual que antes;
  `console.error(cause)` en ambos modos. Commit `d1331a4`.
- **T-02 (template):** mismo cambio. Revisar si otras páginas (categoría,
  producto, buscar) tienen el mismo patrón de `error.message` en pantalla.

### A3. `/categoria/[slug]` responde un 500 pelado (sin marca) cuando falla el render
- **Síntoma:** `Internal Server Error` en texto plano, sin header ni footer,
  mientras `/producto/[slug]` mostraba la pantalla `error.tsx`.
- **Causa:** la ruta es ISR (`revalidate = 300` + `generateStaticParams`); un
  throw en render estático no llega al error boundary de la raíz.
- **Fix en lenceria:** ninguno; desapareció con la base cargada + redeploy.
- **T-03 (template):** capturar el fallo de `loadCategory` y renderizar el
  estado de error con marca, o documentar en DEPLOY.md que las categorías
  sirven 500 hasta el primer redeploy con base migrada.

### A4. `/cuenta` responde 200 con cuerpo de 404 (soft 404)
- **Causa:** `notFound()` en `CuentaLayout` con `loading.tsx` en la raíz: el
  shell (y el status 200) sale antes.
- **T-04 (template):** resolver la puerta de `/cuenta/*` en `proxy.ts` cuando
  `cuentasClientes` está apagado (redirect o 404 real), no en el layout.

### A5. Error React #441 en consola en cada página que cae en `error.tsx`
- Sólo se vio con la base rota. No reproducido después. **T-05:** revisar
  `src/app/error.tsx` por un hook fuera de lugar en el fallback; baja prioridad.

### A6. El test de `fotos-catalogo.json` exigía slugs únicos, pero un producto lleva varias fotos
- **Fix:** el test pasa a exigir pares `slug + url` únicos. **T-06:** mismo
  cambio en el template si adopta `fotos-catalogo` (ver B3).

### A7. Un primer `POST /api/setup/init` con cuerpo vacío consume el "primera vez"
- **Síntoma:** la primera llamada llegó sin cuerpo (ver C1), corrió migraciones
  y marcó la tienda como inicializada; el segundo intento con `seed` + `owner`
  devolvió `409 ya_inicializada` aunque `yaEstaba.seed = false` y
  `duenio = false`. Hubo que repetir con `force: true`.
- **T-07 (template):** si `yaEstaba.seed` y `yaEstaba.duenio` son ambos
  `false`, aceptar `seed` y `owner` sin `force`. No hay nada que proteger.

### A8. `verify-deps-before-run` + sandbox = `pnpm db:check` colgado 5 minutos
- **Síntoma:** cualquier `pnpm <script>` se quedaba mudo; en realidad estaba
  intentando un `pnpm install` anidado sin red.
- **T-08 (doc):** en NEW-STORE.md, "si un script de pnpm no imprime nada en
  30 s, corré `pnpm install --frozen-lockfile` primero; sin red usá
  `--offline`".

---

## B. Cosas que la tienda necesitó y el template no traía

### B1. Fotos de modelo generadas con IA: qué modelo acepta lencería
- GPT Image 2.5 (Flare y Sunburst) **rechaza como NSFW** cualquier prompt con
  lencería puesta, incluso un bralette de crochet con pantalón. Higgsfield
  **Soul V2** las acepta y da calidad de campaña a 0.12 créditos por imagen
  (2k, 1536×2048). Nunca escribir "magazine quality": Soul pinta un logo tipo
  Vogue. GPT Image sí sirve para recortes con `background: transparent`
  (collage) y para planos sin modelo.
- **T-09 (doc):** sección en NEW-STORE.md §4 o en la skill
  `higgsfield-web-imagery`: tabla modelo × tipo de foto × costo.

### B2. Carga masiva de fotos desde URLs (`pnpm fotos:catalogo`)
- Ya está en lenceria (`scripts/fotos-catalogo.ts` + JSON). Cloudinary toma la
  URL remota directo: cero tráfico desde la PC. **T-10:** adoptar en el template
  junto con su test (A6).

### B3. Rediseño de piel sin tocar maquinaria: funcionó el contrato
- Tres dispatches de Codex (tokens/fuentes/header/footer/cards, home larga,
  scroll-motion) sin tocar `src/domain`, `src/lib`, checkout ni admin, y sin
  perder un solo `data-testid`. `marca.css` pisando el tema del kit es el
  mecanismo correcto. **T-11 (doc):** dejar escrito en NEW-STORE.md §5 el
  orden "tokens → chrome → home → motion" y el checklist de auditoría (build
  de producción local + Playwright a 390 y 1440, sin JS, overflow, testids).

### B4. Scroll-motion sin librerías (contrato de reveal)
- `src/components/scroll-motion.tsx`: un loop RAF escribe `--in/--out` en cada
  `[data-reveal]`; el CSS deriva opacidad, elevación y blur; sin JS todo queda
  visible; `prefers-reduced-motion` respetado; hero fijado que recorre fotos con
  el scroll; texto línea por línea; collage parallax con recortes. Cero
  dependencias. **T-12:** llevarlo al template como componente opcional
  (`TIENDA.motion: boolean`) con las clases CSS en un archivo aparte. Ojo: la
  home de lenceria es piel, así que va como *opción*, no como default.

### B5. Home larga: las siete secciones que faltaban
- Hero dos columnas, tira de confianza (envío gratis desde la zona, calculada
  igual que el header), grilla de todas las categorías, destacados, banda
  "hecho a mano", cómo comprar en tres pasos, fila de una categoría, banda de
  WhatsApp con foto. **T-13:** ofrecer estas secciones como componentes del
  template con copy por i18n, para que la próxima tienda no arranque de cero.

---

## C. Operación y deploy (Hostinger, hPanel)

### C1. PowerShell 5.1 rompe el cuerpo JSON de `curl.exe`
- `-d "{\"seed\":true}"` llega vacío o partido (curl se queja de "Port number").
  **Fix:** escribir el JSON a un archivo con un here-string y pasar
  `-d "@$env:USERPROFILE\init.json"`. **T-14 (doc):** DEPLOY.md §4, bloque
  PowerShell junto al de bash.

### C2. Borrar una variable en hPanel es fácil y silencioso
- `SESSION_SECRET` desapareció al editar otras variables; `/admin` pasó a 500
  pelado (el proxy tira al abrir la sesión). **T-15:** (a) `/api/health` podría
  reportar `session: true/false` sin revelar el valor; (b) preflight ya lo
  cubre, pero sólo se corre a mano; (c) DEPLOY.md: "después de tocar variables,
  abrí /admin".

### C3. `SETUP_SECRET` quedó puesta después del setup
- El dueño la dejó dos deploys seguidos; preflight avisó, nadie lo leyó.
  **T-16:** que `POST /api/setup/init` con `ok: true` devuelva un campo
  `siguientePaso: "borrá SETUP_SECRET y Redeploy"` bien arriba en la respuesta,
  no enterrado en `preflight.checks`.

### C4. Remote MySQL y IPv6
- `srv1719.hstgr.io` resuelve a IPv6 desde la PC; la allowlist tenía sólo la
  IPv4 → `Access denied for user ...@'2803:...'`. Usar el host por IP
  (`193.203.175.151`). **T-17 (doc):** DEPLOY.md §3, "si tu ISP tiene IPv6,
  usá la IP del servidor como host o agregá también tu IPv6".

### C5. Las categorías sirvieron 500 hasta el primer redeploy después de sembrar
- Build hecho con base vacía + ISR → 500 cacheado hasta rebuild. **T-18 (doc):**
  DEPLOY.md §4: "después del setup con seed, Redeploy" (ya se hace por
  `SETUP_SECRET`, dejarlo explícito que también refresca ISR).

### C6. Cloudinary Free es permanente; el trial de 30 días es otro producto
- La página de precios confunde: "Assets" (DAM) tiene trial; "Image and Video
  APIs" tiene plan Free forever con 25 créditos/mes. **T-19 (doc):** una línea
  en NEW-STORE.md §4 con el link de registro correcto y el cálculo de consumo
  (una tienda de este tamaño usa 1–3 créditos/mes).

### C7. Secretos por el chat
- Todos los secretos pasaron por el chat (DB, sesión, cron, Cloudinary). Rotar
  después del lanzamiento. **T-20 (doc):** checklist de rotación en DEPLOY.md
  con el orden correcto (variable → Redeploy) para no tumbar la tienda.

---

## D. Proceso (manager Fable / worker Codex)

- Cuatro dispatches a `gpt-6-astra` low, todos aceptados a la primera. Lo que
  hizo la diferencia: archivos permitidos explícitos, definición de hecho
  observable, comandos con la ruta absoluta del pnpm empaquetado de Codex, y
  auditoría por ejecución (build de producción + Playwright) hecha por el
  manager, no por el worker: el sandbox de Codex no tiene base ni fuentes de
  Google, así que sus "verificaciones visuales" fallan siempre.
- El worker devolvió acentos rotos (`catÃ¡logo`) en un string pasado por
  `cmd.exe`: revisar el diff de i18n después de cada dispatch.
- Sessions: 01a0a105 (tests), 01a0a130 (home SQL), 01a0a244 (piel),
  01a0a251 (home larga), 01a0a260 (scroll-motion), 01a0a27d (collage).

---

## E. Lo que sigue siendo del dueño (no del template)

- Datos bancarios (`/admin/banco`), tres cron jobs (DEPLOY.md §5), rotación
  de secretos, plantillas de WhatsApp Cloud (opcional), Pagopar (opcional).
