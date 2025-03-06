
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { User } from "@/components/command-demo/types";
import { Sun, Moon, Cloud, ThermometerSun, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui-custom/Button";

interface WelcomeHeaderProps {
  user: User;
}

const WelcomeHeader = ({ user }: WelcomeHeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [weatherIcon, setWeatherIcon] = useState<JSX.Element>(<Sun className="h-5 w-5" />);
  const [chaosMode, setChaosMode] = useState<"chaos" | "precision" | "zen">(
    user.subscription.chaosMode || "chaos"
  );

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Set greeting based on time of day
  useEffect(() => {
    const hours = currentTime.getHours();
    let newGreeting = "";
    
    if (hours >= 5 && hours < 12) {
      newGreeting = "Good morning";
      setWeatherIcon(<Sun className="h-5 w-5 text-yellow-500" />);
    } else if (hours >= 12 && hours < 18) {
      newGreeting = "Good afternoon";
      setWeatherIcon(<ThermometerSun className="h-5 w-5 text-orange-500" />);
    } else if (hours >= 18 && hours < 22) {
      newGreeting = "Good evening";
      setWeatherIcon(<Cloud className="h-5 w-5 text-blue-400" />);
    } else {
      newGreeting = "Good night";
      setWeatherIcon(<Moon className="h-5 w-5 text-indigo-400" />);
    }
    
    setGreeting(newGreeting);
  }, [currentTime]);

  // Format date as "Monday, June 10, 2023"
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format time as "10:30 AM"
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Check if subscription is in trial mode
  const isTrialSubscription = user.subscription.trialEndDate !== undefined;
  
  // Calculate task usage percentage
  const taskUsagePercentage = (user.subscription.tasksUsed / user.subscription.tasksLimit) * 100;

  const handleChangeChaosMode = (mode: "chaos" | "precision" | "zen") => {
    setChaosMode(mode);
    // In a real app, this would update the user's preference in the database
  };

  return (
    <Card className={cn(
      "mb-6 border-blue-100 dark:border-blue-800/30 relative overflow-hidden",
      chaosMode === "chaos" ? "bg-gradient-to-r from-purple-900/20 to-indigo-900/30 dark:from-purple-900/40 dark:to-indigo-900/50" : 
      chaosMode === "precision" ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20" :
      "bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20"
    )}>
      {/* Decorative elements for chaos mode */}
      {chaosMode === "chaos" && (
        <>
          <div className="absolute top-0 left-1/4 w-1 h-8 bg-purple-500/70 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-blue-500/70 animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-indigo-500/70 animate-pulse"></div>
          <div className="absolute -right-2 top-1/2 w-6 h-1 bg-purple-500/50 animate-pulse"></div>
        </>
      )}
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="space-y-1 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              {weatherIcon}
              <h2 className={cn(
                "text-xl font-semibold flex items-center gap-2",
                chaosMode === "chaos" && "text-purple-600 dark:text-purple-400"
              )}>
                {greeting}, {user.name.split(' ')[0]} 
                {chaosMode === "chaos" && <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {formattedDate} • {formattedTime}
            </p>
            
            <p className="text-sm mt-2">
              Your {isTrialSubscription ? "trial" : "subscription"} is active
              {user.subscription.trialEndDate && ` until ${new Date(user.subscription.trialEndDate).toLocaleDateString()}`}.
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-end space-x-2">
              <span className="text-xs text-muted-foreground">Mode:</span>
              <div className="flex bg-background/80 rounded-lg p-0.5 backdrop-blur-sm">
                <Button 
                  variant={chaosMode === "chaos" ? "default" : "ghost"} 
                  size="sm" 
                  className={cn("text-xs h-7 px-2", chaosMode === "chaos" && "bg-purple-500 hover:bg-purple-600")}
                  onClick={() => handleChangeChaosMode("chaos")}
                >
                  <Zap className="mr-1 h-3 w-3" />
                  Chaos
                </Button>
                <Button 
                  variant={chaosMode === "precision" ? "default" : "ghost"} 
                  size="sm" 
                  className="text-xs h-7 px-2"
                  onClick={() => handleChangeChaosMode("precision")}
                >
                  Precision
                </Button>
                <Button 
                  variant={chaosMode === "zen" ? "default" : "ghost"} 
                  size="sm" 
                  className="text-xs h-7 px-2"
                  onClick={() => handleChangeChaosMode("zen")}
                >
                  Zen
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className={cn(
                "bg-white/80 dark:bg-background/50 rounded-lg p-3 min-w-32 backdrop-blur-sm",
                chaosMode === "chaos" && "border border-purple-500/30"
              )}>
                <p className="text-sm font-medium">Tasks</p>
                <div className="flex justify-between items-center mt-1">
                  <span className={cn(
                    "text-2xl font-bold",
                    chaosMode === "chaos" && "text-purple-600 dark:text-purple-400"
                  )}>
                    {user.subscription.tasksUsed}
                  </span>
                  <span className="text-xs text-muted-foreground">of {user.subscription.tasksLimit}</span>
                </div>
                
                {/* Chaos Meter */}
                {chaosMode === "chaos" && (
                  <div className="mt-2 h-1.5 bg-background/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 relative" 
                      style={{ width: `${taskUsagePercentage}%` }}
                    >
                      {taskUsagePercentage >= 25 && (
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1 h-3 bg-blue-300 rounded-full animate-ping"></div>
                      )}
                      {taskUsagePercentage >= 50 && (
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-1 h-3 bg-indigo-300 rounded-full animate-ping" style={{animationDelay: "0.5s"}}></div>
                      )}
                      {taskUsagePercentage >= 75 && (
                        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-1 h-3 bg-purple-300 rounded-full animate-ping" style={{animationDelay: "1s"}}></div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className={cn(
                "bg-white/80 dark:bg-background/50 rounded-lg p-3 min-w-32 backdrop-blur-sm",
                chaosMode === "chaos" && "border border-purple-500/30"
              )}>
                <p className="text-sm font-medium">Websites</p>
                <div className="flex justify-between items-center mt-1">
                  <span className={cn(
                    "text-2xl font-bold",
                    chaosMode === "chaos" && "text-purple-600 dark:text-purple-400"
                  )}>
                    {user.subscription.websites.length}
                  </span>
                  <span className="text-xs text-muted-foreground">of {user.subscription.websitesLimit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {chaosMode === "chaos" && (
          <div className="mt-4 text-center">
            <p className={cn(
              "text-lg font-bold text-purple-600 dark:text-purple-400 animate-pulse",
              "glitchy-text"
            )}>
              Ready to Sell and Promote? Let's Roll!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WelcomeHeader;
