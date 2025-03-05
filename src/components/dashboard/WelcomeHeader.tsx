
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { User } from "@/components/command-demo/types";
import { Sun, Moon, Cloud, ThermometerSun } from "lucide-react";

interface WelcomeHeaderProps {
  user: User;
}

const WelcomeHeader = ({ user }: WelcomeHeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [weatherIcon, setWeatherIcon] = useState<JSX.Element>(<Sun className="h-5 w-5" />);

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

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/30">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="space-y-1 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              {weatherIcon}
              <h2 className="text-xl font-semibold">{greeting}, {user.name.split(' ')[0]}</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {formattedDate} • {formattedTime}
            </p>
            
            <p className="text-sm mt-2">
              Your {user.subscription.status === "trial" ? "trial" : "subscription"} is active
              {user.subscription.trialEndDate && ` until ${new Date(user.subscription.trialEndDate).toLocaleDateString()}`}.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white/80 dark:bg-background/50 rounded-lg p-3 min-w-32 backdrop-blur-sm">
              <p className="text-sm font-medium">Tasks</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-2xl font-bold">{subscription.tasksUsed}</span>
                <span className="text-xs text-muted-foreground">of {subscription.tasksLimit}</span>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-background/50 rounded-lg p-3 min-w-32 backdrop-blur-sm">
              <p className="text-sm font-medium">Websites</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-2xl font-bold">{subscription.websites.length}</span>
                <span className="text-xs text-muted-foreground">of {subscription.websitesLimit}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeHeader;
