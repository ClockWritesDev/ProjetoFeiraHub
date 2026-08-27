import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

interface ProductSectionProps {
  title: string;
  items: Product[];
  wrap?: boolean;
  onAdd?: (product: Product) => void;
}

export default function ProductSection({ title, items, wrap = false, onAdd }: ProductSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-6">
      <h2 className="mb-4 text-xl font-bold text-feira-green">{title}</h2>

      {wrap ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {items.map((p, i) => (
            <ProductCard key={`${p.id}-${i}`} product={p} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  );
}
