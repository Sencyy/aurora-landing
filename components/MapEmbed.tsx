"use client";

import { useState } from "react";

import { MapPinIcon } from "./icons";
import { addressOneLine, mapsDirectionsUrl, mapsEmbedUrl } from "@/lib/format";
import type { Site } from "@/lib/types";

export function MapEmbed({ site }: { site: Site }) {
  const [loaded, setLoaded] = useState(false);
  const address = addressOneLine(site.endereco);

  if (loaded) {
    return (
      <div className="map-card">
        <iframe
          src={mapsEmbedUrl(site)}
          title={`Mapa com a localização do ${site.nome}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="map-card">
      <div className="map-facade">
        <span className="map-facade__pin" aria-hidden="true">
          <MapPinIcon size={24} />
        </span>
        <h2>Estamos em {site.endereco.bairro}</h2>
        <p>{address}</p>
        <div className="map-facade__actions">
          <button type="button" className="btn-solid theme-primary" onClick={() => setLoaded(true)}>
            Ver mapa interativo
          </button>
          <a
            className="btn-outline theme-primary"
            href={mapsDirectionsUrl(site)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir no Google Maps
          </a>
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--bs-fg-3)" }}>
          O mapa só carrega quando você pedir, para o site abrir mais rápido.
        </p>
      </div>
    </div>
  );
}
