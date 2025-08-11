import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { DerangementDialog } from "./DerangementDialog";
import { DerangementSettingsDialog } from "./DerangementSettingsDialog";

interface Derangement {
  id: string;
  station: string;
  type: string;
  severite: string;
  description: string;
  date: string;
  statut: string;
}

type SortField = 'id' | 'station' | 'type' | 'severite' | 'description' | 'date' | 'statut';
type SortDirection = 'asc' | 'desc';

export const DerangementsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [derangements, setDerangements] = useState<Derangement[]>([
    { id: "DRG001", station: "BS001", type: "Panne équipement", severite: "Critique", description: "Panne complète du contrôleur principal", date: "22/01/2024", statut: "En cours" },
    { id: "DRG002", station: "BS002", type: "Problème transmission", severite: "Majeure", description: "Perte de signal intermittente", date: "21/01/2024", statut: "En cours" },
    { id: "DRG003", station: "BS003", type: "Coupure électrique", severite: "Critique", description: "Coupure totale d'alimentation", date: "20/01/2024", statut: "Résolu" },
    { id: "DRG004", station: "BS004", type: "Antenne défaillante", severite: "Majeure", description: "Antenne désalignée après tempête", date: "19/01/2024", statut: "En cours" },
    { id: "DRG005", station: "BS005", type: "Maintenance", severite: "Mineure", description: "Maintenance préventive requise", date: "18/01/2024", statut: "En attente" },
    { id: "DRG006", station: "BS006", type: "Maintenance", severite: "Faible", description: "Maintenance préventive programmée", date: "20/01/2024", statut: "En cours" },
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

  const sortDerangements = (derangements: Derangement[]) => {
    return [...derangements].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];
      
      // Handle date sorting
      if (sortField === 'date') {
        const aDate = new Date(aValue.split('/').reverse().join('-'));
        const bDate = new Date(bValue.split('/').reverse().join('-'));
        aValue = aDate.getTime();
        bValue = bDate.getTime();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredDerangements = sortDerangements(derangements.filter(derangement =>
    derangement.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
    derangement.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    derangement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    derangement.id.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const handleAddDerangement = (newDerangement: Derangement) => {
    setDerangements([...derangements, newDerangement]);
  };

  const handleEditDerangement = (updatedDerangement: Derangement) => {
    setDerangements(derangements.map(derangement => 
      derangement.id === updatedDerangement.id ? updatedDerangement : derangement
    ));
  };

  const handleUpdateDerangement = (updatedDerangement: Derangement) => {
    setDerangements(derangements.map(derangement => 
      derangement.id === updatedDerangement.id ? updatedDerangement : derangement
    ));
  };

  const handleDeleteDerangement = (id: string) => {
    setDerangements(derangements.filter(derangement => derangement.id !== id));
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critique":
        return <Badge variant="destructive">Critique</Badge>;
      case "majeure":
        return <Badge variant="fault">Majeure</Badge>;
      case "mineure":
        return <Badge variant="maintenance">Mineure</Badge>;
      default:
        return <Badge variant="outline">Faible</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "en cours":
        return <Badge variant="maintenance">En cours</Badge>;
      case "résolu":
        return <Badge variant="active">Résolu</Badge>;
      default:
        return <Badge variant="inactive">En attente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Dérangements</CardTitle>
              <CardDescription>
                Gestion des dérangements et incidents
              </CardDescription>
            </div>
            <DerangementDialog onAddDerangement={handleAddDerangement} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un dérangement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredDerangements.length} dérangement(s) trouvé(s)
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
                    onClick={() => handleSort('severite')}
                    className="h-auto p-0 font-medium"
                  >
                    Sévérité {getSortIcon('severite')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('description')}
                    className="h-auto p-0 font-medium"
                  >
                    Description {getSortIcon('description')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('date')}
                    className="h-auto p-0 font-medium"
                  >
                    Date {getSortIcon('date')}
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDerangements.map((derangement) => (
                <TableRow key={derangement.id}>
                  <TableCell className="font-medium">{derangement.id}</TableCell>
                  <TableCell>{derangement.station}</TableCell>
                  <TableCell>{derangement.type}</TableCell>
                  <TableCell>{getSeverityBadge(derangement.severite)}</TableCell>
                  <TableCell className="max-w-xs truncate">{derangement.description}</TableCell>
                  <TableCell>{derangement.date}</TableCell>
                  <TableCell>{getStatusBadge(derangement.statut)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" title="Voir les détails">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DerangementDialog
                        mode="edit"
                        derangement={derangement}
                        onEditDerangement={handleEditDerangement}
                        trigger={
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <DerangementSettingsDialog
                        derangement={derangement}
                        onUpdateDerangement={handleUpdateDerangement}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteDerangement(derangement.id)}
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