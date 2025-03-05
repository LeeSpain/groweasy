
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CommandCenter from "@/components/dashboard/CommandCenter";
import TaskHistory from "@/components/dashboard/TaskHistory";
import WebsiteManager from "@/components/dashboard/WebsiteManager";
import AccountSettings from "@/components/dashboard/AccountSettings";
import { User, Task } from "@/components/command-demo/types";
import { Command, History, Globe, Settings } from "lucide-react";

interface DashboardTabsProps {
  user: User;
  tasks: Task[];
  onTabChange: (value: string) => void;
  activeTab: string;
}

const DashboardTabs = ({ user, tasks, onTabChange, activeTab }: DashboardTabsProps) => {
  // Determine if this is a trial by checking if trialEndDate exists in user subscription
  const isTrialActive = !!user.subscription.trialEndDate;
  const trialEndDate = user.subscription.trialEndDate;
  
  return (
    <div className="w-full space-y-6">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full bg-background border dark:border-gray-800 rounded-lg overflow-hidden mb-4 p-1">
          <TabsTrigger 
            value="command" 
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            <div className="flex items-center justify-center gap-2">
              <Command className="h-4 w-4" />
              <span>Command Center</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="tasks" 
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            <div className="flex items-center justify-center gap-2">
              <History className="h-4 w-4" />
              <span>Task History</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="websites" 
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            <div className="flex items-center justify-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Websites</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          >
            <div className="flex items-center justify-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="command" className="mt-0 p-0">
          <CommandCenter user={user} />
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0 p-0">
          <TaskHistory tasks={tasks} />
        </TabsContent>
        
        <TabsContent value="websites" className="mt-0 p-0">
          <WebsiteManager user={user} />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0 p-0">
          <AccountSettings 
            trialEndDate={trialEndDate}
            isTrialActive={isTrialActive}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
