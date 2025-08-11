import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit } from "lucide-react";
import { db } from "@/lib/db";
import { useToast } from "@/components/ui/use-toast";
import type { Station } from "@/lib/types";

interface StationDialogProps {
  onSuccess?: () => void;
  onAddStation?: (station: Partial<Station>) => void;
  station?: Station | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

export const StationDialog = ({ onSuccess, station, mode = 'add', trigger }: StationDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: "active" as const
  });

  useEffect(() => {
    if (station && mode === 'edit') {
      setFormData({
        name: station.name,
        location: station.location || "",
        status: station.status || "active"
      });
    } else {
      setFormData({
        name: "",
        location: "",
        status: "active"
      });
    }
  }, [station, mode, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === 'edit' && station) {
        await db.stations.update(station.id, formData);
        toast({
          title: "Station mise à jour",
          description: "La station a été mise à jour avec succès."
        });
      } else {
        const created = await db.stations.create(formData);
        toast({
          title: "Station créée",
          description: "La nouvelle station a été créée avec succès."
        });
        onAddStation?.(created);
      }
      setFormData({
        name: "",
        location: "",
        status: "active"
      });
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving station:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de la station.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const defaultTrigger = mode === 'edit' ? (
    <Button variant="ghost" size="icon">
      <Edit className="h-4 w-4" />
    </Button>
  ) : (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Nouvelle Station
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
            {mode === 'edit' ? 'Modifier la station' : 'Ajouter une nouvelle station'}
          </DialogTitle>
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
            <Button type="submit">
              {mode === 'edit' ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};