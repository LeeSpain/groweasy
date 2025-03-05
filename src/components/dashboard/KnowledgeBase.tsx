
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { Book, MessageCircleQuestion, Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

// Knowledge base topics and their related articles
const KNOWLEDGE_TOPICS = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <Book className="h-4 w-4" />,
    articles: [
      { id: "welcome", title: "Welcome to Our Platform", snippet: "An introduction to our platform and its capabilities" },
      { id: "setup", title: "Setting Up Your Account", snippet: "Step-by-step guide to configure your workspace" },
      { id: "first-task", title: "Creating Your First Task", snippet: "Learn how to create and manage automation tasks" }
    ]
  },
  {
    id: "automation",
    title: "Automation Features",
    icon: <MessageCircleQuestion className="h-4 w-4" />,
    articles: [
      { id: "social-automation", title: "Social Media Automation", snippet: "Schedule and automate your social media posts" },
      { id: "email-campaigns", title: "Email Campaign Automation", snippet: "Create and schedule email marketing campaigns" }
    ]
  }
];

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // Filter articles based on search query
  const filteredTopics = KNOWLEDGE_TOPICS.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.snippet.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-secondary/40 pb-3 border-b">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Book className="h-4 w-4" /> Knowledge Base
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Search bar */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-4 max-h-[300px] overflow-y-auto">
          {filteredTopics.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No articles match your search. Try different keywords.
            </p>
          ) : (
            <>
              {filteredTopics.map((topic) => (
                <div key={topic.id} className="mb-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer py-2"
                    onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                  >
                    <h3 className="font-medium flex items-center gap-2">
                      {topic.icon}
                      {topic.title}
                    </h3>
                    <ArrowRight 
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        selectedTopic === topic.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                  
                  {/* Articles under this topic */}
                  {selectedTopic === topic.id && (
                    <div className="pl-6 space-y-3 mt-2">
                      {topic.articles.map((article) => (
                        <div 
                          key={article.id}
                          className="text-sm hover:bg-secondary/50 p-2 rounded-md cursor-pointer transition-colors"
                        >
                          <h4 className="font-medium">{article.title}</h4>
                          <p className="text-muted-foreground text-xs mt-1">{article.snippet}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        
        {/* AI Assistant quick access */}
        <div className="p-4 bg-secondary/30 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircleQuestion className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Need personalized help?</span>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBase;
