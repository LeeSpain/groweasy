
import React from "react";

interface CommandExamplesProps {
  setCommand: (command: string) => void;
  isProcessing: boolean;
}

const CommandExamples = ({ setCommand, isProcessing }: CommandExamplesProps) => {
  const examples = [
    "Promote my bakery on social media",
    "Email local cafes for partnerships",
    "Create posts about our weekend sale",
    "Find new customers for my business"
  ];

  return (
    <div className="mt-8">
      <h4 className="text-sm font-medium text-muted-foreground mb-2">Try these example commands:</h4>
      <div className="space-y-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setCommand(example)}
            disabled={isProcessing}
            className="w-full text-left p-3 bg-secondary/50 hover:bg-secondary rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommandExamples;
