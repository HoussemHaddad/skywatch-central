import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

interface Station {
  id: string;
  nom: string;
  localisation: string;
  statut: string;
  type: string;
  typetech: string;
  puissance: string;
  hauteurSupport: string;
}

interface StationSettingsDialogProps {
  station: Station;
  onUpdateStation?: (station: Station) => void;
  trigger?: React.ReactNode;
}

export const StationSettingsDialog = ({ station, onUpdateStation, trigger }: StationSettingsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    statut: station.statut,
    puissance: station.puissance,
    monitoring: true,
    alerts: true,
    maintenance: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStation = {
      ...station,
      statut: settings.statut,
      puissance: settings.puissance
    };
    onUpdateStation?.(updatedStation);
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
          <DialogTitle>Paramètres de la station {station.id}</DialogTitle>
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
                  <SelectItem value="Défaillant">Défaillant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="puissance">Puissance</Label>
              <Input
                id="puissance"
                value={settings.puissance}
                onChange={(e) => setSettings({ ...settings, puissance: e.target.value })}
                placeholder="ex: 40W"
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
                <Label htmlFor="maintenance">Mode maintenance</Label>
                <Switch
                  id="maintenance"
                  checked={settings.maintenance}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenance: checked })}
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
