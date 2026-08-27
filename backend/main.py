import sys
from pathlib import Path
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import use_cases.test_db
from api.routes import busca, carrinho, feed, itens, provedores

DB_PATH = "feira_hub.db"

# =============================================================================
# INICIALIZAÇÃO DA API (FastAPI)
# =============================================================================

app = FastAPI(
    title="Feira Hub API",
    description="Backend para catálogo de produtos e provedores consumido por frontend React.",
    version="1.0.0",
)

# Configuração de CORS para permitir requisições do React (Vite, Next, CRA, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, substitua pelo domínio do frontend React (ex: "http://localhost:5173")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusão de todos os roteadores
app.include_router(feed.router)
app.include_router(busca.router)
app.include_router(itens.router)
app.include_router(provedores.router)
app.include_router(carrinho.router)


@app.get("/", tags=["Health Check"])
def root():
    return {"status": "online", "message": "Feira Hub API operacional"}


# =============================================================================
# CONTROLE DE EXECUÇÃO VIA TERMINAL (CLI)
# =============================================================================


def invalid_argument():
    script_name = Path(sys.argv[0]).name
    print(f"Usage: python {script_name} <argument>")
    print("      database         Test database functionality via terminal")
    print("      api              Start the FastAPI Uvicorn server")
    sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) == 1:
        invalid_argument()

    first_argument = sys.argv[1].lower()

    if first_argument == "database":
        use_cases.test_db.run_test_db_menu(DB_PATH)
    elif first_argument == "api":
        print("Iniciando servidor FastAPI em http://127.0.0.1:8000 ...")
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    else:
        print(f"Invalid option: '{first_argument}'\n")
        invalid_argument()
