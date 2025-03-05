
import { User } from "@/components/command-demo/types";
import { ChevronRight, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SubscriptionDetailsProps {
  user: User;
}

const SubscriptionDetails = ({ user }: SubscriptionDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get plan details (would come from API in real app)
  const planDetails = {
    name: user.subscription.planId.charAt(0).toUpperCase() + user.subscription.planId.slice(1),
    price: user.subscription.planId === 'starter' ? 29 : user.subscription.planId === 'growth' ? 49 : 79
  };
  
  // Calculate add-ons cost
  const addOnsCost = 
    (user.subscription.addOns.extraTasks * 0.75) + 
    (user.subscription.addOns.extraWebsites * 10) + 
    (user.subscription.addOns.customReports ? 20 : 0);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-medium">{planDetails.name} Plan</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
              €{planDetails.price}/mo
            </Badge>
          </div>
          <Badge variant="outline" className={
            user.subscription.status === 'active' 
              ? 'bg-green-100 text-green-700 border-green-200' 
              : 'bg-yellow-100 text-yellow-700 border-yellow-200'
          }>
            {user.subscription.status.charAt(0).toUpperCase() + user.subscription.status.slice(1)}
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Started on {formatDate(user.subscription.startDate)}
        </p>
      </div>
      
      {/* Billing info */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Next billing</span>
          <span>{formatDate(user.subscription.nextBillingDate)}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Base plan</span>
          <span>€{planDetails.price}</span>
        </div>
        
        {addOnsCost > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Add-ons</span>
            <span>€{addOnsCost.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm font-medium pt-1 border-t">
          <span>Total</span>
          <span>€{(planDetails.price + addOnsCost).toFixed(2)}</span>
        </div>
      </div>
      
      {/* Payment method */}
      <div className="pt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-muted-foreground" />
          <span>Payment Method</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>••••4242</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
