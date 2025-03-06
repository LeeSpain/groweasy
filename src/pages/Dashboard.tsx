
import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import TrialNotification from "@/components/dashboard/TrialNotification";
import TaskUsageAlert from "@/components/dashboard/TaskUsageAlert";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import KnowledgeBase from "@/components/dashboard/KnowledgeBase";
import { mockTasks } from "@/components/dashboard/mockData";
import { useAuth } from "@/context/AuthContext";
import { User as CommandDemoUser, Task as CommandDemoTask, UserSubscription as CommandDemoSubscription } from "@/components/command-demo/types";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("command");
  const { user } = useAuth();
  
  // If no user, this should never happen due to ProtectedRoute
  if (!user) return null;
  
  // Check if subscription is active or on trial
  const isSubscriptionActive = user.subscription.status === "active" || user.subscription.status === "trial";
  
  // Calculate task usage
  const taskUsage = (user.subscription.tasksUsed / user.subscription.tasksLimit) * 100;
  const isLowOnTasks = user.subscription.tasksUsed >= user.subscription.tasksLimit * 0.8;
  
  // Convert AuthContext User to the format expected by UsageStats
  const userSubscription: CommandDemoSubscription = {
    planId: user.subscription.planId,
    status: user.subscription.trialEndDate ? "trial" : "active", // Set status as trial if trialEndDate exists
    startDate: user.subscription.nextBillingDate, // Use nextBillingDate as a fallback for startDate
    nextBillingDate: user.subscription.nextBillingDate,
    tasksUsed: user.subscription.tasksUsed,
    tasksLimit: user.subscription.tasksLimit,
    websites: user.subscription.websitesUsed ? Array(user.subscription.websitesUsed).fill("example.com") : [],
    websitesLimit: user.subscription.websitesLimit,
    addOns: {
      extraTasks: 0,
      extraWebsites: 0,
      customReports: false
    }
  };
  
  // Add trial end date to the command demo user subscription if it exists in the auth user
  if (user.subscription.trialEndDate) {
    userSubscription.trialEndDate = user.subscription.trialEndDate;
  }
  
  // Convert AuthContext User to the format expected by other components
  const commandDemoUser: CommandDemoUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    businessName: "My Business", // Add default businessName for CommandDemoUser
    subscription: userSubscription,
    avatar: user.avatar
  };
  
  // Adapt mockTasks to the CommandDemoTask format
  const adaptedTasks: CommandDemoTask[] = mockTasks.map(task => ({
    id: task.id,
    type: task.type === "social" || task.type === "email" ? task.type : "email",
    status: task.status === "completed" ? "completed" : task.status === "failed" ? "failed" : "pending",
    content: task.description || "",
    timestamp: task.created
  }));
  
  return (
    <div className="bg-background min-h-screen">
      <DashboardHeader user={commandDemoUser} />
      
      <div className="layout py-8">
        {/* Welcome section with date, time and weather */}
        <div className="mb-6 animate-fade-in-down">
          <WelcomeHeader user={commandDemoUser} />
        </div>
        
        {/* Trial notification */}
        {user.subscription.status === "trial" && user.subscription.trialEndDate && (
          <div className="mb-6 animate-fade-in-down" style={{ animationDelay: "100ms" }}>
            <TrialNotification 
              trialEndDate={user.subscription.trialEndDate} 
              onManageClick={() => setActiveTab("settings")}
            />
          </div>
        )}
        
        {/* Alerts section */}
        {isLowOnTasks && (
          <div className="mb-6 animate-fade-in-down" style={{ animationDelay: "200ms" }}>
            <TaskUsageAlert
              tasksUsed={user.subscription.tasksUsed}
              tasksLimit={user.subscription.tasksLimit}
              taskUsagePercentage={taskUsage}
            />
          </div>
        )}
        
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar with stats */}
          <div className="lg:col-span-3 animate-fade-in-up space-y-6" style={{ animationDelay: "300ms" }}>
            <DashboardSidebar 
              user={commandDemoUser}
              subscription={userSubscription}
            />
            
            {/* Knowledge Base */}
            <KnowledgeBase />
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-9 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <DashboardTabs
              user={commandDemoUser}
              tasks={adaptedTasks}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
