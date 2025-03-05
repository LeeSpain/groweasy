
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Bell } from "lucide-react";

interface TrialNotificationProps {
  trialEndDate: string;
  onManageClick: () => void;
}

const TrialNotification = ({ trialEndDate, onManageClick }: TrialNotificationProps) => {
  return (
    <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Bell className="text-blue-500" size={20} />
          <p className="text-sm font-medium">
            Your free trial ends on {trialEndDate}. We'll only charge you if you don't cancel before then.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onManageClick}
        >
          Manage Subscription
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrialNotification;
