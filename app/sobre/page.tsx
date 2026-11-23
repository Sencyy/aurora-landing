import type { Metadata } from "next";
import Link from "next/link";

import { Photo } from "@/components/Photo";
import { ArrowRightIcon } from "@/components/icons";
import { site, sobre } from "@/lib/content";
import { mapsDirectionsUrl, whatsappUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "A história do Café Aurora: uma torra caseira em Pinheiros que virou cafeteria de bairro, com pão de fermentação natural e café de produtores brasileiros.",
  alternates: { canonical: "/sobre/" },
};

export default function SobrePage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <nav className="breadcrumb-min" aria-label="Você está aqui">
            <Link href="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Sobre nós</span>
          </nav>
          <p className="eyebrow">Nossa história</p>
          <h1 className="page-hero__title">{sobre.historia}</h1>
        </div>
      </header>

      <section className="section">
        <div className="container split">
          <div className="prose">
            {sobre.paragrafos.slice(0, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <blockquote className="pullquote">
              “{sobre.citacao}”
              <footer>Marina &amp; Théo, fundadores</footer>
            </blockquote>
            {sobre.paragrafos.slice(2).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className="split-media split-media--portrait">
            <Photo
              slug="barista"
              alt="Barista do Café Aurora preparando uma bebida no balcão"
              sizes="(min-width: 992px) 45vw, 90vw"
            />
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <p className="eyebrow">No que acreditamos</p>
          <h2 className="section-title mb-4">Três coisas que não negociamos</h2>
          <div className="cards-3">
            {sobre.valores.map((valor, index) => (
              <article className="value-card" key={valor.titulo}>
                <span className="value-card__num" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{valor.titulo}</h3>
                <p>{valor.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
            <div>
              <p className="eyebrow mb-2">Do dia a dia</p>
              <h2 className="section-title mb-0">A rotina que sustenta o sabor</h2>
            </div>
            <p className="lede mb-0" style={{ maxWidth: "26rem" }}>
              A torra acontece às terças, o pão começa na noite anterior e o café é provado antes de chegar ao
              balcão.
            </p>
          </div>

          <div className="about-strip">
            <div className="about-strip__tall">
              <Photo slug="latte" alt="Latte com desenho de folha na espuma" sizes="(min-width: 768px) 33vw, 50vw" />
            </div>
            <Photo slug="graos" alt="Grãos de café recém-torrados" sizes="(min-width: 768px) 33vw, 50vw" />
            <Photo slug="paes" alt="Pães de fermentação natural na bancada" sizes="(min-width: 768px) 33vw, 50vw" />
          </div>

          <div className="d-flex flex-wrap gap-2 mt-5">
            <a
              className="btn-solid theme-primary"
              href={whatsappUrl(site)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com a gente
            </a>
            <a
              className="btn-outline theme-primary"
              href={mapsDirectionsUrl(site)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver como chegar
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
