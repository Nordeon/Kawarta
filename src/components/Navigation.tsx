import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CreditCard, 
  Target, 
  TrendingUp, 
  MessageCircle, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: CreditCard },
  { id: "goals", label: "Goals", icon: Target },
  { id: "insights", label: "Insights", icon: TrendingUp },
  { id: "chat", label: "AI Assistant", icon: MessageCircle },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-card/80 backdrop-blur-sm"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-medium z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8 justify-center">
            <h2 className="text-xl font-bold text-foreground">Kawarta</h2>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="bg-gradient-to-r from-primary/10 to-savings/10 p-4 rounded-lg">
            <h3 className="font-semibold text-sm text-foreground mb-1">Pro Tip</h3>
            <p className="text-xs text-muted-foreground">
              Ask the AI assistant about your spending patterns or savings goals!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}