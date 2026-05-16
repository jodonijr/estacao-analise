import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useCargaDadosClimaticos } from "@/hooks/useCargaDadosClimaticos";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

interface GraficoTemperaturaEstacaoProps {
  arquivoCsv: string;
  corLinha: string;
}

const configuracaoGrafico = {
  temperatura: {
    label: "Temperatura",
    color: "var(--linha-temperatura)",
  },
} satisfies ChartConfig;

export function GraficoTemperaturaEstacao({ arquivoCsv, corLinha }: GraficoTemperaturaEstacaoProps) {
  const { dados, carregando } = useCargaDadosClimaticos(arquivoCsv);

  if (carregando) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center text-muted-foreground animate-pulse">
        Carregando e processando dados meteorológicos...
      </div>
    );
  }

  const dadosReduzidosParaVisualizacao = dados.filter((_, indice) => indice % 24 === 0);

  return (
    <div style={{ "--linha-temperatura": corLinha } as React.CSSProperties}>
      <ChartContainer config={configuracaoGrafico} className="h-[350px] w-full">
        <LineChart
          data={dadosReduzidosParaVisualizacao}
          margin={{ top: 20, left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="data"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            unit="°C"
            domain={["auto", "auto"]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="temperatura"
            type="monotone"
            stroke="var(--linha-temperatura)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
