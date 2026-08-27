import { Sprout, Heart } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          
          {/* Marca / Link para Apresentação */}
          <div
            onClick={() => onNavigate?.("inicial")}
            className="flex items-center gap-2 font-bold text-lg text-primary cursor-pointer select-none transition-opacity hover:opacity-85"
            title="Voltar para a Apresentação"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sprout className="h-5 w-5" />
            </span>
            Feira Hub
          </div>

          {/* Mensagem Institucional */}
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Conectando o comércio local, feirantes, prestadores de serviço e a cultura da sua cidade em um só lugar.
          </p>

          {/* Copyright */}
          <div className="pt-4 text-xs text-muted-foreground flex flex-col sm:flex-row items-center gap-1">
            <span>© {new Date().getFullYear()} Feira Hub. Todos os direitos reservados.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Feito para apoiar o comércio local <Heart className="h-3 w-3 text-destructive fill-destructive" />
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
