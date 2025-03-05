
import { useState, useEffect } from "react";
import { Button } from "@/components/ui-custom/Button";
import { Card } from "@/components/ui-custom/Card";
import { ArrowRight, MousePointerClick, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [visibleText, setVisibleText] = useState("");
  
  const commands = [
    "Promote my shop online",
    "Find new partners for my bakery",
    "Email local cafes for partnerships",
    "Create social media posts for my sale"
  ];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    const currentCommandText = commands[currentCommand];
    
    if (isTyping) {
      // Typing animation
      if (currentIndex < currentCommandText.length) {
        timeout = setTimeout(() => {
          setVisibleText(currentCommandText.substring(0, currentIndex + 1));
          currentIndex++;
        }, 100);
      } else {
        // Pause at the end of typing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Wait before erasing
      timeout = setTimeout(() => {
        // Reset for next command
        setCurrentCommand((prev) => (prev + 1) % commands.length);
        setVisibleText("");
        setIsTyping(true);
      }, 2000);
    }
    
    return () => clearTimeout(timeout);
  }, [visibleText, isTyping, currentCommand, commands]);

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden w-full bg-gradient-to-b from-background to-secondary/20">
      <div className="layout flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-6 animate-fade-in-down">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            GrowEasy
          </span>
        </div>
        
        <span className="tag bg-accent text-accent-foreground mb-4 animate-fade-in-down">
          Business Growth, Simplified
        </span>
        
        <h1 className="heading-1 max-w-4xl mx-auto mb-8 animate-fade-in">
          Grow your business,
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 animate-pulse"> effortlessly</span>.
        </h1>
        
        <p className="body-lg max-w-2xl mx-auto text-muted-foreground mb-12 animate-fade-in-up">
          The AI-powered automation platform that makes business growth simple, secure, and all under your control. No tech skills required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-16 animate-fade-in-up" style={{ "--index": "1" } as React.CSSProperties}>
          <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg" className="group">
            See Demo
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <Card 
          variant="glass" 
          className="w-full max-w-3xl mx-auto p-6 md:p-8 shadow-lg hover:shadow-xl transition-all animate-fade-in-up"
          style={{ "--index": "2" } as React.CSSProperties}
        >
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-muted-foreground ml-4">Command Interface</div>
            </div>
            
            <div className="bg-secondary/80 rounded-lg p-4 md:p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <label className="text-sm font-medium">What do you want to do today?</label>
                <MousePointerClick size={14} className="text-muted-foreground animate-pulse" />
              </div>
              
              <div className="flex items-center gap-3 bg-background rounded-lg p-3 transition-all border border-border/50">
                <div className="flex-1 text-left font-mono">
                  <span className="inline-block min-h-[24px]">
                    {visibleText}
                    <span className={cn(
                      "inline-block w-1.5 h-5 bg-primary/80 ml-0.5 align-middle",
                      isTyping ? "animate-cursor-blink" : "opacity-0"
                    )}></span>
                  </span>
                </div>
                <Button size="sm" className="shadow-sm hover:shadow-md transition-all">Go</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
