
import { User } from "@/components/command-demo/types";
import { Progress } from "@/components/ui/progress";

interface UsageStatsProps {
  user: User;
}

const UsageStats = ({ user }: UsageStatsProps) => {
  // Calculate percentages
  const taskPercentage = Math.min(100, Math.round((user.subscription.tasksUsed / user.subscription.tasksLimit) * 100));
  const websitePercentage = Math.min(100, Math.round((user.subscription.websites.length / user.subscription.websitesLimit) * 100));
  
  // Determine color based on usage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Tasks Used</span>
          <span>
            {user.subscription.tasksUsed} / {user.subscription.tasksLimit}
          </span>
        </div>
        <Progress 
          value={taskPercentage} 
          className="h-2"
          indicatorClassName={getProgressColor(taskPercentage)}
        />
        <p className="text-xs text-muted-foreground">
          {taskPercentage >= 90 
            ? "You're almost out of tasks! Consider upgrading your plan."
            : "Tasks reset on your billing date."}
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Websites</span>
          <span>
            {user.subscription.websites.length} / {user.subscription.websitesLimit}
          </span>
        </div>
        <Progress 
          value={websitePercentage} 
          className="h-2"
          indicatorClassName={getProgressColor(websitePercentage)}
        />
        <p className="text-xs text-muted-foreground">
          {websitePercentage >= 90 
            ? "Approaching website limit. Consider adding more."
            : "Add up to " + (user.subscription.websitesLimit - user.subscription.websites.length) + " more websites."}
        </p>
      </div>
      
      <div className="pt-3 border-t">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Current Plan</span>
          <span className="text-primary font-medium">
            {user.subscription.planId.charAt(0).toUpperCase() + user.subscription.planId.slice(1)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Next billing: {new Date(user.subscription.nextBillingDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default UsageStats;
