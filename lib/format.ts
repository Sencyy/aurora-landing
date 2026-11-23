import type { Endereco, Site } from "./types";

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const brl = (value: number) => brlFormatter.format(value);

export const onlyDigits = (value: string) => value.replace(/\D/g, "");

export function whatsappUrl(site: Site, message?: string) {
  const text = message ?? site.whatsappMensagem;
  return `https://wa.me/${onlyDigits(site.whatsapp)}?text=${encodeURIComponent(text)}`;
}

export const instagramUrl = (site: Site) => `https://www.instagram.com/${site.instagram}/`;

export const mapsDirectionsUrl = (site: Site) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapa.consulta)}`;

export const mapsEmbedUrl = (site: Site) =>
  `https://www.google.com/maps?q=${encodeURIComponent(site.mapa.consulta)}&z=${site.mapa.zoom}&output=embed`;

export function addressLines(endereco: Endereco) {
  const street = `${endereco.rua}, ${endereco.numero}${endereco.complemento ? ` — ${endereco.complemento}` : ""}`;
  return [street, `${endereco.bairro} · ${endereco.cidade} — ${endereco.uf}`, `CEP ${endereco.cep}`];
}

export const addressOneLine = (endereco: Endereco) =>
  `${endereco.rua}, ${endereco.numero}${endereco.complemento ? ` - ${endereco.complemento}` : ""}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}, ${endereco.cep}`;

export function shortHours(site: Site) {
  return site.horarios.map((horario) => `${horario.rotulo}: ${horario.abre} às ${horario.fecha}`);
}

export const tagLabels = {
  vegetariano: "Vegetariano",
  vegano: "Vegano",
  "sem-gluten": "Sem glúten",
} as const;
