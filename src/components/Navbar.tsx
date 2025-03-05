
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui-custom/Button';
import { cn } from '@/lib/utils';
import { Menu, X, User, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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
        <Link to="/" className="flex items-center gap-2 z-20 group">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">GrowEasy</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
          <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="hover:bg-primary/10"
              >
                Dashboard
              </Button>
              <Button 
                size="sm"
                onClick={logout}
                className="shadow-sm hover:shadow-md transition-all"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/login')}
                className="hover:bg-primary/10"
              >
                Login
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate('/upgrade')}
                className="shadow-sm hover:shadow-md transition-all"
              >
                Start Free Trial
              </Button>
            </>
          )}
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
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
              GrowEasy
            </span>
          </div>
          
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
            {isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  fullWidth
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="shadow-sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  fullWidth
                  onClick={() => {
                    navigate('/upgrade');
                    setIsMobileMenuOpen(false);
                  }}
                  className="shadow-sm"
                >
                  Start Free Trial
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
