import { useState } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import ProductModal from "@/components/ProductModal";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { vendedoresDestaque } from "@/data/vendedores";
import { mockProducts, cartItems as initialCartItems } from "@/data/products";
import { Store, ShoppingBag, Wrench } from "lucide-react";
import type { BannerItem, CartItem, Product, SearchTab } from "@/types";

interface HomeClienteProps {
  onNavigate?: (page: string, data?: any) => void;
}

export default function HomeCliente({ onNavigate }: HomeClienteProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [form, setForm] = useState({ name: "", address: "" });

  const handleAddToCart = (product: Product, quantity = 1) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      name: `${product.name}${quantity > 1 ? ` (${quantity}x)` : ""}`,
      price: product.retail.split(" - ")[0],
      category: product.type === "servico" ? "Serviço" : "Varejo",
      image: product.image,
      quantity,
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

  const handleBannerClick = (vendedor: BannerItem) => {
    onNavigate?.("profile_provedor", vendedor.id);
  };

  const handleSearchSubmit = (query: string, tab: SearchTab) => {
    if (tab === "Vendedores") {
      onNavigate?.("results_provedor", query);
    } else {
      onNavigate?.("results_itens", query);
    }
  };

  const produtosList = mockProducts.filter((item) => item.type !== "servico");
  const servicosList = mockProducts.filter((item) => item.type === "servico");

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header
        cityName="Iguatu"
        cartCount={items.length}
        onToggleCart={() => setCartOpen((v) => !v)}
        onLogoClick={() => onNavigate?.("inicial")}
        onLogin={() => onNavigate?.("login")}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="mx-auto flex-1 w-full max-w-6xl py-6 space-y-12">
        <section className="w-full space-y-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-3 select-none">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Store className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    Vendedores e Prestadores
                  </h2>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    Conheça os feirantes, produtores e profissionais da sua cidade
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Banner
            items={vendedoresDestaque}
            autoPlay={true}
            interval={5000}
            onItemClick={handleBannerClick}
          />
        </section>

        {/* PRODUTOS */}
        <ProductSection
          title="Produtos"
          subtitle="Itens frescos, alimentos, artesanato e comércio local"
          icon={<ShoppingBag className="h-5 w-5" />}
          items={produtosList}
          onAdd={handleAddToCart}
          onOpenDetails={(product) => setSelectedProduct(product)}
          defaultCollapsed={false}
          initialLimit={10}
        />

        {/* SERVIÇOS */}
        <ProductSection
          title="Serviços"
          subtitle="Profissionais autônomos, reparos, estética e projetos digitais"
          icon={<Wrench className="h-5 w-5" />}
          items={servicosList}
          onAdd={handleAddToCart}
          onOpenDetails={(product) => setSelectedProduct(product)}
          defaultCollapsed={false}
          initialLimit={10}
        />
      </main>

      <Footer onNavigate={onNavigate} />

      {/* Modal de Detalhes do Produto */}
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

      {/* Drawer do Carrinho */}
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
