
import { PricingPlan, AddOn } from "./types";

export const plans: PricingPlan[] = [
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

export const addOns: AddOn[] = [
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
