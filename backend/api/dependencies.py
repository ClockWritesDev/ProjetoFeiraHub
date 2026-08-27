import sqlite3
from typing import Generator
from db.query import QueryDB
from db.write import WriteDB

DB_NAME = "feira_hub.db"


def get_query_db() -> Generator[QueryDB, None, None]:
    """Injeta uma instância de QueryDB com conexão dedicada e row_factory configurado."""
    conn = sqlite3.connect(DB_NAME, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    
    query_instance = QueryDB(DB_NAME)
    query_instance.conn = conn
    try:
        yield query_instance
    finally:
        conn.close()


def get_write_db() -> Generator[WriteDB, None, None]:
    """Injeta uma instância de WriteDB com conexão dedicada e commit/rollback gerenciados."""
    conn = sqlite3.connect(DB_NAME, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    
    write_instance = WriteDB(DB_NAME)
    write_instance.conn = conn
    try:
        yield write_instance
    finally:
        conn.close()
