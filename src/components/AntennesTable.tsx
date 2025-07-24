import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Settings } from "lucide-react";

export const AntennesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const antennes = [
    { id: "A001", station: "BS001", type: "Directive", frequence: "2.1 GHz", azimut: "45°", inclinaison: "3°" },
    { id: "A002", station: "BS001", type: "Omnidirectionnelle", frequence: "900 MHz", azimut: "0°", inclinaison: "0°" },
    { id: "A003", station: "BS002", type: "Directive", frequence: "1.8 GHz", azimut: "120°", inclinaison: "5°" },
    { id: "A004", station: "BS003", type: "Directive", frequence: "2.6 GHz", azimut: "240°", inclinaison: "2°" },
    { id: "A005", station: "BS004", type: "Panneau", frequence: "3.5 GHz", azimut: "180°", inclinaison: "8°" },
    { id: "A006", station: "BS005", type: "Directive", frequence: "700 MHz", azimut: "90°", inclinaison: "4°" },
  ];

  const filteredAntennes = antennes.filter(antenne =>
    antenne.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
    antenne.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    antenne.frequence.toLowerCase().includes(searchTerm.toLowerCase()) ||
    antenne.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Antennes</h2>
          <p className="text-muted-foreground">
            Configuration des antennes de vos stations de base
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle Antenne
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration des Antennes</CardTitle>
          <CardDescription>
            {filteredAntennes.length} antenne(s) trouvée(s)
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une antenne..."
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
                <TableHead>Fréquence</TableHead>
                <TableHead>Azimut</TableHead>
                <TableHead>Inclinaison</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAntennes.map((antenne) => (
                <TableRow key={antenne.id}>
                  <TableCell className="font-medium">{antenne.id}</TableCell>
                  <TableCell>{antenne.station}</TableCell>
                  <TableCell>{antenne.type}</TableCell>
                  <TableCell>{antenne.frequence}</TableCell>
                  <TableCell>{antenne.azimut}</TableCell>
                  <TableCell>{antenne.inclinaison}</TableCell>
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