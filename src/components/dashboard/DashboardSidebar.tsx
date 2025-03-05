
import { UserSubscription } from "@/components/command-demo/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import UsageStats from "@/components/dashboard/UsageStats";
import SubscriptionDetails from "@/components/dashboard/SubscriptionDetails";
import { User } from "@/components/command-demo/types";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface DashboardSidebarProps {
  user: User;
  subscription: UserSubscription;
}

const DashboardSidebar = ({ user, subscription }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-border/50">
        <CardHeader className="bg-secondary/40 pb-2 border-b">
          <CardTitle className="text-base font-medium">Usage Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <UsageStats subscription={subscription} />
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-border/50">
        <CardHeader className="bg-secondary/40 pb-2 border-b">
          <CardTitle className="text-base font-medium">Subscription</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <SubscriptionDetails user={user} />
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-between"
              onClick={() => navigate("/upgrade")}
            >
              <span>Upgrade Plan</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSidebar;
