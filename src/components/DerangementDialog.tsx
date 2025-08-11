import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit } from "lucide-react";

interface Derangement {
  id: string;
  station: string;
  type: string;
  severite: string;
  description: string;
  date: string;
  statut: string;
}

interface DerangementDialogProps {
  onAddDerangement?: (derangement: Derangement) => void;
  onEditDerangement?: (derangement: Derangement) => void;
  derangement?: Derangement | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

export const DerangementDialog = ({ onAddDerangement, onEditDerangement, derangement, mode = 'add', trigger }: DerangementDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    station: "",
    type: "",
    severite: "",
    description: "",
    statut: "En cours"
  });

  useEffect(() => {
    if (derangement && mode === 'edit') {
      setFormData({
        station: derangement.station,
        type: derangement.type,
        severite: derangement.severite,
        description: derangement.description,
        statut: derangement.statut
      });
    } else {
      setFormData({
        station: "",
        type: "",
        severite: "",
        description: "",
        statut: "En cours"
      });
    }
  }, [derangement, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'edit' && derangement) {
      const updatedDerangement = {
        ...derangement,
        ...formData
      };
      onEditDerangement?.(updatedDerangement);
    } else {
      const newDerangement = {
        id: `DRG${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        ...formData,
        date: new Date().toLocaleDateString('fr-FR')
      };
      onAddDerangement?.(newDerangement);
    }
    
    setFormData({
      station: "",
      type: "",
      severite: "",
      description: "",
      statut: "En cours"
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
      Nouveau Dérangement
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
            {mode === 'edit' ? 'Modifier le dérangement' : 'Ajouter un nouveau dérangement'}
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
                  <SelectItem value="Panne équipement">Panne équipement</SelectItem>
                  <SelectItem value="Problème transmission">Problème transmission</SelectItem>
                  <SelectItem value="Coupure électrique">Coupure électrique</SelectItem>
                  <SelectItem value="Antenne défaillante">Antenne défaillante</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="severite">Sévérité</Label>
              <Select value={formData.severite} onValueChange={(value) => setFormData({ ...formData, severite: value })}>
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
              <Label htmlFor="statut">Statut</Label>
              <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description détaillée du problème..."
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