"use client";

import { useMemo, useState } from "react";

import { Photo } from "@/components/Photo";
import { brl, tagLabels } from "@/lib/format";
import { imageManifest, type PhotoSlug } from "@/lib/images";
import type { DietTag, MenuCategory } from "@/lib/types";

type Filter = "todos" | DietTag;

const filters: { value: Filter; label: string }[] = [
  { value: "todos", label: "Tudo" },
  { value: "vegetariano", label: "Vegetariano" },
  { value: "vegano", label: "Vegano" },
  { value: "sem-gluten", label: "Sem glúten" },
];

const categoryPhotos: Record<string, PhotoSlug> = {
  Cafés: "espresso",
  Comidas: "paes",
  Doces: "bolo",
  Bebidas: "latte",
};

function menuPhoto(category: MenuCategory, itemImage?: string): PhotoSlug {
  if (itemImage) {
    const slug = itemImage
      .split("/")
      .pop()
      ?.replace(/\.[^.]+$/, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (slug && slug in imageManifest) return slug as PhotoSlug;
  }

  return categoryPhotos[category.categoria] ?? "ambiente";
}

export function MenuFilter({ categories }: { categories: MenuCategory[] }) {
  const [filter, setFilter] = useState<Filter>("todos");

  const visible = useMemo(() => {
    if (filter === "todos") return categories;

    return categories
      .map((category) => ({
        ...category,
        itens: category.itens.filter((item) => item.tags.includes(filter)),
      }))
      .filter((category) => category.itens.length > 0);
  }, [categories, filter]);

  const total = visible.reduce((sum, category) => sum + category.itens.length, 0);

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filtrar cardápio por restrição alimentar">
        <span className="filter-label">Filtrar</span>
        {filters.map((option) => (
          <button
            key={option.value}
            type="button"
            className="filter-chip"
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
        <span className="visually-hidden" role="status" aria-live="polite">
          {total} {total === 1 ? "item encontrado" : "itens encontrados"}
        </span>
      </div>

      <div className="mt-5">
        {visible.length === 0 ? (
          <p className="menu-empty">
            Nenhum item com esse filtro hoje. Fale com a gente no balcão — sempre tem uma opção fresca.
          </p>
        ) : (
          visible.map((category) => (
            <section
              key={category.categoria}
              className="menu-cat"
              id={category.categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}
              aria-labelledby={`cat-${category.ordem}`}
            >
              <div className="menu-cat__head">
                <h2 className="menu-cat__title" id={`cat-${category.ordem}`}>
                  {category.categoria}
                </h2>
                <span className="menu-cat__count">
                  {category.itens.length} {category.itens.length === 1 ? "item" : "itens"}
                </span>
              </div>

              <ul className="menu-list">
                {category.itens.map((item) => (
                  <li className="menu-item" key={item.nome}>
                    <Photo
                      slug={menuPhoto(category, item.imagem)}
                      alt={item.nome}
                      className="menu-item__photo"
                      sizes="(min-width: 992px) 30vw, (min-width: 768px) 45vw, 100vw"
                      ratio="16 / 10"
                    />
                    <div className="menu-item__head">
                      <h3 className="menu-item__name">{item.nome}</h3>
                      <span className="menu-item__price">{brl(item.preco)}</span>
                    </div>
                    <p className="menu-item__desc">{item.descricao}</p>
                    {item.tags.length > 0 ? (
                      <ul className="tags">
                        {item.tags.map((tag) => (
                          <li key={tag} className={`tag tag--${tag}`}>
                            {tagLabels[tag]}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {item.alergenos.length > 0 ? (
                      <p className="text-xs fg-3 mt-2 mb-0">Contém: {item.alergenos.join(", ")}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </>
  );
}
