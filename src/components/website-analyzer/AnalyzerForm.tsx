
import { useState } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { Globe, Check } from "lucide-react";

interface AnalyzerFormProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const AnalyzerForm = ({ onAnalyze, isAnalyzing }: AnalyzerFormProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    onAnalyze(url);
  };

  return (
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
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
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
  );
};

export default AnalyzerForm;
