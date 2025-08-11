import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Radio, 
  Settings, 
  Activity, 
  AlertTriangle
} from "lucide-react";
import { NotificationsDialog } from "./NotificationsDialog";
import { UserProfileDialog } from "./UserProfileDialog";
import { LogoutDialog } from "./LogoutDialog";

interface LayoutProps {
  children: ReactNode;
  currentView?: string;
  onViewChange?: (view: string) => void;
  onLogout?: () => void;
}

export const Layout = ({ children, currentView, onViewChange, onLogout }: LayoutProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "stations", label: "Stations de Base", icon: Radio },
    { id: "transmissions", label: "Transmissions", icon: Settings },
    { id: "antennes", label: "Antennes", icon: Radio },
    { id: "derangements", label: "Dérangements", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/d3bc21d6-d98d-4d6f-aba3-ba9e89559c88.png" 
                alt="Tunisie Telecom" 
                className="h-10 w-auto"
              />
              <h1 className="text-xl font-bold">Base Station Controller</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationsDialog />
            <UserProfileDialog />
            <LogoutDialog onLogout={onLogout || (() => {})} />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card/30 backdrop-blur-sm">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => onViewChange?.(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};