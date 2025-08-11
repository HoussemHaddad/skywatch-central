import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

interface Antenne {
  id: string;
  station: string;
  type: string;
  frequence: string;
  azimut: string;
  inclinaison: string;
}

interface AntenneSettingsDialogProps {
  antenne: Antenne;
  onUpdateAntenne?: (antenne: Antenne) => void;
  trigger?: React.ReactNode;
}

export const AntenneSettingsDialog = ({ antenne, onUpdateAntenne, trigger }: AntenneSettingsDialogProps) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    frequence: antenne.frequence,
    azimut: antenne.azimut,
    inclinaison: antenne.inclinaison,
    monitoring: true,
    alerts: true,
    calibration: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAntenne = {
      ...antenne,
      frequence: settings.frequence,
      azimut: settings.azimut,
      inclinaison: settings.inclinaison
    };
    onUpdateAntenne?.(updatedAntenne);
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
          <DialogTitle>Paramètres de l'antenne {antenne.id}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frequence">Fréquence</Label>
              <Input
                id="frequence"
                value={settings.frequence}
                onChange={(e) => setSettings({ ...settings, frequence: e.target.value })}
                placeholder="ex: 2.1 GHz"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="azimut">Azimut</Label>
                <Input
                  id="azimut"
                  value={settings.azimut}
                  onChange={(e) => setSettings({ ...settings, azimut: e.target.value })}
                  placeholder="ex: 45°"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inclinaison">Inclinaison</Label>
                <Input
                  id="inclinaison"
                  value={settings.inclinaison}
                  onChange={(e) => setSettings({ ...settings, inclinaison: e.target.value })}
                  placeholder="ex: 3°"
                />
              </div>
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
                <Label htmlFor="calibration">Calibration automatique</Label>
                <Switch
                  id="calibration"
                  checked={settings.calibration}
                  onCheckedChange={(checked) => setSettings({ ...settings, calibration: checked })}
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
