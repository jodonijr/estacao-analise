import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useCargaDadosClimaticos } from "@/hooks/useCargaDadosClimaticos";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

interface GraficoAmplitudeEstacaoProps {
  arquivoCsv: string;
  corBarra: string;
}

const configuracaoGrafico = {
  amplitudeMedia: {
    label: "Amplitude Média",
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
        Calculando amplitudes térmicas mensais...
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

  const amplitudesPorMes: Record<string, number[]> = {};
  Object.entries(temperaturasPorData).forEach(([data, temperaturas]) => {
    const temperaturaMaxima = Math.max(...temperaturas);
    const temperaturaMinima = Math.min(...temperaturas);
    const amplitudeDiaria = temperaturaMaxima - temperaturaMinima;
    const mes = data.split("/")[1];

    if (!amplitudesPorMes[mes]) {
      amplitudesPorMes[mes] = [];
    }
    amplitudesPorMes[mes].push(amplitudeDiaria);
  });

  const dadosAgregadosMensais = Object.entries(amplitudesPorMes).map(([mes, amplitudes]) => {
    const somaAmplitudes = amplitudes.reduce((acumulador, valor) => acumulador + valor, 0);
    const mediaMensal = somaAmplitudes / amplitudes.length;
    return {
      mes: nomeDosMeses[mes] || mes,
      amplitudeMedia: parseFloat(mediaMensal.toFixed(1)),
    };
  });

  return (
    <div style={{ "--barra-amplitude": corBarra } as React.CSSProperties}>
      <ChartContainer config={configuracaoGrafico} className="h-[350px] w-full">
        <BarChart data={dadosAgregadosMensais} margin={{ top: 20, left: 12, right: 12 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} unit="°C" domain={[0, "auto"]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="amplitudeMedia"
            fill="var(--barra-amplitude)"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
