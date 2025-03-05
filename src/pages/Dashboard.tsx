
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CommandCenter from "@/components/dashboard/CommandCenter";
import TaskHistory from "@/components/dashboard/TaskHistory";
import WebsiteManager from "@/components/dashboard/WebsiteManager";
import UsageStats from "@/components/dashboard/UsageStats";
import SubscriptionDetails from "@/components/dashboard/SubscriptionDetails";
import { ArrowUpRight, Bell, Settings } from "lucide-react";
import { mockTasks } from "@/components/dashboard/mockData";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("command");
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // If no user, this should never happen due to ProtectedRoute
  if (!user) return null;
  
  // Check if subscription is active or on trial
  const isSubscriptionActive = user.subscription.status === "active" || user.subscription.status === "trial";
  
  // Calculate task usage
  const taskUsage = (user.subscription.tasksUsed / user.subscription.tasksLimit) * 100;
  const isLowOnTasks = user.subscription.tasksUsed >= user.subscription.tasksLimit * 0.8;
  
  return (
    <MainLayout>
      <div className="bg-background min-h-screen">
        <DashboardHeader user={user} />
        
        <div className="layout py-8">
          {/* Trial notification */}
          {user.subscription.status === "trial" && user.subscription.trialEndDate && (
            <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="text-blue-500" size={20} />
                  <p className="text-sm font-medium">
                    Your free trial ends on {user.subscription.trialEndDate}. We'll only charge you if you don't cancel before then.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveTab("settings")}
                >
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Alerts section */}
          {isLowOnTasks && (
            <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="text-yellow-500" size={20} />
                  <p className="text-sm font-medium">
                    You've used {user.subscription.tasksUsed} of {user.subscription.tasksLimit} tasks 
                    ({Math.round(taskUsage)}%). Need more?
                  </p>
                </div>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => navigate("/upgrade")}
                >
                  Add Tasks
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Main dashboard content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar with stats */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Usage Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <UsageStats subscription={user.subscription} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <SubscriptionDetails user={user} />
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      fullWidth
                      onClick={() => navigate("/upgrade")}
                    >
                      Upgrade Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content area */}
            <div className="lg:col-span-3 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full bg-background border">
                  <TabsTrigger value="command" className="flex-1">Command Center</TabsTrigger>
                  <TabsTrigger value="tasks" className="flex-1">Task History</TabsTrigger>
                  <TabsTrigger value="websites" className="flex-1">Websites</TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="command" className="mt-6">
                  <CommandCenter user={user} />
                </TabsContent>
                
                <TabsContent value="tasks" className="mt-6">
                  <TaskHistory tasks={mockTasks} />
                </TabsContent>
                
                <TabsContent value="websites" className="mt-6">
                  <WebsiteManager user={user} />
                </TabsContent>
                
                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-4">Account Settings</h3>
                      
                      {user.subscription.status === "trial" && (
                        <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <h4 className="font-medium mb-2">Free Trial Information</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Your free trial ends on {user.subscription.trialEndDate}. After this date, 
                            your card will be charged automatically unless you cancel.
                          </p>
                          <Button variant="outline" size="sm">
                            Cancel Subscription
                          </Button>
                        </div>
                      )}
                      
                      <p className="text-muted-foreground mb-4">
                        Update your account settings, manage notifications, and configure your preferences.
                      </p>
                      <div className="flex gap-3 mt-4">
                        <Button variant="outline" icon={<Settings size={16} />}>
                          Profile Settings
                        </Button>
                        <Button variant="outline" icon={<Bell size={16} />}>
                          Notification Preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
