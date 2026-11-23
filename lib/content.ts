import fs from "node:fs";
import path from "node:path";
import type { MenuCategory, MenuItem, Site, Sobre } from "./types";

const ROOT = process.cwd();

function readJson<T>(relativePath: string): T {
  const fullPath = path.join(ROOT, relativePath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8")) as T;
  } catch (error) {
    throw new Error(
      `Não foi possível ler ${relativePath}. Verifique se o arquivo existe e o JSON é válido.\n${String(error)}`,
    );
  }
}

export const site = readJson<Site>("content/site.json");
export const sobre = readJson<Sobre>("content/sobre.json");

const MENU_DIR = path.join(ROOT, "content", "cardapio");

export const menu: MenuCategory[] = fs
  .readdirSync(MENU_DIR)
  .filter((file) => file.endsWith(".json"))
  .map((file) => readJson<MenuCategory>(path.join("content", "cardapio", file)))
  .sort((a, b) => a.ordem - b.ordem);

export function getMenu(options: { includeUnavailable?: boolean } = {}): MenuCategory[] {
  const { includeUnavailable = false } = options;

  return menu
    .map((category) => ({
      ...category,
      itens: category.itens.filter((item) => includeUnavailable || item.disponivel),
    }))
    .filter((category) => category.itens.length > 0);
}

export function getHighlights(limit = 3): MenuItem[] {
  return getMenu()
    .flatMap((category) => category.itens)
    .filter((item) => item.destaque)
    .slice(0, limit);
}

export const menuTags = [
  { value: "vegetariano", label: "Vegetariano" },
  { value: "vegano", label: "Vegano" },
  { value: "sem-gluten", label: "Sem glúten" },
] as const;
