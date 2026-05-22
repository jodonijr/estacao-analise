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
          conteudoBertioga={<GraficoAmplitudeEstacao arquivoCsv="bertioga-a765.csv" corBarra="#ef4444" />}
          conteudoTaubate={<GraficoAmplitudeEstacao arquivoCsv="taubate-a728.csv" corBarra="#eab308" />}
          conteudoCamposJordao={<GraficoAmplitudeEstacao arquivoCsv="campos-jordao-a706.csv" corBarra="#3b82f6" />}
        />
      </CardContent>
    </Card>
  );
}
