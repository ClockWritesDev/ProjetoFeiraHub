import { cn } from "@/lib/utils";

export default function Banner() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.4fr_1fr]">
        {/* banner promocional lava-jato */}
        <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 sm:h-72">
          <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-5">
            <h3 className="text-2xl font-extrabold leading-tight text-white drop-shadow">
              O LAVA JATO MAIS COMPLETO DE SALVADOR!
            </h3>
            <div className="flex gap-2">
              <span className="rounded-full bg-sky-300/90 px-3 py-1 text-xs font-semibold text-sky-950">
                LAVAGEM
              </span>
              <span className="rounded-full bg-sky-300/90 px-3 py-1 text-xs font-semibold text-sky-950">
                POLIMENTO
              </span>
            </div>
          </div>
        </div>

        {/* banner artesã */}
        <div className="h-64 overflow-hidden rounded-2xl sm:h-72">
          <img
            src="https://images.unsplash.com/photo-1556760544-74068565f05c?w=900&q=80"
            alt="Artesã trabalhando"
            className="h-full w-full object-cover"
          />
        </div>

        {/* banner moda */}
        <div className="hidden h-72 overflow-hidden rounded-2xl bg-gradient-to-l from-white to-transparent sm:block">
          <img
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&q=80"
            alt="Vitrine de roupas"
            className="h-full w-full object-cover opacity-90"
          />
        </div>
      </div>

      {/* indicadores */}
      <div className="mt-4 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              i === 0 ? "bg-feira-orange" : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </section>
  );
}
