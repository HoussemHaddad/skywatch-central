import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

interface Transmission {
  id: string;
  station: string;
  type: string;
  debit: string;
  statut: string;
  operateur: string;
}

interface TransmissionSettingsDialogProps {
  transmission: Transmission;
  onUpdateTransmission?: (transmission: Transmission) => void;
  trigger?: React.ReactNode;
}

export const TransmissionSettingsDialog = ({ transmission, onUpdateTransmission, trigger }: TransmissionSettingsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    statut: transmission.statut,
    debit: transmission.debit,
    monitoring: true,
    alerts: true,
    backup: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTransmission = {
      ...transmission,
      statut: settings.statut,
      debit: settings.debit
    };
    onUpdateTransmission?.(updatedTransmission);
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
          <DialogTitle>Paramètres de la transmission {transmission.id}</DialogTitle>
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
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="debit">Débit</Label>
              <Input
                id="debit"
                value={settings.debit}
                onChange={(e) => setSettings({ ...settings, debit: e.target.value })}
                placeholder="ex: 1 Gbps"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="monitoring">Monitoring actif</Label>
                <Switch
                  id="monitoring"
                  checked={settings.monitoring}
                  onCheckedChange={(checked) => setSettings({ ...settings, monitoring: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="alerts">Alertes activées</Label>
                <Switch
                  id="alerts"
                  checked={settings.alerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, alerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="backup">Ligne de secours</Label>
                <Switch
                  id="backup"
                  checked={settings.backup}
                  onCheckedChange={(checked) => setSettings({ ...settings, backup: checked })}
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
