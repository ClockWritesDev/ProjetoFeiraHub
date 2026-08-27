import { Plus, ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Product } from "@/types";
import HotNotification from "./HotNotification";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
  onOpenDetails?: (product: Product) => void;
}

function PriceTag({ label, price, isMain = false }: { label: "Varejo" | "Atacado"; price: string; isMain?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-1">
      <span
        className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
          label === "Varejo"
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {label}
      </span>
      <span
        className={
          isMain
            ? "text-xs sm:text-sm font-bold tracking-tight text-foreground"
            : "text-[11px] font-semibold text-muted-foreground"
        }
      >
        {price}
      </span>
    </div>
  );
}

export default function ProductCard({ product, onAdd, onOpenDetails }: ProductCardProps) {
  return (
    <Card
      onClick={() => onOpenDetails?.(product)}
      className="group relative flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg cursor-pointer select-none"
    >
      {/*Notificação de recomendação*/}
      {
        product.hot ? <HotNotification/> : <></>
      }
      {/* Imagem do Produto */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/40">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-muted/60 p-3 text-center">
            <ImageOff className="h-6 w-6 text-muted-foreground/40" />
          </div>
        )}

        {/* Botão + (Adiciona direto ao carrinho) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.(product);
          }}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Título e Bloco de Preços */}
      <div className="flex flex-1 flex-col justify-between pt-3 space-y-2">
        <h3 className="text-xs sm:text-sm font-medium tracking-tight text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="space-y-1 border-t border-border/40 pt-2">
          <PriceTag label="Varejo" price={product.retail} isMain />
          {product.wholesale && (
            <PriceTag label="Atacado" price={product.wholesale} />
          )}
        </div>
      </div>
    </Card>
  );
}
