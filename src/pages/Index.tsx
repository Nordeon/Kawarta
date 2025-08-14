import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "chat":
        return <ChatBot />;
      case "transactions":
        return (
          <div className="min-h-screen bg-background p-6 md:ml-64">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-foreground mb-6">Transactions</h1>
              <p className="text-muted-foreground">Transaction management coming soon...</p>
            </div>
          </div>
        );
      case "goals":
        return (
          <div className="min-h-screen bg-background p-6 md:ml-64">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-foreground mb-6">Savings Goals</h1>
              <p className="text-muted-foreground">Goal management coming soon...</p>
            </div>
          </div>
        );
      case "insights":
        return (
          <div className="min-h-screen bg-background p-6 md:ml-64">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-foreground mb-6">Financial Insights</h1>
              <p className="text-muted-foreground">Analytics and insights coming soon...</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="min-h-screen bg-background p-6 md:ml-64">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className={currentPage === "chat" ? "" : "md:ml-64"}>
        {renderPage()}
      </div>
    </div>
  );
};

export default Index;