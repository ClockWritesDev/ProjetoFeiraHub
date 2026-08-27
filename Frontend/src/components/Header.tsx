import { Search, User, ShoppingCart, Sprout } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SearchTab } from "@/types";

const TABS: SearchTab[] = ["Produtos", "Vendedores", "Serviços"];

interface HeaderProps {
  searchFocused: boolean;
  onFocusSearch: () => void;
  activeTab: SearchTab;
  onChangeTab: (tab: SearchTab) => void;
  cartCount: number;
  onToggleCart: () => void;
}

export default function Header({
  searchFocused,
  onFocusSearch,
  activeTab,
  onChangeTab,
  cartCount,
  onToggleCart,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-4 py-3">
        {/* logo */}
        <a href="#" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-feira-green text-feira-green">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold text-feira-orange">Feira Hub</span>
        </a>

        {/* busca */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative">
            <Input
              placeholder="Pesquisar"
              onFocus={onFocusSearch}
              className="h-11 rounded-md pr-11"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>

          {searchFocused && (
            <div className="absolute left-0 right-0 top-full z-40 mt-2 flex justify-center gap-2 rounded-md bg-background p-1 shadow-lg ring-1 ring-border">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onChangeTab(tab)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    activeTab === tab
                      ? "bg-feira-green text-white"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ícones */}
        <div className="flex shrink-0 items-center gap-4">
          <button className="rounded-md p-1.5 text-foreground hover:bg-accent" aria-label="Conta">
            <User className="h-6 w-6" />
          </button>
          <button
            onClick={onToggleCart}
            className="relative rounded-md p-1.5 text-foreground hover:bg-accent"
            aria-label="Carrinho"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-feira-orange text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
