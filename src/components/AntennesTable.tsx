import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Settings, Trash2, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { AntenneDialog } from "./AntenneDialog";
import { AntenneSettingsDialog } from "./AntenneSettingsDialog";

interface Antenne {
  id: string;
  station: string;
  type: string;
  frequence: string;
  azimut: string;
  inclinaison: string;
}

type SortField = 'id' | 'station' | 'type' | 'frequence' | 'azimut' | 'inclinaison';
type SortDirection = 'asc' | 'desc';

export const AntennesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [antennes, setAntennes] = useState<Antenne[]>([
    { id: "ANT001", station: "BS001", type: "Sectorielle", frequence: "2.1 GHz", azimut: "45°", inclinaison: "3°" },
    { id: "ANT002", station: "BS001", type: "Omnidirectionnelle", frequence: "900 MHz", azimut: "0°", inclinaison: "0°" },
    { id: "ANT003", station: "BS002", type: "Sectorielle", frequence: "1.8 GHz", azimut: "120°", inclinaison: "5°" },
    { id: "ANT004", station: "BS003", type: "Sectorielle", frequence: "2.6 GHz", azimut: "240°", inclinaison: "2°" },
    { id: "ANT005", station: "BS004", type: "Panneau", frequence: "3.5 GHz", azimut: "180°", inclinaison: "8°" },
    { id: "ANT006", station: "BS005", type: "Sectorielle", frequence: "700 MHz", azimut: "90°", inclinaison: "4°" },
    { id: "ANT007", station: "BS007", type: "Panneau", frequence: "2.6 GHz", azimut: "300°", inclinaison: "6°" },
    { id: "ANT008", station: "BS008", type: "Yagi", frequence: "800 MHz", azimut: "360°", inclinaison: "0°" },
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

  const sortAntennes = (antennes: Antenne[]) => {
    return [...antennes].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];
      
      // Handle numeric values for frequence, azimut, and inclinaison
      if (sortField === 'frequence') {
        const aNum = parseFloat(aValue.replace(/[^\d.]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^\d.]/g, ''));
        if (aValue.includes('GHz')) aValue = aNum * 1000;
        else if (aValue.includes('MHz')) aValue = aNum;
        if (bValue.includes('GHz')) bValue = bNum * 1000;
        else if (bValue.includes('MHz')) bValue = bNum;
      } else if (sortField === 'azimut' || sortField === 'inclinaison') {
        aValue = parseFloat(aValue.replace('°', ''));
        bValue = parseFloat(bValue.replace('°', ''));
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredAntennes = sortAntennes(antennes.filter(antenne =>
    antenne.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
    antenne.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    antenne.frequence.toLowerCase().includes(searchTerm.toLowerCase()) ||
    antenne.id.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const handleAddAntenne = (newAntenne: Antenne) => {
    setAntennes([...antennes, newAntenne]);
  };

  const handleEditAntenne = (updatedAntenne: Antenne) => {
    setAntennes(antennes.map(antenne => 
      antenne.id === updatedAntenne.id ? updatedAntenne : antenne
    ));
  };

  const handleUpdateAntenne = (updatedAntenne: Antenne) => {
    setAntennes(antennes.map(antenne => 
      antenne.id === updatedAntenne.id ? updatedAntenne : antenne
    ));
  };

  const handleDeleteAntenne = (id: string) => {
    setAntennes(antennes.filter(antenne => antenne.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Antennes</CardTitle>
              <CardDescription>
                Gestion des antennes de vos stations
              </CardDescription>
            </div>
            <AntenneDialog onAddAntenne={handleAddAntenne} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une antenne..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredAntennes.length} antenne(s) trouvée(s)
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
                    onClick={() => handleSort('frequence')}
                    className="h-auto p-0 font-medium"
                  >
                    Fréquence {getSortIcon('frequence')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('azimut')}
                    className="h-auto p-0 font-medium"
                  >
                    Azimut {getSortIcon('azimut')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('inclinaison')}
                    className="h-auto p-0 font-medium"
                  >
                    Inclinaison {getSortIcon('inclinaison')}
                  </Button>
                </TableHead>
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
                      <AntenneDialog
                        mode="edit"
                        antenne={antenne}
                        onEditAntenne={handleEditAntenne}
                        trigger={
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <AntenneSettingsDialog
                        antenne={antenne}
                        onUpdateAntenne={handleUpdateAntenne}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteAntenne(antenne.id)}
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