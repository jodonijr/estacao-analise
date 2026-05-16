import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraficoComparativoGeral } from "./GraficoComparativoGeral";

export function AnaliseComparativa() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Confronto Interestações INMET</CardTitle>
        <CardDescription>
          Visualização simultânea da temperatura térmica para validação de hipóteses topoclimáticas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GraficoComparativoGeral />
      </CardContent>
    </Card>
  );
}
