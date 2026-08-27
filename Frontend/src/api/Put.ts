import api from "./AxiosClient";
import type {
  ItemUpdateApi,
  ProvedorUpdateApi,
  GenericResponseApi,
} from "@/types";

// =====================================================
// PAINEL DO PROVEDOR — atualização de itens
// =====================================================

/** PUT /itens/{nome_item} - Atualiza foto, preços e estoque */
export async function putAtualizarItem(
  nomeItem: string,
  payload: ItemUpdateApi
): Promise<GenericResponseApi> {
  const { data } = await api.put<GenericResponseApi>(
    `/itens/${encodeURIComponent(nomeItem)}`,
    payload
  );
  return data;
}

// =====================================================
// PAINEL DO ADMINISTRADOR — atualização de provedores
// =====================================================

/** PUT /provedores/{nome_provedor} - Atualiza informações cadastrais */
export async function putAtualizarProvedor(
  nomeProvedor: string,
  payload: ProvedorUpdateApi
): Promise<GenericResponseApi> {
  const { data } = await api.put<GenericResponseApi>(
    `/provedores/${encodeURIComponent(nomeProvedor)}`,
    payload
  );
  return data;
}