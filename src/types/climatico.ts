export interface RegistroClimaticoBruto {
  Data: string;
  "Hora (UTC)": string;
  "Temp. Ins. (C)": string;
  "Pressao Ins. (hPa)": string;
  "Umi. Ins. (%)": string;
  "Vel. Vento (m/s)": string;
  "Dir. Vento (m/s)": string;
  "Chuva (mm)": string;
}

export interface RegistroClimaticoProcessado {
  data: string;
  hora: string;
  temperatura: number;
  pressao: number;
  umidade: number;
  velocidadeVento: number;
  direcaoVento: number;
  chuva: number;
}
