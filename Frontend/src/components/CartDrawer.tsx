import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CartItem, CustomerForm } from "@/types";
import type { Dispatch, SetStateAction } from "react";

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onRemove: (id: CartItem["id"]) => void;
  onClose: () => void;
  onConfirm: () => void;
  form: CustomerForm;
  setForm: Dispatch<SetStateAction<CustomerForm>>;
}

export default function CartDrawer({
  open,
  items,
  onRemove,
  onClose,
  onConfirm,
  form,
  setForm,
}: CartDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} aria-hidden="true" />

      {/* painel */}
      <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl sm:max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Seu carrinho</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-accent" aria-label="Fechar carrinho">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* itens */}
        <div className="space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">Seu carrinho está vazio.</p>
          )}

          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md ${
                  item.accent ? "bg-gradient-to-br from-red-600 to-red-700" : "bg-muted"
                }`}
              >
                {item.image && (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.price} - {item.category}
                </p>
              </div>

              <button
                onClick={() => onRemove(item.id)}
                className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Remover item"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* formulário */}
        <div className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Nome</label>
            <Input
              placeholder="Seu nome"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Endereço (opcional)</label>
            <Input
              placeholder="Endereço"
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            />
          </div>

          <Button
            onClick={onConfirm}
            className="mt-2 h-11 w-full bg-feira-green-dark text-white hover:bg-feira-green-dark/90"
          >
            Confirmar compras
          </Button>
        </div>
      </aside>
    </>
  );
}
