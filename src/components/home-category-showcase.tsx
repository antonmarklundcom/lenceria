"use client";

import Image from "next/image";
import Link from "next/link";

import { useInView } from "@/hooks/use-in-view";
import { categoryPlaceholderSrc } from "@/lib/images";

// Placeholder autohospedado (public/placeholders/) a reemplazar por video
// real de cada categoría una vez elegida la dirección.

function CategoryTile({ name, slug }: { name: string; slug: string }) {
  return (
    <div className="group relative min-h-[400px] overflow-hidden p-6 sm:min-h-[500px] sm:p-8 md:min-h-[750px] md:p-12">
      <Image
        src={categoryPlaceholderSrc(slug)}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/40" />

      <div className="relative flex h-full flex-col items-start justify-between">
        <span
          className="font-serif text-5xl font-medium text-white transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
        >
          {name}
        </span>

        <Link href={`/categoria/${slug}`} className="btn-primary rounded-full bg-white px-8 py-3 text-sm text-black">
          comprar {name.toLowerCase()}
        </Link>
      </div>
    </div>
  );
}

export function HomeCategoryShowcase({
  categories,
}: {
  categories: readonly { id: number; slug: string; name: string }[];
}) {
  const { ref, isVisible } = useInView<HTMLElement>();

  if (categories.length === 0) return null;

  return (
    <section
      ref={ref}
      className={`grid grid-cols-1 bg-black text-white transition-all duration-1000 md:grid-cols-3 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      {categories.map((category) => (
        <CategoryTile key={category.id} name={category.name} slug={category.slug} />
      ))}
    </section>
  );
}
