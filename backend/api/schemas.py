from typing import Literal
from pydantic import BaseModel, Field


# =============================================================================
# SCHEMAS DE PROVEDOR / VENDEDOR
# =============================================================================


class ProvedorCreate(BaseModel):
    nome: str
    descricao: str = ""
    foto_banner: str = ""
    telefone: str
    local: str
    categoria: Literal["vendedor", "prestador de serviço"]
    cidade: str


class ProvedorUpdate(BaseModel):
    descricao: str = ""
    foto_banner: str = ""
    telefone: str
    local: str
    categoria: Literal["vendedor", "prestador de serviço"]
    cidade: str


class ProvedorResponse(BaseModel):
    nome: str
    descricao: str | None = None
    foto_banner: str | None = None
    telefone: str | None = None
    local: str | None = None
    categoria: str
    cidade: str | None = None


# =============================================================================
# SCHEMAS DE ITEM
# =============================================================================


class ItemCreate(BaseModel):
    nome_item: str
    provedor: str
    foto: str = ""
    preco_varejo: float = Field(ge=0)
    preco_atacado: float = Field(ge=0)
    estoque: int = Field(default=0, ge=0)
    vendidos: int = Field(default=0, ge=0)


class ItemUpdate(BaseModel):
    foto: str = ""
    preco_varejo: float = Field(ge=0)
    preco_atacado: float = Field(ge=0)
    estoque: int = Field(default=0, ge=0)


class ItemResponse(BaseModel):
    nome_item: str
    provedor: str
    foto: str | None = None
    preco_varejo: float
    preco_atacado: float
    estoque: int
    vendidos: int


# =============================================================================
# SCHEMA DE ATUALIZAÇÃO DO CARRINHO (Incremento de Vendas)
# =============================================================================


class ItemCarrinhoUpdate(BaseModel):
    nome_item: str
    quantidade: int = Field(gt=0)


class CarrinhoSyncRequest(BaseModel):
    itens: list[ItemCarrinhoUpdate]
