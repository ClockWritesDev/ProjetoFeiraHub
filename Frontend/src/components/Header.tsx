import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Sprout, LogIn, MapPin, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SearchTab } from "@/types";

const TABS: SearchTab[] = ["Produtos", "Vendedores", "Serviços"];

interface HeaderProps {
  cartCount?: number;
  onToggleCart?: () => void;
  onLogin?: () => void;
  onLogoClick?: () => void;
  onGoToCatalog?: () => void;
  onSearchSubmit?: (query: string, tab: SearchTab) => void;
  cityName?: string;
  logoSrc?: string;
  hideCart?: boolean;
}

export default function Header({
  cartCount = 0,
  onToggleCart,
  onLogin,
  onLogoClick,
  onGoToCatalog,
  onSearchSubmit,
  cityName = "Iguatu",
  logoSrc,
  hideCart = false,
}: HeaderProps) {
  // Estados isolados internamente
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTab>("Produtos");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha o menu de abas ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    onSearchSubmit?.(searchQuery.trim(), activeTab);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
        
        {/* LOGO */}
        <div
          onClick={onLogoClick}
          className="group flex shrink-0 cursor-pointer select-none items-center gap-2.5 transition-opacity hover:opacity-90"
          title="Ir para o início"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 overflow-hidden">
            {logoSrc ? (
              <img src={logoSrc} alt="Feira Hub Logo" className="h-6 w-6 object-contain" />
            ) : (
              <Sprout className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
            )}
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-primary sm:text-lg">
              Feira Hub
            </span>
            <span className="flex items-center gap-0.5 text-[11px] font-medium text-muted-foreground">
              <MapPin className="h-3 w-3 text-primary/80" />
              {cityName}
            </span>
          </div>
        </div>

        {/* BARRA DE PESQUISA ISOLADA */}
        <div ref={containerRef} className="relative flex-1 max-w-md">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Buscar em ${activeTab.toLowerCase()}...`}
              onFocus={() => setIsOpen(true)}
              className="h-9 w-full rounded-lg bg-muted/50 pl-9 pr-20 text-xs sm:text-sm border-border/80 focus-visible:bg-background"
            />

            <Button
              type="submit"
              size="sm"
              className="absolute right-1 h-7 px-2.5 text-xs font-semibold rounded-md gap-1 cursor-pointer"
            >
              <Search className="h-3 w-3" />
              <span className="hidden sm:inline">Buscar</span>
            </Button>
          </form>

          {/* Abas de Seleção Local */}
          {isOpen && (
            <div className="absolute top-11 left-0 right-0 z-50 flex gap-1 rounded-xl border border-border bg-card p-1.5 shadow-lg animate-in fade-in-50 duration-150">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                  }}
                  className={cn(
                    "flex-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer text-center select-none",
                    activeTab === tab
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* GRUPO DE AÇÕES */}
        <div className="flex shrink-0 items-center gap-2">
          {onGoToCatalog && (
            <Button
              variant="outline"
              size="sm"
              onClick={onGoToCatalog}
              className="h-9 gap-1.5 px-3 text-xs font-medium sm:text-sm cursor-pointer hover:bg-accent hover:text-foreground"
            >
              <Store className="h-4 w-4 text-primary" />
              <span className="inline">Catálogo</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onLogin}
            className="h-9 gap-1.5 px-3 text-xs font-medium sm:text-sm cursor-pointer hover:bg-accent hover:text-foreground"
          >
            <LogIn className="h-4 w-4 text-primary" />
            <span className="inline">Entrar</span>
          </Button>

          {!hideCart && (
            <button
              type="button"
              onClick={onToggleCart}
              className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent transition-colors cursor-pointer"
              aria-label="Abrir carrinho"
            >
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
