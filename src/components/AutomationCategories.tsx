
import { Card, CardContent } from "@/components/ui-custom/Card";
import { 
  MessageSquare, Share, Calendar, Database, ShoppingCart, 
  FileText, Search, ClipboardList 
} from "lucide-react";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
}

const CategoryCard = ({ icon, title, description, examples }: CategoryCardProps) => (
  <Card className="h-full shadow-sm">
    <CardContent className="p-6">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 rounded-md p-2 text-primary">
            {icon}
          </div>
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="mt-auto">
          <p className="text-sm font-medium mb-2">Example commands:</p>
          <ul className="space-y-1">
            {examples.map((example, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                <span className="text-primary">•</span> "{example}"
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);

const AutomationCategories = () => {
  const categories: CategoryCardProps[] = [
    {
      icon: <Share size={24} />,
      title: "Marketing & Promotion",
      description: "Create social posts, repurpose content, draft ads, and request customer reviews automatically.",
      examples: [
        "Post about my weekend sale on socials",
        "Repurpose my latest blog for social media",
        "Ask my customers for reviews"
      ]
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Communication",
      description: "Reach out to partners, send SMS notifications, generate newsletters, and craft chat responses.",
      examples: [
        "Contact local cafes for partnerships",
        "Text my customers about today's special",
        "Create a monthly newsletter"
      ]
    },
    {
      icon: <Calendar size={24} />,
      title: "Scheduling & Organization",
      description: "Manage calendars, book appointments, set reminders, and delegate tasks to your team.",
      examples: [
        "Schedule my baking tasks for the week",
        "Set up appointments for custom orders",
        "Assign delivery tasks to my staff"
      ]
    },
    {
      icon: <Database size={24} />,
      title: "Data Management",
      description: "Update customer databases, track orders, generate analytics summaries, and organize files.",
      examples: [
        "Update my customer list from signups",
        "Track my online orders",
        "Give me a sales summary"
      ]
    },
    {
      icon: <ShoppingCart size={24} />,
      title: "Sales & Customer Engagement",
      description: "Create upsell campaigns, run loyalty programs, recover abandoned carts, and collect feedback.",
      examples: [
        "Upsell to my recent customers",
        "Start a loyalty program",
        "Recover my lost sales"
      ]
    },
    {
      icon: <FileText size={24} />,
      title: "Content Creation",
      description: "Draft blog posts, add image captions, create video scripts, and generate FAQs.",
      examples: [
        "Draft a blog about bread benefits",
        "Caption my bakery photos",
        "Update my FAQs"
      ]
    },
    {
      icon: <Search size={24} />,
      title: "External Research",
      description: "Monitor competitors, research market trends, source suppliers, and find relevant events.",
      examples: [
        "Check my competitors' updates",
        "Research bread trends",
        "Find events to sell at"
      ]
    },
    {
      icon: <ClipboardList size={24} />,
      title: "Workflow Optimization",
      description: "Track time, prioritize tasks, set up alerts, and automate routine processes.",
      examples: [
        "Track my work time",
        "Sort my daily tasks",
        "Automate my weekly posts"
      ]
    }
  ];

  return (
    <section id="automations" className="section">
      <div className="layout">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="tag bg-accent text-accent-foreground mb-3">Powerful Automations</span>
          <h2 className="heading-2 mb-4">Grow with Over 30+ AI Automations</h2>
          <p className="text-muted-foreground body-lg">
            Tell GrowEasy what you need, and our AI will handle everything from creating social posts to researching competitors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationCategories;
