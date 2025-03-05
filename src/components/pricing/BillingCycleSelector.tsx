
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BillingCycle } from "./types";

interface BillingCycleSelectorProps {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}

const BillingCycleSelector = ({ billingCycle, onChange }: BillingCycleSelectorProps) => {
  return (
    <div className="inline-flex items-center rounded-full border p-1 bg-background shadow-subtle mb-4">
      <button
        onClick={() => onChange("monthly")}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-full transition-all",
          billingCycle === "monthly" 
            ? "bg-primary text-primary-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange("yearly")}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-full transition-all",
          billingCycle === "yearly" 
            ? "bg-primary text-primary-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Yearly
        <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
          -20%
        </span>
      </button>
    </div>
  );
};

export default BillingCycleSelector;
