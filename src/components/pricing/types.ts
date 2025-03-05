
export interface PricingPlan {
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

export interface AddOn {
  name: string;
  description: string;
  price: string;
}

export type BillingCycle = "monthly" | "yearly";
