import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import type { Theme } from "@/providers/ThemeProvider";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

interface ThemeOption {
  id: Theme;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const themeOptions: ThemeOption[] = [
  { id: "light", label: "Claro", icon: Sun },
  { id: "dark", label: "Escuro", icon: Moon },
  { id: "system", label: "Sistema", icon: Laptop },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenu className="flex-row gap-1 p-1 bg-muted rounded-lg w-full">
      {themeOptions.map((option) => (
        <SidebarMenuItem key={option.id} className="flex-1">
          <SidebarMenuButton
            isActive={theme === option.id}
            onClick={() => setTheme(option.id)}
            className="justify-center w-full h-8 data-[active=true]:bg-background data-[active=true]:shadow-sm"
            title={option.label}
          >
            <option.icon className="h-4 w-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
