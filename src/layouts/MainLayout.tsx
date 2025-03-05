
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  
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
      {!isDashboard && <Navbar />}
      <main className="flex-1 w-full">{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default MainLayout;
