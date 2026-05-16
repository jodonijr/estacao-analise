import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { TipoAnaliseAtiva } from "@/types/analise";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { MenuLateral } from "@/components/layout/MenuLateral";
import { AnaliseComparativa } from "@/components/analises/AnaliseComparativa";
import { AnaliseGradiente } from "@/components/analises/AnaliseGradiente";
import { AnaliseAmplitude } from "@/components/analises/AnaliseAmplitude";
import { AnaliseBrisas } from "@/components/analises/AnaliseBrisas";

export default function App() {
  const [analiseAtiva, setAnaliseAtiva] = useState<TipoAnaliseAtiva>("comparativo");

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
          
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

            {analiseAtiva === "comparativo" && <AnaliseComparativa />}
            {analiseAtiva === "gradiente" && <AnaliseGradiente />}
            {analiseAtiva === "amplitude" && <AnaliseAmplitude />}
            {analiseAtiva === "brisas" && <AnaliseBrisas />}
          </main>

        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
