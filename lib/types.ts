export type DietTag = "vegetariano" | "vegano" | "sem-gluten";

export interface MenuItem {
  nome: string;
  descricao: string;
  preco: number;
  tags: DietTag[];
  alergenos: string[];
  imagem?: string;
  destaque: boolean;
  disponivel: boolean;
}

export interface MenuCategory {
  categoria: string;
  ordem: number;
  itens: MenuItem[];
}

export interface Horario {
  rotulo: string;
  abre: string;
  fecha: string;
  diasSemana: string[];
}

export interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  pais: string;
}

export interface Site {
  nome: string;
  url: string;
  slogan: string;
  descricaoCurta: string;
  whatsapp: string;
  whatsappMensagem: string;
  telefone: string;
  email: string;
  instagram: string;
  endereco: Endereco;
  geo: { latitude: number; longitude: number };
  mapa: { consulta: string; zoom: number };
  horarios: Horario[];
  precoMedio: string;
  provisorio?: boolean;
}

export interface Valor {
  titulo: string;
  texto: string;
}

export interface Sobre {
  historia: string;
  paragrafos: string[];
  citacao: string;
  valores: Valor[];
}
