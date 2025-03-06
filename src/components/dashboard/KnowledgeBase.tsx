
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, Book, FileText, HelpCircle, MessageCircle, Send, ArrowRight, Sparkles } from "lucide-react";

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [messages, setMessages] = useState<{sender: "user" | "ai", content: string}[]>([
    { sender: "ai", content: "Hi there! I'm your GrowEasy Assistant. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const popularTopics = [
    { icon: <Book className="h-4 w-4" />, title: "Getting Started Guide" },
    { icon: <FileText className="h-4 w-4" />, title: "Using the Command Center" },
    { icon: <HelpCircle className="h-4 w-4" />, title: "Automation Types Explained" },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // In a real app, this would search the knowledge base
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    
    // Add user message
    const userMessage = { sender: "user" as const, content: aiMessage };
    setMessages(prev => [...prev, userMessage]);
    setAiMessage("");
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let response = "";
      
      if (aiMessage.toLowerCase().includes("automation")) {
        response = "GrowEasy offers 20+ automation types including social media posts, email campaigns, lead scraping, and more. Each automation uses a certain number of tasks from your monthly allowance.";
      } else if (aiMessage.toLowerCase().includes("task") || aiMessage.toLowerCase().includes("limit")) {
        response = "Tasks are our way of measuring automation usage. Each plan has a monthly task limit: Starter (50), Growth (100), or Pro (200). You can always add extra tasks as needed.";
      } else if (aiMessage.toLowerCase().includes("social") || aiMessage.toLowerCase().includes("post")) {
        response = "Social media automation creates and schedules posts for your connected accounts. Each social post uses 1 task from your limit. Pro tip: batch your social content for maximum efficiency!";
      } else {
        response = "Thanks for your question! GrowEasy helps businesses automate their growth with minimal effort. Is there something specific about our platform you'd like to know more about?";
      }
      
      setMessages(prev => [...prev, { sender: "ai", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="overflow-hidden border-border/50">
      <CardHeader className="bg-secondary/40 pb-2 border-b">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <span>Knowledge Base</span>
          {!isAiChatOpen && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={() => setIsAiChatOpen(true)}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Ask AI
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        {!isAiChatOpen ? (
          <>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for help..."
                  className="pl-9 pr-10 py-2 h-9 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Popular Topics</h4>
              <div className="space-y-2">
                {popularTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-2 p-2 hover:bg-secondary rounded-md text-left transition-colors"
                  >
                    <span className="text-primary">{topic.icon}</span>
                    <span className="text-sm">{topic.title}</span>
                  </button>
                ))}
              </div>
              
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between text-xs"
                  onClick={() => setIsAiChatOpen(true)}
                >
                  <span className="flex items-center">
                    <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
                    Ask AI Assistant
                  </span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-80 flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 mb-3 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "py-1.5 px-3 rounded-lg text-sm",
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground ml-6" 
                      : "bg-muted mr-6"
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isTyping && (
                <div className="bg-muted py-2 px-3 rounded-lg text-sm mr-6 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                  <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="relative">
              <Input
                type="text"
                placeholder="Ask anything about GrowEasy..."
                className="pr-10"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                disabled={!aiMessage.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="flex justify-between mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 px-2"
                onClick={() => setIsAiChatOpen(false)}
              >
                Back to KB
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7 px-2 text-muted-foreground"
                onClick={() => setMessages([{ sender: "ai", content: "Hi there! I'm your GrowEasy Assistant. How can I help you today?" }])}
              >
                Clear chat
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KnowledgeBase;
