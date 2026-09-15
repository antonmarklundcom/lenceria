# Lencería Íntima — owner's playbook brief (Fable insights, 2026-09-15)

Audience: Anton (owner/operator) and a business partner in Asunción (his girlfriend's family, who make the pieces). Language: English with Spanish store terms. This brief is the CONTENT; the artifact page renders it.

## 1. What the site is and offers (facts)
- lenceria.com.py, Next.js store from the ecom template, Hostinger Node.js + MySQL, Cloudinary photos, WhatsApp-first checkout (transfer or pay on delivery; no card until Pagopar is added).
- Catalog today: 10 handmade products, 7 categories (conjuntos, corpiños, bombachas, camisones y pijamas, bodies, batas y kimonos, accesorios), 26 size variants, prices ₲45.000–₲190.000, IVA included. 30 photos live (AI model shots + flat-lays).
- Design: Blush Romantic (cream/rose, Cormorant + Karla), long home with scroll motion and lace collage. Mobile-first, no horizontal overflow, works without JS.
- Admin: /admin (orders, products, stock, categories, shipping zones, bank details, users, CSV import). Owner login = Anton's email.
- Ops routes: /api/health, three cron routes (expire unpaid orders every 15 min; daily summary; daily backup), preflight report.
- Costs: Hostinger plan (shared with other stores), Cloudinary Free (25 credits/mo, store uses ~1–3), Higgsfield credits only when generating photos (~0.12/photo on Soul V2), domain .com.py.

## 2. What to do before showing it / before first sale (checklist, in order)
1. Bank details in /admin/banco (bank, holder, RUC/CI, account no., type, optional SPI QR). Without it the order page cannot say where to transfer.
2. Three cron jobs in hPanel (commands in DEPLOY.md §5). The first one is mandatory: otherwise unpaid orders never expire and stock looks sold out.
3. Test order end to end on a phone: add to cart → checkout → WhatsApp link → upload receipt → approve in admin → mark shipped.
4. Rotate secrets that passed through chat (DB password, SESSION_SECRET, CRON_SECRET, Cloudinary key): change → edit env var → Redeploy, in that order.
5. Replace AI model photos with real ones as soon as pieces exist; keep AI shots for categories/hero.
6. Email (Resend) + password reset = template task T-21/T-22, not yet built. Until then: never lose the admin password.

## 3. How to sell this to the partner in Asunción (pitch)
- The problem: handmade ñandutí/ao po'i lingerie sells today by Instagram DMs and word of mouth; every sale is a manual WhatsApp conversation with no catalog, no stock control, no order history.
- The offer: a branded store that does the catalog, sizes, stock and order tracking; the partner keeps selling on WhatsApp but every order lands in a panel. Zero card fees (transfer/cash), IVA-included prices, delivery zones for Gran Asunción and interior.
- What the partner brings: product, photos of real pieces, packing and delivery, answering WhatsApp 9–19 h. What Anton brings: site, hosting, ads, SEO, panel support.
- Deal structures to propose (pick one): (a) revenue share 15–25% on online orders, Anton pays hosting/ads; (b) flat monthly fee ₲300–500k for site + ads management; (c) Anton owns the brand, partner is the maker paid per piece (wholesale). For a family partner, (a) is the easiest to say yes to; (c) scales best.
- Proof to show: the live site on a phone, the admin panel with a fake order, the collage/motion (it looks expensive), the free-shipping-from-threshold logic, and the "hecho a mano en Itauguá" story as the differentiator vs. imported lingerie.
- Risks to say out loud: production capacity (each piece takes days), sizing returns policy, photos (models vs. flat-lay), and that AI photos must be replaced before real customers compare.

## 4. Where the money is (positioning)
- Two audiences: (1) gift buyers (novias/bodas → liga nupcial, conjuntos; Día de los Enamorados 14 Feb, Día de la Madre 15 May PY, Navidad) and (2) daily-wear buyers (bombachas, corpiños ao po'i for the heat). Gift buyers pay ₲150–200k without blinking; daily-wear drives repeat orders.
- Bundles: "conjunto + liga" bridal pack, "3 bombachas" pack (the CSV/seed already supports multi-variant; bundles need a product entry).
- Price ladder is right (entry ₲45k, hero ₲185–190k). Add one premium bridal set at ₲300k+ to anchor.
- WhatsApp is the conversion channel; the site is the catalog + trust. Every campaign should end in a WhatsApp click with the product prefilled (the site already does this from product pages).

## 5. SEO (what to do, in priority)
1. Category pages are the SEO pages. Add 80–150 words of real copy per category (ñandutí, ao po'i, talles, envíos) via /admin/categorias description (markdown supported).
2. Product names carry Guaraní words (Ñandutí, Yvoty, Tacurú, Mburucuyá, Ysapy): keep them, but add the plain Spanish term in the description (corpiño triángulo, bombacha tiro alto, camisón de satén) so searches match.
3. Target queries (validate in KWP, batches of 10): "lencería paraguay", "lencería asunción", "ropa interior femenina paraguay", "corpiño sin aro paraguay", "bombachas de algodón asunción", "camisón de satén paraguay", "liga de novia paraguay", "lencería ñandutí", "pijamas de mujer asunción", "kimono de seda asunción".
4. Technical already done: sitemap (18 URLs), robots, canonical on categories, JSON-LD breadcrumb + ItemList, meta descriptions. Missing: Google Search Console + Business Profile (Itauguá workshop address), FAQ block (talles, cambios, envíos) on home or a /ayuda page.
5. Content later: one guide per intent ("guía de talles de corpiño", "qué es el ñandutí", "lencería para el calor de Asunción"). Cheap, ranks in PY where competition is thin.

## 6. Google Ads (priority order, PY only, Spanish)
1. Brand + category search: "lencería asunción", "lencería paraguay", "ropa interior mujer asunción". Exact/phrase, low CPC (₲800–2.500 est.), landing = category pages.
2. Bridal: "liga de novia", "lencería novia", "regalo despedida de soltera asunción" → liga-nupcial + conjuntos. Seasonal peaks Sep–Dec.
3. Gifts: 2 weeks before 14 Feb, 15 May, Christmas: "regalo para mi novia lencería", "set de lencería regalo".
4. Skip for now: Shopping (needs Merchant Center + card payments), Display, generic "ropa interior" (imports win on price).
5. Budget: start ₲30–50k/day (≈USD 4–7), measure WhatsApp clicks as the conversion (the site fires a purchase event; add a WhatsApp-click event to GA4/Ads).
6. Instagram/Meta will likely beat Google for this product (visual, female 22–40, Asunción). Plan: 60% Meta, 40% Google after the first month of data.

## 7. KWP work still to do (no KWP data exists for this domain yet)
- Run the google-kwp-batches skill for the 10-query list above plus long-tail (talles, colores, "hecho a mano", "artesanal"). Expect low absolute volumes (PY, niche): 100–1,000/mo for the head terms; that is fine, the margin per order is high.
- Decide category renames from the data (e.g. if "ropa interior" outvolumes "lencería", add it to titles, not slugs).

## 8. Improve the site (next builds, cheapest first)
- Real photos → replace hero/category tiles (webimg pipeline, 1 command per image).
- Guía de talles page + size chart on product pages (returns killer).
- Bundles as products; "regalo" gift-wrap option at checkout (checkout is machinery: template task).
- Reviews/testimonials band on home (static at first).
- Resend email + password reset (template T-21/T-22).
- Pagopar cards when volume justifies the fees.
- WhatsApp Cloud templates once the business is Meta-verified (automated confirmations, reminders, daily summary).

## 9. How to work with it (operator habits)
- Daily: open /admin, review receipts, mark shipped. Answer WhatsApp 9–19 h.
- Weekly: stock check, low-stock alerts, one Instagram post per product with the site link.
- Monthly: Cloudinary credits (Dashboard), Hostinger uptime, backup restore test once.
- Any code change: branch → Codex → audit → PR → merge; Hostinger rebuilds; env var changes need Redeploy.
- Never edit env vars casually: deleting SESSION_SECRET took /admin down once already.
