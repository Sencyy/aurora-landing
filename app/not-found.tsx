import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "40rem" }}>
        <p className="eyebrow">Erro 404</p>
        <h1 className="page-hero__title">Essa página saiu para tomar um café.</h1>
        <p className="lede">
          O endereço que você tentou abrir não existe (ou mudou de lugar). Volte para o início ou dê uma olhada
          no cardápio.
        </p>
        <div className="d-flex flex-wrap gap-2 mt-4">
          <Link className="btn-solid theme-primary" href="/">
            Voltar ao início
          </Link>
          <Link className="btn-outline theme-primary" href="/cardapio/">
            Ver cardápio
          </Link>
        </div>
      </div>
    </section>
  );
}
