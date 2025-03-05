
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { Progress } from "@/components/ui/progress";
import { UserSubscription } from "@/components/command-demo/types";

interface UsageStatsProps {
  subscription: UserSubscription;
}

export default function UsageStats({ subscription }: UsageStatsProps) {
  const tasksPercentage = Math.min(
    Math.round((subscription.tasksUsed / subscription.tasksLimit) * 100),
    100
  );
  
  const websitesPercentage = Math.min(
    Math.round((subscription.websites.length / subscription.websitesLimit) * 100),
    100
  );

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-border/50">
        <CardHeader className="bg-secondary/40 pb-2">
          <CardTitle className="text-sm font-medium">Tasks Usage</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {subscription.tasksUsed} of {subscription.tasksLimit} tasks used
              </div>
              <div className="text-xs font-medium">{tasksPercentage}%</div>
            </div>
            <Progress 
              value={tasksPercentage} 
              className="h-2"
              // Add color based on usage level
              color={tasksPercentage > 80 ? "bg-amber-500" : tasksPercentage > 95 ? "bg-red-500" : ""}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <div>{subscription.tasksLimit - subscription.tasksUsed} tasks remaining</div>
              {tasksPercentage > 80 && (
                <div className="text-amber-500 font-medium">Consider upgrading</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-border/50">
        <CardHeader className="bg-secondary/40 pb-2">
          <CardTitle className="text-sm font-medium">Websites</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {subscription.websites.length} of {subscription.websitesLimit} websites connected
              </div>
              <div className="text-xs font-medium">{websitesPercentage}%</div>
            </div>
            <Progress 
              value={websitesPercentage} 
              className="h-2"
              // Add color based on usage level
              color={websitesPercentage > 80 ? "bg-amber-500" : websitesPercentage > 95 ? "bg-red-500" : ""}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <div>{subscription.websitesLimit - subscription.websites.length} slots available</div>
              {websitesPercentage > 80 && (
                <div className="text-amber-500 font-medium">Consider upgrading</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
