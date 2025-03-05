
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisProgressProps {
  progress: number;
}

const AnalysisProgress = ({ progress }: AnalysisProgressProps) => {
  return (
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
              strokeDashoffset: 2 * Math.PI * 48 * (1 - progress / 100),
              transformOrigin: "center",
              transform: "rotate(-90deg)",
              transition: "stroke-dashoffset 0.5s ease"
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {Math.round(progress)}%
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-medium mb-2">Analyzing Your Website</h3>
        <p className="text-sm text-muted-foreground">Our AI is scanning your site to understand your business.</p>
      </div>
    </div>
  );
};

export default AnalysisProgress;
