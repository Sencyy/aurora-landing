# Café Aurora — Plano de implementação

Site institucional de cafeteria. Visual acolhedor, tons terrosos, elegante sem formalidade.
Mobile-first, carregamento rápido e boa indexação no Google.

## Decisões travadas

| Tema | Decisão |
|---|---|
| Framework | Next.js (App Router) com `output: 'export'` — React + HTML pré-renderizado |
| UI | Bootstrap **6.0.0-alpha.1**, versão exata, apenas CSS |
| Cardápio | CMS Git-based (Pages CMS) sobre JSON no repositório |
| CTA | WhatsApp com mensagem pré-preenchida |
| Conteúdo | Placeholders marcados, troca posterior |
| Hospedagem | Cloudflare Pages; domínio no Registro.br |

## Estratégia para o Bootstrap 6 alpha

1. **Zero JavaScript do Bootstrap.** Menu mobile via `<dialog>` nativo e acordeão via
   `<details>` — imune às mudanças de API do JS alpha.
2. **CSS pré-compilado + tema por CSS variables.** Importa
   `bootstrap/dist/css/bootstrap.min.css` e sobrescreve tokens `--bs-*` em
   `app/theme.css`. Sem passo Sass/PostCSS da v6.
3. **Fallback para navegadores antigos.** Bloco `@supports not (color: oklch(0% 0 0))`
   redefine superfícies e texto em hex, evitando páginas ilegíveis em Safari 17.
4. **Versão pinada** (`6.0.0-alpha.1`, sem `^`) e lockfile commitado.

Mudanças esperadas no beta: prefixos responsivos (`md:d-none`), compostos de variante
(`.btn-solid theme-primary`), breakpoints 1024/1280/1536 e `2xl` no lugar de `xxl`.

## Conteúdo editável (Pages CMS)

```
content/
├─ cardapio/cafes.json
├─ cardapio/comidas.json
├─ cardapio/doces.json
├─ cardapio/bebidas.json
├─ site.json        # endereço, horários, WhatsApp, Instagram
└─ sobre.md
content/media/      # fotos enviadas pelo CMS
```

Item do cardápio:

```json
{
  "nome": "Flat white",
  "descricao": "Espresso duplo com leite cremoso",
  "preco": 16.5,
  "tags": ["vegetariano"],
  "alergenos": ["leite"],
  "destaque": true,
  "disponivel": true
}
```

`disponivel: false` oculta o item sem apagar. O Pages CMS fica em `app.pagescms.org`
(gratuito, convite por e-mail, funciona no celular); o salvamento gera commit e o
Cloudflare Pages rebuilda em ~1 min.

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Hero + CTA, apresentação, galeria, destaques, horário |
| `/cardapio` | Categorias, preços, badges vegetariano/vegano/sem glúten, filtro |
| `/sobre` | História, valores, fotos |
| `/contato` | Endereço, horários, mapa click-to-load, WhatsApp, Instagram |

## Estrutura de código

```
app/
├─ layout.tsx          # header fixo, footer, metadata, JSON-LD
├─ page.tsx
├─ cardapio/page.tsx
├─ sobre/page.tsx
├─ contato/page.tsx
├─ sitemap.ts
├─ robots.ts
├─ globals.css
└─ theme.css           # tokens terrosos
components/
├─ Nav.tsx             # client: <dialog> mobile
├─ MenuFilter.tsx      # client: filtro por dieta
├─ MapEmbed.tsx        # client: iframe só após clique
├─ OrderButton.tsx
├─ SiteFooter.tsx
├─ Gallery.tsx
└─ JsonLd.tsx
lib/content.ts         # leitura tipada dos JSON/MD
scripts/images.mjs     # sharp → AVIF/WebP responsivos
public/
```

## Identidade visual

- Espresso `#3B2A23`, caramelo `#B07A4A`, creme `#F6EFE6`, oliva `#6B7A5A`.
- Serifada elegante nos títulos, sans humanista no corpo (self-hosted, 2 pesos).
- Cantos suaves, sombras discretas, contraste AA.

## SEO e performance

- JSON-LD `CafeOrCoffeeShop`: `address`, `geo`, `openingHoursSpecification`,
  `hasMenu`, `sameAs`, `priceRange`.
- Imagens AVIF/WebP em 640/1024/1600, `srcset`, dimensões explícitas.
- `sitemap.xml`, `robots.txt`, canonical e Open Graph por página.
- Analytics sem cookies (Cloudflare Web Analytics).
- Meta: Lighthouse 95+, LCP < 2 s em 4G, CLS ~0.
- Fora do site: Google Business Profile + Search Console.

## Fases

| Fase | Entrega |
|---|---|
| 0 | Repositório, Next + Bootstrap 6 pinado, build estático |
| 1 | Tokens terrosos, tipografia, componentes base |
| 2 | As 4 páginas com conteúdo provisório |
| 3 | Cardápio, `.pages.yml`, build hook, teste de edição |
| 4 | SEO, imagens, acessibilidade, QA em celular |
| 5 | Domínio, treinamento e guia de edição |

## Pendências do cliente

1. Endereço completo e horários (com intervalo, se houver).
2. WhatsApp e @ do Instagram.
3. Cardápio inicial com preços.
4. Logo e fotos (fachada, balcão, 6–8 pratos, ambiente, equipe).
5. Domínio desejado e acesso ao GitHub.

Sem esses dados, o site usa valores explícitos em `content/site.json` marcados como
provisórios.
