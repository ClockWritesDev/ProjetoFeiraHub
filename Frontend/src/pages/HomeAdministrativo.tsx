import { useEffect, useState } from "react";
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
import { deleteProvedor, getTodosProvedores, postCriarProvedor, type BannerItem, type VendedorData } from "@/api";


interface HomeAdministrativoProps {
  onNavigate: (page: string) => void;
  // Prop opcional para integração futura com API backend
  apiBaseUrl?: string;
}

export default function HomeAdministrativo({ onNavigate, apiBaseUrl }: HomeAdministrativoProps) {
  const [provedores, setProvedores] = useState<BannerItem[]>([]);
  
  // Controle de estado do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const provedores = await getTodosProvedores();
        setProvedores(provedores);
      } catch (err) {
        setError("Erro ao carregar resultados");
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const isEditing = editingId !== null;

  interface FormProvedor {
  storeName: string;
  phone: string;
  pass: string;
  city: string;
  local: string; // Adicionado
  bannerUrl: string;
  tipo: "vendedor" | "servico";
}

// Estado do formulário
const [form, setForm] = useState<FormProvedor>({
  storeName: "",
  phone: "",
  pass: "",
  city: "Iguatu-CE",
  local: "",
  bannerUrl: "",
  tipo: "vendedor",
});

// Abre modal para novo cadastro (APENAS abre o modal, não faz POST)
const handleOpenCreate = () => {
  setEditingId(null);
  setForm({
    storeName: "",
    phone: "",
    pass: "",
    city: "Iguatu-CE",
    local: "",
    bannerUrl: "",
    tipo: "vendedor",
  });
  setModalOpen(true);
};

// Abre modal preenchido para edição
const handleOpenEdit = (vendedor: BannerItem) => {
  setEditingId(vendedor.id);
  setForm({
    storeName: vendedor.storeName,
    phone: vendedor.phone || "",
    pass: "", // Senha em branco na edição
    city: vendedor.city || "Iguatu-CE",
    local: vendedor.city || "Iguatu-CE", // Ajuste conforme necessário
    bannerUrl: vendedor.image || "",
    tipo: vendedor.category === "prestador de serviço" ? "servico" : "vendedor",
  });
  setModalOpen(true);
};

// Salvar (Cadastro ou Atualização) - AQUI é onde você usa o postCriarProvedor
const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    setSaving(true);
    
    if (isEditing && editingId) {
      // ATUALIZAÇÃO - usa putAtualizarProvedor
      await putAtualizarProvedor(editingId.toString(), {
        descricao: "",
        foto_banner: form.bannerUrl,
        telefone: form.phone,
        local: form.local || form.city, // Usa local ou cidade como fallback
        categoria: form.tipo === "vendedor" ? "vendedor" : "prestador de serviço",
        cidade: form.city,
      });
      
      console.log('Provedor atualizado com sucesso!');
    } else {
      // CRIAÇÃO - AQUI usa o postCriarProvedor
      const payload: ProvedorCreateApi = {
        nome: form.storeName,
        descricao: "", // Você pode adicionar um campo de descrição no form se quiser
        foto_banner: form.bannerUrl || undefined,
        telefone: form.phone,
        local: form.local || form.city, // Usa local ou cidade como fallback
        categoria: form.tipo === "vendedor" ? "vendedor" : "prestador de serviço",
        cidade: form.city,
      };
      
      const resultado = await postCriarProvedor(payload);
      console.log('Provedor criado com sucesso!', resultado);
    }
    
    // Recarrega a lista de provedores
    const provedoresAtualizados = await getTodosProvedores();
    setProvedores(provedoresAtualizados);
    
    // Fecha o modal
    setModalOpen(false);
    
    // Limpa o formulário
    setForm({
      storeName: "",
      phone: "",
      pass: "",
      city: "Iguatu-CE",
      local: "",
      bannerUrl: "",
      tipo: "vendedor",
    });
    
  } catch (err) {
    console.error('Erro ao salvar provedor:', err);
    alert('Erro ao salvar provedor. Verifique os dados e tente novamente.');
  } finally {
    setSaving(false);
  }
};

  // Exclusão de Provedor
  const handleDelete = async () => {
    if (!editingId) return;

    const confirmou = window.confirm(
      `Tem certeza que deseja excluir o provedor "${form.storeName}"? Essa ação não pode ser desfeita.`
    );
    if (!confirmou) return;

    deleteProvedor(form.storeName);
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
              {provedores.length} cadastrados
            </span>
          </div>

          <div className="grid grid-cols-12 px-5 py-2.5 bg-muted/40 text-xs font-semibold text-muted-foreground border-b border-border/40">
            <span className="col-span-6 sm:col-span-5">Item / Negócio</span>
            <span className="col-span-3 sm:col-span-3">Total Arrecadado</span>
            <span className="col-span-2 sm:col-span-2 text-center">Vendas</span>
            <span className="col-span-1 sm:col-span-2 text-right">Ações</span>
          </div>

          <div className="divide-y divide-border/60">
            {provedores.map((vendedor) => (
              <div
                key={vendedor.id}
                className="grid grid-cols-12 items-center px-5 py-4 transition-colors hover:bg-muted/20"
              >
                <div className="col-span-6 sm:col-span-5 pr-2">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {vendedor.storeName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {vendedor.phone || "Sem e-mail cadastrado"}
                  </p>
                </div>

                {/*<div className="col-span-3 sm:col-span-3">
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    {vendedor.}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-2 text-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                    {vendedor.salesCount}
                  </span>
                </div>*/}

                {/*{Botão de Edição }
                <div className="col-span-1 sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit()}
                    aria-label={`Editar ${vendedor.storeName}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary cursor-pointer"
                    title="Editar provedor"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>*/}
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

            {/* Formulário - CORRIGIDO */}
            <form onSubmit={handleSave} className="space-y-3.5 pt-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Nome</label>
                <Input
                  required
                  placeholder="Ex: Auto Peças São Francisco"
                  value={form.storeName}
                  onChange={(e) => setForm((prev) => ({ ...prev, storeName: e.target.value }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Telefone / WhatsApp</label>
                <Input
                  placeholder="(88) 98765-4321"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">
                  {isEditing ? "Nova Senha (deixe vazio para manter)" : "Senha"}
                </label>
                <Input
                  type="password"
                  placeholder={isEditing ? "•••••••• (inalterada)" : "Defina uma senha de acesso"}
                  value={form.pass}
                  onChange={(e) => setForm((prev) => ({ ...prev, pass: e.target.value }))}
                />
              </div>

              {/* Cidade + Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Cidade</label>
                  <Input
                    placeholder="Iguatu-CE"
                    value={form.city}
                    onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">URL do Banner</label>
                  <Input
                    placeholder="https://exemplo.com/banner.jpg"
                    value={form.bannerUrl}
                    onChange={(e) => setForm((prev) => ({ ...prev, bannerUrl: e.target.value }))}
                  />
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
                    disabled={saving}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Excluir</span>
                  </Button>
                )}

                <Button 
                  type="submit" 
                  className="flex-1 h-11 font-semibold gap-2 shadow-sm cursor-pointer"
                  disabled={saving}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {saving ? "Salvando..." : isEditing ? "Salvar Alterações" : "Cadastrar Provedor"}
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
