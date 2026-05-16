import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AbasEstacoesClimaticas } from "./AbasEstacoesClimaticas";

export function AnaliseBrisas() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dinâmica de Brisas Vale-Montanha e Marinha</CardTitle>
        <CardDescription>
          Análise da direção e velocidade do vento ao longo dos ciclos diurnos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AbasEstacoesClimaticas
          conteudoBertioga={
            <div className="p-4 border rounded-xl bg-white h-[300px] flex items-center justify-center text-muted-foreground">
              Rosa dos Ventos / Dados de Vento de Bertioga
            </div>
          }
          conteudoTaubate={
            <div className="p-4 border rounded-xl bg-white h-[300px] flex items-center justify-center text-muted-foreground">
              Rosa dos Ventos / Dados de Vento de Taubaté
            </div>
          }
          conteudoCamposJordao={
            <div className="p-4 border rounded-xl bg-white h-[300px] flex items-center justify-center text-muted-foreground">
              Rosa dos Ventos / Dados de Vento de Campos do Jordão
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
