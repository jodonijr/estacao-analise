import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useCargaDadosClimaticos } from "@/hooks/useCargaDadosClimaticos";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

const configuracaoGrafico = {
  bertioga: {
    label: "Bertioga (0m)",
    color: "#ef4444",
  },
  taubate: {
    label: "Taubaté (580m)",
    color: "#eab308",
  },
  camposJordao: {
    label: "Campos do Jordão (1600m)",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export function GraficoComparativoGeral() {
  const { dados: dadosBertioga, carregando: carregandoBertioga } = useCargaDadosClimaticos("bertioga-a765.csv");
  const { dados: dadosTaubate, carregando: carregandoTaubate } = useCargaDadosClimaticos("taubate-a728.csv");
  const { dados: dadosCampos, carregando: carregandoCampos } = useCargaDadosClimaticos("campos-jordao-a706.csv");

  if (carregandoBertioga || carregandoTaubate || carregandoCampos) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center text-muted-foreground animate-pulse">
        Consolidando base de dados das estações...
      </div>
    );
  }

  const dadosCombinados = dadosBertioga
    .filter((_, indice) => indice % 24 === 0)
    .map((itemBertioga, indice) => {
      const itemTaubate = dadosTaubate.filter((_, i) => i % 24 === 0)[indice];
      const itemCampos = dadosCampos.filter((_, i) => i % 24 === 0)[indice];

      return {
        data: itemBertioga.data,
        bertioga: itemBertioga.temperatura,
        taubate: itemTaubate?.temperatura || 0,
        camposJordao: itemCampos?.temperatura || 0,
      };
    });

  return (
    <ChartContainer config={configuracaoGrafico} className="h-[400px] w-full">
      <LineChart data={dadosCombinados} margin={{ top: 20, left: 12, right: 12 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="data" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} unit="°C" domain={["auto", "auto"]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="bertioga"
          type="monotone"
          stroke={configuracaoGrafico.bertioga.color}
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="taubate"
          type="monotone"
          stroke={configuracaoGrafico.taubate.color}
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="camposJordao"
          type="monotone"
          stroke={configuracaoGrafico.camposJordao.color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
