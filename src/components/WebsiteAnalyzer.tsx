
import { useState } from "react";
import AnalyzerForm from "./website-analyzer/AnalyzerForm";
import AnalysisCard from "./website-analyzer/AnalysisCard";
import { AnalysisResult } from "./website-analyzer/AnalysisResults";

const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleAnalyze = (websiteUrl: string) => {
    if (!websiteUrl) return;
    
    // Save the URL
    setUrl(websiteUrl);
    
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
        businessName: websiteUrl.includes("bakery") ? "Jane's Bakery" : "Your Business Name",
        tagline: websiteUrl.includes("bakery") ? "Fresh sourdough daily!" : "Your business tagline",
        products: websiteUrl.includes("bakery") 
          ? ["Sourdough Bread", "Croissants", "Pastries", "Custom Cakes"] 
          : ["Product 1", "Product 2", "Service 1"],
        contact: websiteUrl.includes("bakery") ? "jane@mybakery.com" : "contact@yourbusiness.com",
        tone: websiteUrl.includes("bakery") ? "Warm and friendly" : "Professional"
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
          <AnalyzerForm 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing} 
          />
          
          <AnalysisCard
            isAnalyzing={isAnalyzing}
            analysisComplete={analysisComplete}
            analysisProgress={analysisProgress}
            result={result}
          />
        </div>
      </div>
    </section>
  );
};

export default WebsiteAnalyzer;
