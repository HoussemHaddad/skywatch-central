import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Shield, Bell, Moon, Sun, LogOut } from "lucide-react";

export const UserProfileDialog = () => {
  const [open, setOpen] = useState(false);
  const [userSettings, setUserSettings] = useState({
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    autoLogout: false
  });

  const user = {
    name: "Ahmed Ben Ali",
    email: "ahmed.benali@tunisietelecom.tn",
    role: "Administrateur Système",
    department: "Réseau & Infrastructure",
    lastLogin: "Aujourd'hui à 14:30",
    avatar: "/placeholder.svg"
  };

  const handleSettingChange = (setting: keyof typeof userSettings) => {
    setUserSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Profil utilisateur">
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Profil Utilisateur</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Info Section */}
          <div className="flex items-center space-x-4 p-4 rounded-lg border bg-muted/30">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary">{user.role}</Badge>
                <Badge variant="outline">{user.department}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Dernière connexion: {user.lastLogin}
              </p>
            </div>
          </div>

          {/* Settings Section */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Paramètres</span>
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Moon className="h-4 w-4" />
                  <Label htmlFor="darkMode">Mode sombre</Label>
                </div>
                <Switch
                  id="darkMode"
                  checked={userSettings.darkMode}
                  onCheckedChange={() => handleSettingChange('darkMode')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="notifications">Notifications push</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={userSettings.notifications}
                  onCheckedChange={() => handleSettingChange('notifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <Label htmlFor="emailAlerts">Alertes par email</Label>
                </div>
                <Switch
                  id="emailAlerts"
                  checked={userSettings.emailAlerts}
                  onCheckedChange={() => handleSettingChange('emailAlerts')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <Label htmlFor="autoLogout">Déconnexion automatique</Label>
                </div>
                <Switch
                  id="autoLogout"
                  checked={userSettings.autoLogout}
                  onCheckedChange={() => handleSettingChange('autoLogout')}
                />
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button variant="outline" className="flex-1">
              Modifier le profil
            </Button>
            <Button variant="outline" className="flex-1">
              Changer le mot de passe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


