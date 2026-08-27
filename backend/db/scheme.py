import sqlite3


class DB:
    def __init__(self, db_name="feira_hub.db"):
        self.conn = sqlite3.connect(db_name)
        self.conn.execute("PRAGMA foreign_keys = ON;")
        # Habilita o suporte a chaves estrangeiras no SQLite
        self.conn.execute("PRAGMA foreign_keys = ON;")
        self.create_table()

    def create_table(self):
        schema = """
            -- Tabela Cidade
            CREATE TABLE IF NOT EXISTS cidade (
                nome TEXT PRIMARY KEY
            );

            -- Tabela Provedor
            CREATE TABLE IF NOT EXISTS provedor (
                nome TEXT PRIMARY KEY,
                descricao TEXT,
                foto_banner TEXT,
                telefone TEXT,
                local TEXT,
                categoria TEXT CHECK (categoria IN ('vendedor', 'prestador de serviço')),
                cidade TEXT,
                FOREIGN KEY (cidade) REFERENCES cidade (nome)
            );

            -- Tabela Cidade-Provedor (relação N:N)
            CREATE TABLE IF NOT EXISTS cidade_provedor (
                nome_cidade TEXT,
                nome_provedor TEXT,
                PRIMARY KEY (nome_cidade, nome_provedor),
                FOREIGN KEY (nome_cidade) REFERENCES cidade (nome),
                FOREIGN KEY (nome_provedor) REFERENCES provedor (nome)
            );

            -- Tabela Item
            CREATE TABLE IF NOT EXISTS item (
                nome_item TEXT PRIMARY KEY,
                provedor TEXT,
                foto TEXT,
                preco_varejo REAL,
                preco_atacado REAL,
                estoque INTEGER DEFAULT 0,
                vendidos INTEGER DEFAULT 0,
                FOREIGN KEY (provedor) REFERENCES provedor (nome)
            );

            -- Tabela Item-Provedor (relação N:N)
            CREATE TABLE IF NOT EXISTS item_provedor (
                nome_item TEXT,
                nome_provedor TEXT,
                PRIMARY KEY (nome_item, nome_provedor),
                FOREIGN KEY (nome_item) REFERENCES item (nome_item),
                FOREIGN KEY (nome_provedor) REFERENCES provedor (nome)
            );

            -- Tabela Vendas
            CREATE TABLE IF NOT EXISTS vendas (
                id_venda INTEGER PRIMARY KEY AUTOINCREMENT,
                provedor TEXT,
                valor_total REAL,
                FOREIGN KEY (provedor) REFERENCES provedor (nome)
            );

            -- Tabela Item-Venda
            CREATE TABLE IF NOT EXISTS item_venda (
                id_venda INTEGER,
                nome_item TEXT,
                quantidade INTEGER,
                tipo_preco TEXT CHECK (tipo_preco IN ('varejo', 'atacado')),
                PRIMARY KEY (id_venda, nome_item),
                FOREIGN KEY (id_venda) REFERENCES vendas (id_venda),
                FOREIGN KEY (nome_item) REFERENCES item (nome_item)
            );
        """

        self.conn.executescript(schema)
        self.conn.commit()
