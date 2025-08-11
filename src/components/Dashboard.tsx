import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radio, Settings, Activity, AlertTriangle } from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      title: "Stations de Base",
      value: "24",
      description: "Stations actives",
      icon: Radio,
      status: "active"
    },
    {
      title: "Transmissions",
      value: "48",
      description: "Liens de transmission",
      icon: Settings,
      status: "active"
    },
    {
      title: "Antennes",
      value: "72",
      description: "Antennes configurées",
      icon: Activity,
      status: "active"
    },
    {
      title: "Dérangements",
      value: "3",
      description: "Incidents en cours",
      icon: AlertTriangle,
      status: "fault"
    }
  ];

  const recentStations = [
    { id: "BS001", nom: "Station Tunis-Nord", localisation: "Tunis", statut: "Actif", type: "Macro", puissance: "40W" },
    { id: "BS002", nom: "Station Sfax-Centre", localisation: "Sfax", statut: "Maintenance", type: "Micro", puissance: "20W" },
    { id: "BS003", nom: "Station Sousse-Sud", localisation: "Sousse", statut: "Actif", type: "Macro", puissance: "40W" },
    { id: "BS004", nom: "Station Bizerte-Est", localisation: "Bizerte", statut: "Défaillant", type: "Pico", puissance: "10W" },
  ];

  const recentDerangements = [
    { id: "D001", station: "BS002", type: "Transmission", severite: "Moyenne", description: "Perte de signal intermittente", date: "2024-01-15", statut: "En cours" },
    { id: "D002", station: "BS004", type: "Antenne", severite: "Haute", description: "Antenne désalignée", date: "2024-01-14", statut: "Critique" },
    { id: "D003", station: "BS001", type: "Alimentation", severite: "Faible", description: "Fluctuation tension", date: "2024-01-13", statut: "Résolu" },
  ];

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

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "haute":
      case "critique":
        return <Badge variant="fault">{severity}</Badge>;
      case "moyenne":
      case "en cours":
        return <Badge variant="maintenance">{severity}</Badge>;
      case "faible":
      case "résolu":
        return <Badge variant="active">{severity}</Badge>;
      default:
        return <Badge variant="inactive">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Vue d'ensemble de votre infrastructure télécom
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Stations */}
        <Card>
          <CardHeader>
            <CardTitle>Stations Récentes</CardTitle>
            <CardDescription>Aperçu des dernières stations de base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStations.map((station) => (
                <div key={station.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{station.nom}</p>
                    <p className="text-xs text-muted-foreground">
                      {station.localisation} • {station.type} • {station.puissance}
                    </p>
                  </div>
                  {getStatusBadge(station.statut)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Dérangements Récents</CardTitle>
            <CardDescription>Incidents nécessitant votre attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDerangements.map((issue) => (
                <div key={issue.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{issue.station}</p>
                    {getSeverityBadge(issue.statut)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {issue.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {issue.type} • {issue.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};