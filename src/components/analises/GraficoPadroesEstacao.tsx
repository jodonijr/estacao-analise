import { Line, Area, ComposedChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useCargaDadosClimaticos } from "@/hooks/useCargaDadosClimaticos";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

interface GraficoPadroesEstacaoProps {
  arquivoCsv: string;
}

const configuracaoGrafico = {
  temperaturaMedia: {
    label: "Temp. Média (°C)",
    color: "#ea580c",
  },
  umidadeMedia: {
    label: "Umidade Média (%)",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export function GraficoPadroesEstacao({ arquivoCsv }: GraficoPadroesEstacaoProps) {
  const { dados, carregando } = useCargaDadosClimaticos(arquivoCsv);

  if (carregando) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center text-muted-foreground animate-pulse">
        Identificando padrões termo-higrométricos...
      </div>
    );
  }

  const agrupamentoPorHora: Record<string, { temperaturas: number[]; umidades: number[] }> = {};

  dados.forEach((registro) => {
    if (!agrupamentoPorHora[registro.hora]) {
      agrupamentoPorHora[registro.hora] = { temperaturas: [], umidades: [] };
    }
    agrupamentoPorHora[registro.hora].temperaturas.push(registro.temperatura);
    agrupamentoPorHora[registro.hora].umidades.push(registro.umidade);
  });

  const padraoComportamentalDiario = Object.entries(agrupamentoPorHora)
    .map(([hora, valores]) => {
      const somaTemp = valores.temperaturas.reduce((acc, val) => acc + val, 0);
      const somaUmi = valores.umidades.reduce((acc, val) => acc + val, 0);
      return {
        hora,
        temperaturaMedia: parseFloat((somaTemp / valores.temperaturas.length).toFixed(1)),
        umidadeMedia: parseFloat((somaUmi / valores.umidades.length).toFixed(1)),
      };
    })
    .sort((a, b) => a.hora.localeCompare(b.hora));

  return (
    <ChartContainer config={configuracaoGrafico} className="h-[350px] w-full">
      <ComposedChart data={padraoComportamentalDiario} margin={{ top: 20, left: 12, right: 12 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="hora" tickLine={false} axisLine={false} tickMargin={8} />
        
        <YAxis 
          yAxisId="eixoTemperatura" 
          orientation="left" 
          tickLine={false} 
          axisLine={false} 
          unit="°C" 
          domain={['auto', 'auto']}
          stroke={configuracaoGrafico.temperaturaMedia.color}
        />
        <YAxis 
          yAxisId="eixoUmidade" 
          orientation="right" 
          tickLine={false} 
          axisLine={false} 
          unit="%" 
          domain={[0, 100]}
          stroke={configuracaoGrafico.umidadeMedia.color}
        />
        
        <ChartTooltip content={<ChartTooltipContent />} />
        
        <defs>
          <linearGradient id="gradienteUmidade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={configuracaoGrafico.umidadeMedia.color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={configuracaoGrafico.umidadeMedia.color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <Area
          yAxisId="eixoUmidade"
          dataKey="umidadeMedia"
          type="monotone"
          fill="url(#gradienteUmidade)"
          stroke={configuracaoGrafico.umidadeMedia.color}
          strokeWidth={2}
        />
        <Line
          yAxisId="eixoTemperatura"
          dataKey="temperaturaMedia"
          type="monotone"
          stroke={configuracaoGrafico.temperaturaMedia.color}
          strokeWidth={3}
          dot={false}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
