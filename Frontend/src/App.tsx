import { useState } from "react";
import HomeApresentacao from "@/pages/HomeApresentacao";
import HomeCliente from "@/pages/HomeCliente";
import Login from "@/pages/Login";
import HomeProvedor from "@/pages/HomeProvedor";
import HomeAdministrativo from "@/pages/HomeAdministrativo";
import PerfilProvedor from "@/pages/PerfilProvedor";
import ResultsProvedor from "@/pages/ResultsProvedor";
import ResultsItens from "@/pages/ResultsItens";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("inicial");
  const [selectedProvedorId, setSelectedProvedorId] = useState<string | number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleNavigate = (page: string, data?: any) => {
    if (page === "profile_provedor" && data) {
      setSelectedProvedorId(data);
    }
    if ((page === "results_provedor" || page === "results_itens") && typeof data === "string") {
      setSearchQuery(data);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentPage === "inicial" && (
        <HomeApresentacao onNavigate={handleNavigate} />
      )}

      {currentPage === "home_cliente" && (
        <HomeCliente onNavigate={handleNavigate} />
      )}

      {currentPage === "results_provedor" && (
        <ResultsProvedor
          searchQuery={searchQuery}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === "results_itens" && (
        <ResultsItens
          searchQuery={searchQuery}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === "profile_provedor" && (
        <PerfilProvedor
          provedorId={selectedProvedorId}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === "login" && (
        <Login onNavigate={handleNavigate} />
      )}

      {currentPage === "home_provedor" && (
        <HomeProvedor onNavigate={handleNavigate} />
      )}

      {currentPage === "home_administrador" && (
        <HomeAdministrativo onNavigate={handleNavigate} />
      )}
    </div>
  );
}
