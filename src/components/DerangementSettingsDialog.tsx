import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

interface Derangement {
  id: string;
  station: string;
  type: string;
  severite: string;
  description: string;
  date: string;
  statut: string;
}

interface DerangementSettingsDialogProps {
  derangement: Derangement;
  onUpdateDerangement?: (derangement: Derangement) => void;
  trigger?: React.ReactNode;
}

export const DerangementSettingsDialog = ({ derangement, onUpdateDerangement, trigger }: DerangementSettingsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    statut: derangement.statut,
    severite: derangement.severite,
    notifications: true,
    autoEscalation: false,
    priority: "Normal"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedDerangement = {
      ...derangement,
      statut: settings.statut,
      severite: settings.severite
    };
    onUpdateDerangement?.(updatedDerangement);
    setOpen(false);
  };

  const defaultTrigger = (
    <Button variant="ghost" size="icon">
      <Settings className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Paramètres du dérangement {derangement.id}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select value={settings.statut} onValueChange={(value) => setSettings({ ...settings, statut: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Résolu">Résolu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severite">Sévérité</Label>
              <Select value={settings.severite} onValueChange={(value) => setSettings({ ...settings, severite: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Critique">Critique</SelectItem>
                  <SelectItem value="Majeure">Majeure</SelectItem>
                  <SelectItem value="Mineure">Mineure</SelectItem>
                  <SelectItem value="Faible">Faible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select value={settings.priority} onValueChange={(value) => setSettings({ ...settings, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Haute">Haute</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Basse">Basse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications actives</Label>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoEscalation">Escalade automatique</Label>
                <Switch
                  id="autoEscalation"
                  checked={settings.autoEscalation}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoEscalation: checked })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Sauvegarder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
