
import { useState } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { Check, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  limits: {
    tasks: number;
    websites: number;
  };
  support: string;
  cta: string;
  mostPopular?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: 29,
    description: "For solo entrepreneurs and tiny businesses getting started with growth automation.",
    features: [
      "Website analysis",
      "Social media post creation",
      "Email outreach",
      "50 tasks per month",
      "1 website integration",
      "Basic email support (48h)"
    ],
    limits: {
      tasks: 50,
      websites: 1
    },
    support: "Email support (48h response)",
    cta: "Start with Starter"
  },
  {
    name: "Growth",
    price: 49,
    description: "For small businesses ready to accelerate their growth efforts.",
    features: [
      "Everything in Starter",
      "100 tasks per month",
      "3 website integrations",
      "Follow-up scheduling",
      "Priority chat support (24h)",
      "Basic task tracking"
    ],
    limits: {
      tasks: 100,
      websites: 3
    },
    support: "Priority chat support (24h response)",
    cta: "Choose Growth",
    mostPopular: true
  },
  {
    name: "Pro",
    price: 79,
    description: "For established businesses looking to scale their growth operations.",
    features: [
      "Everything in Growth",
      "200 tasks per month",
      "10 website integrations",
      "Custom task workflows",
      "Premium phone support (12h)",
      "Advanced reporting"
    ],
    limits: {
      tasks: 200,
      websites: 10
    },
    support: "Premium phone support (12h response)",
    cta: "Upgrade to Pro"
  }
];

const addOns = [
  {
    name: "Extra Tasks",
    description: "Need more than your plan limit? Add tasks as you go.",
    price: "€0.75 per task"
  },
  {
    name: "Additional Websites",
    description: "Connect more websites to your account.",
    price: "€10 per website monthly"
  },
  {
    name: "Custom Reports",
    description: "Detailed analytics and insights for your growth activities.",
    price: "€20 per month"
  }
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="section bg-secondary/30">
      <div className="layout">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="tag bg-accent text-accent-foreground mb-3">Pricing</span>
          <h2 className="heading-2 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground body-lg mb-8">
            Choose the plan that fits your business needs. All plans include our core features with different task limits.
          </p>
          
          <div className="inline-flex items-center rounded-full border p-1 bg-background shadow-subtle mb-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all",
                billingCycle === "monthly" 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all",
                billingCycle === "yearly" 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {plans.map((plan, index) => {
            const yearlyPrice = Math.round(plan.price * 0.8);
            const currentPrice = billingCycle === "yearly" ? yearlyPrice : plan.price;
            
            return (
              <Card 
                key={index}
                className={cn(
                  "relative border transition-all duration-300",
                  plan.mostPopular ? "shadow-hover scale-105 md:scale-105 z-10" : "hover:shadow-hover"
                )}
              >
                {plan.mostPopular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground text-xs font-medium rounded-full px-3 py-1">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className={plan.mostPopular ? "pt-8" : "pt-6"}>
                  <div className="text-center mb-4">
                    <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">€{currentPrice}</span>
                      <span className="text-muted-foreground ml-1.5">/month</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Billed €{yearlyPrice * 12} yearly
                      </p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-full p-1 mr-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path 
                            d="M9 10.5L11 12.5L15.5 8" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-primary" 
                          />
                          <path 
                            d="M10 2H14L17 5L14 8H10L7 5L10 2Z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="text-primary" 
                          />
                          <path 
                            d="M17.13 12.37C19.24 12.37 20.95 14.08 20.95 16.19C20.95 19.3 17.44 21.6 12.02 21.6C6.6 21.6 3.09 19.31 3.09 16.19C3.09 14.08 4.8 12.37 6.91 12.37" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="text-primary" 
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          Tasks
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="ml-1 inline-flex items-center">
                                  <HelpCircle size={14} className="text-muted-foreground" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>A task is one social post, email, or other growth action. For example, 50 tasks could be 25 social posts and 25 emails.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </p>
                        <p className="text-sm text-muted-foreground">{plan.limits.tasks} per month</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-full p-1 mr-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path 
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            className="text-primary" 
                          />
                          <path 
                            d="M2 12H22" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            className="text-primary" 
                          />
                          <path 
                            d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            className="text-primary" 
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Websites</p>
                        <p className="text-sm text-muted-foreground">Up to {plan.limits.websites}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary/10 rounded-full p-1 mr-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path 
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            className="text-primary" 
                          />
                          <path 
                            d="M12 16V12" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            className="text-primary" 
                          />
                          <path 
                            d="M12 8H12.01" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            className="text-primary" 
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Support</p>
                        <p className="text-sm text-muted-foreground">{plan.support}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="text-sm font-medium mb-3">Features</h4>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <Check size={16} className="text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                    fullWidth 
                    size="lg"
                    variant={plan.mostPopular ? "primary" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        {/* Add-ons section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium mb-2">Optional Add-ons</h3>
            <p className="text-muted-foreground">Enhance your plan with these additional options.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {addOns.map((addon, index) => (
              <Card key={index} className="border shadow-subtle hover:shadow-hover transition-all">
                <CardContent className="p-5">
                  <h4 className="font-medium mb-1">{addon.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
                  <p className="font-medium text-primary">{addon.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
