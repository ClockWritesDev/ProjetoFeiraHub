from db.scheme import DB


class QueryDB(DB):

    # =========================================================================
    # PAINEL DO PROVEDOR / ITENS
    # =========================================================================

    def get_itens_by_provedor(self, nome_provedor: str) -> list[tuple]:
        """READ (Listar) - ITENS de um vendedor."""
        query = "SELECT * FROM item WHERE provedor = ?"
        cursor = self.conn.execute(query, (nome_provedor,))
        return cursor.fetchall()

    def get_item_by_nome(self, nome_item: str) -> tuple | None:
        """READ - Busca item exato por PK (usado em validações e vendas)."""
        cursor = self.conn.execute(
            "SELECT * FROM item WHERE nome_item = ?", (nome_item,)
        )
        return cursor.fetchone()

    # =========================================================================
    # PAINEL DO ADMINISTRADOR / VENDEDORES
    # =========================================================================

    def get_all_vendedores(self) -> list[tuple]:
        """READ (Listar) - Todos os provedores/vendedores."""
        cursor = self.conn.execute("SELECT * FROM provedor")
        return cursor.fetchall()

    def get_provedor_by_nome(self, nome: str) -> tuple | None:
        """READ - Busca provedor por PK (nome)."""
        cursor = self.conn.execute("SELECT * FROM provedor WHERE nome = ?", (nome,))
        return cursor.fetchone()

    def get_total_dinheiro_vendedor(self, nome_provedor: str) -> float:
        query = """
            SELECT COALESCE(SUM(vendidos * preco_varejo), 0) AS total_em_dinheiro
            FROM item
            WHERE provedor = ?
        """
        cursor = self.conn.execute(query, (nome_provedor,))
        result = cursor.fetchone()
        return result[0] if result else 0.0

    # =========================================================================
    # COMPONENTE: PESQUISA (Os 3 tipos)
    # =========================================================================

    def search_item(self, nome_item: str) -> list[tuple]:
        """1. READ - Busca item por termo."""
        query = "SELECT * FROM item WHERE nome_item LIKE ?"
        cursor = self.conn.execute(query, (f"%{nome_item}%",))
        return cursor.fetchall()

    def search_vendedores(self, nome: str) -> list[tuple]:
        """2. READ (vendedor) - Busca provedor onde categoria = 'vendedor'."""
        query = (
            "SELECT * FROM provedor WHERE categoria = 'vendedor' AND nome LIKE ?"
        )
        cursor = self.conn.execute(query, (f"%{nome}%",))
        return cursor.fetchall()

    def search_prestadores_servico(self, nome: str) -> list[tuple]:
        """3. READ (serviço) - Busca provedor onde categoria = 'prestador de serviço'."""
        query = "SELECT * FROM provedor WHERE categoria = 'prestador de serviço' AND nome LIKE ?"
        cursor = self.conn.execute(query, (f"%{nome}%",))
        return cursor.fetchall()

    # =========================================================================
    # FEEDS & CARROSSEL
    # =========================================================================

    def get_all_provedores(self) -> list[tuple]:
        """READ - ALL provedor."""
        cursor = self.conn.execute("SELECT * FROM provedor")
        return cursor.fetchall()

    def get_all_itens_mais_vendidos(self) -> list[tuple]:
        """READ - ALL item SORT DESC BY vendidos."""
        query = "SELECT * FROM item ORDER BY vendidos DESC"
        cursor = self.conn.execute(query)
        return cursor.fetchall()

    def get_provedores_carrossel(self) -> list[tuple]:
        """READ - Provedores para o carrossel (que possuem foto de banner)."""
        query = "SELECT * FROM provedor WHERE foto_banner IS NOT NULL AND foto_banner != ''"
        cursor = self.conn.execute(query)
        return cursor.fetchall()

    def get_itens_por_provedor_por_cidade(self, nome_cidade: str) -> list[tuple]:
        """
        READ - Itens por provedor na cidade informada, ordenados por mais vendidos.
        """
        query = """
            SELECT i.* 
            FROM item i
            JOIN provedor p ON i.provedor = p.nome
            WHERE p.cidade = ?
            ORDER BY i.vendidos DESC
        """
        cursor = self.conn.execute(query, (nome_cidade,))
        return cursor.fetchall()
