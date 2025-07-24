import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Settings } from "lucide-react";

export const TransmissionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const transmissions = [
    { id: "T001", station: "BS001", type: "Fibre Optique", debit: "1 Gbps", statut: "Actif", operateur: "Orange" },
    { id: "T002", station: "BS002", type: "Faisceau Hertzien", debit: "500 Mbps", statut: "Maintenance", operateur: "SFR" },
    { id: "T003", station: "BS003", type: "Fibre Optique", debit: "2 Gbps", statut: "Actif", operateur: "Bouygues" },
    { id: "T004", station: "BS004", type: "Satellite", debit: "100 Mbps", statut: "Défaillant", operateur: "Eutelsat" },
    { id: "T005", station: "BS005", type: "Fibre Optique", debit: "1 Gbps", statut: "Actif", operateur: "Free" },
    { id: "T006", station: "BS006", type: "Faisceau Hertzien", debit: "300 Mbps", statut: "Inactif", operateur: "Orange" },
  ];

  const filteredTransmissions = transmissions.filter(transmission =>
    transmission.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transmission.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transmission.operateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transmission.id.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-3xl font-bold tracking-tight">Transmissions</h2>
          <p className="text-muted-foreground">
            Gestion des liens de transmission de vos stations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Transmission
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liens de Transmission</CardTitle>
          <CardDescription>
            {filteredTransmissions.length} transmission(s) trouvée(s)
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une transmission..."
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
                <TableHead>Débit</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Opérateur</TableHead>
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