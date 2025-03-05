
import { useState } from "react";
import { User } from "@/components/command-demo/types";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CommandCenterProps {
  user: User;
}

const CommandCenter = ({ user }: CommandCenterProps) => {
  const [command, setCommand] = useState("");
  const [website, setWebsite] = useState(user.subscription.websites[0] || "");
  const [isProcessing, setIsProcessing] = useState(false);
  
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
    
    // Check if user has enough tasks left
    if (user.subscription.tasksUsed >= user.subscription.tasksLimit) {
      toast.error("You've reached your task limit. Please upgrade your plan or add extra tasks.");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      toast.success("Command processed successfully!");
      setIsProcessing(false);
      // In a real app, we would update the task count and show the results
    }, 2000);
  };
  
  const examples = [
    "Promote my bakery on social media",
    "Email local cafes for partnerships",
    "Create posts about our weekend sale",
    "Find new customers for my business"
  ];

  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-4">Command Center</h3>
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
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g., mybakery.com"
                disabled={isProcessing}
              />
            </div>
            
            <div>
              <label htmlFor="command" className="block text-sm font-medium mb-1">
                What do you want to achieve today?
              </label>
              <div className="relative">
                <Input
                  id="command"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="e.g., Promote my bakery on social media"
                  className="pr-12 h-12"
                  disabled={isProcessing}
                />
                <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              isLoading={isProcessing}
            >
              Execute Command
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="mb-8">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Try these example commands:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setCommand(example)}
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
