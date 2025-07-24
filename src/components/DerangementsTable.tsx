import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

export const DerangementsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const derangements = [
    { id: "D001", station: "BS002", type: "Transmission", severite: "Moyenne", description: "Perte de signal intermittente", date: "2024-01-15", statut: "En cours" },
    { id: "D002", station: "BS004", type: "Antenne", severite: "Haute", description: "Antenne désalignée après tempête", date: "2024-01-14", statut: "Critique" },
    { id: "D003", station: "BS001", type: "Alimentation", severite: "Faible", description: "Fluctuation de tension détectée", date: "2024-01-13", statut: "Résolu" },
    { id: "D004", station: "BS003", type: "Refroidissement", severite: "Haute", description: "Surchauffe des équipements", date: "2024-01-12", statut: "En cours" },
    { id: "D005", station: "BS005", type: "Connectivité", severite: "Moyenne", description: "Latence élevée observée", date: "2024-01-11", statut: "Planifié" },
    { id: "D006", station: "BS006", type: "Hardware", severite: "Faible", description: "Alerte maintenance préventive", date: "2024-01-10", statut: "Résolu" },
  ];

  const filteredDerangements = derangements.filter(derangement =>
    derangement.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
    derangement.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    derangement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    derangement.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "haute":
        return <Badge variant="fault">Haute</Badge>;
      case "moyenne":
        return <Badge variant="maintenance">Moyenne</Badge>;
      case "faible":
        return <Badge variant="active">Faible</Badge>;
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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Dérangement
        </Button>
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
                      <Button variant="ghost" size="icon">
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