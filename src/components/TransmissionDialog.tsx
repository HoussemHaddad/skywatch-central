import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit } from "lucide-react";

interface Transmission {
  id: string;
  station: string;
  type: string;
  debit: string;
  statut: string;
  operateur: string;
}

interface TransmissionDialogProps {
  onAddTransmission?: (transmission: Transmission) => void;
  onEditTransmission?: (transmission: Transmission) => void;
  transmission?: Transmission | null;
  mode?: 'add' | 'edit';
  trigger?: React.ReactNode;
}

export const TransmissionDialog = ({ onAddTransmission, onEditTransmission, transmission, mode = 'add', trigger }: TransmissionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    station: "",
    type: "",
    debit: "",
    operateur: "",
    statut: "Actif"
  });

  useEffect(() => {
    if (transmission && mode === 'edit') {
      setFormData({
        station: transmission.station,
        type: transmission.type,
        debit: transmission.debit,
        operateur: transmission.operateur,
        statut: transmission.statut
      });
    } else {
      setFormData({
        station: "",
        type: "",
        debit: "",
        operateur: "",
        statut: "Actif"
      });
    }
  }, [transmission, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'edit' && transmission) {
      const updatedTransmission = {
        ...transmission,
        ...formData
      };
      onEditTransmission?.(updatedTransmission);
    } else {
      const newTransmission = {
        id: `TX${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        ...formData
      };
      onAddTransmission?.(newTransmission);
    }
    
    setFormData({
      station: "",
      type: "",
      debit: "",
      operateur: "",
      statut: "Actif"
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
      Nouvelle Transmission
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
            {mode === 'edit' ? 'Modifier la transmission' : 'Ajouter une nouvelle transmission'}
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
                  <SelectItem value="Fibre optique">Fibre optique</SelectItem>
                  <SelectItem value="Faisceau hertzien">Faisceau hertzien</SelectItem>
                  <SelectItem value="Satellite">Satellite</SelectItem>
                  <SelectItem value="Cuivre">Cuivre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debit">Débit</Label>
              <Input
                id="debit"
                value={formData.debit}
                onChange={(e) => setFormData({ ...formData, debit: e.target.value })}
                placeholder="ex: 1 Gbps"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operateur">Opérateur</Label>
              <Select value={formData.operateur} onValueChange={(value) => setFormData({ ...formData, operateur: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tunisie Telecom">Tunisie Telecom</SelectItem>
                  <SelectItem value="Ooredoo">Ooredoo</SelectItem>
                  <SelectItem value="Orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
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