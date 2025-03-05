
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Bell, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TaskUsageAlertProps {
  tasksUsed: number;
  tasksLimit: number;
  taskUsagePercentage: number;
}

const TaskUsageAlert = ({ tasksUsed, tasksLimit, taskUsagePercentage }: TaskUsageAlertProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-6 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 dark:border-amber-800/30">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Bell className="text-amber-500" size={20} />
          <div>
            <p className="text-sm font-medium">
              You've used {tasksUsed} of {tasksLimit} tasks 
              ({Math.round(taskUsagePercentage)}%)
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Need more capacity for your automation tasks?
            </p>
          </div>
        </div>
        <Button 
          variant="primary" 
          size="sm"
          className="gap-1"
          onClick={() => navigate("/upgrade")}
        >
          Add Tasks
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskUsageAlert;
