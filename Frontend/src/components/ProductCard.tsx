import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <Card
      onClick={() => onAdd?.(product)}
      className="relative w-[150px] shrink-0 cursor-pointer overflow-hidden p-0 transition-transform hover:-translate-y-0.5 hover:shadow-md sm:w-[170px]"
    >
      {product.hot && (
        <span className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-feira-orange shadow">
          <Flame className="h-3 w-3 fill-feira-orange text-feira-orange" />
          Quente
        </span>
      )}

      <div className="flex h-[150px] w-full items-center justify-center overflow-hidden bg-muted sm:h-[170px]">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-purple-900 to-red-600 p-3 text-center">
            <span className="text-[11px] font-bold leading-tight text-white">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-0.5 p-2">
        <p className="line-clamp-2 text-xs font-medium leading-tight text-foreground">
          {product.name}
        </p>
        <p className="text-xs text-foreground">{product.retail}</p>
        <p className="text-xs font-semibold text-feira-green">{product.wholesale}</p>
      </div>
    </Card>
  );
}
