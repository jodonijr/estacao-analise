import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AbasEstacoesClimaticasProps {
  conteudoBertioga: ReactNode;
  conteudoTaubate: ReactNode;
  conteudoCamposJordao: ReactNode;
}

export function AbasEstacoesClimaticas({
  conteudoBertioga,
  conteudoTaubate,
  conteudoCamposJordao,
}: AbasEstacoesClimaticasProps) {
  return (
    <Tabs defaultValue="campos" className="w-full">
      <TabsList className="grid w-full grid-cols-3 max-w-[450px] mb-6">
        <TabsTrigger value="bertioga">Bertioga (0m)</TabsTrigger>
        <TabsTrigger value="taubate">Taubaté (580m)</TabsTrigger>
        <TabsTrigger value="campos">Campos do Jordão (1600m)</TabsTrigger>
      </TabsList>

      <TabsContent value="bertioga">{conteudoBertioga}</TabsContent>
      <TabsContent value="taubate">{conteudoTaubate}</TabsContent>
      <TabsContent value="campos">{conteudoCamposJordao}</TabsContent>
    </Tabs>
  );
}
