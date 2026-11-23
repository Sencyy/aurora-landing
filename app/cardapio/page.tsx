import type { Metadata } from "next";
import Link from "next/link";

import { MenuFilter } from "@/components/MenuFilter";
import { ArrowRightIcon } from "@/components/icons";
import { getMenu, site } from "@/lib/content";
import { whatsappUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "Cardápio",
  description:
    "Cafés de torra própria, pães de fermentação natural, brunch e doces feitos na casa. Preços e opções vegetarianas, veganas e sem glúten.",
  alternates: { canonical: "/cardapio/" },
};

const categories = getMenu();

const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: `Cardápio do ${site.nome}`,
  url: `${site.url}/cardapio/`,
  inLanguage: "pt-BR",
  hasMenuSection: categories.map((category) => ({
    "@type": "MenuSection",
    name: category.categoria,
    hasMenuItem: category.itens.map((item) => ({
      "@type": "MenuItem",
      name: item.nome,
      description: item.descricao,
      offers: {
        "@type": "Offer",
        price: item.preco.toFixed(2),
        priceCurrency: "BRL",
      },
      suitableForDiet: item.tags.includes("vegano")
        ? "https://schema.org/VeganDiet"
        : item.tags.includes("vegetariano")
          ? "https://schema.org/VegetarianDiet"
          : item.tags.includes("sem-gluten")
            ? "https://schema.org/GlutenFreeDiet"
            : undefined,
    })),
  })),
};

export default function CardapioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />

      <header className="page-hero">
        <div className="container">
          <nav className="breadcrumb-min" aria-label="Você está aqui">
            <Link href="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Cardápio</span>
          </nav>
          <p className="eyebrow">Cardápio</p>
          <h1 className="page-hero__title">Café, pão e o que mais couber na mesa.</h1>
          <p className="page-hero__lede">
            Tudo é feito aqui: a torra, o pão, os doces e as bebidas. Os preços incluem serviço e a casa aceita
            Pix, cartão e dinheiro. Itens marcados como vegetarianos, veganos ou sem glúten estão sinalizados em
            cada prato.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <MenuFilter categories={categories} />

          <div className="menu-note">
            <strong>Alergias e restrições?</strong> Nossa cozinha manipula leite, ovos, glúten, castanhas e
            gergelim. Fale com a equipe antes de pedir e a gente confirma os ingredientes de cada preparo.
          </div>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <a
              className="btn-solid theme-primary"
              href={whatsappUrl(site, "Olá! Vim pelo site e queria fazer um pedido do cardápio.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fazer pedido no WhatsApp
            </a>
            <Link className="btn-outline theme-primary" href="/contato/">
              Ver endereço e horários
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
