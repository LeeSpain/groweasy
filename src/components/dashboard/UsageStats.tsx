
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
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
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Tasks Usage</CardTitle>
        </CardHeader>
        <CardContent>
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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Websites</CardTitle>
        </CardHeader>
        <CardContent>
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
