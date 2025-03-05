
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { Search, MessageSquare, BarChart3, Lock, Zap, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Website Analysis",
    description: "Our AI scans your website to understand your business—extracting your name, offerings, and style without manual data entry.",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Natural Language Commands",
    description: "Just type what you want in plain English—'Promote my sale' or 'Find new partners'—and we'll take care of the rest.",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Task Automation",
    description: "From social media posts to personalized emails, we automate your growth tasks so you can focus on your business.",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Client Dashboard",
    description: "Track your growth activities with a clean, simple interface that shows your posts, emails, and results in real-time.",
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Full Security",
    description: "All your data stays under your control—no third parties, no data sharing, just secure growth tools built on your infrastructure.",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Scalable Limits",
    description: "Start small and scale up. Our pricing tiers grow with your business, from 50 to 200+ tasks per month.",
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  }
];

const Features = () => {
  return (
    <section id="features" className="section w-full bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="layout">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <span className="tag bg-accent text-accent-foreground mb-3 animate-fade-in-down">Features</span>
          </div>
          <h2 className="heading-2 mb-4 animate-fade-in-down" style={{ animationDelay: "100ms" }}>Everything You Need to Grow</h2>
          <p className="text-muted-foreground body-lg animate-fade-in-down" style={{ animationDelay: "200ms" }}>
            GrowEasy combines powerful AI with simple controls to automate your business growth—no tech skills required.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border hover:shadow-hover transition-all duration-300 animate-fade-in-up hover:translate-y-[-5px] group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={cn("rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110", feature.color)}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
