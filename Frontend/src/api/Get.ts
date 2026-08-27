import api from "./AxiosClient";
import {
  mapItemsToProducts,
  mapItemToProduct,
  mapItemsToItemsProvedor,
  mapProvedoresToBannerItems,
  mapProvedorToBannerItem,
} from "./Mappers";
import type {
  Product,
  BannerItem,
  ItemProvedor,
  ProvedorResponseApi,
  ItemResponseApi,
  FaturamentoResponseApi,
} from "@/types";

// =====================================================
// FEED — endpoints públicos para montagem da home/catálogo
// =====================================================

/** GET /feed/provedores - Todos os provedores cadastrados */
export async function getTodosProvedores(): Promise<BannerItem[]> {
  const { data } = await api.get<ProvedorResponseApi[]>("/feed/provedores");
  return mapProvedoresToBannerItems(data);
}

/** GET /feed/carrossel - Provedores com foto_banner preenchida */
export async function getProvedoresCarrossel(): Promise<BannerItem[]> {
  const { data } = await api.get<ProvedorResponseApi[]>("/feed/carrossel");
  return mapProvedoresToBannerItems(data);
}

/** GET /feed/itens/mais-vendidos - Itens ordenados por mais vendidos */
export async function getItensMaisVendidos(): Promise<Product[]> {
  const { data } = await api.get<ItemResponseApi[]>(
    "/feed/itens/mais-vendidos"
  );
  return mapItemsToProducts(data);
}

/** GET /feed/vendedor/{nome_provedor}/itens */
export async function getItensPorVendedor(
  nomeProvedor: string
): Promise<Product[]> {
  const { data } = await api.get<ItemResponseApi[]>(
    `/feed/vendedor/${encodeURIComponent(nomeProvedor)}/itens`
  );
  return mapItemsToProducts(data);
}

/** GET /feed/cidade/{nome_cidade}/itens */
export async function getItensPorCidade(
  nomeCidade: string
): Promise<Product[]> {
  const { data } = await api.get<ItemResponseApi[]>(
    `/feed/cidade/${encodeURIComponent(nomeCidade)}/itens`
  );
  return mapItemsToProducts(data);
}

// =====================================================
// BUSCA — pesquisa de itens, vendedores e serviços
// =====================================================

/** GET /busca/itens?q= - Busca itens por nome */
export async function getBuscarItens(q: string): Promise<Product[]> {
  const { data } = await api.get<ItemResponseApi[]>("/busca/itens", {
    params: { q },
  });
  return mapItemsToProducts(data);
}

/** GET /busca/vendedores?q= - Busca provedores categoria=vendedor */
export async function getBuscarVendedores(
  q: string = ""
): Promise<BannerItem[]> {
  const { data } = await api.get<ProvedorResponseApi[]>(
    "/busca/vendedores",
    { params: { q } }
  );
  return mapProvedoresToBannerItems(data);
}

/** GET /busca/servicos?q= - Busca provedores categoria=prestador de serviço */
export async function getBuscarServicos(
  q: string = ""
): Promise<BannerItem[]> {
  const { data } = await api.get<ProvedorResponseApi[]>("/busca/servicos", {
    params: { q },
  });
  return mapProvedoresToBannerItems(data);
}

// =====================================================
// PAINEL DO PROVEDOR — leitura de itens
// =====================================================

/** GET /itens/provedor/{nome_provedor} - Itens de um provedor específico */
export async function getItensDoProvedor(
  nomeProvedor: string
): Promise<ItemProvedor[]> {
  const { data } = await api.get<ItemResponseApi[]>(
    `/itens/provedor/${encodeURIComponent(nomeProvedor)}`
  );
  return mapItemsToItemsProvedor(data);
}

/** GET /itens/{nome_item} - Detalhes de um item */
export async function getItem(nomeItem: string): Promise<Product> {
  const { data } = await api.get<ItemResponseApi>(
    `/itens/${encodeURIComponent(nomeItem)}`
  );
  return mapItemToProduct(data);
}

// =====================================================
// PAINEL DO ADMINISTRADOR — leitura de provedores
// =====================================================

/** GET /provedores/ - Todos os provedores cadastrados */
export async function getTodosProvedoresAdmin(): Promise<BannerItem[]> {
  const { data } = await api.get<ProvedorResponseApi[]>("/provedores/");
  return mapProvedoresToBannerItems(data);
}

/** GET /provedores/{nome_provedor} - Detalhes de um provedor */
export async function getProvedor(
  nomeProvedor: string
): Promise<BannerItem> {
  const { data } = await api.get<ProvedorResponseApi>(
    `/provedores/${encodeURIComponent(nomeProvedor)}`
  );
  return mapProvedorToBannerItem(data);
}

/** GET /provedores/{nome_provedor}/faturamento - Total faturado */
export async function getFaturamentoProvedor(
  nomeProvedor: string
): Promise<FaturamentoResponseApi> {
  const { data } = await api.get<FaturamentoResponseApi>(
    `/provedores/${encodeURIComponent(nomeProvedor)}/faturamento`
  );
  return data;
}

// =====================================================
// HEALTH CHECK
// =====================================================

/** GET / - Verifica se a API está no ar */
export async function getHealthCheck(): Promise<unknown> {
  const { data } = await api.get("/");
  return data;
}