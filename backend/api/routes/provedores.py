from fastapi import APIRouter, Depends, HTTPException, status
from api.dependencies import get_query_db, get_write_db
from api.schemas import ProvedorCreate, ProvedorResponse, ProvedorUpdate
from db.query import QueryDB
from db.write import WriteDB

router = APIRouter(prefix="/provedores", tags=["Painel do Administrador - Provedores"])


@router.post(
    "/",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Cadastrar novo provedor/vendedor",
)
def criar_provedor(
    payload: ProvedorCreate,
    db_write: WriteDB = Depends(get_write_db),
    db_query: QueryDB = Depends(get_query_db),
):
    """CREATE - Cadastra um novo provedor ou prestador de serviço."""
    if db_query.get_provedor_by_nome(payload.nome):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Provedor '{payload.nome}' já cadastrado.",
        )

    sucesso = db_write.create_provedor(
        nome=payload.nome,
        descricao=payload.descricao,
        foto_banner=payload.foto_banner,
        telefone=payload.telefone,
        local=payload.local,
        categoria=payload.categoria,
        cidade=payload.cidade,
    )

    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Erro ao cadastrar provedor.",
        )

    return {"message": f"Provedor '{payload.nome}' cadastrado com sucesso."}


@router.get(
    "/",
    response_model=list[ProvedorResponse],
    summary="Listar todos os provedores/vendedores",
)
def listar_todos_provedores(db_query: QueryDB = Depends(get_query_db)):
    """READ (Listar) - Retorna todos os provedores cadastrados."""
    provedores = db_query.get_all_vendedores()
    return [dict(p) for p in provedores]


@router.get(
    "/{nome_provedor}",
    response_model=ProvedorResponse,
    summary="Obter detalhes de um provedor",
)
def obter_provedor(
    nome_provedor: str,
    db_query: QueryDB = Depends(get_query_db),
):
    """READ - Retorna os dados de um provedor específico pela PK."""
    provedor = db_query.get_provedor_by_nome(nome_provedor)
    if not provedor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Provedor '{nome_provedor}' não encontrado.",
        )
    return dict(provedor)


@router.put(
    "/{nome_provedor}",
    response_model=dict,
    summary="Atualizar dados de um provedor",
)
def atualizar_provedor(
    nome_provedor: str,
    payload: ProvedorUpdate,
    db_write: WriteDB = Depends(get_write_db),
    db_query: QueryDB = Depends(get_query_db),
):
    """UPDATE - Atualiza as informações cadastrais do provedor."""
    if not db_query.get_provedor_by_nome(nome_provedor):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Provedor '{nome_provedor}' não encontrado.",
        )

    sucesso = db_write.update_provedor(
        nome=nome_provedor,
        descricao=payload.descricao,
        foto_banner=payload.foto_banner,
        telefone=payload.telefone,
        local=payload.local,
        categoria=payload.categoria,
        cidade=payload.cidade,
    )

    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não foi possível atualizar o provedor.",
        )

    return {"message": f"Provedor '{nome_provedor}' atualizado com sucesso."}


@router.delete(
    "/{nome_provedor}",
    response_model=dict,
    summary="Deletar um provedor",
)
def deletar_provedor(
    nome_provedor: str,
    db_write: WriteDB = Depends(get_write_db),
    db_query: QueryDB = Depends(get_query_db),
):
    """DELETE - Remove um provedor do sistema."""
    if not db_query.get_provedor_by_nome(nome_provedor):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Provedor '{nome_provedor}' não encontrado.",
        )

    sucesso = db_write.delete_provedor(nome_provedor)
    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não foi possível remover o provedor.",
        )

    return {"message": f"Provedor '{nome_provedor}' removido com sucesso."}


@router.get(
    "/{nome_provedor}/faturamento",
    response_model=dict,
    summary="Consultar total faturado por vendedor",
)
def obter_faturamento_vendedor(
    nome_provedor: str,
    db_query: QueryDB = Depends(get_query_db),
):
    """
    Calcula a soma de vendas em dinheiro registradas para o vendedor:
    SELECT SUM(valor_total) FROM vendas WHERE provedor = ?
    """
    if not db_query.get_provedor_by_nome(nome_provedor):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Provedor '{nome_provedor}' não encontrado.",
        )

    total = db_query.get_total_dinheiro_vendedor(nome_provedor)
    return {
        "provedor": nome_provedor,
        "total_em_dinheiro": total
    }
