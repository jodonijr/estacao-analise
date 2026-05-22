export type TipoAnaliseAtiva = "comparativo" | "gradiente" | "amplitude" | "brisas" | "padroes";

export interface ItemMenuNavegacao {
  id: TipoAnaliseAtiva;
  titulo: string;
  icone: React.ComponentType<{ className?: string }>;
}
