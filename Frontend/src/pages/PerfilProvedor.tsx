import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vendedoresDestaque } from "@/data/vendedores";
import ProductModal from "@/components/ProductModal";

import { 
  ArrowLeft, 
  Store, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  PackageSearch, 
  Loader2
} from "lucide-react";
import type { BannerItem, CartItem, CustomerForm, Product } from "@/types";
import { getTodosProvedores } from "@/api";

interface PerfilProvedorProps {
  provedorId?: string | number | null;
  onNavigate: (page: string) => void;
  cartItems?: CartItem[];
  onUpdateCart?: (items: CartItem[]) => void;
}

export default function PerfilProvedor({
  provedorId,
  onNavigate,
  cartItems: initialCartItems = [],
  onUpdateCart,
}: PerfilProvedorProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [form, setForm] = useState<CustomerForm>({ name: "", address: "" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [provedor, setProvedor] = useState<BannerItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const provedores = await getTodosProvedores();
        const foundProvedor = provedores.find((v) => String(v.id) === String(provedorId));
        setProvedor(foundProvedor || provedores[0] || null);
      } catch (err) {
        setError("Erro ao carregar resultados");
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [provedorId]);

  const handleAddToCart = (product: Product) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.retail.split(" - ")[0],
      category: product.type === "servico" ? "Serviço" : "Varejo",
      image: product.image || "",
    };
    
    const updated = [...items, newItem];
    setItems(updated);
    onUpdateCart?.(updated);
    setCartOpen(true);
  };

  const handleRemove = (id: CartItem["id"]) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    onUpdateCart?.(updated);
  };

  const handleConfirm = () => {
    alert(`Pedido confirmado para ${form.name || "cliente"}!`);
    setCartOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando perfil do provedor...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !provedor) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <div className="text-center space-y-3">
          <PackageSearch className="h-12 w-12 text-muted-foreground mx-auto" />
          <h1 className="text-xl font-bold">Provedor não encontrado</h1>
          <p className="text-sm text-muted-foreground">
            {error || "Não foi possível carregar os dados deste provedor."}
          </p>
          <Button 
            onClick={() => onNavigate("home_cliente")}
            className="mt-2"
          >
            Voltar ao Catálogo
          </Button>
        </div>
      </div>
    );
  }

  // Now TypeScript knows 'provedor' is not null
  const whatsappLink = provedor.phone
    ? `https://wa.me/55${provedor.phone.replace(/\D/g, "")}?text=Olá,%20vi%20seu%20perfil%20no%20FeiraHub!`
    : undefined;

  return (
    <div className="flex min-h-screen flex-col text-foreground">
      {/* Header com contagem e acionamento do Carrinho */}
      <Header
        onLogoClick={() => onNavigate("inicial")}
        onGoToCatalog={() => onNavigate("home_cliente")}
        onLogin={() => onNavigate("login")}
        cartCount={items.length}
        onToggleCart={() => setCartOpen((prev) => !prev)}
      />

      <main className="mx-auto flex-1 w-full max-w-5xl px-4 py-6 sm:px-6 space-y-8">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("home_cliente")}
            className="gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Catálogo
          </Button>
        </div>

        {/* Card do Provedor */}
        <Card className="relative overflow-hidden border-border/80 p-0 shadow-md">
          <div className="relative h-48 sm:h-64 w-full bg-muted overflow-hidden">
            {provedor.image ? (
              <img
                src={provedor.image}
                alt={provedor.storeName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Store className="h-12 w-12 text-muted-foreground/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground mb-1.5 shadow-sm">
                {provedor.category || "Provedor Parceiro"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm">
                {provedor.storeName}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {provedor.city || "Iguatu - CE"}
                </span>

                {provedor.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-primary" />
                    {provedor.phone}
                  </span>
                )}

                <span className="flex items-center gap-1 text-primary font-semibold">
                  <CheckCircle2 className="h-4 w-4" />
                  Verificado FeiraHub
                </span>
              </div>

              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Conversar no WhatsApp
                </a>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Sobre o Estabelecimento
              </h2>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                {provedor.longDescription || provedor.description || "Sem descrição disponível."}
              </p>
            </div>
          </div>
        </Card>

        {/* Vitrine de Itens */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                Itens e Serviços Disponíveis
              </h2>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {provedor.items?.length || 0} itens
            </span>
          </div>

          {!provedor.items || provedor.items.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-border p-6 text-center text-muted-foreground">
              <PackageSearch className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm font-medium">Nenhum item listado para este provedor no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
              {provedor.items.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAdd={handleAddToCart}
                  onOpenDetails={(product) => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </section>
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
      
      {/* Gaveta do Carrinho */}
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
