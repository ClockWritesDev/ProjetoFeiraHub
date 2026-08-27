import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vendedoresDestaque } from "@/data/vendedores";
import { 
  MapPin, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  SearchX 
} from "lucide-react";
import type { SearchTab } from "@/types";

interface ResultsProvedorProps {
  searchQuery?: string;
  onNavigate: (page: string, data?: any) => void;
}

export default function ResultsProvedor({
  searchQuery = "",
  onNavigate,
}: ResultsProvedorProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchTab>("Vendedores");

  const handleTabChange = (tab: SearchTab) => {
    setActiveTab(tab);
    if (tab === "Vendedores") {
      onNavigate("results_provedor", searchQuery);
    } else {
      onNavigate("results_itens", searchQuery);
    }
  };

  const handleSearchSubmit = (query: string, tab: SearchTab) => {
    if (tab === "Vendedores") {
      onNavigate("results_provedor", query);
    } else {
      onNavigate("results_itens", query);
    }
  };

  const resultados = vendedoresDestaque.filter((vendedor) => {
    const q = searchQuery.toLowerCase();
    return (
      vendedor.storeName.toLowerCase().includes(q) ||
      vendedor.description.toLowerCase().includes(q) ||
      (vendedor.category && vendedor.category.toLowerCase().includes(q))
    );
  });

  return (
    <div
      className="flex min-h-screen flex-col text-foreground"
      onClick={() => searchFocused && setSearchFocused(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Header
          searchFocused={searchFocused}
          onFocusSearch={() => setSearchFocused(true)}
          activeTab={activeTab}
          onChangeTab={handleTabChange}
          onGoToCatalog={() => onNavigate("home_cliente")}
          onLogoClick={() => onNavigate("inicial")}
          onLogin={() => onNavigate("login")}
          onSearchSubmit={handleSearchSubmit}
        />
      </div>

      <main className="mx-auto flex-1 w-full max-w-5xl px-4 py-6 sm:px-6 space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("home_cliente")}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground -ml-2 mb-1 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Início
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Vendedores e Prestadores
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {searchQuery
                ? `Resultados para "${searchQuery}" (${resultados.length} encontrados)`
                : `Exibindo todos os ${resultados.length} parceiros locais`}
            </p>
          </div>
        </div>

        {resultados.length === 0 ? (
          <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-border p-6 text-center text-muted-foreground space-y-3">
            <SearchX className="h-10 w-10 opacity-40" />
            <div>
              <p className="text-base font-semibold text-foreground">Nenhum provedor encontrado</p>
              <p className="text-xs">Tente pesquisar com outros termos ou selecione a aba Produtos/Serviços.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("home_cliente")}
              className="cursor-pointer"
            >
              Ver Catálogo Completo
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {resultados.map((vendedor) => (
              <Card
                key={vendedor.id}
                onClick={() => onNavigate("profile_provedor", vendedor.id)}
                className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 border-border/80 transition-all hover:border-primary/40 hover:shadow-md cursor-pointer select-none"
              >
                <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/60">
                    <img
                      src={vendedor.image}
                      alt={vendedor.storeName}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase">
                        {vendedor.category || "Parceiro"}
                      </span>
                      <span className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-primary">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verificado
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {vendedor.storeName}
                    </h2>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {vendedor.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-primary" />
                        {vendedor.city || "Iguatu - CE"}
                      </span>
                      {vendedor.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-primary" />
                          {vendedor.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                  <Button
                    size="sm"
                    className="w-full sm:w-auto gap-1.5 font-semibold text-xs cursor-pointer shadow-xs"
                  >
                    <span>Ver Perfil</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
