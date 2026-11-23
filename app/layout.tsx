import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./theme.css";

import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/content";
import { photoOg } from "@/lib/images";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-display",
});

const localBusiness = `${site.nome} — cafeteria e torrefação em ${site.endereco.bairro}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: localBusiness,
    template: `%s | ${site.nome}`,
  },
  description: site.descricaoCurta,
  applicationName: site.nome,
  category: "food",
  keywords: [
    "cafeteria",
    "café especial",
    "torrefação",
    site.endereco.bairro,
    site.endereco.cidade,
    "brunch",
    "pão de fermentação natural",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: localBusiness,
    description: site.descricaoCurta,
    images: [
      {
        url: photoOg("hero-interior"),
        width: 1200,
        height: 630,
        alt: `Interior do ${site.nome}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: localBusiness,
    description: site.descricaoCurta,
    images: [photoOg("hero-interior")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf4ec",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Nav site={site} />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <JsonLd />
      </body>
    </html>
  );
}
