
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Bell, Settings } from "lucide-react";

interface AccountSettingsProps {
  trialEndDate?: string;
  isTrialActive: boolean;
}

const AccountSettings = ({ trialEndDate, isTrialActive }: AccountSettingsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-4">Account Settings</h3>
        
        {isTrialActive && trialEndDate && (
          <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <h4 className="font-medium mb-2">Free Trial Information</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Your free trial ends on {trialEndDate}. After this date, 
              your card will be charged automatically unless you cancel.
            </p>
            <Button variant="outline" size="sm">
              Cancel Subscription
            </Button>
          </div>
        )}
        
        <p className="text-muted-foreground mb-4">
          Update your account settings, manage notifications, and configure your preferences.
        </p>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" icon={<Settings size={16} />}>
            Profile Settings
          </Button>
          <Button variant="outline" icon={<Bell size={16} />}>
            Notification Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
