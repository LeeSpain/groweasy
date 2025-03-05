
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CommandCenter from "@/components/dashboard/CommandCenter";
import TaskHistory from "@/components/dashboard/TaskHistory";
import WebsiteManager from "@/components/dashboard/WebsiteManager";
import AccountSettings from "@/components/dashboard/AccountSettings";
import { User, Task } from "@/components/command-demo/types";

interface DashboardTabsProps {
  user: User;
  tasks: Task[];
  onTabChange: (value: string) => void;
  activeTab: string;
}

const DashboardTabs = ({ user, tasks, onTabChange, activeTab }: DashboardTabsProps) => {
  return (
    <div className="lg:col-span-3 space-y-6">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
          <TaskHistory tasks={tasks} />
        </TabsContent>
        
        <TabsContent value="websites" className="mt-6">
          <WebsiteManager user={user} />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <AccountSettings 
            trialEndDate={user.subscription.status === "trial" ? user.subscription.startDate : undefined}
            isTrialActive={user.subscription.status === "trial"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
