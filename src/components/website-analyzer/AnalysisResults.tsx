
import { Check } from "lucide-react";

export interface AnalysisResult {
  businessName: string;
  tagline: string;
  products: string[];
  contact: string;
  tone: string;
}

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  return (
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
  );
};

export default AnalysisResults;
