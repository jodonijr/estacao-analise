import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AbasEstacoesClimaticas } from "./AbasEstacoesClimaticas";

export function AnaliseGradiente() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Gradiente Térmico Vertical</CardTitle>
        <CardDescription>
          Comparação da variação de temperatura em função da altitude.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AbasEstacoesClimaticas
          conteudoBertioga={
            <div className="p-4 border rounded-xl bg-white h-[300px] flex items-center justify-center text-muted-foreground">
              Visualização do Gradiente em Bertioga
            </div>
          }
          conteudoTaubate={
            <div className="p-4 border rounded-xl bg-white h-[300px] flex items-center justify-center text-muted-foreground">
              Visualização do Gradiente em Taubaté
            </div>
          }
          conteudoCamposJordao={
            <div className="p-4 border rounded-xl bg-white h-[300px] flex items-center justify-center text-muted-foreground">
              Visualização do Gradiente em Campos do Jordão
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
