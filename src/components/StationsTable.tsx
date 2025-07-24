import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Edit, Trash2, Settings, Filter } from "lucide-react";
import { StationDialog } from "./StationDialog";

export const StationsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [stations, setStations] = useState([
    { id: "BS001", nom: "Station Tunis-Nord", localisation: "Tunis Ariana", statut: "Actif", type: "Macro", typetech: "4G", puissance: "40W", hauteurSupport: "45m" },
    { id: "BS002", nom: "Station Sfax-Centre", localisation: "Sfax Médina", statut: "Maintenance", type: "Micro", typetech: "5G", puissance: "20W", hauteurSupport: "25m" },
    { id: "BS003", nom: "Station Sousse-Sud", localisation: "Sousse Kantaoui", statut: "Actif", type: "Macro", typetech: "4G", puissance: "40W", hauteurSupport: "50m" },
    { id: "BS004", nom: "Station Gabès-Est", localisation: "Gabès Centre", statut: "Défaillant", type: "Pico", typetech: "3G", puissance: "10W", hauteurSupport: "15m" },
    { id: "BS005", nom: "Station Bizerte-Ouest", localisation: "Bizerte Port", statut: "Actif", type: "Micro", typetech: "5G", puissance: "25W", hauteurSupport: "30m" },
    { id: "BS006", nom: "Station Kairouan-Centre", localisation: "Kairouan Médina", statut: "Inactif", type: "Macro", typetech: "4G", puissance: "35W", hauteurSupport: "40m" },
  ]);

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.localisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || station.statut.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === "all" || station.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddStation = (newStation: any) => {
    setStations([...stations, newStation]);
  };

  const handleDeleteStation = (id: string) => {
    setStations(stations.filter(station => station.id !== id));
  };

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
        <StationDialog onAddStation={handleAddStation} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Stations</CardTitle>
          <CardDescription>
            {filteredStations.length} station(s) trouvée(s)
          </CardDescription>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une station..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="défaillant">Défaillant</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="macro">Macro</SelectItem>
                  <SelectItem value="micro">Micro</SelectItem>
                  <SelectItem value="pico">Pico</SelectItem>
                  <SelectItem value="femto">Femto</SelectItem>
                </SelectContent>
              </Select>
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
                <TableHead>Type Tech</TableHead>
                <TableHead>Puissance</TableHead>
                <TableHead>Hauteur Support</TableHead>
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
                  <TableCell>
                    <Badge variant="outline">{station.typetech}</Badge>
                  </TableCell>
                  <TableCell>{station.puissance}</TableCell>
                  <TableCell>{station.hauteurSupport}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteStation(station.id)}
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