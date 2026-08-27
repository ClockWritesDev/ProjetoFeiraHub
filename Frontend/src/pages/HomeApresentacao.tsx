import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Store, 
  ShoppingBag, 
  Compass, 
  MessageCircle, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin,
  TrendingUp
} from "lucide-react";
import type { SearchTab } from "@/types";

interface HomeApresentacaoProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function HomeApresentacao({ onNavigate }: HomeApresentacaoProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchTab>("Produtos");

  const handleSearchSubmit = (query: string, tab: SearchTab) => {
    if (tab === "Vendedores") {
      onNavigate("results_provedor", query);
    } else {
      onNavigate("results_itens", query);
    }
  };

  return (
    <div 
      className="flex min-h-screen flex-col text-foreground"
      onClick={() => searchFocused && setSearchFocused(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Header
          searchFocused={searchFocused}
          onFocusSearch={() => setSearchFocused(true)}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onGoToCatalog={() => onNavigate("home_cliente")}
          onLogin={() => onNavigate("login")}
          onLogoClick={() => onNavigate("inicial")}
          onSearchSubmit={handleSearchSubmit}
        />
      </div>

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Descubra o Comércio e a Cultura Local
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                  O catálogo de tudo que sua cidade tem a oferecer.
                </h1>

                <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
                  O <strong className="text-foreground">FeiraHub</strong> é a vitrine digital que reúne feirantes, produtores, artesãos e prestadores de serviço — tudo o que a sua cidade tem de melhor e você talvez ainda nem sabia que existia tão perto.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                  <Button
                    size="lg"
                    className="gap-2 text-base font-semibold shadow-md cursor-pointer bg-amarelo hover:bg-amarelo/20"
                    onClick={() => onNavigate("home_cliente")}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Explorar Catálogo Completo
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 text-base font-medium cursor-pointer"
                    onClick={() => onNavigate("login")}
                  >
                    <Store className="h-5 w-5" />
                    Divulgar Meu Negócio
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Cadastro Gratuito
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Sem taxas por venda
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Contato Direto no WhatsApp
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                <div className="space-y-3.5">
                  <div className="group overflow-hidden rounded-2xl shadow-sm border border-border bg-card">
                    <img
                      src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&auto=format&fit=crop&q=80"
                      alt="Hortifruti"
                      className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className="p-2 text-center text-xs font-semibold text-muted-foreground">Hortifruti & Orgânicos</p>
                  </div>
                  <div className="group overflow-hidden rounded-2xl shadow-sm border border-border bg-card">
                    <img
                      src="https://images.unsplash.com/photo-1556760544-74068565f05c?w=600&auto=format&fit=crop&q=80"
                      alt="Artesanato"
                      className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className="p-2 text-center text-xs font-semibold text-muted-foreground">Artesanato Local</p>
                  </div>
                </div>

                <div className="space-y-3.5 pt-4 sm:pt-6">
                  <div className="group overflow-hidden rounded-2xl shadow-sm border border-border bg-card">
                    <img
                      src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=80"
                      alt="Serviços"
                      className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className="p-2 text-center text-xs font-semibold text-muted-foreground">Serviços Especializados</p>
                  </div>
                  <div className="group overflow-hidden rounded-2xl shadow-sm border border-border bg-card">
                    <img
                      src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80"
                      alt="Comércio de Bairro"
                      className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className="p-2 text-center text-xs font-semibold text-muted-foreground">Comércio de Bairro</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border/60 bg-card">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 className="text-2xl font-bold sm:text-3xl tracking-tight">
                Como o FeiraHub transforma sua experiência
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Um ecossistema feito para conectar moradores e comerciantes da região sem atritos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-between rounded-3xl border border-border bg-background p-8 shadow-sm transition-all hover:border-primary/50">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Store className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Para Feirantes & Prestadores
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    É comerciante ou prestador de serviços?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Que tal <strong>divulgar seu negócio de graça</strong>, mostrar seu catálogo completo de produtos ou serviços e receber clientes prontos para fechar direto no seu WhatsApp?
                  </p>
                  <div className="space-y-2 pt-2 text-xs sm:text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary shrink-0" />
                      Sem mensalidades, comissões ou taxas escondidas.
                    </p>
                    <p className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-primary shrink-0" />
                      Receba o pedido organizado com itens e quantidades já calculados.
                    </p>
                    <p className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary shrink-0" />
                      Aumente suas vendas tanto no varejo quanto no atacado.
                    </p>
                  </div>
                </div>
                <div className="pt-8">
                  <Button
                    onClick={() => onNavigate("login")}
                    variant="outline"
                    className="w-full gap-2 font-semibold hover:bg-primary hover:text-white cursor-pointer"
                  >
                    Quero Divulgar Meu Negócio
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-3xl border border-border bg-background p-8 shadow-sm transition-all hover:border-primary/50">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Para Consumidores & Moradores
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    É consumidor e quer economizar tempo?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Que tal <strong>comparar preços do mercado local</strong>, comprar direto do produtor <strong>sem pagar frete ou esperar dias por entrega</strong>, além de valorizar a arte e a cultura da sua própria cidade?
                  </p>
                  <div className="space-y-2 pt-2 text-xs sm:text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary shrink-0" />
                      Preços transparentes de varejo e atacado direto da fonte.
                    </p>
                    <p className="flex items-center gap-2">
                      <Compass className="h-4 w-4 text-primary shrink-0" />
                      Encontre prestadores confiáveis perto do seu endereço.
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      Retire no mesmo dia ou combine a entrega rápida no bairro.
                    </p>
                  </div>
                </div>
                <div className="pt-8">
                  <Button
                    onClick={() => onNavigate("home_cliente")}
                    className="w-full gap-2 font-semibold cursor-pointer"
                  >
                    Ver Catálogo e Comprar Agora
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
