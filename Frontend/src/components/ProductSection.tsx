import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import type { ReactNode } from "react";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  items: Product[];
  onAdd?: (product: Product) => void;
  onOpenDetails?: (product: Product) => void;
  defaultCollapsed?: boolean;
  initialLimit?: number;
}

export default function ProductSection({
  title,
  subtitle,
  icon,
  items,
  onAdd,
  onOpenDetails,
  defaultCollapsed = false,
  initialLimit = 10,
}: ProductSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasOverflow = items.length > initialLimit;
  const visibleItems = isExpanded ? items : items.slice(0, initialLimit);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="flex flex-1 cursor-pointer select-none items-center gap-3"
        >
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
          )}

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                {title}
              </h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                {items.length}
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 pl-2">
          {!isCollapsed && hasOverflow && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
            >
              <ChevronsUpDown className="h-3.5 w-3.5" />
              {isExpanded ? "Mostrar menos" : `Ver todos (${items.length})`}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Expandir seção" : "Colapsar seção"}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:bg-accent hover:text-foreground cursor-pointer shadow-xs",
              isCollapsed && "bg-muted text-foreground"
            )}
            title={isCollapsed ? "Expandir feed" : "Colapsar feed"}
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isCollapsed ? "grid-rows-[0fr] opacity-0 mt-0" : "grid-rows-[1fr] opacity-100 mt-4"
        )}
      >
        <div className="overflow-hidden">
          {items.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
              Nenhum item cadastrado no momento.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 pb-2">
              {visibleItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onAdd={onAdd}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </div>
          )}

          {hasOverflow && !isExpanded && !isCollapsed && (
            <div className="mt-4 flex justify-center sm:hidden">
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="w-full rounded-xl border border-border bg-card py-2 text-xs font-semibold text-muted-foreground hover:bg-accent"
              >
                Ver todos os {items.length} itens
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
