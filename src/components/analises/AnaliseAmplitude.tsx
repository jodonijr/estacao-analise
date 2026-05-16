import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AbasEstacoesClimaticas } from "./AbasEstacoesClimaticas";

export function AnaliseAmplitude() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Amplitude Térmica Diária</CardTitle>
        <CardDescription>
          Impacto do efeito tampão da maritimidade na oscilação da temperatura.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AbasEstacoesClimaticas
          conteudoBertioga={
            <div className="p-4 border rounded-xl bg-white h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico de Amplitude de Bertioga
            </div>
          }
          conteudoTaubate={
            <div className="p-4 border rounded-xl bg-white h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico de Amplitude de Taubaté
            </div>
          }
          conteudoCamposJordao={
            <div className="p-4 border rounded-xl bg-white h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico de Amplitude de Campos do Jordão
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
