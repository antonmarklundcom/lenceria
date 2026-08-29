"use client";

import { useEffect, useRef, useState } from "react";

import { ProductCard } from "@/components/product-card";
import { useInView } from "@/hooks/use-in-view";
import type { CatalogProduct } from "@/db/queries";
import { t } from "@/i18n";

/**
 * La grilla de destacados de la home, en carrusel horizontal. La pestaña
 * "conjuntos" sólo existe si esa categoría trajo productos — nada de mostrar
 * una pestaña que lleva a una lista vacía.
 */
export function HomeBestSellers({
  destacados,
  conjuntos,
}: {
  destacados: CatalogProduct[];
  conjuntos: CatalogProduct[];
}) {
  const { ref, isVisible } = useInView<HTMLElement>();
  const [tab, setTab] = useState<"destacados" | "conjuntos">("destacados");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const hasConjuntos = conjuntos.length > 0;
  const products = tab === "conjuntos" && hasConjuntos ? conjuntos : destacados;

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        node.scrollLeft += event.deltaY;
      }
    };

    const onScroll = () => {
      const max = node.scrollWidth - node.clientWidth;
      setScrollProgress(max > 0 ? node.scrollLeft / max : 0);
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("scroll", onScroll);
    return () => {
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("scroll", onScroll);
    };
  }, [tab]);

  if (products.length === 0) return null;

  return (
    <section
      ref={ref}
      className={`bg-background px-4 py-12 transition-all duration-800 sm:px-6 sm:py-16 lg:px-10 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mb-8 flex items-center gap-8 sm:mb-10 sm:gap-12">
        <button
          type="button"
          onClick={() => setTab("destacados")}
          className={`flex items-center gap-2 font-serif text-2xl transition-colors sm:text-4xl md:text-5xl ${
            tab === "destacados" ? "text-foreground" : "text-muted-foreground/60 hover:text-muted-foreground"
          }`}
        >
          {t("home.destacados").toLowerCase()}
          {tab === "destacados" && (
            <span key="dot-destacados" className="bg-primary animate-scale-in size-5 rounded-full sm:size-6" />
          )}
        </button>
        {hasConjuntos ? (
          <button
            type="button"
            onClick={() => setTab("conjuntos")}
            className={`flex items-center gap-2 font-serif text-2xl transition-colors sm:text-4xl md:text-5xl ${
              tab === "conjuntos" ? "text-foreground" : "text-muted-foreground/60 hover:text-muted-foreground"
            }`}
          >
            conjuntos
            {tab === "conjuntos" && (
              <span key="dot-conjuntos" className="bg-primary animate-scale-in size-5 rounded-full sm:size-6" />
            )}
          </button>
        ) : null}
      </div>

      <div ref={scrollRef} className="scrollbar-hide flex gap-4 overflow-x-auto pb-1">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`w-[220px] flex-shrink-0 transition-all duration-500 sm:w-[240px] md:w-[260px] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: `${200 + index * 80}ms` }}
          >
            <ProductCard product={product} priority={index < 4} />
          </div>
        ))}
      </div>

      <div className="border-border relative mx-auto mt-8 h-[2px] w-full max-w-[280px] rounded-full bg-transparent sm:mt-10">
        <div className="bg-muted absolute inset-0 rounded-full" />
        <div
          className="bg-primary absolute top-0 left-0 h-[2px] rounded-full"
          style={{ width: "30%", transform: `translateX(${scrollProgress * (100 / 0.3)}%)` }}
        />
      </div>
    </section>
  );
}
