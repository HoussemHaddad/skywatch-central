import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Settings, Trash2, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { TransmissionDialog } from "./TransmissionDialog";
import { TransmissionSettingsDialog } from "./TransmissionSettingsDialog";

interface Transmission {
  id: string;
  station: string;
  type: string;
  debit: string;
  statut: string;
  operateur: string;
}

type SortField = 'id' | 'station' | 'type' | 'debit' | 'statut' | 'operateur';
type SortDirection = 'asc' | 'desc';

export const TransmissionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [transmissions, setTransmissions] = useState<Transmission[]>([
    { id: "TX001", station: "BS001", type: "Fibre optique", debit: "1 Gbps", statut: "Actif", operateur: "Tunisie Telecom" },
    { id: "TX002", station: "BS002", type: "Faisceau hertzien", debit: "500 Mbps", statut: "Maintenance", operateur: "Ooredoo" },
    { id: "TX003", station: "BS003", type: "Fibre optique", debit: "2 Gbps", statut: "Actif", operateur: "Orange" },
    { id: "TX004", station: "BS004", type: "Satellite", debit: "100 Mbps", statut: "Inactif", operateur: "Tunisie Telecom" },
    { id: "TX005", station: "BS005", type: "Fibre optique", debit: "1 Gbps", statut: "Actif", operateur: "Ooredoo" },
    { id: "TX006", station: "BS006", type: "Faisceau hertzien", debit: "300 Mbps", statut: "Inactif", operateur: "Orange" },
    { id: "TX007", station: "BS007", type: "Fibre optique", debit: "1.5 Gbps", statut: "Actif", operateur: "Tunisie Telecom" },
    { id: "TX008", station: "BS008", type: "Cuivre", debit: "10 Mbps", statut: "Maintenance", operateur: "Tunisie Telecom" },
  ]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const sortTransmissions = (transmissions: Transmission[]) => {
    return [...transmissions].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle numeric values for debit
      if (sortField === 'debit') {
        const aNum = parseFloat(aValue.replace(/[^\d.]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^\d.]/g, ''));
        if (aValue.includes('Gbps')) aValue = aNum * 1000;
        else if (aValue.includes('Mbps')) aValue = aNum;
        if (bValue.includes('Gbps')) bValue = bNum * 1000;
        else if (bValue.includes('Mbps')) bValue = bNum;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredTransmissions = sortTransmissions(transmissions.filter(transmission =>
    transmission.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transmission.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transmission.operateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transmission.id.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const handleAddTransmission = (newTransmission: Transmission) => {
    setTransmissions([...transmissions, newTransmission]);
  };

  const handleEditTransmission = (updatedTransmission: Transmission) => {
    setTransmissions(transmissions.map(transmission => 
      transmission.id === updatedTransmission.id ? updatedTransmission : transmission
    ));
  };

  const handleUpdateTransmission = (updatedTransmission: Transmission) => {
    setTransmissions(transmissions.map(transmission => 
      transmission.id === updatedTransmission.id ? updatedTransmission : transmission
    ));
  };

  const handleDeleteTransmission = (id: string) => {
    setTransmissions(transmissions.filter(transmission => transmission.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "actif":
        return <Badge variant="active">Actif</Badge>;
      case "maintenance":
        return <Badge variant="maintenance">Maintenance</Badge>;
      default:
        return <Badge variant="inactive">Inactif</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transmissions</CardTitle>
              <CardDescription>
                Gestion des transmissions de données
              </CardDescription>
            </div>
            <TransmissionDialog onAddTransmission={handleAddTransmission} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une transmission..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredTransmissions.length} transmission(s) trouvée(s)
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('id')}
                    className="h-auto p-0 font-medium"
                  >
                    ID {getSortIcon('id')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('station')}
                    className="h-auto p-0 font-medium"
                  >
                    Station {getSortIcon('station')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('type')}
                    className="h-auto p-0 font-medium"
                  >
                    Type {getSortIcon('type')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('debit')}
                    className="h-auto p-0 font-medium"
                  >
                    Débit {getSortIcon('debit')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('statut')}
                    className="h-auto p-0 font-medium"
                  >
                    Statut {getSortIcon('statut')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('operateur')}
                    className="h-auto p-0 font-medium"
                  >
                    Opérateur {getSortIcon('operateur')}
                  </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransmissions.map((transmission) => (
                <TableRow key={transmission.id}>
                  <TableCell className="font-medium">{transmission.id}</TableCell>
                  <TableCell>{transmission.station}</TableCell>
                  <TableCell>{transmission.type}</TableCell>
                  <TableCell>{transmission.debit}</TableCell>
                  <TableCell>{getStatusBadge(transmission.statut)}</TableCell>
                  <TableCell>{transmission.operateur}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <TransmissionDialog
                        mode="edit"
                        transmission={transmission}
                        onEditTransmission={handleEditTransmission}
                        trigger={
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <TransmissionSettingsDialog
                        transmission={transmission}
                        onUpdateTransmission={handleUpdateTransmission}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteTransmission(transmission.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};