import { site } from "@/lib/content";
import { instagramUrl, whatsappUrl } from "@/lib/format";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.url}/#cafe`,
    name: site.nome,
    description: site.descricaoCurta,
    url: site.url,
    image: `${site.url}/images/hero-interior-og.jpg`,
    logo: `${site.url}/icon.svg`,
    telephone: site.telefone,
    email: site.email,
    priceRange: site.precoMedio,
    currenciesAccepted: "BRL",
    paymentAccepted: "Dinheiro, Cartão de crédito, Cartão de débito, Pix",
    servesCuisine: ["Café", "Padaria", "Brunch"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.endereco.rua}, ${site.endereco.numero}`,
      addressLocality: site.endereco.cidade,
      addressRegion: site.endereco.uf,
      postalCode: site.endereco.cep,
      addressCountry: site.endereco.pais,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.horarios.flatMap((horario) =>
      horario.diasSemana.map((dia) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dia,
        opens: horario.abre,
        closes: horario.fecha,
      })),
    ),
    hasMenu: `${site.url}/cardapio/`,
    sameAs: [instagramUrl(site)],
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: whatsappUrl(site),
        inLanguage: "pt-BR",
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": site.url,
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.nome,
    url: site.url,
    inLanguage: "pt-BR",
    publisher: { "@id": `${site.url}/#cafe` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify([data, website]) }}
      />
      <meta name="geo.placename" content={site.endereco.bairro} />
      <meta name="geo.position" content={`${site.geo.latitude};${site.geo.longitude}`} />
      <meta name="ICBM" content={`${site.geo.latitude}, ${site.geo.longitude}`} />
      <link rel="alternate" hrefLang="pt-BR" href={site.url} />
      <link rel="me" href={instagramUrl(site)} />
    </>
  );
}
