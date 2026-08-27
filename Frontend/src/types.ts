// =====================================================
// TIPOS DE FRONTEND (fornecidos por você)
// =====================================================

export interface Product {
  id: number | string;
  name: string;
  image: string | null;
  badge?: string;
  retail: string;
  wholesale?: string;
  type?: "produto" | "servico";
  hot?: boolean;
  description?: string;
  sellerName?: string;
}

export interface BannerItem {
  id: string | number;
  storeName: string;
  description: string;
  longDescription?: string;
  image: string;
  phone?: string;
  city?: string;
  category?: string;
  items?: Product[];
  linkUrl?: string;
}


export interface VendedorData {
  id: string | number;
  name: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  bannerName?: string;
  tipo?: "vendedor" | "servico";
  revenue: string;
  salesCount: number;
}

export interface ItemProvedor {
  id: string | number;
  name: string;
  image: string;
  retail: string;
  wholesale?: string;
  stock: string;
  salesCount: number;
  isService: boolean;
}

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  category: string;
  image: string | null;
  accent?: boolean;
  quantity?: number;
}

export interface CustomerForm {
  name: string;
  address: string;
}

export type SearchTab = "Produtos" | "Vendedores" | "Serviços";

// =====================================================
// DTOs CRUS DA API (payloads/respostas exatamente como o
// FastAPI espera/retorna). Usados internamente pelas
// funções de request e convertidos para os tipos acima
// através dos mappers em mappers.ts
// =====================================================

export type Categoria = "vendedor" | "prestador de serviço";

export interface ProvedorResponseApi {
  nome: string;
  descricao: string | null;
  foto_banner: string | null;
  telefone: string | null;
  local: string | null;
  categoria: string;
  cidade: string | null;
}

export interface ProvedorCreateApi {
  nome: string;
  descricao?: string;
  foto_banner?: string;
  telefone: string;
  local: string;
  categoria: Categoria;
  cidade: string;
}

export interface ProvedorUpdateApi {
  descricao?: string;
  foto_banner?: string;
  telefone: string;
  local: string;
  categoria: Categoria;
  cidade: string;
}

export interface ItemResponseApi {
  nome_item: string;
  provedor: string;
  foto: string | null;
  preco_varejo: number;
  preco_atacado: number;
  estoque: number;
  vendidos: number;
}

export interface ItemCreateApi {
  nome_item: string;
  provedor: string;
  foto?: string;
  preco_varejo: number;
  preco_atacado: number;
  estoque?: number;
  vendidos?: number;
}

export interface ItemUpdateApi {
  foto?: string;
  preco_varejo: number;
  preco_atacado: number;
  estoque?: number;
}

export interface ItemCarrinhoUpdateApi {
  nome_item: string;
  quantidade: number;
}

export interface CarrinhoSyncRequestApi {
  itens: ItemCarrinhoUpdateApi[];
}

export interface ValidationErrorApi {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface HTTPValidationErrorApi {
  detail: ValidationErrorApi[];
}

// Respostas genéricas de create/update/delete que a API tipa como
// "object" com additionalProperties: true
export type GenericResponseApi = Record<string, unknown>;

export interface FaturamentoResponseApi extends GenericResponseApi {
  provedor?: string;
  total_faturado?: number;
}