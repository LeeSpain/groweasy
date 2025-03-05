
import { useState } from "react";
import { BillingCycle } from "./pricing/types";
import BillingCycleSelector from "./pricing/BillingCycleSelector";
import PlanCard from "./pricing/PlanCard";
import AddOnCard from "./pricing/AddOnCard";
import { plans, addOns } from "./pricing/pricingData";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <section id="pricing" className="section bg-secondary/30">
      <div className="layout">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="tag bg-accent text-accent-foreground mb-3">Pricing</span>
          <h2 className="heading-2 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground body-lg mb-8">
            Choose the plan that fits your business needs. All plans include our core features with different task limits.
          </p>
          
          <BillingCycleSelector 
            billingCycle={billingCycle} 
            onChange={setBillingCycle} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index} 
              plan={plan} 
              billingCycle={billingCycle} 
            />
          ))}
        </div>
        
        {/* Add-ons section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium mb-2">Optional Add-ons</h3>
            <p className="text-muted-foreground">Enhance your plan with these additional options.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {addOns.map((addon, index) => (
              <AddOnCard key={index} addon={addon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
