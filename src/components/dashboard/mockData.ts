
// This file includes mock data used across the dashboard components

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription: {
    planId: string;
    name: string;
    status: string;
    trialEndDate?: string;
    billingCycle: "monthly" | "yearly";
    tasksUsed: number;
    tasksLimit: number;
    websitesUsed: number;
    websitesLimit: number;
    nextBillingDate: string;
    autoRenew: boolean;
  };
  websites: Array<{
    id: string;
    url: string;
    name: string;
    lastScan: string;
    status: "active" | "pending" | "error";
  }>;
}

export interface Task {
  id: string;
  type: "social" | "email" | "website" | "other";
  title: string;
  description: string;
  status: "completed" | "in-progress" | "failed" | "cancelled";
  created: string;
  completed?: string;
}

export interface Plan {
  id: string;
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
  id: string;
  name: string;
  description: string;
  price: number;
}

export const mockUser: User = {
  id: "usr_123456789",
  name: "Jane Cooper",
  email: "jane@example.com",
  avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Jane",
  subscription: {
    planId: "plan_growth",
    name: "Growth",
    status: "active",
    billingCycle: "monthly",
    tasksUsed: 85,
    tasksLimit: 100,
    websitesUsed: 2,
    websitesLimit: 3,
    nextBillingDate: "2023-06-15",
    autoRenew: true
  },
  websites: [
    {
      id: "web_1",
      url: "https://example.com",
      name: "Example Website",
      lastScan: "2023-05-10",
      status: "active"
    },
    {
      id: "web_2",
      url: "https://myshop.example.com",
      name: "My Online Shop",
      lastScan: "2023-05-08",
      status: "active"
    }
  ]
};

export const mockTasks: Task[] = [
  {
    id: "task_1",
    type: "social",
    title: "Twitter post about new features",
    description: "Create and schedule a Twitter post highlighting our new product features",
    status: "completed",
    created: "2023-05-09T10:30:00",
    completed: "2023-05-09T11:45:00"
  },
  {
    id: "task_2",
    type: "email",
    title: "Newsletter campaign",
    description: "Monthly newsletter to inform subscribers about our latest updates",
    status: "in-progress",
    created: "2023-05-08T14:20:00"
  },
  {
    id: "task_3",
    type: "website",
    title: "SEO optimization",
    description: "Analyze and optimize website SEO based on latest search trends",
    status: "completed",
    created: "2023-05-07T09:15:00",
    completed: "2023-05-07T16:30:00"
  },
  {
    id: "task_4",
    type: "social",
    title: "LinkedIn article",
    description: "Write and publish an article about industry insights on LinkedIn",
    status: "failed",
    created: "2023-05-06T11:00:00"
  },
  {
    id: "task_5",
    type: "other",
    title: "Competitor analysis",
    description: "Analyze top 3 competitors' social media strategy and engagement",
    status: "completed",
    created: "2023-05-05T13:45:00",
    completed: "2023-05-05T17:20:00"
  }
];

// Mock plans with IDs for the checkout flow
export const mockPlans: Plan[] = [
  {
    id: "plan_starter",
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
    id: "plan_growth",
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
    id: "plan_pro",
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

// Mock add-ons with IDs for the checkout flow
export const mockAddOns: AddOn[] = [
  {
    id: "addon_tasks",
    name: "Extra Tasks",
    description: "Need more than your plan limit? Add tasks as you go.",
    price: 0.75
  },
  {
    id: "addon_websites",
    name: "Additional Websites",
    description: "Connect more websites to your account.",
    price: 10.00
  },
  {
    id: "addon_reports",
    name: "Custom Reports",
    description: "Detailed analytics and insights for your growth activities.",
    price: 20.00
  }
];
