import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Search } from "lucide-react";
import { DerangementDialog } from "./DerangementDialog";

export const DerangementsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [derangements, setDerangements] = useState([
    { id: "DRG001", station: "BS001", type: "Panne équipement", severite: "Critique", description: "Panne complète du contrôleur principal", date: "22/01/2024", statut: "En cours" },
    { id: "DRG002", station: "BS002", type: "Problème transmission", severite: "Majeure", description: "Perte de signal intermittente", date: "21/01/2024", statut: "En cours" },
    { id: "DRG003", station: "BS003", type: "Coupure électrique", severite: "Critique", description: "Coupure totale d'alimentation", date: "20/01/2024", statut: "Résolu" },
    { id: "DRG004", station: "BS004", type: "Antenne défaillante", severite: "Majeure", description: "Antenne désalignée après tempête", date: "19/01/2024", statut: "En cours" },
    { id: "DRG005", station: "BS005", type: "Maintenance", severite: "Mineure", description: "Maintenance préventive requise", date: "18/01/2024", statut: "En attente" },
    { id: "DRG006", station: "BS006", type: "Maintenance", severite: "Faible", description: "Maintenance préventive programmée", date: "20/01/2024", statut: "En cours" },
  ]);

  const filteredDerangements = derangements.filter(derangement =>
    derangement.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
    derangement.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    derangement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    derangement.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critique":
        return <Badge variant="fault">Critique</Badge>;
      case "majeure":
        return <Badge variant="maintenance">Majeure</Badge>;
      case "mineure":
        return <Badge variant="active">Mineure</Badge>;
      case "faible":
        return <Badge variant="inactive">Faible</Badge>;
      default:
        return <Badge variant="inactive">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "résolu":
        return <Badge variant="active">Résolu</Badge>;
      case "en cours":
        return <Badge variant="maintenance">En cours</Badge>;
      case "critique":
        return <Badge variant="fault">Critique</Badge>;
      case "planifié":
        return <Badge variant="inactive">Planifié</Badge>;
      default:
        return <Badge variant="inactive">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dérangements</h2>
          <p className="text-muted-foreground">
            Suivi des incidents et maintenance de votre réseau
          </p>
        </div>
        <DerangementDialog onAddDerangement={(newDerangement) => setDerangements([...derangements, newDerangement])} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incidents et Maintenance</CardTitle>
          <CardDescription>
            {filteredDerangements.length} dérangement(s) trouvé(s)
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un dérangement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Sévérité</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
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
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setDerangements(derangements.filter(d => d.id !== derangement.id))}
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