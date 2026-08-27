import { useState } from "react";
import { X, ImageOff, Plus, Minus, ShoppingBag, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Product } from "@/types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigateSeller?: (sellerName: string) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onNavigateSeller,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const defaultDescription =
    product.description ||
    "Produto artesanal e de alta qualidade selecionado diretamente dos produtores e comerciantes locais de Iguatu. Frescor, procedência garantida e o melhor preço da região.";

  const seller = product.sellerName || "Feirante / Comércio Local";

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <Card className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border-border bg-card p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Botão Fechar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-start">
          
          {/* Imagem do Produto (Lado Esquerdo) */}
          <div className="md:col-span-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-muted/40 border border-border/60">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <ImageOff className="h-10 w-10 mb-2 opacity-40" />
                <span className="text-xs font-semibold">{product.badge || "Sem Imagem"}</span>
              </div>
            )}
          </div>

          {/* Dados, Preços e Ações (Lado Direito) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              <span className="rounded bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase">
                {product.type === "servico" ? "Serviço" : "Produto"}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1.5 leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Preços e Seletor de Quantidade */}
            <div className="flex items-center justify-between border-y border-border/60 py-3.5">
              <div className="space-y-0.5">
                <p className="text-sm sm:text-base font-bold text-foreground">
                  {product.retail} <span className="text-xs font-normal text-muted-foreground">- Varejo</span>
                </p>
                {product.wholesale && (
                  <p className="text-xs sm:text-sm font-semibold text-primary">
                    {product.wholesale} <span className="text-xs font-normal text-muted-foreground">- Atacado</span>
                  </p>
                )}
              </div>

              {/* Seletor Qtd */}
              {product.type !== "servico" && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Qtd</span>
                  <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-background text-foreground transition-colors cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-background text-foreground transition-colors cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Botão de Adicionar ao Carrinho */}
            <Button
              onClick={handleAdd}
              className="w-full h-12 gap-2 text-sm font-semibold shadow-md cursor-pointer rounded-xl"
            >
              <ShoppingBag className="h-4 w-4" />
              Adicionar ao Carrinho
            </Button>

            {/* Descrição */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Descrição
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {defaultDescription}
              </p>
            </div>

            {/* Identificação do Vendedor */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-border/40 text-xs font-medium text-foreground">
              <Store className="h-4 w-4 text-primary" />
              <span>Vendedor: </span>
              <button
                type="button"
                onClick={() => onNavigateSeller?.(seller)}
                className="font-bold text-primary hover:underline cursor-pointer"
              >
                {seller}
              </button>
            </div>

          </div>
        </div>

      </Card>
    </div>
  );
}
