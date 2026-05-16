import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AbasEstacoesClimaticas } from "./AbasEstacoesClimaticas";
import { GraficoBrisasEstacao } from "./GraficoBrisasEstacao";

export function AnaliseBrisas() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dinâmica de Brisas Horárias</CardTitle>
        <CardDescription>
          Velocidade média do vento distribuída pelas 24 horas do dia, indicando ativações de brisas locais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AbasEstacoesClimaticas
          conteudoBertioga={
            <GraficoBrisasEstacao arquivoCsv="bertioga-a765.csv" corArea="#2563eb" />
          }
          conteudoTaubate={
            <GraficoBrisasEstacao arquivoCsv="taubate-a728.csv" corArea="#16a34a" />
          }
          conteudoCamposJordao={
            <GraficoBrisasEstacao arquivoCsv="campos-jordao-a706.csv" corArea="#ea580c" />
          }
        />
      </CardContent>
    </Card>
  );
}
