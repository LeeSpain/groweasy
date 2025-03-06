export interface Task {
  id: string;
  type: "social" | "email" | "sms" | "scrape" | "flash-sale" | "ad" | "blog" | "video" | "review" | "monitor" | "trend" | "loyalty" | "cart" | "calendar" | "payment" | "supplier" | "weather" | "surprise";
  status: "pending" | "completed" | "failed" | "in-progress";
  content: string;
  timestamp: string;
  details?: {
    sent?: number;
    failed?: number;
    opened?: number;
    platform?: string;
    leads?: string[];
    engagement?: {
      likes?: number;
      shares?: number;
      comments?: number;
    };
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
    socialAccounts: number;
  };
  support: string;
  cta: string;
  mostPopular?: boolean;
  extras?: string[];
}

export interface UserSubscription {
  planId: string;
  status: "active" | "inactive" | "pending" | "trial";
  startDate: string;
  nextBillingDate: string;
  tasksUsed: number;
  tasksLimit: number;
  websites: string[];
  websitesLimit: number;
  socialAccounts?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
    pinterest?: string;
    other?: string[];
  };
  trialEndDate?: string;
  addOns: {
    extraTasks: number;
    extraWebsites: number;
    customReports: boolean;
    surpriseChaos?: boolean;
    rushMode?: boolean;
  };
  chaosMode?: "chaos" | "precision" | "zen";
}

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  phoneNumber?: string;
  subscription: UserSubscription;
  avatar?: string;
  website?: string;
}
