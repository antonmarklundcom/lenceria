"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { t } from "@/i18n";

export function MobileMenu({
  categories,
}: {
  categories: readonly { id: number; slug: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="md:hidden"
        aria-label={open ? t("header.menuCerrar") : t("header.menuAbrir")}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div
        className={`fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              onClick={() => setOpen(false)}
              className="text-foreground font-serif text-3xl font-light"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
