import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  UserPlus, 
  Pencil, 
  X, 
  UploadCloud, 
  CheckCircle2, 
  Store, 
  Trash2,
  AlertTriangle
} from "lucide-react";

export interface VendedorData {
  id: string | number;
  name: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  bannerName?: string;
  tipo?: "vendedor" | "servico";
  revenue: string;
  salesCount: number;
}

const INITIAL_VENDEDORES: VendedorData[] = [
  { 
    id: 1, 
    name: "Ikarius Auto Peças", 
    email: "contato@ikarius.com", 
    telefone: "(88) 99876-1234",
    cidade: "Iguatu-CE",
    tipo: "vendedor",
    revenue: "R$ 189,90", 
    salesCount: 156 
  },
  { 
    id: 2, 
    name: "Matheus Social Media", 
    email: "matheus@design.com", 
    telefone: "(88) 98822-4455",
    cidade: "Iguatu-CE",
    tipo: "servico",
    revenue: "R$ 299,00", 
    salesCount: 156 
  },
  { 
    id: 3, 
    name: "Azaí", 
    email: "pedidos@azai.com", 
    telefone: "(88) 99711-2233",
    cidade: "Iguatu-CE",
    tipo: "vendedor",
    revenue: "R$ 79,90", 
    salesCount: 210 
  },
];

interface HomeAdministrativoProps {
  onNavigate: (page: string) => void;
  // Prop opcional para integração futura com API backend
  apiBaseUrl?: string;
}

export default function HomeAdministrativo({ onNavigate, apiBaseUrl }: HomeAdministrativoProps) {
  const [vendedores, setVendedores] = useState<VendedorData[]>(INITIAL_VENDEDORES);
  
  // Controle de estado do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  // Formulário
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    cidade: "Iguatu-CE",
    bannerName: "",
    tipo: "vendedor" as "vendedor" | "servico",
  });

  const isEditing = editingId !== null;

  // Abre modal para novo cadastro
  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      cidade: "Iguatu-CE",
      bannerName: "",
      tipo: "vendedor",
    });
    setModalOpen(true);
  };

  // Abre modal preenchido para edição
  const handleOpenEdit = (vendedor: VendedorData) => {
    setEditingId(vendedor.id);
    setForm({
      nome: vendedor.name,
      email: vendedor.email || "",
      telefone: vendedor.telefone || "",
      senha: "", // Senha em branco na edição para não sobrescrever caso não alterada
      cidade: vendedor.cidade || "Iguatu-CE",
      bannerName: vendedor.bannerName || "",
      tipo: vendedor.tipo || "vendedor",
    });
    setModalOpen(true);
  };

  // Salvar (Cadastro ou Atualização com suporte a API)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email) {
      alert("Por favor, preencha ao menos Nome e E-mail.");
      return;
    }

    if (apiBaseUrl) {
      try {
        const endpoint = isEditing 
          ? `${apiBaseUrl}/provedores/${editingId}` 
          : `${apiBaseUrl}/provedores`;
        const method = isEditing ? "PUT" : "POST";

        await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } catch (err) {
        console.error("Erro ao sincronizar com API:", err);
      }
    }

    if (isEditing) {
      setVendedores((prev) =>
        prev.map((v) =>
          v.id === editingId
            ? {
                ...v,
                name: form.nome,
                email: form.email,
                telefone: form.telefone,
                cidade: form.cidade,
                bannerName: form.bannerName,
                tipo: form.tipo,
              }
            : v
        )
      );
    } else {
      const novo: VendedorData = {
        id: Date.now(),
        name: form.nome,
        email: form.email,
        telefone: form.telefone,
        cidade: form.cidade,
        bannerName: form.bannerName,
        tipo: form.tipo,
        revenue: "R$ 0,00",
        salesCount: 0,
      };
      setVendedores((prev) => [novo, ...prev]);
    }

    setModalOpen(false);
  };

  // Exclusão de Provedor
  const handleDelete = async () => {
    if (!editingId) return;

    const confirmou = window.confirm(
      `Tem certeza que deseja excluir o provedor "${form.nome}"? Essa ação não pode ser desfeita.`
    );
    if (!confirmou) return;

    if (apiBaseUrl) {
      try {
        await fetch(`${apiBaseUrl}/provedores/${editingId}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Erro ao excluir na API:", err);
      }
    }

    setVendedores((prev) => prev.filter((v) => v.id !== editingId));
    setModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <Header
        onLogoClick={() => onNavigate("inicial")}
        onGoToCatalog={() => onNavigate("home_cliente")}
        onLogin={() => onNavigate("login")}
      />

      <main className="mx-auto flex-1 w-full max-w-5xl px-4 py-8 sm:px-6 space-y-6">
        
        {/* Barra Superior */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Painel Administrativo</h1>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Gerencie os feirantes, prestadores e configurações da praça
              </p>
            </div>
          </div>

          <Button
            onClick={handleOpenCreate}
            className="gap-2 font-semibold shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <UserPlus className="h-4 w-4" />
            Cadastrar Provedor
          </Button>
        </div>

        {/* Tabela de Vendedores */}
        <Card className="p-0 overflow-hidden border-border/80 shadow-xs">
          <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between">
            <span className="font-bold text-base text-foreground flex items-center gap-2">
              <Store className="h-4 w-4 text-primary" />
              Vendedores e Provedores
            </span>
            <span className="text-xs font-semibold text-muted-foreground">
              {vendedores.length} cadastrados
            </span>
          </div>

          <div className="grid grid-cols-12 px-5 py-2.5 bg-muted/40 text-xs font-semibold text-muted-foreground border-b border-border/40">
            <span className="col-span-6 sm:col-span-5">Item / Negócio</span>
            <span className="col-span-3 sm:col-span-3">Total Arrecadado</span>
            <span className="col-span-2 sm:col-span-2 text-center">Vendas</span>
            <span className="col-span-1 sm:col-span-2 text-right">Ações</span>
          </div>

          <div className="divide-y divide-border/60">
            {vendedores.map((vendedor) => (
              <div
                key={vendedor.id}
                className="grid grid-cols-12 items-center px-5 py-4 transition-colors hover:bg-muted/20"
              >
                <div className="col-span-6 sm:col-span-5 pr-2">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {vendedor.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {vendedor.email || "Sem e-mail cadastrado"}
                  </p>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    {vendedor.revenue}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-2 text-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                    {vendedor.salesCount}
                  </span>
                </div>

                {/* Botão de Edição */}
                <div className="col-span-1 sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(vendedor)}
                    aria-label={`Editar ${vendedor.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary cursor-pointer"
                    title="Editar provedor"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* MODAL UNIFICADO: CADASTRO / EDIÇÃO */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in-50"
            onClick={() => setModalOpen(false)}
          />

          <Card className="relative z-10 w-full max-w-lg p-6 sm:p-7 shadow-2xl border-border bg-card animate-in zoom-in-95 duration-150">
            
            {/* Topo do Modal */}
            <div className="flex items-start justify-between pb-4 border-b border-border/60">
              <div className="space-y-0.5">
                <h2 className="text-lg font-bold text-foreground">
                  {isEditing ? "Editar Provedor" : "Cadastrar Provedor"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {isEditing
                    ? "Atualize as informações do feirante ou prestador"
                    : "Para feirantes, prestadores de serviços e administradores"}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSave} className="space-y-3.5 pt-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Nome</label>
                <Input
                  required
                  placeholder="Ex: Auto Peças São Francisco"
                  value={form.nome}
                  onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">E-mail</label>
                <Input
                  type="email"
                  required
                  placeholder="nome@email.com"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Telefone / WhatsApp</label>
                <Input
                  placeholder="(88) 98765-4321"
                  value={form.telefone}
                  onChange={(e) => setForm((prev) => ({ ...prev, telefone: e.target.value }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">
                  {isEditing ? "Nova Senha (deixe vazio para manter)" : "Senha"}
                </label>
                <Input
                  type="password"
                  placeholder={isEditing ? "•••••••• (inalterada)" : "Defina uma senha de acesso"}
                  value={form.senha}
                  onChange={(e) => setForm((prev) => ({ ...prev, senha: e.target.value }))}
                />
              </div>

              {/* Cidade + Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Cidade</label>
                  <Input
                    placeholder="Iguatu-CE"
                    value={form.cidade}
                    onChange={(e) => setForm((prev) => ({ ...prev, cidade: e.target.value }))}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Banner</label>
                  <label className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/40 px-3 text-xs font-medium text-muted-foreground hover:bg-accent cursor-pointer">
                    <UploadCloud className="h-4 w-4 text-primary" />
                    <span className="truncate">{form.bannerName || "Escolher banner"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setForm((prev) => ({ ...prev, bannerName: file.name }));
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Categoria */}
              <div className="pt-2">
                <span className="block text-xs font-semibold text-foreground mb-2">Categoria de Atuação</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="tipo"
                      checked={form.tipo === "vendedor"}
                      onChange={() => setForm((prev) => ({ ...prev, tipo: "vendedor" }))}
                      className="accent-primary h-4 w-4"
                    />
                    <span>Vendedor (Comércio)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="tipo"
                      checked={form.tipo === "servico"}
                      onChange={() => setForm((prev) => ({ ...prev, tipo: "servico" }))}
                      className="accent-primary h-4 w-4"
                    />
                    <span>Prestador de Serviço</span>
                  </label>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="pt-4 flex items-center gap-2">
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDelete}
                    className="h-11 px-3 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                    title="Excluir provedor"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Excluir</span>
                  </Button>
                )}

                <Button type="submit" className="flex-1 h-11 font-semibold gap-2 shadow-sm cursor-pointer">
                  <CheckCircle2 className="h-4 w-4" />
                  {isEditing ? "Salvar Alterações" : "Cadastrar Provedor"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
