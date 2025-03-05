
import { useState, useEffect } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Copy, CheckCircle, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  type: "social" | "email";
  status: "pending" | "completed" | "failed";
  content: string;
  timestamp: string;
  details?: {
    sent?: number;
    failed?: number;
    opened?: number;
  };
}

const CommandDemo = () => {
  const [command, setCommand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("social");
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});

  // Format time as "2 minutes ago"
  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);
    
    // Simulate completion after 3.5 seconds
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      const now = new Date().toISOString();
      
      // Generate mock tasks based on command
      const newTasks: Task[] = [];
      
      if (command.toLowerCase().includes("promote") || command.toLowerCase().includes("post")) {
        // Generate social posts
        const socialTexts = [
          "Love fresh bread? Our bakery has sourdough daily. Visit us for a taste of handcrafted perfection! #FreshBread #LocalBakery",
          "Start your morning right with our freshly baked croissants and coffee. Open from 7 AM! #BreakfastGoals #Bakery",
          "Weekend special: Buy any two pastries and get a coffee free! Valid Saturday and Sunday only. #WeekendTreat #BakerySpecial",
          "Introducing our new gluten-free bread line! All the taste, none of the gluten. #GlutenFree #BakeryInnovation"
        ];
        
        for (let i = 0; i < 4; i++) {
          newTasks.push({
            id: `social-${Date.now()}-${i}`,
            type: "social",
            status: "completed",
            content: socialTexts[i],
            timestamp: now
          });
        }
      }
      
      if (command.toLowerCase().includes("email") || command.toLowerCase().includes("contact")) {
        // Generate email outreach
        const emailContent = `
          Subject: Collaboration Opportunity with Jane's Bakery
          
          Hi there,
          
          I'm Jane from Jane's Bakery, and I noticed your cafe has been gaining attention for your amazing coffee selection. I think there's a great opportunity for us to collaborate - our fresh sourdough bread would pair perfectly with your specialty coffee!
          
          Would you be open to discussing a potential partnership? Perhaps we could:
          - Supply fresh bread for your breakfast menu
          - Cross-promote our businesses
          - Create a special coffee + bread pairing
          
          Let me know if you're interested in chatting further!
          
          Best regards,
          Jane
          Jane's Bakery
          jane@mybakery.com
          (555) 123-4567
        `;
        
        newTasks.push({
          id: `email-${Date.now()}`,
          type: "email",
          status: "completed",
          content: emailContent,
          timestamp: now,
          details: {
            sent: 5,
            failed: 1,
            opened: 3
          }
        });
      }
      
      setTasks(prev => [...newTasks, ...prev]);
      setCommand("");
      setIsProcessing(false);
    }, 3500);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopySuccess(prev => ({ ...prev, [id]: true }));
    
    // Reset copy success after 2 seconds
    setTimeout(() => {
      setCopySuccess(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const filteredTasks = tasks.filter(task => task.type === activeTab);

  return (
    <section className="section overflow-hidden">
      <div className="layout">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="tag bg-accent text-accent-foreground mb-3">Simple Commands</span>
          <h2 className="heading-2 mb-4">Tell Us What You Want</h2>
          <p className="text-muted-foreground body-lg">
            Type your business goal in plain language, and we'll handle the execution. No technical skills needed—just tell us what you want to achieve.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Command Input */}
          <div className="lg:col-span-5">
            <Card className="shadow-subtle h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">What do you want to do today?</h3>
                
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="flex flex-col gap-3">
                    <Input
                      type="text"
                      placeholder="e.g., Promote my bakery online and contact cafes"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      disabled={isProcessing}
                      className="text-base py-6 border-2 transition-all"
                    />
                    <Button 
                      type="submit"
                      disabled={!command.trim() || isProcessing}
                      isLoading={isProcessing}
                      fullWidth
                      size="lg"
                      icon={<Send size={18} />}
                    >
                      {isProcessing ? 'Processing...' : 'Go'}
                    </Button>
                  </div>
                </form>
                
                {isProcessing && (
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300 ease-apple"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-center text-muted-foreground">
                      <p>GrowEasy is working on your request...</p>
                      <p className="text-xs mt-1">
                        {progress < 30 && "Analyzing your command..."}
                        {progress >= 30 && progress < 60 && "Creating growth assets..."}
                        {progress >= 60 && progress < 90 && "Finalizing outputs..."}
                        {progress >= 90 && "Almost there!"}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Try these example commands:</h4>
                  <div className="space-y-2">
                    {[
                      "Promote my bakery on social media",
                      "Email local cafes for partnerships",
                      "Create posts about our weekend sale",
                      "Find new customers for my business"
                    ].map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setCommand(example)}
                        disabled={isProcessing}
                        className="w-full text-left p-3 bg-secondary/50 hover:bg-secondary rounded-lg text-sm transition-colors disabled:opacity-50"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Results Display */}
          <div className="lg:col-span-7">
            <Card className="shadow-subtle h-full">
              <CardContent className="p-6">
                <Tabs defaultValue="social" onValueChange={setActiveTab}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium">Results</h3>
                    <TabsList>
                      <TabsTrigger value="social">Social Posts</TabsTrigger>
                      <TabsTrigger value="email">Emails</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="social" className="mt-0">
                    {filteredTasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-muted/30 rounded-full p-4 mb-4">
                          <Send size={24} className="text-muted-foreground" />
                        </div>
                        <h4 className="text-lg font-medium mb-2">No social posts yet</h4>
                        <p className="text-muted-foreground max-w-md">
                          Try a command like "Create social posts about my business" to generate content.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredTasks.map(task => (
                          <div 
                            key={task.id} 
                            className="p-4 bg-secondary/50 rounded-lg border border-border transition-all hover:bg-secondary/80"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                <div className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                                  <CheckCircle size={12} className="mr-1" />
                                  Posted
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  <Clock size={12} className="inline mr-1" />
                                  {getTimeAgo(task.timestamp)}
                                </span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleCopy(task.id, task.content)}
                                className="h-8 px-2 text-xs"
                              >
                                {copySuccess[task.id] ? (
                                  <>
                                    <CheckCircle size={14} className="mr-1" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} className="mr-1" />
                                    Copy
                                  </>
                                )}
                              </Button>
                            </div>
                            <p className="text-sm">{task.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="email" className="mt-0">
                    {filteredTasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-muted/30 rounded-full p-4 mb-4">
                          <Send size={24} className="text-muted-foreground" />
                        </div>
                        <h4 className="text-lg font-medium mb-2">No emails yet</h4>
                        <p className="text-muted-foreground max-w-md">
                          Try a command like "Email local businesses for partnerships" to generate outreach.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredTasks.map(task => (
                          <div 
                            key={task.id} 
                            className="p-4 bg-secondary/50 rounded-lg border border-border transition-all hover:bg-secondary/80"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                <div className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                                  <CheckCircle size={12} className="mr-1" />
                                  Sent
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  <Clock size={12} className="inline mr-1" />
                                  {getTimeAgo(task.timestamp)}
                                </span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleCopy(task.id, task.content)}
                                className="h-8 px-2 text-xs"
                              >
                                {copySuccess[task.id] ? (
                                  <>
                                    <CheckCircle size={14} className="mr-1" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} className="mr-1" />
                                    Copy
                                  </>
                                )}
                              </Button>
                            </div>
                            <div className="mb-3">
                              <pre className="text-sm whitespace-pre-wrap font-sans">{task.content}</pre>
                            </div>
                            {task.details && (
                              <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-border text-xs">
                                <div className="bg-secondary rounded-full px-2.5 py-1">
                                  Sent: {task.details.sent}
                                </div>
                                {task.details.failed > 0 && (
                                  <div className="bg-red-100 text-red-700 rounded-full px-2.5 py-1">
                                    Failed: {task.details.failed}
                                  </div>
                                )}
                                <div className="bg-blue-100 text-blue-700 rounded-full px-2.5 py-1">
                                  Opened: {task.details.opened}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommandDemo;
