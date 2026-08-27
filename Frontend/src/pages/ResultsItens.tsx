import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockProducts, cartItems as initialCartItems } from "@/data/products";
import { 
  Plus, 
  ArrowLeft, 
  SearchX, 
  ImageOff 
} from "lucide-react";
import type { CartItem, CustomerForm, Product, SearchTab } from "@/types";
import ProductModal from "@/components/ProductModal";
import { getBuscarItens } from "@/api";

interface ResultsItensProps {
  searchQuery?: string;
  onNavigate: (page: string, data?: any) => void;
}

export default function ResultsItens({
  searchQuery = "",
  onNavigate,
}: ResultsItensProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchTab>("Produtos");
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [form, setForm] = useState<CustomerForm>({ name: "", address: "" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [resultados, setResultados] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vendedoresDestaque, setVendedoresDestaque] = useState<any[]>([]);

  const handleTabChange = (tab: SearchTab) => {
    setActiveTab(tab);
    if (tab === "Vendedores") {
      onNavigate("results_provedor", query);
    } else if (tab === "Produtos") {
      onNavigate("results_itens", searchQuery);
    } else {
      onNavigate("results_services", searchQuery);
    }
  };

  const handleSearchSubmit = (query: string, tab: SearchTab) => {
    if (tab === "Vendedores") {
      onNavigate("results_provedor", query);
    } else if (tab === "Produtos") {
      onNavigate("results_itens", searchQuery);
    } else {
      onNavigate("results_services", searchQuery);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const items = await getBuscarItens(searchQuery);
        
        // Filter by search term and optionally by type (Product vs Service)
        const filteredResults = items.filter((prod) => {
          if (activeTab === "Serviços") {
            return prod.type === "servico";
          }
          if (activeTab === "Produtos") {
            return prod.type !== "servico";
          }
          return true; // Return all items
        });
        
        setResultados(filteredResults);
      } catch (err) {
        setError("Erro ao carregar resultados");
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, activeTab]);

  const handleAddToCart = (product: Product) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.retail.split(" - ")[0],
      category: product.type === "servico" ? "Serviço" : "Varejo",
      image: product.image,
    };
    setItems((prev) => [...prev, newItem]);
    setCartOpen(true);
  };

  const handleRemove = (id: CartItem["id"]) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleConfirm = () => {
    alert(`Pedido confirmado para ${form.name || "cliente"}!`);
    setCartOpen(false);
  };

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
          cartCount={items.length}
          onToggleCart={() => setCartOpen(true)}
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
              Voltar ao Catálogo
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {activeTab === "Serviços" ? "Serviços Encontrados" : "Produtos Encontrados"}
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {searchQuery
                ? `Resultados para "${searchQuery}" em ${activeTab} (${resultados.length} encontrados)`
                : `Exibindo todos os ${resultados.length} itens disponíveis`}
            </p>
          </div>
        </div>

        {resultados.length === 0 ? (
          <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-border p-6 text-center text-muted-foreground space-y-3">
            <SearchX className="h-10 w-10 opacity-40" />
            <div>
              <p className="text-base font-semibold text-foreground">Nenhum item encontrado em {activeTab}</p>
              <p className="text-xs">Tente alterar a aba de pesquisa ou buscar por outros termos.</p>
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
            {resultados.map((product) => (
              <Card
                key={product.id}
                className="group flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-border/80 transition-all hover:border-primary/40 hover:shadow-md cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="flex flex-1 items-center gap-4 w-full sm:w-auto">
                  <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-xl bg-muted/40 border border-border/60">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageOff className="h-6 w-6 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground uppercase">
                        {product.type === "servico" ? "Serviço" : "Produto"}
                      </span>
                    </div>

                    <h2 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {product.name}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 pt-0.5">
                      <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-foreground">
                        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary">
                          Varejo
                        </span>
                        <span>{product.retail}</span>
                      </div>

                      {product.wholesale && (
                        <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                          <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase">
                            Atacado
                          </span>
                          <span>{product.wholesale}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); // ← IMPEDE QUE O CLIQUE PROPAGUE PARA O CARD
                      handleAddToCart(product);
                    }}
                    size="sm"
                    className="w-full sm:w-auto gap-1.5 font-semibold text-xs cursor-pointer shadow-xs"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adicionar</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
      {/* Modal de Detalhes do Produto - ADICIONAR AQUI */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onNavigateSeller={(sellerName) => {
          setSelectedProduct(null);
          const seller = vendedoresDestaque.find((v) =>
            v.storeName.toLowerCase().includes(sellerName.toLowerCase())
          );
          if (seller) {
            onNavigate?.("profile_provedor", seller.id);
          }
        }}
      />
      <CartDrawer
        open={cartOpen}
        items={items}
        onRemove={handleRemove}
        onClose={() => setCartOpen(false)}
        onConfirm={handleConfirm}
        form={form}
        setForm={setForm}
      />
    </div>
  );
}
