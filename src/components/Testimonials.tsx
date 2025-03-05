
import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui-custom/Card";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "GrowEasy changed everything for my bakery. In just one week, I generated 50 personalized social posts and reached out to 20 local cafes—5 of which became partners. All I did was type what I wanted.",
    author: "Jane Smith",
    role: "Owner",
    company: "Jane's Bakery",
    industry: "Food & Beverage"
  },
  {
    quote: "As a consultant, I needed a way to reach new clients without spending hours on marketing. GrowEasy analyzes my website and creates tailored outreach that actually sounds like me—and I've seen a 40% response rate.",
    author: "Michael Chen",
    role: "Principal",
    company: "Chen Consulting",
    industry: "Business Services"
  },
  {
    quote: "I was skeptical about AI-generated content, but GrowEasy surprised me. It captured our brand voice perfectly and helped us connect with 15 new retailers in just one month. Worth every euro.",
    author: "Sophie Laurent",
    role: "Founder",
    company: "EcoGoods",
    industry: "Retail"
  },
  {
    quote: "Running a small landscaping business left me no time for marketing. With GrowEasy, I just type 'Find new clients in my area' and it does the work. My calendar is now booked solid three weeks out.",
    author: "David Rodriguez",
    role: "Owner",
    company: "GreenScape Design",
    industry: "Home Services"
  },
  {
    quote: "The simplicity is what won me over. No complicated dashboards or marketing jargon—just tell it what you want, and it delivers. Our jewelry workshop has doubled our Instagram engagement.",
    author: "Emma Johansson",
    role: "Co-founder",
    company: "Artisan Gems",
    industry: "Retail"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="testimonials" className="section overflow-hidden">
      <div className="layout">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="tag bg-accent text-accent-foreground mb-3">Testimonials</span>
          <h2 className="heading-2 mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground body-lg">
            Businesses of all sizes are growing with GrowEasy. Here are some of their stories.
          </p>
        </div>
        
        <div className="relative">
          {/* Navigation arrows */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <button
              onClick={handlePrev}
              className="rounded-full bg-background/80 backdrop-blur-sm border border-border p-3 shadow-subtle hover:shadow-hover transition-all"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <button
              onClick={handleNext}
              className="rounded-full bg-background/80 backdrop-blur-sm border border-border p-3 shadow-subtle hover:shadow-hover transition-all"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
          
          {/* Testimonial slider */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar py-8"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-full px-4 flex-shrink-0 snap-center"
                style={{
                  scrollSnapAlign: "center"
                }}
              >
                <Card 
                  variant="glass" 
                  className="max-w-3xl mx-auto p-6 md:p-8 shadow-hover transition-all duration-500 ease-apple"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 rounded-full p-3 mb-6">
                      <Quote size={24} className="text-primary" />
                    </div>
                    
                    <blockquote className="mb-8">
                      <p className="text-lg md:text-xl italic leading-relaxed">"{testimonial.quote}"</p>
                    </blockquote>
                    
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {testimonial.industry}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  activeIndex === index ? "bg-primary scale-110" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
