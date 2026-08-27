import api from "./AxiosClient";
import { mapCartItemsToCarrinhoSync } from "./Mappers";
import type {
  CartItem,
  ItemCreateApi,
  ProvedorCreateApi,
  GenericResponseApi,
} from "@/types";

// =====================================================
// PAINEL DO PROVEDOR — criação de itens
// =====================================================

/** POST /itens/ - Cadastra um item vinculado a um provedor */
export async function postCriarItem(
  payload: ItemCreateApi
): Promise<GenericResponseApi> {
  const { data } = await api.post<GenericResponseApi>("/itens/", payload);
  return data;
}

// =====================================================
// PAINEL DO ADMINISTRADOR — criação de provedores
// =====================================================

/** POST /provedores/ - Cadastra um novo provedor ou prestador de serviço */
export async function postCriarProvedor(
  payload: ProvedorCreateApi
): Promise<GenericResponseApi> {
  const { data } = await api.post<GenericResponseApi>(
    "/provedores/",
    payload
  );
  return data;
}

// =====================================================
// CARRINHO / CHECKOUT WHATSAPP
// =====================================================

/**
 * POST /carrinho/sync
 * Recebe os itens do carrinho (frontend) no momento do redirecionamento
 * para o WhatsApp; a API incrementa 'vendidos' e decrementa 'estoque'.
 */
export async function postSincronizarCarrinho(
  cartItems: CartItem[]
): Promise<GenericResponseApi> {
  const payload = mapCartItemsToCarrinhoSync(cartItems);
  const { data } = await api.post<GenericResponseApi>(
    "/carrinho/sync",
    payload
  );
  return data;
}