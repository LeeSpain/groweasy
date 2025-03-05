
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui-custom/Button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-apple",
        isScrolled 
          ? "glass-morph py-3 shadow-subtle" 
          : "bg-transparent py-5"
      )}
    >
      <div className="layout flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 z-20">
          <span className="font-semibold text-xl tracking-tight">GrowEasy</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
          <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm">Login</Button>
          <Button size="sm">Start Free Trial</Button>
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-20 p-2 focus:outline-none"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="transition-transform duration-300" />
          ) : (
            <Menu size={24} className="transition-transform duration-300" />
          )}
        </button>
        
        {/* Mobile Menu */}
        <div 
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-sm md:hidden z-10 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-apple",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="flex flex-col items-center gap-8">
            <a 
              href="#features" 
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
          </nav>
          
          <div className="flex flex-col gap-4 w-full max-w-[200px]">
            <Button variant="outline" fullWidth>Login</Button>
            <Button fullWidth>Start Free Trial</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
