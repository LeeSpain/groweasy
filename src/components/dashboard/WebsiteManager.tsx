
import { useState } from "react";
import { User } from "@/components/command-demo/types";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Input } from "@/components/ui/input";
import { Globe, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface WebsiteManagerProps {
  user: User;
}

const WebsiteManager = ({ user }: WebsiteManagerProps) => {
  const [newWebsite, setNewWebsite] = useState("");
  const [websites, setWebsites] = useState(user.subscription.websites);
  
  const handleAddWebsite = () => {
    if (!newWebsite.trim()) {
      toast.error("Please enter a website URL");
      return;
    }
    
    // Check if already at the limit
    if (websites.length >= user.subscription.websitesLimit) {
      toast.error(`You've reached your limit of ${user.subscription.websitesLimit} websites. Please upgrade your plan.`);
      return;
    }
    
    // Check if website already exists
    if (websites.includes(newWebsite)) {
      toast.error("This website is already added to your account");
      return;
    }
    
    setWebsites([...websites, newWebsite]);
    setNewWebsite("");
    toast.success(`Added ${newWebsite} to your account`);
  };
  
  const handleRemoveWebsite = (website: string) => {
    setWebsites(websites.filter(w => w !== website));
    toast.success(`Removed ${website} from your account`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Manage Websites</h3>
        <div className="text-sm text-muted-foreground">
          {websites.length} of {user.subscription.websitesLimit} used
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h4 className="text-base font-medium mb-4">Add a Website</h4>
          <div className="flex gap-3">
            <Input
              value={newWebsite}
              onChange={(e) => setNewWebsite(e.target.value)}
              placeholder="e.g., mybakery.com"
              className="flex-1"
            />
            <Button
              onClick={handleAddWebsite}
              icon={<Plus size={16} />}
            >
              Add
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Enter your website domain without 'http://' or 'https://'
          </p>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h4 className="text-base font-medium">Your Websites</h4>
        {websites.length === 0 ? (
          <div className="bg-muted/30 rounded-lg p-8 text-center">
            <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h5 className="font-medium mb-1">No websites added yet</h5>
            <p className="text-sm text-muted-foreground mb-4">
              Add your first website to start using GrowEasy
            </p>
            <Button size="sm" icon={<Plus size={14} />}>
              Add Website
            </Button>
          </div>
        ) : (
          websites.map((website, index) => (
            <Card key={index} className="hover:bg-muted/10 transition-colors">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <h5 className="font-medium">{website}</h5>
                    <p className="text-sm text-muted-foreground">
                      Added on July 15, 2023
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveWebsite(website)}
                  className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default WebsiteManager;
