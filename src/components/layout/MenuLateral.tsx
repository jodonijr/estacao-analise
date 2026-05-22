import { LineChart, Thermometer, BarChart3, Wind, Network } from "lucide-react";
import type { TipoAnaliseAtiva, ItemMenuNavegacao } from "@/types/analise";
import { ThemeSelector } from "./ThemeSelector";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

interface MenuLateralProps {
  analiseSelecionada: TipoAnaliseAtiva;
  onAlterarAnalise: (analise: TipoAnaliseAtiva) => void;
}

const listaItensMenu: ItemMenuNavegacao[] = [
  { id: "comparativo", titulo: "Comparativo Geral", icone: LineChart },
  { id: "padroes", titulo: "Padrões Comportamentais", icone: Network },
  { id: "gradiente", titulo: "Gradiente Térmico", icone: Thermometer },
  { id: "amplitude", titulo: "Amplitude Térmica", icone: BarChart3 },
  { id: "brisas", titulo: "Dinâmica de Brisas", icone: Wind },
];

export function MenuLateral({ analiseSelecionada, onAlterarAnalise }: MenuLateralProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold px-4 py-2">
            Estação Análise
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {listaItensMenu.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={analiseSelecionada === item.id}
                    onClick={() => onAlterarAnalise(item.id)}
                  >
                    <item.icone className="mr-2 h-4 w-4" />
                    <span>{item.titulo}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <ThemeSelector />
      </SidebarFooter>
    </Sidebar>
  );
}
