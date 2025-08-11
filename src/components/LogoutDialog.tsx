import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { LogOut, AlertTriangle } from "lucide-react";

interface LogoutDialogProps {
  onLogout: () => void;
}

export const LogoutDialog = ({ onLogout }: LogoutDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Se déconnecter">
          <LogOut className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span>Confirmer la déconnexion</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Êtes-vous sûr de vouloir vous déconnecter ? Toutes les modifications non sauvegardées seront perdues.
          </p>
          
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Rappel :</strong> Assurez-vous que toutes vos modifications ont été sauvegardées avant de vous déconnecter.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


