from fastapi import APIRouter, Depends, Query
from api.dependencies import get_query_db
from api.schemas import ItemResponse, ProvedorResponse
from db.query import QueryDB

router = APIRouter(prefix="/busca", tags=["Busca"])


@router.get("/itens", response_model=list[ItemResponse])
def buscar_itens(
    q: str = Query(..., description="Termo para buscar no nome do item"),
    db: QueryDB = Depends(get_query_db),
):
    """Busca itens por nome (WHERE nome_item LIKE %q%)."""
    resultados = db.search_item(q)
    return [dict(row) for row in resultados]

@router.get("/vendedores", response_model=list[ProvedorResponse])
def buscar_vendedores(
    q: str = Query(default="", description="Termo para buscar no nome do vendedor"),
    db: QueryDB = Depends(get_query_db),
):
    """Busca provedores onde categoria = 'vendedor' e nome LIKE %q%."""
    resultados = db.search_vendedores(q)
    return [dict(row) for row in resultados]


@router.get("/servicos", response_model=list[ProvedorResponse])
def buscar_servicos(
    q: str = Query(default="", description="Termo para buscar no nome do prestador de serviço"),
    db: QueryDB = Depends(get_query_db),
):
    """Busca provedores onde categoria = 'prestador de serviço' e nome LIKE %q%."""
    resultados = db.search_prestadores_servico(q)
    return [dict(row) for row in resultados]
