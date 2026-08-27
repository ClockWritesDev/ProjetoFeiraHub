import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BannerItem } from "@/types";

interface BannerProps {
  items: BannerItem[];
  autoPlay?: boolean;
  interval?: number;
  onItemClick?: (item: BannerItem) => void;
}

export default function Banner({
  items,
  autoPlay = true,
  interval = 5000,
  onItemClick,
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = items.length;

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, total, interval]);

  if (!items || total === 0) return null;

  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % total);

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const visibleCards = [
    { item: items[prevIndex], position: "left" },
    { item: items[currentIndex], position: "center" },
    { item: items[nextIndex], position: "right" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[1200px] px-4 select-none">
      <div className="relative flex items-center justify-center gap-3 overflow-hidden py-2 sm:gap-4">
        {visibleCards.map(({ item, position }) => {
          const isCenter = position === "center";

          return (
            <div
              key={`${item.id}-${position}`}
              onClick={() => {
                if (isCenter) {
                  onItemClick?.(item);
                } else if (position === "left") {
                  prevSlide();
                } else {
                  nextSlide();
                }
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl shadow-md transition-all duration-500 ease-out cursor-pointer",
                isCenter &&
                  "z-20 w-full sm:w-[50%] h-64 sm:h-80 scale-100 opacity-100 shadow-xl ring-1 ring-border/50",
                !isCenter &&
                  "hidden sm:block z-10 sm:w-[25%] h-56 sm:h-72 scale-95 opacity-65 hover:opacity-90 hover:scale-[0.97]"
              )}
            >
              {/* Imagem do Vendedor */}
              <img
                src={item.image}
                alt={item.storeName}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Sombra Inferior (para o nome da loja) */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Sombra Superior e Bloco de Descrição */}
              {isCenter && item.description && (
                <>
                  {/* Camada escura de proteção sob o texto */}
                  <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none" />

                  <div className="absolute inset-x-0 top-0 z-10 p-5">
                    <p className="text-base font-medium text-white sm:text-xl leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-2 max-w-[92%]">
                      {item.description}
                    </p>
                  </div>
                </>
              )}

              {/* Nome da Loja fixado no canto inferior esquerdo */}
              <div className="absolute bottom-3.5 left-3.5 z-30 flex items-center gap-1.5 rounded-lg bg-black/70 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white border border-white/10 shadow-md transition-colors group-hover:bg-primary group-hover:border-primary">
                <Store className="h-3.5 w-3.5 text-white/90" />
                <span className="truncate max-w-[150px] sm:max-w-[200px]">
                  {item.storeName}
                </span>
              </div>
            </div>
          );
        })}

        {/* Seta Anterior */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="absolute left-6 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur transition-transform hover:scale-110 hover:bg-background active:scale-95 cursor-pointer border border-border"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Seta Próximo */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Próximo slide"
          className="absolute right-6 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur transition-transform hover:scale-110 hover:bg-background active:scale-95 cursor-pointer border border-border"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Indicadores de Paginação */}
      <div className="mt-3 flex justify-center items-center gap-1.5">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir para slide ${idx + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer",
              currentIndex === idx
                ? "w-6 bg-amarelo"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}
