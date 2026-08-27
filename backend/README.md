# COMMANDS
---
`poetry lock`
`poetry install`
`poetry run python main.py api`

# DB
---
* Cidade
* cidade-provedor
* provedor
    * nome
    * Descrição
    * foto_banner
    * telefone
    * local
    * categoria (enum: vendedor, prestador de serviço)
    * cidade
* item-provedor
* item
    * provedor
    * PK: nome item 
    * foto (url da foto)
    * preço varejo
    * preço atacado
    * estoque
    * vendidos (int)
* vendas
    * id_venda (PK)
    * provedor (FK referenciando o provedor/vendedor)
    * valor_total
* item_venda
    * id_venda (FK)
    * nome_item (FK referenciando a PK de item)
    * quantidade (int)
    * tipo_preco (enum: varejo, atacado)

* Queries
    * tela: painel_do_provedor
        * CREATE - item de um vendedor
        * READ (Listar) - ITENS de um vendedor
        * UPDATE - ITEM de um vendedor
        * DELETE - ITEM de um vendedor (PK)

    * tela: painel_do_administrador
        * CREATE - Vendedor
        * READ (Listar) - vendedores:
        * UPDATE - vendedor
        * DELETE - vendedor

        ```sql
        SELECT 
            provedor,
            SUM(valor_total) AS total_em_dinheiro
        FROM vendas
        WHERE provedor = 'NOME_DO_PROVEDOR'
        GROUP BY provedor;
        ```

    * componente: pesquisa
        * READ - item (WHERE NAME = ?)
        * READ (vendedor) - provedor (WHERE tipo = ? AND WHERE NAME = ?)
        * READ (serviço) - provedor (WHERE tipo = ? AND WHERE NAME = ?)
    * tela: feed
        * READ - ALL provedor
        * READ - ALL item SORT DESC BY vendidos
    * tela: feed_vendedor
        * READ - ALL item WHERE PROVEDOR = ?
    * carrinho (outros dados são passados para whatsapp)
        * UPDATE - LOOP: WHERE NAME = ?, VENDAS + qtd (cookie (ou memória da sessão))

# CONTEXT
---
Include:
    use_cases/test_db.py
    README.md
    api/routes/provedores.py
    api/routes/busca.py
    api/routes/itens.py
    api/routes/feed.py
    api/schemas.py
    api/dependencies.py
    main.py
    feira_hub.db
    db/README.md
    db/scheme.py
    db/query.py
    db/write.py
    db/menu.py
    pyproject.toml
