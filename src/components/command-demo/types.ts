
export interface Task {
  id: string;
  type: "social" | "email";
  status: "pending" | "completed" | "failed";
  content: string;
  timestamp: string;
  details?: {
    sent?: number;
    failed?: number;
    opened?: number;
  };
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

export interface UserSubscription {
  planId: string;
  status: "active" | "inactive" | "pending";
  startDate: string;
  nextBillingDate: string;
  tasksUsed: number;
  tasksLimit: number;
  websites: string[];
  websitesLimit: number;
  addOns: {
    extraTasks: number;
    extraWebsites: number;
    customReports: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  subscription: UserSubscription;
  avatar?: string;
}
