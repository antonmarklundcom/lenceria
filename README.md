# lenceria — tienda de lencería online (Paraguay)

Tienda online de lencería para el mercado paraguayo: guaraníes enteros, IVA
incluido, español (voseo), WhatsApp-first, mobile-first y **envío discreto** en
todos los pedidos.

Sale del template [`antonmarklundcom/ecom`](https://github.com/antonmarklundcom/ecom),
que aporta la maquinaria ya hecha y probada — pedidos, stock, pagos, panel del
dueño, reconciliación y cron. Este repo es esa maquinaria **vestida y llenada**
para el rubro: marca, paleta, catálogo y las páginas que la lencería necesita y
una tienda genérica no.

**Stack:** Next.js 15 (App Router, TS) · Drizzle ORM · MySQL · Hostinger Node.js · Cloudinary · Tailwind + shadcn/ui · Zustand · Zod

## Estado

La aplicación está **completa y verde**: `typecheck`, `lint` y los 231 tests
unitarios pasan, y los de integración corren en CI contra MySQL.

Lo que falta para vender no es código, es data del comercio. Está todo junto en
**[Bloqueado por la dueña](#bloqueado-por-la-dueña)**, más abajo.

Lo que ya es propio de esta tienda y no del template:

| Qué | Dónde |
|---|---|
| Marca (nombre, títulos, meta description, tagline) | [`src/config/tienda.ts`](./src/config/tienda.ts) — un solo archivo |
| Paleta y tipografía | [`src/app/globals.css`](./src/app/globals.css) (bloque comentado arriba de todo) y la serif en [`layout.tsx`](./src/app/layout.tsx) |
| Catálogo de ejemplo | [`scripts/seed-data.ts`](./scripts/seed-data.ts) — 6 categorías, 24 productos, 91 variantes |
| Guía de talles | `/guia-de-talles` |
| Cambios y devoluciones (reglas de higiene) | `/cambios` |
| Envío discreto | `/envio-discreto`, más un aviso en el checkout y en el pie |
| Control de marca en el preflight | [`src/domain/preflight.ts`](./src/domain/preflight.ts) (`marca`) |

## Arrancar en local

```bash
pnpm install
cp .env.example .env.local          # completá SESSION_SECRET: openssl rand -base64 32
                                     # y opcionalmente PAGOPAR_MODE="mock" (probar tarjeta sin cuenta de Pagopar)
docker compose up -d                # MySQL 8 en localhost:3306 (base `lenceria`)
pnpm db:push                        # schema + FULLTEXT + FK self-ref + contador
pnpm db:seed                        # 6 categorías, 24 productos, 91 variantes, 4 zonas de envío
pnpm create-owner                   # única forma de crear un usuario del panel
pnpm dev                            # http://localhost:3000 · panel en /admin
```

Para ver la tienda con pedidos de verdad en vez de un catálogo vacío, `pnpm demo`
reemplaza el paso `db:seed` — ver más abajo.

| Comando | Qué hace |
|---|---|
| `pnpm typecheck` / `pnpm lint` / `pnpm test` | lo que corre CI |
| `pnpm test` | unitarios siempre; los de integración necesitan `TEST_DATABASE_URL` (esa base se borra y se recrea en cada corrida) |
| `pnpm db:studio` | Drizzle Studio |
| `pnpm db:seed -- --reset-stock` | re-siembra pisando `on_hand` |
| `pnpm demo` | deja la base en un estado mostrable: catálogo + un pedido en cada estado |
| `pnpm reconcile` | control de caja: los totales de cada pedido más cinco invariantes entre tablas; sale con código 1 si algo no cuadra |
| `pnpm backfill:pagos-manuales` | completa la fila de `payments` de los pedidos cobrados por transferencia o contra entrega **antes** de que eso se registrara solo (ARCH.md §5.1). Ensayo por defecto: agregá `--apply` para escribir |
| `pnpm template:diff` | qué arreglos del template le faltan a esta tienda (`--marcar` para fijar el punto de partida) — NEW-STORE.md |
| `pnpm preflight` | qué falta para cobrar plata de verdad (marca sin cambiar, webhook sin confirmar, `BANCO_*`, `CRON_SECRET`, `PAGOPAR_MODE` en producción); sale con código 1 si algo es inseguro |

### `pnpm demo` — la tienda lista para mostrar

Un solo comando después del quickstart (`db:push` ya corrido, no hace falta
`db:seed` a mano — `pnpm demo` siembra el catálogo él solo):

```bash
pnpm demo
pnpm dev   # y abrí /admin/pedidos
```

Deja sembrado el catálogo y crea un pedido de ejemplo en cada estado de la
máquina (ARCH.md §3): `pendiente_pago`, `esperando_verificacion`, `pagado`,
`enviado`, `entregado`, `cancelado`, `vencido`. Suma un octavo pedido con método
tarjeta parqueado en la pasarela simulada de Pagopar e imprime el link
`/dev/pagopar/<hash_pedido>` para pagarlo, rechazarlo o reenviar el aviso.

Idempotente y se niega a correr con `NODE_ENV=production`: es data de mentira, no
algo para dejar suelto donde hay plata de verdad.

## Catálogo

El catálogo que trae `pnpm db:seed` es **relleno**, no la lista real: marcas
inventadas y precios plausibles para poder mirar, medir y demostrar la tienda
antes de que la dueña cargue lo suyo desde `/admin/productos`.

Al reemplazarlo, tres convenciones que sí importan:

- **Guaraníes enteros.** ₲ 145.000 se escribe `145000`. `src/lib/money.ts` tira
  `MoneyError` si se cuela un float.
- **IVA 10, incluido.** La lencería no está en la canasta básica ni exenta. El
  precio de góndola ya trae el IVA; se desglosa, no se suma encima.
- **`label` es un campo plano, con formato `"TALLE / COLOR"`** — `"90B / Negro"`,
  `"M / Rojo"`. El schema no tiene talle y color por separado, y es lo que la
  compradora ve en el selector, en el carrito y en el pedido.

`compareAtPyg` dibuja el precio tachado: sólo si el precio anterior fue real.

## Diseño

La paleta entera vive en `src/app/globals.css`, con un bloque comentado arriba de
todo que dice **exactamente qué ocho tokens se tocan** para vestir otra marca.
Neutros cálidos, un solo acento vino (`oklch(0.42 0.128 12)`, ≈ `#84263a`),
titulares en serif y cuerpo en sans. Todos los pares de contraste están
verificados contra WCAG AA en claro y en oscuro.

Regla que no se negocia: **un** acento. El verde de WhatsApp va sólo adentro del
botón de WhatsApp, nunca como color de sección.

## El panel (`/admin`)

Se entra con la cuenta que crea `pnpm create-owner` — **no hay ruta pública de registro**.

| Ruta | Qué hace |
|---|---|
| `/admin` | ventas del día y del mes, comprobantes por revisar, stock bajo |
| `/admin/pedidos` | accesos rápidos por estado con su cuenta, filtros por método/fecha, búsqueda por nro., WhatsApp o RUC, paginación server-side, descarga CSV de lo filtrado |
| `/admin/pedidos/[id]` | ítems, desglose de IVA, datos del cliente, timeline, botón de WhatsApp, aprobar/rechazar comprobante |
| `/admin/productos` | ABM de productos y variantes, fotos, ajuste de stock con motivo obligatorio (auditado), descarga CSV por variante |
| `/admin/clientes` | quién compró, cuántas veces y cuánto gastó — sale de agrupar los pedidos por WhatsApp, sin cuentas de cliente |

### Cron de Hostinger

Vence los pedidos sin pago que pasaron su `reserved_until` y limpia reservas
viejas. En el hPanel, cada 15 minutos:

```bash
curl -fsS -H "Authorization: Bearer $CRON_SECRET" https://TU-DOMINIO/api/cron/vencer-pedidos
```

La ruta compara `CRON_SECRET` en tiempo constante y está rate-limited. Sin la
variable configurada responde 503, nunca 200: una ruta "abierta hasta que la
configuren" es una ruta abierta.

### `pnpm preflight` — antes de cobrar de verdad

Se corre **en el servidor**, después de configurar las variables. Contesta una
sola pregunta —si mañana una desconocida compra acá, ¿se pierde algo?— y sale con
código 1 si la respuesta es que sí, para que un deploy automatizado se frene solo.

Bloquea con: la marca todavía en los valores del template, el sobre de la
respuesta del webhook de Pagopar sin confirmar, `BANCO_*` incompletos,
`CRON_SECRET` o `SESSION_SECRET` vacíos o cortos, Cloudinary sin configurar, y
`PAGOPAR_MODE=mock` en producción. Advierte —sin frenar— con las credenciales de
Pagopar faltantes: la tienda cobra igual por transferencia y contra entrega.

No toca la base ni la red, y nunca imprime el valor de un secreto.

## Bloqueado por la dueña

Nada de esto es trabajo pendiente de este repo. Son datos y cuentas que sólo
puede dar el comercio, y **el código está escrito para mostrar "no configurado"
en vez de inventarlos** — un dato bancario de mentira es peor que ninguno.

| Qué falta | Para qué | Dónde se carga |
|---|---|---|
| Cuenta bancaria: banco, titular, RUC, nro. y tipo de cuenta | El método de pago principal del MVP. Sin los cinco, la página del pedido avisa en vez de mostrar dónde transferir | `BANCO_*` en `.env.local` |
| Imagen del QR SPI | Que se pueda pagar escaneando, no tipeando | `BANCO_QR_URL` |
| Número de WhatsApp del comercio | Todos los botones de contacto y el aviso de pedido. Sin él no se dibujan | `WHATSAPP_NUMBER` |
| Fotos de producto reales | Hoy hay ilustraciones placeholder por categoría, que dicen "Foto próximamente" | `/admin/productos` (vía Cloudinary) |
| Cuenta de Cloudinary | Sin ella la compradora no puede subir el comprobante de la transferencia | `CLOUDINARY_*` |
| Precios y stock reales | El catálogo sembrado es relleno declarado | `/admin/productos` |
| Grilla de envío real | Las 4 zonas y sus precios son de ejemplo; dependen del courier con el que trabaje | `scripts/seed-data.ts` o la tabla `shipping_zones` |
| Cuenta de Pagopar | Pago con tarjeta. Sin credenciales el checkout simplemente no la ofrece — la tienda cobra igual por transferencia y contra entrega | `PAGOPAR_*` |
| Slot Node.js + MySQL en Hostinger | El deploy | Panel de Hostinger |
| Confirmar el empaque discreto real | `/envio-discreto` es una promesa operativa: cada línea tiene que ser cierta. Si cambia el courier o el empaque, esa página se actualiza el mismo día | — |

## Reglas no negociables

- Todo monto es **entero** en guaraníes (`BIGINT UNSIGNED`). Nunca `float`, nunca `DECIMAL`, nunca `toFixed(2)`.
- Precios son **IVA incluido**. El IVA se desglosa, no se suma encima.
- El navegador nunca decide precios ni stock — el servidor recalcula todo desde la DB.
- El estado de un pedido sólo cambia vía `transitionOrder()`. Nunca un `UPDATE orders SET status` suelto.
- Nada de secretos con prefijo `NEXT_PUBLIC_`.
- **Toda** server action de `/admin` llama a `requireAdminSession()` como primera línea. El proxy que protege `/admin/*` es UX: una server action es un endpoint HTTP propio y se la puede invocar sin pasar por ninguna URL `/admin`.
- El nombre de la tienda se escribe **una sola vez**, en `src/config/tienda.ts`.

Cada una de estas reglas tiene un test que la verifica sobre el código en CI
(`no-raw-status-update.test.ts`, `money-path.test.ts`, `admin-guards.test.ts`,
`security-review.test.ts`, `marca-centralizada.test.ts`): un checklist que se
corrió una vez a mano se rompe en el commit siguiente.

## Documentos

| Archivo | Qué contiene |
|---|---|
| [ARCH.md](./ARCH.md) | Modelo de datos (ERD), modelo de seguridad, máquina de estados del pedido, flujos de pago, integración FacturaPY (fase 2). **Vigente** |
| [.env.example](./.env.example) | Todas las variables de entorno con sus trampas documentadas. **Vigente** |
| [NEW-STORE.md](./NEW-STORE.md) | Cómo se arranca una tienda desde el template `ecom`. Heredado — describe el template, no esta tienda |
| [PLAN.md](./PLAN.md) · [TASKS.md](./TASKS.md) | Bitácora de construcción del template `ecom`. Heredados; se conservan porque hay comentarios del código que citan sus secciones (p. ej. `TASKS.md §21` en el preflight) |
