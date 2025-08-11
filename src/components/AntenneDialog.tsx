import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit } from "lucide-react";

interface Antenne {
  id: string;
  station: string;
  type: string;
  frequence: string;
  azimut: string;
  inclinaison: string;
}

interface AntenneDialogProps {
  onAddAntenne?: (antenne: Antenne) => void;
  onEditAntenne?: (antenne: Antenne) => void;
  antenne?: Antenne | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

export const AntenneDialog = ({ onAddAntenne, onEditAntenne, antenne, mode = 'add', trigger }: AntenneDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    station: "",
    type: "",
    frequence: "",
    azimut: "",
    inclinaison: ""
  });

  useEffect(() => {
    if (antenne && mode === 'edit') {
      setFormData({
        station: antenne.station,
        type: antenne.type,
        frequence: antenne.frequence,
        azimut: antenne.azimut,
        inclinaison: antenne.inclinaison
      });
    } else {
      setFormData({
        station: "",
        type: "",
        frequence: "",
        azimut: "",
        inclinaison: ""
      });
    }
  }, [antenne, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'edit' && antenne) {
      const updatedAntenne = {
        ...antenne,
        ...formData
      };
      onEditAntenne?.(updatedAntenne);
    } else {
      const newAntenne = {
        id: `ANT${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        ...formData
      };
      onAddAntenne?.(newAntenne);
    }
    
    setFormData({
      station: "",
      type: "",
      frequence: "",
      azimut: "",
      inclinaison: ""
    });
    setOpen(false);
  };

  const defaultTrigger = mode === 'edit' ? (
    <Button variant="ghost" size="icon">
      <Edit className="h-4 w-4" />
    </Button>
  ) : (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Nouvelle Antenne
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Modifier l\'antenne' : 'Ajouter une nouvelle antenne'}
          </DialogTitle>
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
                placeholder="ex: 45°"
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
              placeholder="ex: 3°"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {mode === 'edit' ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};