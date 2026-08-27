from fastapi import APIRouter, Depends, HTTPException, status
from api.dependencies import get_query_db, get_write_db
from api.schemas import ItemCreate, ItemResponse, ItemUpdate
from db.query import QueryDB
from db.write import WriteDB

router = APIRouter(prefix="/itens", tags=["Painel do Provedor - Itens"])


@router.post(
    "/",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Criar novo item para um provedor",
)
def criar_item(
    payload: ItemCreate,
    db_write: WriteDB = Depends(get_write_db),
    db_query: QueryDB = Depends(get_query_db),
):
    """CREATE - Cadastra um item vinculado a um provedor."""
    # Valida se o provedor existe antes de criar
    if not db_query.get_provedor_by_nome(payload.provedor):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Provedor '{payload.provedor}' não encontrado.",
        )

    # Valida se já existe item com a mesma PK
    if db_query.get_item_by_nome(payload.nome_item):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Item '{payload.nome_item}' já existe no catálogo.",
        )

    sucesso = db_write.create_item(
        nome_item=payload.nome_item,
        provedor=payload.provedor,
        foto=payload.foto,
        preco_varejo=payload.preco_varejo,
        preco_atacado=payload.preco_atacado,
        estoque=payload.estoque,
        vendidos=payload.vendidos,
    )

    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não foi possível criar o item.",
        )

    return {"message": f"Item '{payload.nome_item}' cadastrado com sucesso."}


@router.get(
    "/provedor/{nome_provedor}",
    response_model=list[ItemResponse],
    summary="Listar itens de um provedor específico",
)
def listar_itens_provedor(
    nome_provedor: str,
    db_query: QueryDB = Depends(get_query_db),
):
    """READ (Listar) - Retorna todos os itens cadastrados pelo provedor."""
    itens = db_query.get_itens_by_provedor(nome_provedor)
    return [dict(item) for item in itens]


@router.get(
    "/{nome_item}",
    response_model=ItemResponse,
    summary="Obter detalhes de um item",
)
def obter_item(
    nome_item: str,
    db_query: QueryDB = Depends(get_query_db),
):
    """READ - Retorna os dados de um item específico pela chave primária."""
    item = db_query.get_item_by_nome(nome_item)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item '{nome_item}' não encontrado.",
        )
    return dict(item)


@router.put(
    "/{nome_item}",
    response_model=dict,
    summary="Atualizar dados de um item",
)
def atualizar_item(
    nome_item: str,
    payload: ItemUpdate,
    db_write: WriteDB = Depends(get_write_db),
    db_query: QueryDB = Depends(get_query_db),
):
    """UPDATE - Atualiza foto, preços e estoque do item."""
    if not db_query.get_item_by_nome(nome_item):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item '{nome_item}' não encontrado.",
        )

    sucesso = db_write.update_item(
        nome_item=nome_item,
        foto=payload.foto,
        preco_varejo=payload.preco_varejo,
        preco_atacado=payload.preco_atacado,
        estoque=payload.estoque,
    )

    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não foi possível atualizar o item.",
        )

    return {"message": f"Item '{nome_item}' atualizado com sucesso."}


@router.delete(
    "/{nome_item}",
    response_model=dict,
    summary="Deletar um item",
)
def deletar_item(
    nome_item: str,
    db_write: WriteDB = Depends(get_write_db),
    db_query: QueryDB = Depends(get_query_db),
):
    """DELETE - Remove um item do catálogo."""
    if not db_query.get_item_by_nome(nome_item):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item '{nome_item}' não encontrado.",
        )

    sucesso = db_write.delete_item(nome_item)
    if not sucesso:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não foi possível remover o item.",
        )

    return {"message": f"Item '{nome_item}' removido com sucesso."}
