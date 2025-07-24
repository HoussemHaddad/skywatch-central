import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface StationDialogProps {
  onAddStation?: (station: any) => void;
}

export const StationDialog = ({ onAddStation }: StationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    localisation: "",
    type: "",
    typetech: "",
    puissance: "",
    hauteurSupport: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStation = {
      id: `BS${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...formData,
      statut: "Actif"
    };
    onAddStation?.(newStation);
    setFormData({
      nom: "",
      localisation: "",
      type: "",
      typetech: "",
      puissance: "",
      hauteurSupport: ""
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Station
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle station</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localisation">Localisation</Label>
              <Input
                id="localisation"
                value={formData.localisation}
                onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Macro">Macro</SelectItem>
                  <SelectItem value="Micro">Micro</SelectItem>
                  <SelectItem value="Pico">Pico</SelectItem>
                  <SelectItem value="Femto">Femto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="typetech">Type Tech</Label>
              <Select value={formData.typetech} onValueChange={(value) => setFormData({ ...formData, typetech: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2G">2G</SelectItem>
                  <SelectItem value="3G">3G</SelectItem>
                  <SelectItem value="4G">4G</SelectItem>
                  <SelectItem value="5G">5G</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="puissance">Puissance</Label>
              <Input
                id="puissance"
                value={formData.puissance}
                onChange={(e) => setFormData({ ...formData, puissance: e.target.value })}
                placeholder="ex: 40W"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hauteurSupport">Hauteur Support</Label>
              <Input
                id="hauteurSupport"
                value={formData.hauteurSupport}
                onChange={(e) => setFormData({ ...formData, hauteurSupport: e.target.value })}
                placeholder="ex: 30m"
                required
              />
            </div>
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