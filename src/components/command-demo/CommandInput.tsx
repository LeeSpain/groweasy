
import React from "react";
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";

interface CommandInputProps {
  command: string;
  setCommand: (command: string) => void;
  isProcessing: boolean;
  progress: number;
  handleSubmit: (e: React.FormEvent) => void;
}

const CommandInput = ({ command, setCommand, isProcessing, progress, handleSubmit }: CommandInputProps) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="e.g., Promote my bakery online and contact cafes"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            disabled={isProcessing}
            className="text-base py-6 border-2 transition-all"
          />
          <Button 
            type="submit"
            disabled={!command.trim() || isProcessing}
            isLoading={isProcessing}
            fullWidth
            size="lg"
            icon={<Send size={18} />}
          >
            {isProcessing ? 'Processing...' : 'Go'}
          </Button>
        </div>
      </form>
      
      {isProcessing && (
        <div className="space-y-3">
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-apple"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-center text-muted-foreground">
            <p>GrowEasy is working on your request...</p>
            <p className="text-xs mt-1">
              {progress < 30 && "Analyzing your command..."}
              {progress >= 30 && progress < 60 && "Creating growth assets..."}
              {progress >= 60 && progress < 90 && "Finalizing outputs..."}
              {progress >= 90 && "Almost there!"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandInput;
