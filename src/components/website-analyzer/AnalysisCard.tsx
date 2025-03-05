
import { Card, CardContent } from "@/components/ui-custom/Card";
import { cn } from "@/lib/utils";
import AnalysisProgress from "./AnalysisProgress";
import AnalysisResults, { AnalysisResult } from "./AnalysisResults";

interface AnalysisCardProps {
  isAnalyzing: boolean;
  analysisComplete: boolean;
  analysisProgress: number;
  result: AnalysisResult | null;
}

const AnalysisCard = ({ 
  isAnalyzing, 
  analysisComplete, 
  analysisProgress, 
  result 
}: AnalysisCardProps) => {
  return (
    <div className="relative animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <Card 
        variant="glass" 
        className={cn(
          "w-full transition-all duration-500 ease-apple shadow-lg hover:shadow-xl",
          isAnalyzing || analysisComplete ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}
      >
        <CardContent className="p-6">
          {isAnalyzing && <AnalysisProgress progress={analysisProgress} />}
          {analysisComplete && result && <AnalysisResults result={result} />}
        </CardContent>
      </Card>
      
      {/* Enhanced decorative elements */}
      <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -z-10 -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "1s" }}></div>
    </div>
  );
};

export default AnalysisCard;
