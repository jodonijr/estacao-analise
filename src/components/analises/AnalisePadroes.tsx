import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AbasEstacoesClimaticas } from "./AbasEstacoesClimaticas";
import { GraficoPadroesEstacao } from "./GraficoPadroesEstacao";

export function AnalisePadroes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação de Padrões Comportamentais</CardTitle>
        <CardDescription>
          Correlação diurna entre a evolução da Temperatura e o comportamento inversamente proporcional da Umidade Relativa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AbasEstacoesClimaticas
          conteudoBertioga={<GraficoPadroesEstacao arquivoCsv="bertioga-a765.csv" />}
          conteudoTaubate={<GraficoPadroesEstacao arquivoCsv="taubate-a728.csv" />}
          conteudoCamposJordao={<GraficoPadroesEstacao arquivoCsv="campos-jordao-a706.csv" />}
        />
      </CardContent>
    </Card>
  );
}
