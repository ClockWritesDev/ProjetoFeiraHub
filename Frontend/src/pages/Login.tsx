import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lock, Mail, ArrowRight, ShieldCheck, Store, Shield } from "lucide-react";

interface LoginProps {
  onNavigate: (page: string) => void;
}

type UserRole = "provedor" | "administrador";

export default function Login({ onNavigate }: LoginProps) {
  const [role, setRole] = useState<UserRole>("provedor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Redireciona diretamente com base no toggle selecionado
    if (role === "administrador") {
      onNavigate("home_administrador");
    } else {
      onNavigate("home_provedor");
    }
  };

  return (
    <div className="flex min-h-screen flex-col text-foreground">
      {/* Header */}
      <Header
        onLogoClick={() => onNavigate("inicial")}
        onGoToCatalog={() => onNavigate("home_cliente")}
        onLogin={() => onNavigate("login")}
      />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-6 sm:p-8 space-y-6 shadow-md border-border/80">
          
          {/* Cabeçalho */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Acesse sua conta
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Selecione seu perfil de acesso e entre com suas credenciais
            </p>
          </div>

          {/* Toggle Provedor vs Administrador */}
          <div className="flex rounded-xl border border-border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => setRole("provedor")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                role === "provedor"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Store className="h-4 w-4 text-primary" />
              Provedor / Feirante
            </button>
            <button
              type="button"
              onClick={() => setRole("administrador")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                role === "administrador"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Shield className="h-4 w-4 text-primary" />
              Administrador
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                E-mail {role === "administrador" ? "Administrativo" : "do Negócio"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  type="email"
                  placeholder={role === "administrador" ? "admin@feirahub.com" : "vendedor@feirahub.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 gap-2 text-sm font-semibold cursor-pointer shadow-sm mt-2"
            >
              <span>Entrar como {role === "administrador" ? "Administrador" : "Provedor"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Rodapé de Segurança */}
          <div className="border-t border-border/60 pt-4 text-center">
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Autenticação segura FeiraHub
            </p>
          </div>

        </Card>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
