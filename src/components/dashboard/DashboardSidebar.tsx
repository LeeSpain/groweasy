
import { UserSubscription } from "@/components/command-demo/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import UsageStats from "@/components/dashboard/UsageStats";
import SubscriptionDetails from "@/components/dashboard/SubscriptionDetails";
import { User } from "@/components/command-demo/types";
import { useNavigate } from "react-router-dom";

interface DashboardSidebarProps {
  user: User;
  subscription: UserSubscription;
}

const DashboardSidebar = ({ user, subscription }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Usage Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <UsageStats subscription={subscription} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <SubscriptionDetails user={user} />
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              fullWidth
              onClick={() => navigate("/upgrade")}
            >
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSidebar;
