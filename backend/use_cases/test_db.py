from db.menu import Menu
from db.query import QueryDB
from db.write import WriteDB

# Create instances to perform database actions
query_db = QueryDB()
write_db = WriteDB()


# ==================== PAINEL DO PROVEDOR (CRUD ITENS) ====================


def test_create_item():
    nome_item = input("Nome do item: ").strip()
    provedor = input("Nome do provedor/vendedor: ").strip()
    foto = input("URL da foto: ").strip()
    preco_varejo = float(input("Preço Varejo (ex: 15.50): ") or 0)
    preco_atacado = float(input("Preço Atacado (ex: 12.00): ") or 0)
    estoque = int(input("Estoque inicial (ex: 10): ") or 0)
    vendidos = int(input("Qtd vendidos inicial (ex: 0): ") or 0)

    sucesso = write_db.create_item(
        nome_item=nome_item,
        provedor=provedor,
        foto=foto,
        preco_varejo=preco_varejo,
        preco_atacado=preco_atacado,
        estoque=estoque,
        vendidos=vendidos,
    )
    print(
        f"Item '{nome_item}' criado com sucesso!"
        if sucesso
        else "Falha ao criar item (já existe ou erro de FK)."
    )


def test_list_itens_by_provedor():
    provedor = input("Nome do provedor: ").strip()
    itens = query_db.get_itens_by_provedor(provedor)
    print(f"\n--- Itens do Provedor '{provedor}' ({len(itens)}) ---")
    for item in itens:
        print(item)


def test_update_item():
    nome_item = input("Nome do item a atualizar: ").strip()
    foto = input("Nova URL da foto: ").strip()
    preco_varejo = float(input("Novo Preço Varejo: ") or 0)
    preco_atacado = float(input("Novo Preço Atacado: ") or 0)
    estoque = int(input("Novo Estoque: ") or 0)

    sucesso = write_db.update_item(
        nome_item=nome_item,
        foto=foto,
        preco_varejo=preco_varejo,
        preco_atacado=preco_atacado,
        estoque=estoque,
    )
    print("Item atualizado!" if sucesso else "Item não encontrado.")


def test_delete_item():
    nome_item = input("Nome do item a deletar: ").strip()
    sucesso = write_db.delete_item(nome_item)
    print("Item deletado!" if sucesso else "Item não encontrado.")


# ==================== PAINEL DO ADMINISTRADOR ====================


def test_create_provedor():
    nome = input("Nome do provedor: ").strip()
    descricao = input("Descrição: ").strip()
    foto_banner = input("URL da Foto do Banner: ").strip()
    telefone = input("Telefone: ").strip()
    local = input("Local (endereço/box): ").strip()
    print("Categorias válidas: 'vendedor' ou 'prestador de serviço'")
    categoria = input("Categoria: ").strip()
    cidade = input("Cidade: ").strip()

    sucesso = write_db.create_provedor(
        nome=nome,
        descricao=descricao,
        foto_banner=foto_banner,
        telefone=telefone,
        local=local,
        categoria=categoria,
        cidade=cidade,
    )
    print(
        f"Provedor '{nome}' cadastrado com sucesso!"
        if sucesso
        else "Falha ao cadastrar provedor."
    )


def test_list_vendedores():
    vendedores = query_db.get_all_vendedores()
    print(f"\n--- Todos os Vendedores/Provedores ({len(vendedores)}) ---")
    for v in vendedores:
        print(v)


def test_update_provedor():
    nome = input("Nome do provedor a atualizar: ").strip()
    descricao = input("Nova Descrição: ").strip()
    foto_banner = input("Nova Foto do Banner: ").strip()
    telefone = input("Novo Telefone: ").strip()
    local = input("Novo Local: ").strip()
    categoria = input("Nova Categoria (vendedor/prestador de serviço): ").strip()
    cidade = input("Nova Cidade: ").strip()

    sucesso = write_db.update_provedor(
        nome=nome,
        descricao=descricao,
        foto_banner=foto_banner,
        telefone=telefone,
        local=local,
        categoria=categoria,
        cidade=cidade,
    )
    print("Provedor atualizado!" if sucesso else "Provedor não encontrado.")


def test_delete_provedor():
    nome = input("Nome do provedor a deletar: ").strip()
    sucesso = write_db.delete_provedor(nome)
    print("Provedor deletado!" if sucesso else "Provedor não encontrado.")


def test_total_dinheiro_vendedor():
    provedor = input("Nome do vendedor para calcular total: ").strip()
    total = query_db.get_total_dinheiro_vendedor(provedor)
    print(f"\nTotal em dinheiro vendido por '{provedor}': R$ {total:.2f}")


# ==================== COMPONENTE PESQUISA ====================


def test_search_item():
    termo = input("Termo de busca do item: ").strip()
    resultados = query_db.search_item(termo)
    print(f"\n--- Resultados para itens com '{termo}' ({len(resultados)}) ---")
    for item in resultados:
        print(item)


def test_search_provedor():
    categoria = input("Categoria (vendedor / prestador de serviço): ").strip()
    nome = input("Nome ou termo do provedor: ").strip()
    resultados = query_db.search_provedor_by_categoria(categoria, nome)
    print(
        f"\n--- Provedores encontrados ({categoria} / '{nome}') ({len(resultados)}) ---"
    )
    for p in resultados:
        print(p)


# ==================== FEEDS ====================


def test_feed_all_provedores():
    provedores = query_db.get_all_provedores()
    print(f"\n--- Feed: Todos os Provedores ({len(provedores)}) ---")
    for p in provedores:
        print(p)


def test_feed_itens_mais_vendidos():
    itens = query_db.get_all_itens_mais_vendidos()
    print(f"\n--- Feed: Itens Mais Vendidos ({len(itens)}) ---")
    for item in itens:
        print(item)


def test_feed_itens_por_cidade():
    cidade = input("Nome da cidade: ").strip()
    itens = query_db.get_itens_por_provedor_por_cidade(cidade)
    print(
        f"\n--- Feed: Itens por Provedor em '{cidade}' (Mais vendidos) ({len(itens)}) ---"
    )
    for item in itens:
        print(item)


def test_carrossel_provedores():
    provedores = query_db.get_provedores_carrossel()
    print(f"\n--- Carrossel: Provedores com Banner ({len(provedores)}) ---")
    for p in provedores:
        print(p)


# ==================== CARRINHO / CHECKOUT ====================


def test_processar_carrinho():
    itens_carrinho = []
    print("Adicione os itens do carrinho (pressione ENTER no nome para finalizar):")
    while True:
        nome_item = input("  Nome do item: ").strip()
        if not nome_item:
            break
        quantidade = int(input("  Quantidade comprada: ") or 1)
        itens_carrinho.append({"nome_item": nome_item, "quantidade": quantidade})

    if itens_carrinho:
        sucesso = write_db.processar_vendas_carrinho(itens_carrinho)
        print(
            "Vendas do carrinho processadas com sucesso!"
            if sucesso
            else "Erro ao processar carrinho."
        )
    else:
        print("Nenhum item informado.")


def clear_db():
    write_db.clear_database()


# ==================== MENU ====================


def run_test_db_menu(db_path: str = "feira_hub.db"):
    global query_db, write_db
    query_db = QueryDB(db_path)
    write_db = WriteDB(db_path)

    dict_db_menu = {
        # Provedor
        "1": {"label": "  [Item] Criar novo item", "action": test_create_item},
        "2": {
            "label": "  [Item] Listar itens de um provedor",
            "action": test_list_itens_by_provedor,
        },
        "3": {"label": "  [Item] Atualizar item", "action": test_update_item},
        "4": {"label": "󰆴 [Item] Deletar item", "action": test_delete_item},
        # Administrador
        "5": {
            "label": "  [Admin] Cadastrar novo provedor",
            "action": test_create_provedor,
        },
        "6": {
            "label": "  [Admin] Listar todos os provedores",
            "action": test_list_vendedores,
        },
        "7": {
            "label": "  [Admin] Atualizar provedor",
            "action": test_update_provedor,
        },
        "8": {
            "label": "󰆴 [Admin] Deletar provedor",
            "action": test_delete_provedor,
        },
        "9": {
            "label": "  [Admin] Total faturado por vendedor",
            "action": test_total_dinheiro_vendedor,
        },
        # Pesquisa
        "10": {"label": "  [Busca] Buscar item por nome", "action": test_search_item},
        "11": {
            "label": "  [Busca] Buscar provedor por categoria",
            "action": test_search_provedor,
        },
        # Feeds
        "12": {
            "label": "  [Feed] Feed geral de provedores",
            "action": test_feed_all_provedores,
        },
        "13": {
            "label": "  [Feed] Feed itens mais vendidos",
            "action": test_feed_itens_mais_vendidos,
        },
        "14": {
            "label": "  [Feed] Feed itens por cidade",
            "action": test_feed_itens_por_cidade,
        },
        "15": {
            "label": "  [Feed] Carrossel de provedores (banners)",
            "action": test_carrossel_provedores,
        },
        # Carrinho & Limpeza
        "16": {
            "label": "  [Venda] Processar carrinho (atualizar vendidos/estoque)",
            "action": test_processar_carrinho,
        },
        "17": {"label": "󰆴 [DB] Limpar banco de dados", "action": clear_db},
    }

    Menu("Painel Feira Hub - Test DB", dict_db_menu)


if __name__ == "__main__":
    run_test_db_menu()
