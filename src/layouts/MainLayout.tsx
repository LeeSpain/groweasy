
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Smooth scroll implementation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (
        anchor && 
        anchor.getAttribute("href")?.startsWith("#") && 
        anchor.getAttribute("href") !== "#"
      ) {
        e.preventDefault();
        const id = anchor.getAttribute("href")?.substring(1);
        const element = document.getElementById(id || "");
        
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100, // Account for fixed header
            behavior: "smooth"
          });
        }
      }
    };
    
    document.addEventListener("click", handleAnchorClick);
    
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
