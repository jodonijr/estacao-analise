import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AbasEstacoesClimaticas } from "./AbasEstacoesClimaticas";
import { GraficoTemperaturaEstacao } from "./GraficoTemperaturaEstacao";

export function AnaliseGradiente() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Gradiente Térmico Vertical</CardTitle>
        <CardDescription>
          Variação temporalizada da temperatura instantânea em diferentes níveis altimétricos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AbasEstacoesClimaticas
          conteudoBertioga={<GraficoTemperaturaEstacao arquivoCsv="bertioga-a765.csv" corLinha="#ef4444" />}
          conteudoTaubate={<GraficoTemperaturaEstacao arquivoCsv="taubate-a728.csv" corLinha="#eab308" />}
          conteudoCamposJordao={<GraficoTemperaturaEstacao arquivoCsv="campos-jordao-a706.csv" corLinha="#3b82f6" />}
        />
      </CardContent>
    </Card>
  );
}
