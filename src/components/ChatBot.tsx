import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  insights?: {
    type: "positive" | "warning" | "neutral";
    text: string;
  }[];
}

const sampleQuestions = [
  "Am I on track for my savings goals?",
  "Where am I overspending this month?",
  "How can I reduce my expenses?",
  "What's my spending trend?",
];

const mockResponses: Record<string, string> = {
  "savings goals": "Great news! You're making excellent progress on your Emergency Fund (65% complete) and you're ahead of schedule. However, your Vacation fund could use some attention - consider redirecting $200 from entertainment spending to reach your target faster.",
  "overspending": "I noticed you've spent 23% more on dining out this month compared to last month ($450 vs $365). Your grocery spending is also up 15%. Consider meal planning to reduce both categories by about $100-150 total.",
  "reduce expenses": "Here are 3 quick wins: 1) Cancel unused subscriptions (potential $45/month savings), 2) Switch to a cheaper phone plan (save ~$25/month), 3) Use coupons for groceries (save ~$30/month). Total potential savings: $100/month!",
  "spending trend": "Your spending has increased 8% over the past 3 months, mainly in entertainment and dining. The good news is your income has grown 12%, so you're still building wealth. Consider automating 50% of that income increase directly to savings.",
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your AI financial assistant. I can help you analyze your spending, track your goals, and provide personalized financial insights. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
      insights: [
        { type: "positive", text: "You're doing well with your emergency fund!" },
        { type: "warning", text: "Dining out expenses are 23% higher this month" }
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const inputLower = input.toLowerCase();
      let response = "I understand your question about " + input + ". Based on your financial data, I'd recommend reviewing your spending patterns and considering adjustments to better align with your goals.";
      
      // Find relevant mock response
      for (const [key, value] of Object.entries(mockResponses)) {
        if (inputLower.includes(key)) {
          response = value;
          break;
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
        insights: [
          { type: "positive", text: "Your net worth increased 5.2% this year" },
          { type: "warning", text: "Consider increasing your emergency fund contribution" }
        ]
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[80vh] flex flex-col shadow-medium">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center">
              <Bot className="w-6 h-6 mr-2 text-primary" />
              AI Financial Assistant
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Get personalized insights about your finances
            </p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className={message.sender === "ai" ? "bg-primary text-primary-foreground" : "bg-secondary"}>
                          {message.sender === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className={`mx-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {message.content}
                        </div>
                        
                        {message.insights && (
                          <div className="mt-2 space-y-1">
                            {message.insights.map((insight, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className={`text-xs ${
                                  insight.type === "positive" 
                                    ? "border-success text-success" 
                                    : insight.type === "warning"
                                    ? "border-warning text-warning"
                                    : "border-muted text-muted-foreground"
                                }`}
                              >
                                {insight.type === "positive" ? (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                ) : insight.type === "warning" ? (
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                ) : (
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                )}
                                {insight.text}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%]">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="mx-2">
                        <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Quick questions to get started:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left justify-start h-auto p-3 text-xs"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your finances..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}