import { Heart, MapPin } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
  cityName?: string;
  logoSrc?: string;
}

export default function Footer({
  onNavigate,
  cityName = "Iguatu",
  logoSrc = "./logo.svg",
  }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          
          {/* Marca / Link para Apresentação */}
          <div
            onClick={() => onNavigate?.("inicial")}
            className="group flex shrink-0 cursor-pointer select-none items-center gap-1 transition-opacity hover:opacity-90"
            title="Ir para o início"
          >
            <div className="h-fit w-fit flex flex-row items-center leading-tight">
              <span className="flex justify-center -mb-2">
                {logoSrc ? (
                  <img src={logoSrc} alt="Feira Hub Logo" className="h-28 w-28 object-contain" />
                ) : (
                  <></>
                )}
              </span>
              <span className="flex items-center gap-0.5 text-[11px] font-medium text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary/80" />
                {cityName}
              </span>
            </div>
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
