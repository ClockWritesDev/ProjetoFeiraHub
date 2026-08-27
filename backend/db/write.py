from db.scheme import DB
import db.query


class WriteDB(DB):
    def __init__(self, db_name="feira_hub.db"):
        super().__init__(db_name)
        self.query = db.query.QueryDB(db_name)
        self.query.conn = self.conn

    # =========================================================================
    # PAINEL DO PROVEDOR (CRUD de Itens)
    # =========================================================================

    def create_item(
        self,
        nome_item: str,
        provedor: str,
        foto: str,
        preco_varejo: float,
        preco_atacado: float,
        estoque: int = 0,
        vendidos: int = 0,
    ) -> bool:
        """CREATE - Item de um vendedor."""
        cursor = self.conn.execute(
            """
            INSERT OR IGNORE INTO item 
            (nome_item, provedor, foto, preco_varejo, preco_atacado, estoque, vendidos)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (nome_item, provedor, foto, preco_varejo, preco_atacado, estoque, vendidos),
        )
        self.conn.commit()
        return cursor.rowcount > 0

    def update_item(
        self,
        nome_item: str,
        foto: str,
        preco_varejo: float,
        preco_atacado: float,
        estoque: int,
    ) -> bool:
        """UPDATE - Atualiza os dados de um item (usando nome_item como PK)."""
        cursor = self.conn.execute(
            """
            UPDATE item
            SET foto = ?, preco_varejo = ?, preco_atacado = ?, estoque = ?
            WHERE nome_item = ?
            """,
            (foto, preco_varejo, preco_atacado, estoque, nome_item),
        )
        self.conn.commit()
        return cursor.rowcount > 0

    def delete_item(self, nome_item: str) -> bool:
        """DELETE - Remove um item do catálogo."""
        cursor = self.conn.execute(
            "DELETE FROM item WHERE nome_item = ?", (nome_item,)
        )
        self.conn.commit()
        return cursor.rowcount > 0

    # =========================================================================
    # PAINEL DO ADMINISTRADOR (CRUD de Provedor / Vendedor)
    # =========================================================================

    def create_provedor(
        self,
        nome: str,
        descricao: str,
        foto_banner: str,
        telefone: str,
        local: str,
        categoria: str,
        cidade: str,
    ) -> bool:
        """CREATE - Cadastra um novo provedor/vendedor."""
        self.conn.execute(
            "INSERT OR IGNORE INTO cidade (nome) VALUES (?)", (cidade,)
        )
        cursor = self.conn.execute(
            """
            INSERT OR IGNORE INTO provedor 
            (nome, descricao, foto_banner, telefone, local, categoria, cidade)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (nome, descricao, foto_banner, telefone, local, categoria, cidade),
        )
        self.conn.commit()
        return cursor.rowcount > 0

    def update_provedor(
        self,
        nome: str,
        descricao: str,
        foto_banner: str,
        telefone: str,
        local: str,
        categoria: str,
        cidade: str,
    ) -> bool:
        """UPDATE - Atualiza dados cadastrais de um provedor/vendedor."""
        self.conn.execute(
            "INSERT OR IGNORE INTO cidade (nome) VALUES (?)", (cidade,)
        )
        cursor = self.conn.execute(
            """
            UPDATE provedor
            SET descricao = ?, foto_banner = ?, telefone = ?, local = ?, categoria = ?, cidade = ?
            WHERE nome = ?
            """,
            (descricao, foto_banner, telefone, local, categoria, cidade, nome),
        )
        self.conn.commit()
        return cursor.rowcount > 0

    def delete_provedor(self, nome: str) -> bool:
        """DELETE - Remove um provedor e seus vínculos (itens e cidades vinculadas)."""
        try:
            # 1. Remove itens vinculados a esse provedor
            self.conn.execute("DELETE FROM item WHERE provedor = ?", (nome,))

            # 2. Remove relacionamentos nas tabelas associativas
            self.conn.execute(
                "DELETE FROM item_provedor WHERE nome_provedor = ?", (nome,)
            )
            self.conn.execute(
                "DELETE FROM cidade_provedor WHERE nome_provedor = ?", (nome,)
            )

            # 3. Remove o provedor
            cursor = self.conn.execute(
                "DELETE FROM provedor WHERE nome = ?", (nome,)
            )
            self.conn.commit()
            return cursor.rowcount > 0
        except Exception as e:
            print(f"Erro ao deletar provedor: {e}")
            self.conn.rollback()
            return False

    # =========================================================================
    # CARRINHO (Atualização em Lote / Loop de Vendas)
    # =========================================================================

    def processar_vendas_carrinho(self, itens_carrinho: list[dict]) -> bool:
        """
        Executa o loop do carrinho vindo de cookies/sessão.
        Incrementa 'vendidos' e decrementa 'estoque' para cada item.

        Estrutura esperada:
        [
            {"nome_item": "Camisa Azul", "quantidade": 2},
            {"nome_item": "Caneca", "quantidade": 1}
        ]
        """
        try:
            for item in itens_carrinho:
                self.conn.execute(
                    """
                    UPDATE item
                    SET vendidos = vendidos + ?,
                        estoque = estoque - ?
                    WHERE nome_item = ?
                    """,
                    (item["quantidade"], item["quantidade"], item["nome_item"]),
                )
            self.conn.commit()
            return True
        except Exception as e:
            print(f"Erro ao processar itens do carrinho: {e}")
            self.conn.rollback()
            return False

    def clear_database(self) -> bool:
        """Limpa todos os dados das tabelas mantendo a estrutura do banco."""
        try:
            # Desativa temporariamente checagens de FK para truncar tabelas sem conflitos de ordem
            self.conn.execute("PRAGMA foreign_keys = OFF;")
            
            tabelas = [
                "item_provedor",
                "cidade_provedor",
                "vendas",
                "item",
                "provedor",
                "cidade",
            ]
            
            for tabela in tabelas:
                self.conn.execute(f"DELETE FROM {tabela};")
                # Reseta o autoincrement do SQLite se existir
                self.conn.execute(
                    "DELETE FROM sqlite_sequence WHERE name = ?;", (tabela,)
                )
            
            self.conn.commit()
            self.conn.execute("PRAGMA foreign_keys = ON;")
            return True
        except Exception as e:
            print(f"Erro ao limpar banco de dados: {e}")
            self.conn.rollback()
            self.conn.execute("PRAGMA foreign_keys = ON;")
            return False
