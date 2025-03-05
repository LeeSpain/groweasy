
import { useState } from "react";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommandInput from "./command-demo/CommandInput";
import CommandExamples from "./command-demo/CommandExamples";
import TaskList from "./command-demo/TaskList";
import { Task } from "./command-demo/types";
import { getTimeAgo, generateMockTasks } from "./command-demo/utils";

const CommandDemo = () => {
  const [command, setCommand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("social");
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);
    
    // Simulate completion after 3.5 seconds
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Generate mock tasks based on command
      const newTasks = generateMockTasks(command);
      
      setTasks(prev => [...newTasks, ...prev]);
      setCommand("");
      setIsProcessing(false);
    }, 3500);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopySuccess(prev => ({ ...prev, [id]: true }));
    
    // Reset copy success after 2 seconds
    setTimeout(() => {
      setCopySuccess(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const filteredTasks = tasks.filter(task => task.type === activeTab);

  return (
    <section className="section overflow-hidden">
      <div className="layout">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="tag bg-accent text-accent-foreground mb-3">Simple Commands</span>
          <h2 className="heading-2 mb-4">Tell Us What You Want</h2>
          <p className="text-muted-foreground body-lg">
            Type your business goal in plain language, and we'll handle the execution. No technical skills needed—just tell us what you want to achieve.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Command Input */}
          <div className="lg:col-span-5">
            <Card className="shadow-subtle h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">What do you want to do today?</h3>
                
                <CommandInput 
                  command={command}
                  setCommand={setCommand}
                  isProcessing={isProcessing}
                  progress={progress}
                  handleSubmit={handleSubmit}
                />
                
                <CommandExamples 
                  setCommand={setCommand}
                  isProcessing={isProcessing}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Results Display */}
          <div className="lg:col-span-7">
            <Card className="shadow-subtle h-full">
              <CardContent className="p-6">
                <Tabs defaultValue="social" onValueChange={setActiveTab}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium">Results</h3>
                    <TabsList>
                      <TabsTrigger value="social">Social Posts</TabsTrigger>
                      <TabsTrigger value="email">Emails</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="social" className="mt-0">
                    <TaskList 
                      tasks={filteredTasks} 
                      copySuccess={copySuccess}
                      handleCopy={handleCopy}
                      getTimeAgo={getTimeAgo}
                    />
                  </TabsContent>
                  
                  <TabsContent value="email" className="mt-0">
                    <TaskList 
                      tasks={filteredTasks}
                      copySuccess={copySuccess}
                      handleCopy={handleCopy}
                      getTimeAgo={getTimeAgo}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommandDemo;
