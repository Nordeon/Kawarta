import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import WalletCard from "./ui/WalletCard";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  CreditCard, 
  PiggyBank,
  MessageCircle,
  Plus
} from "lucide-react";
import { useState } from "react";
import CreateWalletModal from "./ui/CreateWalletModal";

const mockData = {
  totalBalance: 12450.75,
  monthlyIncome: 3250.00,
  monthlyExpenses: 3850.25,
  savingsGoals: [
    { name: "Emergency Fund", target: 10000, current: 6500, progress: 65 },
    { name: "Vacation", target: 3000, current: 1200, progress: 40 },
    { name: "New Car", target: 25000, current: 8500, progress: 34 },
    {name: "Gaming PC", target: 500, current: 20, progress: 4}
  ],
  debts: [
    { name: "Student Loan", balance: 5000, minPayment: 750 },
  ],
  recentTransactions: [
    { id: 1, description: "Grocery Store", amount: -125.50, category: "Food", date: "2024-01-15" },
    { id: 2, description: "Salary Deposit", amount: 2600.00, category: "Income", date: "2024-01-15" },
    { id: 3, description: "Gas Station", amount: -45.20, category: "Transportation", date: "2024-01-14" },
    { id: 4, description: "Netflix", amount: -15.99, category: "Entertainment", date: "2024-01-14" }
  ]
};

export default function Dashboard() {
  const netWorth = mockData.totalBalance - mockData.debts.reduce((sum, debt) => sum + debt.balance, 0);
  const monthlyNet = mockData.monthlyIncome - mockData.monthlyExpenses;
  const walletItems = Array.from({length: 10}, (_, i) => i+1);
  const [isCreateWalletModalOpen, setCreateWalletModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
            <p className="text-muted-foreground">Track your money, reach your goals</p>
          </div>
          <div>
            <Button size="lg" className="mr-5 bg-gradient-to-r from-primary to-savings text-white shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => setCreateWalletModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Wallet
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-primary to-savings text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>
        <CreateWalletModal
          isOpen={isCreateWalletModalOpen}
          onClose={() => setCreateWalletModalOpen(false)}
        >
          <h2>Create Wallet</h2>
          <Button>
            Add
          </Button>
          <Button
            onClick={() => setCreateWalletModalOpen(false)}
          >
            Close
          </Button>
        </CreateWalletModal>
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-card to-accent/20 shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₱{mockData.totalBalance.toLocaleString()}</div>
              <p className="text-xs text-success flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-savings/10 shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Worth</CardTitle>
              <PiggyBank className="h-4 w-4 text-savings" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₱{netWorth.toLocaleString()}</div>
              <p className="text-xs text-success flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.2% this year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Cards Section */}
        <div className="grid grid-flow-col auto-cols-[200px] gap-4 overflow-x-auto p-4 scroll-smooth">
          {walletItems.map((item) => (
            <div
              key={item}
              className="bg-gray-200 rounded-lg p-8 text-center"
            >
              TEst
            </div>
          ))}
          
          <WalletCard
            title="GCash"
            balance={100}
            onClick={() => alert("Clicked on-hand cash!!!!")}
          />
          <WalletCard
            title="Maya"
            balance={5000}
            onClick={() => alert("Clicked on-hand cash!!!!")}
          />
          <WalletCard
            title="RCBC"
            balance={1000}
            onClick={() => alert("Clicked on-hand cash!!!!")}
          />

          <WalletCard
            title="BDO"
            balance={1000}
            onClick={() => alert("Clicked on-hand cash!!!!")}
          />

          <WalletCard
            title="SeaBank"
            balance={1000}
            onClick={() => alert("Clicked on-hand cash!!!!")}
          />
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Savings Goals */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-savings" />
                Savings Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.savingsGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ₱{goal.current.toLocaleString()} / ₱{goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">{goal.progress}% complete</div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add New Goal
              </Button>
            </CardContent>
          </Card>

          {/* Debt Overview */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-expense" />
                Debt Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.debts.map((debt, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{debt.name}</div>
                    <div className="text-sm text-muted-foreground">Min. payment: ₱{debt.minPayment}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-expense">₱{debt.balance.toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Debt</span>
                  <span className="font-bold text-expense">
                    ₱{mockData.debts.reduce((sum, debt) => sum + debt.balance, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-card to-income/10 shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-income" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₱{mockData.monthlyIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">After calculations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-expense/10 shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-expense" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₱{mockData.monthlyExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 hover:bg-secondary/30 rounded-lg transition-colors duration-200">
                  <div>
                    <div className="font-medium text-foreground">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={transaction.amount > 0 ? "default" : "secondary"}>
                      {transaction.category}
                    </Badge>
                    <span className={`font-bold ₱{transaction.amount > 0 ? 'text-income' : 'text-expense'}`}>
                      {transaction.amount > 0 ? '+' : ''}₱{Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Chat Button */}
        <div className="fixed bottom-6 right-6">
          <Button 
            size="lg" 
            className="rounded-full shadow-large bg-gradient-to-r from-primary to-savings text-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
}