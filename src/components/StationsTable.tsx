import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Settings } from "lucide-react";

export const StationsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stations = [
    { id: "BS001", nom: "Station Paris-Nord", localisation: "Paris 18ème", statut: "Actif", type: "Macro", puissance: "40W" },
    { id: "BS002", nom: "Station Lyon-Centre", localisation: "Lyon 2ème", statut: "Maintenance", type: "Micro", puissance: "20W" },
    { id: "BS003", nom: "Station Marseille-Sud", localisation: "Marseille 8ème", statut: "Actif", type: "Macro", puissance: "40W" },
    { id: "BS004", nom: "Station Toulouse-Est", localisation: "Toulouse 3ème", statut: "Défaillant", type: "Pico", puissance: "10W" },
    { id: "BS005", nom: "Station Nice-Ouest", localisation: "Nice 6ème", statut: "Actif", type: "Micro", puissance: "25W" },
    { id: "BS006", nom: "Station Bordeaux-Centre", localisation: "Bordeaux 1er", statut: "Inactif", type: "Macro", puissance: "35W" },
  ];

  const filteredStations = stations.filter(station =>
    station.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.localisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "actif":
        return <Badge variant="active">Actif</Badge>;
      case "maintenance":
        return <Badge variant="maintenance">Maintenance</Badge>;
      case "défaillant":
        return <Badge variant="fault">Défaillant</Badge>;
      default:
        return <Badge variant="inactive">Inactif</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stations de Base</h2>
          <p className="text-muted-foreground">
            Gestion des stations de base de votre réseau
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Station
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Stations</CardTitle>
          <CardDescription>
            {filteredStations.length} station(s) trouvée(s)
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une station..."
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
                <TableHead>Nom</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Puissance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStations.map((station) => (
                <TableRow key={station.id}>
                  <TableCell className="font-medium">{station.id}</TableCell>
                  <TableCell>{station.nom}</TableCell>
                  <TableCell>{station.localisation}</TableCell>
                  <TableCell>{getStatusBadge(station.statut)}</TableCell>
                  <TableCell>{station.type}</TableCell>
                  <TableCell>{station.puissance}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
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