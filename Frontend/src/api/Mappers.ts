import type {
  Product,
  BannerItem,
  ItemProvedor,
  CartItem,
  Categoria,
  ProvedorResponseApi,
  ItemResponseApi,
  CarrinhoSyncRequestApi,
} from "./types";

/** Formata um número como moeda BRL simples (ex: 12.5 -> "R$ 12,50") */
export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Converte um ItemResponse (API) em Product (frontend).
 * `categoriaProvedor` é opcional: quando disponível (ex: já buscou o
 * provedor dono do item), define type "produto" | "servico".
 */
export function mapItemToProduct(
  item: ItemResponseApi,
  opts?: {
    categoriaProvedor?: Categoria;
    badge?: string;
    hot?: boolean;
    description?: string;
  }
): Product {
  return {
    id: item.nome_item,
    name: item.nome_item,
    image: item.foto,
    badge: opts?.badge,
    retail: formatCurrency(item.preco_varejo),
    wholesale: formatCurrency(item.preco_atacado),
    type:
      opts?.categoriaProvedor === "prestador de serviço"
        ? "servico"
        : "produto",
    hot: opts?.hot ?? item.vendidos > 0,
    description: opts?.description,
    sellerName: item.provedor,
  };
}

export function mapItemsToProducts(
  items: ItemResponseApi[],
  opts?: Parameters<typeof mapItemToProduct>[1]
): Product[] {
  return items.map((item) => mapItemToProduct(item, opts));
}

/**
 * Converte um ItemResponse (API) em ItemProvedor, usado no painel do
 * provedor para exibir estoque e quantidade vendida.
 */
export function mapItemToItemProvedor(
  item: ItemResponseApi,
  opts?: { categoriaProvedor?: Categoria }
): ItemProvedor {
  return {
    id: item.nome_item,
    name: item.nome_item,
    image: item.foto ?? "",
    retail: formatCurrency(item.preco_varejo),
    wholesale: formatCurrency(item.preco_atacado),
    stock: String(item.estoque),
    salesCount: item.vendidos,
    isService: opts?.categoriaProvedor === "prestador de serviço",
  };
}

export function mapItemsToItemsProvedor(
  items: ItemResponseApi[],
  opts?: Parameters<typeof mapItemToItemProvedor>[1]
): ItemProvedor[] {
  return items.map((item) => mapItemToItemProvedor(item, opts));
}

/**
 * Converte um ProvedorResponse (API) em BannerItem (frontend),
 * usado no carrossel/feed de provedores. `items` é opcional: passe os
 * itens do provedor já convertidos com mapItemsToProducts caso queira
 * exibi-los dentro do banner.
 */
export function mapProvedorToBannerItem(
  provedor: ProvedorResponseApi,
  items?: Product[]
): BannerItem {
  return {
    id: provedor.nome,
    storeName: provedor.nome,
    description: provedor.descricao ?? "",
    longDescription: provedor.descricao ?? undefined,
    image: provedor.foto_banner ?? "",
    phone: provedor.telefone ?? undefined,
    city: provedor.cidade ?? undefined,
    category: provedor.categoria,
    items,
  };
}

export function mapProvedoresToBannerItems(
  provedores: ProvedorResponseApi[]
): BannerItem[] {
  return provedores.map((p) => mapProvedorToBannerItem(p));
}

/**
 * Converte os itens do carrinho (frontend) no payload esperado por
 * POST /carrinho/sync. Assume que `CartItem.name` corresponde ao
 * `nome_item` (chave primária) usado pela API.
 */
export function mapCartItemsToCarrinhoSync(
  cartItems: CartItem[]
): CarrinhoSyncRequestApi {
  return {
    itens: cartItems.map((item) => ({
      nome_item: item.name,
      quantidade: item.quantity ?? 1,
    })),
  };
}