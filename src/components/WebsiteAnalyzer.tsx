
import { useState } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Input } from "@/components/ui/input";
import { Check, ExternalLink, Globe, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  businessName: string;
  tagline: string;
  products: string[];
  contact: string;
  tone: string;
}

const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) return;
    
    // Reset states
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);
    
    // Simulate analysis completion after 3.5 seconds
    setTimeout(() => {
      clearInterval(interval);
      setAnalysisProgress(100);
      
      // Mock result data based on URL
      const mockResult: AnalysisResult = {
        businessName: url.includes("bakery") ? "Jane's Bakery" : "Your Business Name",
        tagline: url.includes("bakery") ? "Fresh sourdough daily!" : "Your business tagline",
        products: url.includes("bakery") 
          ? ["Sourdough Bread", "Croissants", "Pastries", "Custom Cakes"] 
          : ["Product 1", "Product 2", "Service 1"],
        contact: url.includes("bakery") ? "jane@mybakery.com" : "contact@yourbusiness.com",
        tone: url.includes("bakery") ? "Warm and friendly" : "Professional"
      };
      
      setResult(mockResult);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 500);
    }, 3500);
  };

  return (
    <section id="how-it-works" className="section bg-secondary/30 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary/10 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-primary/5 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="layout">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <span className="tag bg-accent text-accent-foreground mb-3">How It Works</span>
          </div>
          <h2 className="heading-2 mb-4">Smart Analysis, Zero Effort</h2>
          <p className="text-muted-foreground body mb-6 max-w-2xl mx-auto">
            GrowEasy's AI analyzes your website to understand your business—no lengthy forms or setup process. Just enter your URL and we'll extract everything we need.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up">
            <ul className="space-y-4 mb-8">
              {[
                "Business name and tagline",
                "Products and services",
                "Contact information",
                "Brand voice and style",
                "Existing partnerships and links"
              ].map((item, index) => (
                <li key={index} className="flex items-start group hover:translate-x-1 transition-all duration-300">
                  <div className="mr-3 mt-1 bg-primary/10 rounded-full p-1 group-hover:bg-primary/20 transition-colors">
                    <Check size={16} className="text-primary" />
                  </div>
                  <span className="group-hover:text-primary transition-colors">{item}</span>
                </li>
              ))}
            </ul>
            
            <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="Enter your website URL"
                  className="pl-10"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isAnalyzing || !url} 
                isLoading={isAnalyzing}
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isAnalyzing ? "Analyzing..." : "Try It Now"}
                </span>
                <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </form>
          </div>
          
          <div className="relative animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            {/* Analysis Card */}
            <Card 
              variant="glass" 
              className={cn(
                "w-full transition-all duration-500 ease-apple shadow-lg hover:shadow-xl",
                isAnalyzing || analysisComplete ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
            >
              <CardContent className="p-6">
                {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative w-20 h-20 mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-primary"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          r="48"
                          cx="50"
                          cy="50"
                          style={{
                            strokeDasharray: 2 * Math.PI * 48,
                            strokeDashoffset: 2 * Math.PI * 48 * (1 - analysisProgress / 100),
                            transformOrigin: "center",
                            transform: "rotate(-90deg)",
                            transition: "stroke-dashoffset 0.5s ease"
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                        {Math.round(analysisProgress)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium mb-2">Analyzing Your Website</h3>
                      <p className="text-sm text-muted-foreground">Our AI is scanning your site to understand your business.</p>
                    </div>
                  </div>
                )}
                
                {analysisComplete && result && (
                  <div className="py-2">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-medium">Analysis Complete</h3>
                      <div className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                        <Check size={12} className="mr-1" />
                        Success
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Business Name</h4>
                        <p className="font-medium">{result.businessName}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Tagline</h4>
                        <p>{result.tagline}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Products/Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.products.map((product, index) => (
                            <span key={index} className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5 text-xs">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Contact</h4>
                        <p>{result.contact}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Brand Tone</h4>
                        <p>{result.tone}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        GrowEasy uses this information to craft personalized content for your business growth.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteAnalyzer;
