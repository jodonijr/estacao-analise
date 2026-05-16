import { useState, useEffect } from "react";
import Papa from "papaparse";
import type { RegistroClimaticoBruto, RegistroClimaticoProcessado } from "@/types/climatico";

function converterTextoParaNumero(valor: string): number {
  if (!valor) return 0;
  const valorNormalizado = valor.replace(",", ".");
  const numeroConvertido = parseFloat(valorNormalizado);
  return isNaN(numeroConvertido) ? 0 : numeroConvertido;
}

function formatarHoraUptc(horaBruta: string): string {
  const numeroHora = parseInt(horaBruta, 10);
  const horaFormatada = Math.floor(numeroHora / 100).toString().padStart(2, "0");
  return `${horaFormatada}:00`;
}

export function useCargaDadosClimaticos(nomeArquivoCsv: string) {
  const [dados, setDados] = useState<RegistroClimaticoProcessado[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/data/${nomeArquivoCsv}`)
      .then((resposta) => resposta.text())
      .then((textoCsv) => {
        Papa.parse<RegistroClimaticoBruto>(textoCsv, {
          header: true,
          delimiter: ";",
          skipEmptyLines: true,
          complete: (resultado) => {
            const dadosTratados = resultado.data
              .filter((linha) => linha.Data && linha["Temp. Ins. (C)"])
              .map((linha) => ({
                data: linha.Data,
                hora: formatarHoraUptc(linha["Hora (UTC)"]),
                temperatura: converterTextoParaNumero(linha["Temp. Ins. (C)"]),
                pressao: converterTextoParaNumero(linha["Pressao Ins. (hPa)"]),
                umidade: converterTextoParaNumero(linha["Umi. Ins. (%)"]),
                velocidadeVento: converterTextoParaNumero(linha["Vel. Vento (m/s)"]),
                direcaoVento: converterTextoParaNumero(linha["Dir. Vento (m/s)"]),
                chuva: converterTextoParaNumero(linha["Chuva (mm)"]),
              }));
            setDados(dadosTratados);
            setCarregando(false);
          },
        });
      });
  }, [nomeArquivoCsv]);

  return { dados, carregando };
}
