
import { User, Task } from "@/components/command-demo/types";

// Mock user data for development
export const mockUser: User = {
  id: "user-123",
  name: "Jane Smith",
  email: "jane@mybakery.com",
  businessName: "Jane's Bakery",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
  subscription: {
    planId: "growth",
    status: "active",
    startDate: "2023-07-15",
    nextBillingDate: "2023-08-15",
    tasksUsed: 83,
    tasksLimit: 100,
    websites: ["mybakery.com"],
    websitesLimit: 3,
    addOns: {
      extraTasks: 0,
      extraWebsites: 0,
      customReports: false
    }
  }
};

// Mock tasks data
export const mockTasks: Task[] = [
  {
    id: "task-1",
    type: "social",
    status: "completed",
    content: "Fresh sourdough bread available today at Jane's Bakery! Visit us at mybakery.com or call to reserve yours.",
    timestamp: "2023-07-14T09:30:00Z"
  },
  {
    id: "task-2",
    type: "email",
    status: "completed",
    content: "Partnership proposal sent to local coffee shops",
    timestamp: "2023-07-14T10:15:00Z",
    details: {
      sent: 5,
      opened: 3,
      failed: 0
    }
  },
  {
    id: "task-3",
    type: "social",
    status: "pending",
    content: "Weekend special: Buy one loaf, get a small coffee cake free! Limited time offer at Jane's Bakery.",
    timestamp: "2023-07-15T08:00:00Z"
  },
  {
    id: "task-4",
    type: "email",
    status: "failed",
    content: "Monthly newsletter to subscribers",
    timestamp: "2023-07-13T14:20:00Z",
    details: {
      sent: 42,
      opened: 0,
      failed: 3
    }
  },
  {
    id: "task-5",
    type: "social",
    status: "completed",
    content: "Learn the secret to our famous cinnamon rolls in our baking class this Thursday! Register at mybakery.com/classes",
    timestamp: "2023-07-12T11:45:00Z"
  }
];

// Mock plan data
export const mockPlans = [
  {
    id: "starter",
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
    id: "growth",
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
    id: "pro",
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

// Mock add-ons
export const mockAddOns = [
  {
    id: "extra-tasks",
    name: "Extra Tasks",
    description: "Need more than your plan limit? Add tasks as you go.",
    price: 0.75,
    unit: "per task"
  },
  {
    id: "extra-websites",
    name: "Additional Websites",
    description: "Connect more websites to your account.",
    price: 10,
    unit: "per website monthly"
  },
  {
    id: "custom-reports",
    name: "Custom Reports",
    description: "Detailed analytics and insights for your growth activities.",
    price: 20,
    unit: "monthly"
  }
];
