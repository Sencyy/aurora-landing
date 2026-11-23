import Link from "next/link";
import { site } from "@/lib/content";
import { addressLines, instagramUrl, whatsappUrl } from "@/lib/format";
import { InstagramIcon, MapPinIcon, WhatsAppIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="brand-name">{site.nome}</p>
            <p className="footer-text">{site.descricaoCurta}</p>
            <div className="footer-social">
              <a
                href={instagramUrl(site)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram do ${site.nome}`}
              >
                <InstagramIcon />
              </a>
              <a
                href={whatsappUrl(site)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp do ${site.nome}`}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="footer-title">Onde estamos</p>
            <p className="footer-text d-flex gap-2">
              <MapPinIcon className="footer-icon" />
              <span>
                {addressLines(site.endereco).map((line) => (
                  <span key={line} className="d-block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
          </div>

          <div>
            <p className="footer-title">Horários</p>
            {site.horarios.map((horario) => (
              <p key={horario.rotulo} className="footer-text mb-1">
                {horario.rotulo}: {horario.abre} às {horario.fecha}
              </p>
            ))}
          </div>

          <div>
            <p className="footer-title">Atalhos</p>
            <ul className="footer-links">
              <li>
                <Link href="/cardapio/">Cardápio</Link>
              </li>
              <li>
                <Link href="/sobre/">Sobre nós</Link>
              </li>
              <li>
                <Link href="/contato/">Contato</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.nome}.
          </p>
          <p className="footer-muted">{site.slogan}.</p>
        </div>
      </div>
    </footer>
  );
}
