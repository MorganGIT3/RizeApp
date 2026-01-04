import { 
  BarChart3, 
  Bot, 
  Calendar, 
  DollarSign, 
  Home, 
  Settings, 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  Layout
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "wouter";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Contenu",
    url: "/content",
    icon: BarChart3,
  },
  {
    title: "Publicités",
    url: "/ads",
    icon: Target,
  },
  {
    title: "Entonnoir",
    url: "/funnel",
    icon: Users,
  },
  {
    title: "Calendrier",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Chatbot IA",
    url: "/chatbot",
    icon: Bot,
  },
  {
    title: "Revenus",
    url: "/revenue",
    icon: DollarSign,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: TrendingUp,
  },
  {
    title: "KPIs",
    url: "/kpis",
    icon: Zap,
  },
  {
    title: "LandingPage et site",
    url: "/landing-pages",
    icon: Layout,
  }
];

interface AppSidebarProps {
  onNavigate?: (path: string) => void;
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const [location] = useLocation();

  return (
    <Sidebar className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 border-r border-neutral-800">
      <SidebarHeader className="p-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-t from-white to-gray-100">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white">RizeApps™</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={`${isActive ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30" : "text-gray-300 hover:bg-white/10 hover:text-white"} transition-all duration-200`}
                      data-testid={`nav-${item.title.toLowerCase()}`}
                    >
                      <button
                        onClick={() => {
                          console.log(`Navigate to ${item.url}`);
                          onNavigate?.(item.url);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Paramètres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild data-testid="nav-settings">
                  <button 
                    onClick={() => {
                      console.log('Navigate to /settings');
                      onNavigate?.('/settings');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Paramètres</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-gradient-to-t from-white to-gray-100 text-white">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">John Doe</p>
            <p className="text-xs text-gray-400 truncate">john@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}