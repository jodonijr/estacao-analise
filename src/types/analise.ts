export type TipoAnaliseAtiva = "gradiente" | "amplitude" | "brisas";

export interface ItemMenuNavegacao {
  id: TipoAnaliseAtiva;
  titulo: string;
  icone: React.ComponentType<{ className?: string }>;
}
