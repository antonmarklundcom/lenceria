"use client";

import Link from "next/link";

import { useInView } from "@/hooks/use-in-view";

// Reemplazar por video real de cada categoría una vez elegida la dirección —
// estos son los placeholders originales del layout de referencia, uno por
// posición (no por categoría: se ciclan si hay menos de tres).
const SHOWCASE_VIDEOS = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203023_87a26602-2898-4acc-a396-c7a2b5ad84fd.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203415_b86e3f19-2aec-46cd-9a86-b64c40118e38.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_203051_85fee398-ea01-4aa0-972b-137a74213be5.mp4",
];

function CategoryTile({ name, slug, video }: { name: string; slug: string; video: string }) {
  return (
    <div className="group relative min-h-[400px] overflow-hidden p-6 sm:min-h-[500px] sm:p-8 md:min-h-[750px] md:p-12">
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

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
      {categories.map((category, index) => (
        <CategoryTile
          key={category.id}
          name={category.name}
          slug={category.slug}
          video={SHOWCASE_VIDEOS[index % SHOWCASE_VIDEOS.length]!}
        />
      ))}
    </section>
  );
}
