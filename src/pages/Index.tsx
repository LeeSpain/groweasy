
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WebsiteAnalyzer from "@/components/WebsiteAnalyzer";
import CommandDemo from "@/components/CommandDemo";
import AutomationCategories from "@/components/AutomationCategories";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <WebsiteAnalyzer />
      <CommandDemo />
      <AutomationCategories />
      <Pricing />
      <Testimonials />
    </MainLayout>
  );
};

export default Index;
