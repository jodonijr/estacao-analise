import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useCargaDadosClimaticos } from "@/hooks/useCargaDadosClimaticos";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

interface GraficoBrisasEstacaoProps {
  arquivoCsv: string;
  corArea: string;
}

const configuracaoGrafico = {
  velocidadeMedia: {
    label: "Velocidade Média",
    color: "var(--area-vento)",
  },
} satisfies ChartConfig;

export function GraficoBrisasEstacao({ arquivoCsv, corArea }: GraficoBrisasEstacaoProps) {
  const { dados, carregando } = useCargaDadosClimaticos(arquivoCsv);

  if (carregando) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center text-muted-foreground animate-pulse">
        Processando ciclos horários de ventos...
      </div>
    );
  }

  const velocidadesPorHora: Record<string, number[]> = {};
  dados.forEach((registro) => {
    if (!velocidadesPorHora[registro.hora]) {
      velocidadesPorHora[registro.hora] = [];
    }
    velocidadesPorHora[registro.hora].push(registro.velocidadeVento);
  });

  const dadosAgregadosCicloDiurno = Object.entries(velocidadesPorHora)
    .map(([hora, velocidades]) => {
      const somaVelocidades = velocidades.reduce((acumulador, valor) => acumulador + valor, 0);
      const mediaVelocidade = somaVelocidades / velocidades.length;
      return {
        hora,
        velocidadeMedia: parseFloat(mediaVelocidade.toFixed(2)),
      };
    })
    .sort((primeiroItem, segundoItem) => primeiroItem.hora.localeCompare(segundoItem.hora));

  return (
    <div style={{ "--area-vento": corArea } as React.CSSProperties}>
      <ChartContainer config={configuracaoGrafico} className="h-[350px] w-full">
        <AreaChart data={dadosAgregadosCicloDiurno} margin={{ top: 20, left: 12, right: 12 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="hora" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} unit=" m/s" domain={[0, "auto"]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="gradienteVento" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--area-vento)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--area-vento)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            dataKey="velocidadeMedia"
            type="monotone"
            fill="url(#gradienteVento)"
            stroke="var(--area-vento)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
