
import { useState } from "react";
import { User } from "@/components/command-demo/types";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Zap, Globe, Plus, Mic, Play, Pause } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CommandCenterProps {
  user: User;
}

const CommandCenter = ({ user }: CommandCenterProps) => {
  const [command, setCommand] = useState("");
  const [website, setWebsite] = useState(user.subscription.websites[0] || "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [commandProgress, setCommandProgress] = useState(0);
  const [selectedAutomations, setSelectedAutomations] = useState<string[]>([]);
  const [totalTasksSelected, setTotalTasksSelected] = useState(0);
  const [isAutomationListOpen, setIsAutomationListOpen] = useState(false);
  
  const automations = [
    { id: "social", name: "Create Social Media Content", tasks: 10, description: "Posts, memes, videos to connected socials" },
    { id: "scrape", name: "Scrape for New Business/Leads", tasks: 10, description: "Finds potential customer contacts" },
    { id: "email", name: "Send Promotional Emails", tasks: 5, description: "Outreach to potential customers" },
    { id: "upsell", name: "Upsell Existing Customers", tasks: 5, description: "Emails to current customers" },
    { id: "ad", name: "Generate Ad Copy", tasks: 5, description: "Text for advertisements" },
    { id: "schedule", name: "Schedule Posts/Emails", tasks: 5, description: "Timing for your content" },
    { id: "blog", name: "Draft Blog Posts", tasks: 5, description: "Content for your website" },
    { id: "video", name: "Create Video Scripts", tasks: 5, description: "Scripts for video content" },
    { id: "sms", name: "Send SMS Alerts", tasks: 5, description: "Messages to customers" },
    { id: "flash", name: "Launch a Flash Sale", tasks: 15, description: "Full campaign to sell fast" },
    { id: "surprise", name: "Surprise Chaos", tasks: 5, description: "Random AI-generated content" },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) {
      toast.error("Please enter a command");
      return;
    }
    
    if (!website.trim()) {
      toast.error("Please enter a website URL");
      return;
    }
    
    // If no automations are selected, make recommendations based on command
    if (selectedAutomations.length === 0) {
      recommendAutomations(command);
      setIsAutomationListOpen(true);
      return;
    }
    
    // Check if user has enough tasks left
    if (user.subscription.tasksUsed + totalTasksSelected > user.subscription.tasksLimit) {
      toast.error("You've reached your task limit. Please upgrade your plan or add extra tasks.");
      return;
    }
    
    setIsProcessing(true);
    setCommandProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setCommandProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);
    
    // Simulate processing time
    setTimeout(() => {
      toast.success("Chaos Unleashed! Check your results soon!");
      setIsProcessing(false);
      setCommandProgress(100);
      setSelectedAutomations([]);
      setTotalTasksSelected(0);
      
      // Reset after a moment
      setTimeout(() => setCommandProgress(0), 3000);
    }, 3000);
  };
  
  const handleVoiceCommand = () => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Voice input is not supported in your browser");
      return;
    }
    
    setIsRecording(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      setCommand("Sell more bread and get noticed by local cafes");
      setIsRecording(false);
      recommendAutomations("Sell more bread and get noticed by local cafes");
      setIsAutomationListOpen(true);
    }, 2000);
  };
  
  const recommendAutomations = (cmd: string) => {
    // Simple keyword-based recommendations
    const keywords = cmd.toLowerCase().split(" ");
    const recommended: string[] = [];
    
    if (keywords.includes("sell") || keywords.includes("sales")) {
      recommended.push("social", "email", "flash");
    }
    
    if (keywords.includes("noticed") || keywords.includes("promote")) {
      recommended.push("social", "ad");
    }
    
    if (keywords.includes("cafes") || keywords.includes("businesses") || keywords.includes("partners")) {
      recommended.push("scrape", "email");
    }
    
    // If no specific keywords found, recommend general automations
    if (recommended.length === 0) {
      recommended.push("social", "email");
    }
    
    setSelectedAutomations([...new Set(recommended)]);
    calculateTotalTasks([...new Set(recommended)]);
  };
  
  const toggleAutomation = (id: string) => {
    setSelectedAutomations(prev => {
      if (prev.includes(id)) {
        const newSelected = prev.filter(item => item !== id);
        calculateTotalTasks(newSelected);
        return newSelected;
      } else {
        const newSelected = [...prev, id];
        calculateTotalTasks(newSelected);
        return newSelected;
      }
    });
  };
  
  const calculateTotalTasks = (selected: string[]) => {
    const total = selected.reduce((sum, id) => {
      const automation = automations.find(a => a.id === id);
      return sum + (automation?.tasks || 0);
    }, 0);
    
    setTotalTasksSelected(total);
  };
  
  const examples = [
    "Promote my bakery on social media",
    "Email local cafes for partnerships",
    "Create posts about our weekend sale",
    "Find new customers for my business"
  ];
  
  const maxChaos = () => {
    // Simulate "Max Chaos" button for Pro users
    if (user.subscription.planId !== "plan_pro") {
      toast("Max Chaos is available only for Pro users", {
        description: "Upgrade your plan to access this feature"
      });
      return;
    }
    
    const allAutomations = automations.map(a => a.id);
    setSelectedAutomations(allAutomations);
    calculateTotalTasks(allAutomations);
    setIsAutomationListOpen(true);
    
    toast.success("Maximum Chaos Selected!");
  };

  return (
    <div>
      <Card className="mb-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-2 right-10 w-1 h-4 bg-purple-500/30 animate-pulse"></div>
        <div className="absolute top-1/4 left-5 w-1 h-2 bg-blue-500/20 animate-pulse" style={{animationDelay: "0.7s"}}></div>
        <div className="absolute bottom-10 right-1/3 w-1 h-2 bg-indigo-500/20 animate-pulse" style={{animationDelay: "1.3s"}}></div>
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium">Command Center</h3>
            {user.subscription.planId === "plan_pro" && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 text-purple-700 dark:text-purple-400"
                onClick={maxChaos}
              >
                <Zap className="mr-1 h-3 w-3" />
                Max Chaos
              </Button>
            )}
          </div>
          
          <p className="text-muted-foreground mb-6">
            Tell us what you want to do, and we'll handle the rest. You have{" "}
            <span className="font-medium text-foreground">
              {user.subscription.tasksLimit - user.subscription.tasksUsed} tasks
            </span>{" "}
            remaining this billing cycle.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-1">
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="e.g., mybakery.com"
                  className="pl-10"
                  disabled={isProcessing}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="command" className="block text-sm font-medium mb-1">
                What Do You Want to Achieve?
              </label>
              <div className="relative">
                <Input
                  id="command"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="e.g., Sell more bread and get noticed by local cafes"
                  className="pr-20 h-12"
                  disabled={isProcessing || isRecording}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button 
                    type="button" 
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      isRecording && "text-red-500 animate-pulse"
                    )}
                    onClick={handleVoiceCommand}
                    disabled={isProcessing || isRecording}
                  >
                    <Mic size={18} />
                  </button>
                  <Sparkles className="text-muted-foreground h-5 w-5" />
                </div>
              </div>
              {isRecording && (
                <p className="text-xs text-red-500 mt-1 animate-pulse">Listening...</p>
              )}
            </div>
            
            {isAutomationListOpen && (
              <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium">Choose Your Chaos</h4>
                  <span className="text-xs text-muted-foreground">
                    {totalTasksSelected} tasks selected
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {automations.map((automation) => (
                    <div 
                      key={automation.id}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                        selectedAutomations.includes(automation.id) 
                          ? "bg-primary/20 hover:bg-primary/30" 
                          : "hover:bg-secondary"
                      )}
                      onClick={() => toggleAutomation(automation.id)}
                    >
                      <div className="flex items-center">
                        <div className={cn(
                          "w-4 h-4 rounded-sm mr-2 flex items-center justify-center border",
                          selectedAutomations.includes(automation.id) 
                            ? "bg-primary border-primary" 
                            : "border-input"
                        )}>
                          {selectedAutomations.includes(automation.id) && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M8.5 2.5L3.5 7.5L1.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{automation.name}</p>
                          <p className="text-xs text-muted-foreground">{automation.description}</p>
                        </div>
                      </div>
                      <span className="text-xs px-1.5 py-0.5 bg-secondary rounded-full">
                        {automation.tasks} tasks
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {commandProgress > 0 && isProcessing && (
              <div className="space-y-2">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 relative" 
                    style={{ width: `${commandProgress}%` }}
                  >
                    {commandProgress >= 25 && (
                      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1 h-3 bg-blue-300 rounded-full animate-ping"></div>
                    )}
                    {commandProgress >= 50 && (
                      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-1 h-3 bg-indigo-300 rounded-full animate-ping" style={{animationDelay: "0.5s"}}></div>
                    )}
                    {commandProgress >= 75 && (
                      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-1 h-3 bg-purple-300 rounded-full animate-ping" style={{animationDelay: "1s"}}></div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  {commandProgress < 30 && "Analyzing your command..."}
                  {commandProgress >= 30 && commandProgress < 60 && "Creating growth assets..."}
                  {commandProgress >= 60 && commandProgress < 90 && "Unleashing chaos..."}
                  {commandProgress >= 90 && "Almost there!"}
                </p>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                icon={isProcessing ? <Pause size={18} /> : <Play size={18} />}
                iconPosition="left"
                isLoading={isProcessing && !commandProgress}
                className={cn(
                  isProcessing && commandProgress > 0 && "bg-purple-600 hover:bg-purple-700"
                )}
                onClick={(e) => {
                  if (isProcessing) {
                    e.preventDefault();
                    toast.info("Chaos paused - resume when ready");
                    setIsProcessing(false);
                  } else {
                    // Let form submission handle this
                  }
                }}
              >
                {isProcessing ? 
                  (commandProgress > 0 ? "Pause Chaos" : "Unleashing Chaos...") : 
                  (selectedAutomations.length > 0 ? 
                    `Unleash Chaos (${totalTasksSelected} tasks)` : 
                    "Start Chaos"
                  )
                }
              </Button>
              
              {!isAutomationListOpen && !isProcessing && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsAutomationListOpen(true)}
                >
                  <Plus size={18} />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="mb-8">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Try these example commands:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setCommand(example);
                recommendAutomations(example);
                setIsAutomationListOpen(true);
              }}
              disabled={isProcessing}
              className="text-left p-3 bg-secondary/50 hover:bg-secondary rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
