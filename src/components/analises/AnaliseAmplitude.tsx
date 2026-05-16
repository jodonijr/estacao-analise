import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AbasEstacoesClimaticas } from "./AbasEstacoesClimaticas";
import { GraficoAmplitudeEstacao } from "./GraficoAmplitudeEstacao";

export function AnaliseAmplitude() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Amplitude Térmica Diária</CardTitle>
        <CardDescription>
          Média mensal da oscilação térmica diária evidenciando a inércia térmica regional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AbasEstacoesClimaticas
          conteudoBertioga={
            <GraficoAmplitudeEstacao arquivoCsv="bertioga-a765.csv" corBarra="#2563eb" />
          }
          conteudoTaubate={
            <GraficoAmplitudeEstacao arquivoCsv="taubate-a728.csv" corBarra="#16a34a" />
          }
          conteudoCamposJordao={
            <GraficoAmplitudeEstacao arquivoCsv="campos-jordao-a706.csv" corBarra="#ea580c" />
          }
        />
      </CardContent>
    </Card>
  );
}
