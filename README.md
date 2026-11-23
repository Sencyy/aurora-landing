# Café Aurora

Site institucional estático em Next.js, com conteúdo editável pelo Pages CMS.

## Desenvolvimento

```bash
npm install
npm run dev
```

O conteúdo editável fica em `content/`. Para regenerar as imagens responsivas
manualmente, rode `npm run images`.

## Deploy no Cloudflare Pages

Configure o projeto com:

- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node.js:** 20 ou mais recente

O build executa `npm run images` antes do Next.js. Assim, fotos novas enviadas
para `content/media/` pelo Pages CMS também geram AVIF, WebP e Open Graph.

## Pages CMS

O schema está em `.pages.yml`. No Pages CMS, conecte o repositório, selecione a
branch de produção e edite Cardápio, Dados do site, Sobre nós ou Mídia.

Depois de conectar o repositório ao Cloudflare Pages, cada commit do CMS
dispara um novo build automaticamente. Se o projeto usar um build hook em vez
do rebuild automático, configure-o no Cloudflare com o mesmo comando de build.
