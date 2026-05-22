import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useCargaDadosClimaticos } from "@/hooks/useCargaDadosClimaticos";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

interface GraficoAmplitudeEstacaoProps {
  arquivoCsv: string;
  corBarra: string;
}

const configuracaoGrafico = {
  intervaloTermico: {
    label: "Intervalo (°C)",
    color: "var(--barra-amplitude)",
  },
} satisfies ChartConfig;

const nomeDosMeses: Record<string, string> = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
};

export function GraficoAmplitudeEstacao({ arquivoCsv, corBarra }: GraficoAmplitudeEstacaoProps) {
  const { dados, carregando } = useCargaDadosClimaticos(arquivoCsv);

  if (carregando) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center text-muted-foreground animate-pulse">
        Calculando intervalos e amplitudes térmicas...
      </div>
    );
  }

  const temperaturasPorData: Record<string, number[]> = {};
  dados.forEach((registro) => {
    if (!temperaturasPorData[registro.data]) {
      temperaturasPorData[registro.data] = [];
    }
    temperaturasPorData[registro.data].push(registro.temperatura);
  });

  const valoresPorMes: Record<string, { maximas: number[]; minimas: number[] }> = {};
  Object.entries(temperaturasPorData).forEach(([data, temperaturas]) => {
    const maximaDiaria = Math.max(...temperaturas);
    const minimaDiaria = Math.min(...temperaturas);
    const mes = data.split("/")[1];

    if (!valoresPorMes[mes]) {
      valoresPorMes[mes] = { maximas: [], minimas: [] };
    }
    valoresPorMes[mes].maximas.push(maximaDiaria);
    valoresPorMes[mes].minimas.push(minimaDiaria);
  });

  const dadosAgregadosMensais = Object.entries(valoresPorMes).map(([mes, valores]) => {
    const somaMaximas = valores.maximas.reduce((acc, val) => acc + val, 0);
    const mediaMaxima = somaMaximas / valores.maximas.length;

    const somaMinimas = valores.minimas.reduce((acc, val) => acc + val, 0);
    const mediaMinima = somaMinimas / valores.minimas.length;

    const amplitudeMedia = mediaMaxima - mediaMinima;

    return {
      mes: nomeDosMeses[mes] || mes,
      intervaloTermico: [parseFloat(mediaMinima.toFixed(1)), parseFloat(mediaMaxima.toFixed(1))],
      minimaExibicao: parseFloat(mediaMinima.toFixed(1)),
      maximaExibicao: parseFloat(mediaMaxima.toFixed(1)),
      amplitudeExibicao: parseFloat(amplitudeMedia.toFixed(1)),
    };
  });

  return (
    <div style={{ "--barra-amplitude": corBarra } as React.CSSProperties}>
      <ChartContainer config={configuracaoGrafico} className="h-[350px] w-full">
        <BarChart data={dadosAgregadosMensais} margin={{ top: 20, left: 12, right: 12 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} unit="°C" domain={["auto", "auto"]} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => `Mês: ${value}`}
                formatter={(value, name, props) => {
                  if (name === "intervaloTermico") {
                    return (
                      <div className="flex flex-col gap-1 text-xs font-normal">
                        <div>Média Mínima: {props.payload.minimaExibicao}°C</div>
                        <div>Média Máxima: {props.payload.maximaExibicao}°C</div>
                        <div className="font-semibold text-foreground border-t pt-1 mt-1">
                          Variação Média: {props.payload.amplitudeExibicao}°C
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            }
          />
          <Bar
            dataKey="intervaloTermico"
            fill="var(--barra-amplitude)"
            radius={[4, 4, 4, 4]}
            maxBarSize={50}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
