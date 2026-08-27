import api from "./AxiosClient";
import type { GenericResponseApi } from "@/types";

// =====================================================
// PAINEL DO PROVEDOR — remoção de itens
// =====================================================

/** DELETE /itens/{nome_item} - Remove um item do catálogo */
export async function deleteItem(
  nomeItem: string
): Promise<GenericResponseApi> {
  const { data } = await api.delete<GenericResponseApi>(
    `/itens/${encodeURIComponent(nomeItem)}`
  );
  return data;
}

// =====================================================
// PAINEL DO ADMINISTRADOR — remoção de provedores
// =====================================================

/** DELETE /provedores/{nome_provedor} - Remove um provedor do sistema */
export async function deleteProvedor(
  nomeProvedor: string
): Promise<GenericResponseApi> {
  const { data } = await api.delete<GenericResponseApi>(
    `/provedores/${encodeURIComponent(nomeProvedor)}`
  );
  return data;
}