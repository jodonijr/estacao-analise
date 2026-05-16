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
          conteudoBertioga={
            <GraficoTemperaturaEstacao arquivoCsv="bertioga-a765.csv" corLinha="#2563eb" />
          }
          conteudoTaubate={
            <GraficoTemperaturaEstacao arquivoCsv="taubate-a728.csv" corLinha="#16a34a" />
          }
          conteudoCamposJordao={
            <GraficoTemperaturaEstacao arquivoCsv="campos-jordao-a706.csv" corLinha="#ea580c" />
          }
        />
      </CardContent>
    </Card>
  );
}
