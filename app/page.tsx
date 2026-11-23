import type { Metadata } from "next";
import Link from "next/link";

import { Photo } from "@/components/Photo";
import { ArrowRightIcon, ClockIcon, CoffeeIcon, LeafIcon, MapPinIcon } from "@/components/icons";
import { getHighlights, site, sobre } from "@/lib/content";
import { brl, mapsDirectionsUrl, shortHours, tagLabels, whatsappUrl } from "@/lib/format";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const highlights = getHighlights(3);
const firstSchedule = site.horarios[0];

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero-interior-1600.avif"
        type="image/avif"
        imageSrcSet="/images/hero-interior-600.avif 600w, /images/hero-interior-1000.avif 1000w, /images/hero-interior-1600.avif 1600w"
        imageSizes="100vw"
      />

      <section className="hero">
        <Photo
          slug="hero-interior"
          alt="Salão do Café Aurora com mesas de madeira, luz natural e o balcão ao fundo"
          className="hero-media"
          sizes="100vw"
          priority
        />
        <div className="container hero-content">
          <p className="hero-eyebrow">Cafeteria &amp; torrefação · {site.endereco.bairro}</p>
          <h1 className="hero-title">
            Café de origem,
            <br />
            feito com calma.
          </h1>
          <p className="hero-sub">
            Torramos nossos grãos em pequenos lotes, assamos pão de fermentação natural todas as manhãs e
            deixamos a mesa comprida sempre pronta para quem quiser ficar.
          </p>
          <div className="hero-actions">
            <Link className="btn-solid theme-primary btn-lg" href="/cardapio/">
              Ver cardápio
              <ArrowRightIcon />
            </Link>
            <a
              className="btn-hero-ghost btn-lg"
              href={whatsappUrl(site)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fazer pedido
            </a>
          </div>
          <ul className="hero-meta">
            <li>
              <MapPinIcon size={17} />
              {site.endereco.rua}, {site.endereco.numero} — {site.endereco.bairro}
            </li>
            {firstSchedule ? (
              <li>
                <ClockIcon size={17} />
                {firstSchedule.rotulo}: {firstSchedule.abre} às {firstSchedule.fecha}
              </li>
            ) : null}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">A casa</p>
            <h2 className="section-title">
              Um lugar para sentar,
              <br />
              <em>respirar e ficar.</em>
            </h2>
            <p className="lede">
              A Aurora nasceu de uma mesa de cozinha e de um café coado às seis da manhã. Hoje é uma cafeteria
              de bairro com torra própria, pães feitos na casa e gente que gosta de conversar sobre grãos,
              fermentação e o que aconteceu na rua ontem.
            </p>
            <ul className="pillars">
              <li>
                <CoffeeIcon size={17} /> Torra própria
              </li>
              <li>
                <LeafIcon size={17} /> Opções veganas
              </li>
              <li>
                <ClockIcon size={17} /> Pão fresco todo dia
              </li>
            </ul>
            <p className="mt-5 mb-0">
              <Link className="btn-subtle theme-primary" href="/sobre/">
                Conheça nossa história
                <ArrowRightIcon />
              </Link>
            </p>
          </div>
          <div className="split-media">
            <Photo
              slug="cafe-balcao"
              alt="Balcão de madeira do Café Aurora com a máquina de espresso e xícaras"
              sizes="(min-width: 992px) 45vw, 90vw"
            />
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
            <div>
              <p className="eyebrow mb-2">Por dentro</p>
              <h2 className="section-title mb-0">A Aurora em quatro paredes</h2>
            </div>
            <p className="lede mb-0" style={{ maxWidth: "26rem" }}>
              Luz natural, madeira e o cheiro de pão saindo do forno. É assim que a gente começa o dia.
            </p>
          </div>
          <div className="gallery">
            <Photo
              slug="ambiente"
              alt="Pessoas conversando nas mesas do café"
              className="gallery-wide"
              sizes="(min-width: 768px) 50vw, 100vw"
              ratio="1 / 1"
            />
            <Photo slug="barista" alt="Barista preparando um café no balcão" sizes="(min-width: 768px) 25vw, 50vw" />
            <Photo slug="paes" alt="Pães de fermentação natural recém-assados" sizes="(min-width: 768px) 25vw, 50vw" />
            <Photo slug="latte" alt="Xícara de latte com desenho na espuma" sizes="(min-width: 768px) 25vw, 50vw" />
            <Photo slug="graos" alt="Grãos de café torrados sobre a mesa" sizes="(min-width: 768px) 25vw, 50vw" />
            <Photo slug="croissant" alt="Croissant de manteiga ao lado de um café" sizes="(min-width: 768px) 25vw, 50vw" />
            <Photo slug="bolo" alt="Fatia de bolo de chocolate com calda" sizes="(min-width: 768px) 25vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
            <div>
              <p className="eyebrow mb-2">Do cardápio</p>
              <h2 className="section-title mb-0">Para começar bem o dia</h2>
            </div>
            <Link className="btn-outline theme-primary" href="/cardapio/">
              Ver cardápio completo
              <ArrowRightIcon />
            </Link>
          </div>

          <div className="cards-3">
            {highlights.map((item) => (
              <article className="feature-card" key={item.nome}>
                <div className="feature-card__top">
                  <h3 className="feature-card__name">{item.nome}</h3>
                  <span className="feature-card__price">{brl(item.preco)}</span>
                </div>
                <p className="feature-card__desc">{item.descricao}</p>
                {item.tags.length > 0 ? (
                  <ul className="tags feature-card__tags">
                    {item.tags.map((tag) => (
                      <li key={tag} className={`tag tag--${tag}`}>
                        {tagLabels[tag]}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          <p className="mt-4 mb-0 text-sm fg-2">
            {sobre.valores[0]?.texto}
          </p>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-band__inner">
          <div>
            <p className="eyebrow mb-2" style={{ color: "#e8c39c" }}>
              Passa aqui hoje?
            </p>
            <h2 className="section-title mb-3">O café está pronto. Só falta você.</h2>
            <p className="mb-0">
              {shortHours(site).join(" · ")} · {site.endereco.rua}, {site.endereco.numero} —{" "}
              {site.endereco.bairro}
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <a
              className="btn-solid theme-primary btn-lg"
              href={whatsappUrl(site)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir no WhatsApp
            </a>
            <a
              className="btn-hero-ghost btn-lg"
              href={mapsDirectionsUrl(site)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Como chegar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
