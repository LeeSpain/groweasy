
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import TrialNotification from "@/components/dashboard/TrialNotification";
import TaskUsageAlert from "@/components/dashboard/TaskUsageAlert";
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
    status: user.subscription.status === "trial" ? "active" : user.subscription.status as "active" | "inactive" | "pending",
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
  
  // Convert AuthContext User to the format expected by other components
  const commandDemoUser: CommandDemoUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    businessName: "My Business", // Add default businessName for CommandDemoUser
    subscription: userSubscription,
    avatar: user.avatar
  };
  
  // Add trial end date to the command demo user if it exists in the auth user
  if (user.subscription.trialEndDate) {
    // Since CommandDemoSubscription type doesn't have trialEndDate property, 
    // we need to add it as a custom property
    (commandDemoUser.subscription as any).trialEndDate = user.subscription.trialEndDate;
  }
  
  // Adapt mockTasks to the CommandDemoTask format
  const adaptedTasks: CommandDemoTask[] = mockTasks.map(task => ({
    id: task.id,
    type: task.type === "social" || task.type === "email" ? task.type : "email",
    status: task.status === "completed" ? "completed" : task.status === "failed" ? "failed" : "pending",
    content: task.description || "",
    timestamp: task.created
  }));
  
  return (
    <MainLayout>
      <div className="bg-background min-h-screen">
        <DashboardHeader user={commandDemoUser} />
        
        <div className="layout py-8">
          {/* Trial notification */}
          {user.subscription.status === "trial" && user.subscription.trialEndDate && (
            <TrialNotification 
              trialEndDate={user.subscription.trialEndDate} 
              onManageClick={() => setActiveTab("settings")}
            />
          )}
          
          {/* Alerts section */}
          {isLowOnTasks && (
            <TaskUsageAlert
              tasksUsed={user.subscription.tasksUsed}
              tasksLimit={user.subscription.tasksLimit}
              taskUsagePercentage={taskUsage}
            />
          )}
          
          {/* Main dashboard content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar with stats */}
            <DashboardSidebar 
              user={commandDemoUser}
              subscription={userSubscription}
            />
            
            {/* Main content area */}
            <DashboardTabs
              user={commandDemoUser}
              tasks={adaptedTasks}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
