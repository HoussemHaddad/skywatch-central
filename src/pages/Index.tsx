import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { StationsTable } from "@/components/StationsTable";
import { TransmissionsTable } from "@/components/TransmissionsTable";
import { AntennesTable } from "@/components/AntennesTable";
import { DerangementsTable } from "@/components/DerangementsTable";
import { AuthForm } from "@/components/AuthForm";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  if (!isAuthenticated) {
    return <AuthForm onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case "stations":
        return <StationsTable />;
      case "transmissions":
        return <TransmissionsTable />;
      case "antennes":
        return <AntennesTable />;
      case "derangements":
        return <DerangementsTable />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
