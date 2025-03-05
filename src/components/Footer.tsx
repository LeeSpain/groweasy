
import { Button } from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="layout py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">GrowEasy</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The AI-powered automation platform that makes business growth simple, secure, and all under your control. No tech skills required.
            </p>
            
            <div className="space-y-3">
              <form className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="pl-10"
                  />
                </div>
                <Button className="shadow-sm hover:shadow-md transition-all">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Subscribe to our newsletter for growth tips and product updates.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              {[
                { label: "Features", href: "#features" },
                { label: "How it Works", href: "#how-it-works" },
                { label: "Pricing", href: "#pricing" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#about" },
                { label: "Blog", href: "#blog" },
                { label: "Careers", href: "#careers" },
                { label: "Contact", href: "#contact" },
                { label: "Privacy Policy", href: "#privacy" }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} GrowEasy. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((platform, index) => (
              <a 
                key={index} 
                href={`#${platform.toLowerCase()}`} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label={platform}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
