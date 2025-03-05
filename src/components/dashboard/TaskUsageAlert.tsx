
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TaskUsageAlertProps {
  tasksUsed: number;
  tasksLimit: number;
  taskUsagePercentage: number;
}

const TaskUsageAlert = ({ tasksUsed, tasksLimit, taskUsagePercentage }: TaskUsageAlertProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Bell className="text-yellow-500" size={20} />
          <p className="text-sm font-medium">
            You've used {tasksUsed} of {tasksLimit} tasks 
            ({Math.round(taskUsagePercentage)}%). Need more?
          </p>
        </div>
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => navigate("/upgrade")}
        >
          Add Tasks
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskUsageAlert;
