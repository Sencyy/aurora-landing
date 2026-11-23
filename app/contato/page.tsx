import type { Metadata } from "next";
import Link from "next/link";

import { MapEmbed } from "@/components/MapEmbed";
import { ClockIcon, InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/content";
import { addressLines, instagramUrl, whatsappUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contato e endereço",
  description: `Endereço, horários de funcionamento, WhatsApp e Instagram do ${site.nome} em ${site.endereco.bairro}, ${site.endereco.cidade}.`,
  alternates: { canonical: "/contato/" },
};

export default function ContatoPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <nav className="breadcrumb-min" aria-label="Você está aqui">
            <Link href="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contato</span>
          </nav>
          <p className="eyebrow">Contato</p>
          <h1 className="page-hero__title">Passa na Aurora. A gente guarda uma xícara.</h1>
          <p className="page-hero__lede">
            Estamos em {site.endereco.bairro}, a poucos minutos do metrô. Para pedidos, dúvidas sobre o cardápio
            ou para reservar a mesa comprida, chame no WhatsApp.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="info-block">
              <span className="info-block__icon" aria-hidden="true">
                <MapPinIcon />
              </span>
              <div>
                <h3>Endereço</h3>
                <address>
                  {addressLines(site.endereco).map((line) => (
                    <span key={line} className="d-block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-2 mb-0">
                  <a href="#mapa">Ver no mapa</a>
                </p>
              </div>
            </div>

            <div className="info-block">
              <span className="info-block__icon" aria-hidden="true">
                <ClockIcon />
              </span>
              <div>
                <h3>Horários</h3>
                <ul className="hours-list">
                  {site.horarios.map((horario) => (
                    <li key={horario.rotulo}>
                      <span>{horario.rotulo}</span>
                      <span>
                        {horario.abre} às {horario.fecha}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="info-block">
              <span className="info-block__icon" aria-hidden="true">
                <WhatsAppIcon />
              </span>
              <div>
                <h3>WhatsApp</h3>
                <p>
                  <a href={whatsappUrl(site)} target="_blank" rel="noopener noreferrer">
                    {site.telefone}
                  </a>
                </p>
                <p className="text-sm fg-3 mt-1 mb-0">
                  Pedidos, reservas e recados. Respondemos entre um café e outro.
                </p>
              </div>
            </div>

            <div className="info-block">
              <span className="info-block__icon" aria-hidden="true">
                <InstagramIcon />
              </span>
              <div>
                <h3>Instagram</h3>
                <p>
                  <a href={instagramUrl(site)} target="_blank" rel="noopener noreferrer">
                    @{site.instagram}
                  </a>
                </p>
                <p className="text-sm fg-3 mt-1 mb-0">
                  O cardápio do dia, a torra da semana e as fotos que a gente esquece de postar.
                </p>
              </div>
            </div>

            <div className="info-block">
              <span className="info-block__icon" aria-hidden="true">
                <PhoneIcon />
              </span>
              <div>
                <h3>E-mail e telefone</h3>
                <p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
                <p className="mt-1 mb-0">
                  <a href={`tel:${site.telefone.replace(/[^\d+]/g, "")}`}>{site.telefone}</a>
                </p>
              </div>
            </div>

            <div className="contact-social">
              <a
                className="btn-solid theme-primary"
                href={whatsappUrl(site)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} />
                Falar no WhatsApp
              </a>
              <a
                className="btn-outline theme-primary"
                href={instagramUrl(site)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={18} />
                Seguir no Instagram
              </a>
            </div>
          </div>

          <div id="mapa">
            <MapEmbed site={site} />
            <p className="text-sm fg-3 mt-3 mb-0">
              {site.endereco.rua}, {site.endereco.numero}
              {site.endereco.complemento ? ` — ${site.endereco.complemento}` : ""} · {site.endereco.bairro},{" "}
              {site.endereco.cidade} — {site.endereco.uf}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight section--tint">
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <p className="eyebrow mb-1">Antes de vir</p>
            <p className="mb-0 lede">
              Nos fins de semana o salão enche. Se vier em grupo, avise no WhatsApp que a gente separa a mesa.
            </p>
          </div>
          <Link className="btn-outline theme-primary" href="/cardapio/">
            Ver o cardápio
          </Link>
        </div>
      </section>
    </>
  );
}
