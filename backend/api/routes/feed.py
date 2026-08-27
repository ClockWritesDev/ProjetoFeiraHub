from fastapi import APIRouter, Depends
from api.dependencies import get_query_db
from api.schemas import ItemResponse, ProvedorResponse
from db.query import QueryDB

router = APIRouter(prefix="/feed", tags=["Feed"])


@router.get("/provedores", response_model=list[ProvedorResponse])
def listar_todos_provedores(db: QueryDB = Depends(get_query_db)):
    """READ - Todos os provedores cadastrados."""
    resultados = db.get_all_provedores()
    return [dict(row) for row in resultados]


@router.get("/carrossel", response_model=list[ProvedorResponse])
def listar_provedores_carrossel(db: QueryDB = Depends(get_query_db)):
    """READ - Provedores que possuem foto_banner preenchida para o carrossel."""
    resultados = db.get_provedores_carrossel()
    return [dict(row) for row in resultados]


@router.get("/itens/mais-vendidos", response_model=list[ItemResponse])
def listar_itens_mais_vendidos(db: QueryDB = Depends(get_query_db)):
    """READ - Todos os itens ordenados pelos mais vendidos (ORDER BY vendidos DESC)."""
    resultados = db.get_all_itens_mais_vendidos()
    return [dict(row) for row in resultados]


@router.get("/vendedor/{nome_provedor}/itens", response_model=list[ItemResponse])
def listar_itens_por_vendedor(
    nome_provedor: str,
    db: QueryDB = Depends(get_query_db)
):
    """READ - Todos os itens pertencentes a um provedor/vendedor específico."""
    resultados = db.get_itens_by_provedor(nome_provedor)
    return [dict(row) for row in resultados]


@router.get("/cidade/{nome_cidade}/itens", response_model=list[ItemResponse])
def listar_itens_por_cidade(
    nome_cidade: str,
    db: QueryDB = Depends(get_query_db)
):
    """READ - Itens dos provedores de uma cidade, ordenados pelos mais vendidos."""
    resultados = db.get_itens_por_provedor_por_cidade(nome_cidade)
    return [dict(row) for row in resultados]
