from fastapi import APIRouter, Depends, HTTPException, status
from api.dependencies import get_write_db
from api.schemas import CarrinhoSyncRequest
from db.write import WriteDB

router = APIRouter(prefix="/carrinho", tags=["Carrinho / Checkout WhatsApp"])


@router.post(
    "/sync",
    response_model=dict,
    status_code=status.HTTP_200_OK,
    summary="Atualiza vendas e estoque a partir do carrinho do React",
)
def sincronizar_carrinho(
    payload: CarrinhoSyncRequest,
    db_write: WriteDB = Depends(get_write_db),
):
    """
    Recebe os itens selecionados no React no momento do redirecionamento
    para o WhatsApp e aplica o incremento no campo 'vendidos' e decremento no 'estoque'.
    """
    if not payload.itens:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O carrinho não contém itens.",
        )

    # Converte os modelos Pydantic em dicionários para a função do banco
    itens_dicts = [item.model_dump() for item in payload.itens]

    sucesso = db_write.processar_vendas_carrinho(itens_dicts)

    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro ao atualizar vendas/estoque dos itens do carrinho.",
        )

    return {"message": "Itens sincronizados com sucesso."}
