import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AntenneDialogProps {
  onAddAntenne?: (antenne: any) => void;
}

export const AntenneDialog = ({ onAddAntenne }: AntenneDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    station: "",
    type: "",
    frequence: "",
    azimut: "",
    inclinaison: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAntenne = {
      id: `ANT${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...formData
    };
    onAddAntenne?.(newAntenne);
    setFormData({
      station: "",
      type: "",
      frequence: "",
      azimut: "",
      inclinaison: ""
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Antenne
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle antenne</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="station">Station</Label>
              <Input
                id="station"
                value={formData.station}
                onChange={(e) => setFormData({ ...formData, station: e.target.value })}
                placeholder="BS001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sectorielle">Sectorielle</SelectItem>
                  <SelectItem value="Omnidirectionnelle">Omnidirectionnelle</SelectItem>
                  <SelectItem value="Panneau">Panneau</SelectItem>
                  <SelectItem value="Yagi">Yagi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequence">Fréquence</Label>
              <Input
                id="frequence"
                value={formData.frequence}
                onChange={(e) => setFormData({ ...formData, frequence: e.target.value })}
                placeholder="ex: 2.1 GHz"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="azimut">Azimut</Label>
              <Input
                id="azimut"
                value={formData.azimut}
                onChange={(e) => setFormData({ ...formData, azimut: e.target.value })}
                placeholder="ex: 120°"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inclinaison">Inclinaison</Label>
            <Input
              id="inclinaison"
              value={formData.inclinaison}
              onChange={(e) => setFormData({ ...formData, inclinaison: e.target.value })}
              placeholder="ex: 5°"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};