import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { TipoAnaliseAtiva } from "@/types/analise";
import { MenuLateral } from "@/components/layout/MenuLateral";
import { AnaliseGradiente } from "@/components/analises/AnaliseGradiente";
import { AnaliseAmplitude } from "@/components/analises/AnaliseAmplitude";
import { AnaliseBrisas } from "@/components/analises/AnaliseBrisas";

export default function App() {
  const [analiseAtiva, setAnaliseAtiva] = useState<TipoAnaliseAtiva>("gradiente");

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
        
        <MenuLateral 
          analiseSelecionada={analiseAtiva} 
          onAlterarAnalise={setAnaliseAtiva} 
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex items-center mb-6">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-3xl font-bold tracking-tight">
              Análise de Dados Climáticos INMET
            </h1>
          </div>

          {analiseAtiva === "gradiente" && <AnaliseGradiente />}
          {analiseAtiva === "amplitude" && <AnaliseAmplitude />}
          {analiseAtiva === "brisas" && <AnaliseBrisas />}
        </main>

      </div>
    </SidebarProvider>
  );
}
