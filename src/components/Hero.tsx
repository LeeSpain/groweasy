
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
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden w-full bg-gradient-to-b from-background to-secondary/20 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl opacity-70"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-70"></div>
        <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-primary/30"></div>
        <div className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full bg-primary/20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 rounded-full bg-primary/40"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>
      </div>

      <div className="layout flex flex-col items-center text-center relative z-10">
        <div className="flex items-center gap-2 mb-6 animate-fade-in-down">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 backdrop-blur-sm">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <span className="font-semibold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            GrowEasy
          </span>
        </div>
        
        <span className="tag bg-accent text-accent-foreground mb-4 animate-fade-in-down" style={{ animationDelay: "100ms" }}>
          Business Growth, Simplified
        </span>
        
        <h1 className="heading-1 max-w-4xl mx-auto mb-8 animate-fade-in relative">
          Grow your business
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 animate-pulse"> effortlessly</span>.
        </h1>
        
        <p className="body-lg max-w-2xl mx-auto text-muted-foreground mb-12 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          The AI-powered automation platform that makes business growth simple, secure, and all under your control. No tech skills required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-16 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <Button size="lg" className="shadow-lg hover:shadow-xl transition-all group relative overflow-hidden">
            <span className="relative z-10">Start Free Trial</span>
            <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Button>
          <Button variant="outline" size="lg" className="group relative overflow-hidden">
            <span className="relative z-10 flex items-center">
              See Demo
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Button>
        </div>
        
        <Card 
          variant="glass" 
          className="w-full max-w-3xl mx-auto p-6 md:p-8 shadow-2xl hover:shadow-xl transition-all animate-fade-in-up relative backdrop-blur-md overflow-hidden"
          style={{ animationDelay: "400ms" }}
        >
          {/* Card background effects */}
          <div className="absolute -z-10 inset-0 bg-gradient-to-br from-background/80 to-secondary/30 rounded-xl"></div>
          <div className="absolute -z-20 -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl opacity-70"></div>
          <div className="absolute -z-20 -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-70"></div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-muted-foreground ml-4">Command Interface</div>
            </div>
            
            <div className="bg-secondary/80 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <label className="text-sm font-medium">What do you want to do today?</label>
                <MousePointerClick size={14} className="text-muted-foreground animate-pulse" />
              </div>
              
              <div className="flex items-center gap-3 bg-background/90 backdrop-blur-md rounded-lg p-3 transition-all border border-border/50 hover:border-primary/30 hover:shadow-sm">
                <div className="flex-1 text-left font-mono">
                  <span className="inline-block min-h-[24px]">
                    {visibleText}
                    <span className={cn(
                      "inline-block w-1.5 h-5 bg-primary/80 ml-0.5 align-middle",
                      isTyping ? "animate-cursor-blink" : "opacity-0"
                    )}></span>
                  </span>
                </div>
                <Button size="sm" className="shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <span className="relative z-10">Go</span>
                  <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
