
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui-custom/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-custom/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronLeft, CreditCard, Shield } from "lucide-react";
import { mockPlans, mockAddOns } from "@/components/dashboard/mockData";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const Upgrade = () => {
  const navigate = useNavigate();
  const { startFreeTrial, isAuthenticated, user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState(mockPlans[1].id); // Default to Growth plan
  const [step, setStep] = useState<"plan" | "checkout" | "customer-info">("plan");
  
  // For add-ons
  const [extraTasks, setExtraTasks] = useState(0);
  const [extraWebsites, setExtraWebsites] = useState(0);
  const [customReports, setCustomReports] = useState(false);
  
  // For customer information
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  
  // For payment details
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  
  // Calculate discount for yearly billing
  const getDiscountedPrice = (price: number) => {
    return billingCycle === "yearly" ? Math.round(price * 0.8) : price;
  };
  
  // Calculate total price
  const calculateTotal = () => {
    const selectedPlanObj = mockPlans.find(p => p.id === selectedPlan);
    if (!selectedPlanObj) return 0;
    
    let basePrice = getDiscountedPrice(selectedPlanObj.price);
    const addOnsPrice = 
      (extraTasks * mockAddOns[0].price) + 
      (extraWebsites * mockAddOns[1].price) + 
      (customReports ? mockAddOns[2].price : 0);
    
    return basePrice + addOnsPrice;
  };
  
  const handleContinue = () => {
    if (isAuthenticated && user) {
      setStep("checkout");
    } else {
      setStep("customer-info");
    }
    window.scrollTo(0, 0);
  };
  
  const handleCustomerInfoContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep("checkout");
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardName || !cardNumber || !expiry || !cvc) {
      toast.error("Please fill in all card details");
      return;
    }
    
    setIsProcessing(true);
    
    // Collect payment details
    const paymentDetails = {
      cardName,
      cardNumber,
      expiry,
      cvc,
      billingCycle
    };
    
    try {
      // If already authenticated, simulate updating subscription
      if (isAuthenticated && user) {
        // In a real app, this would call an API to update the subscription
        setTimeout(() => {
          setIsProcessing(false);
          toast.success("Your subscription has been updated!");
          navigate("/dashboard");
        }, 2000);
      } else {
        // Start free trial for new user
        await startFreeTrial(email, selectedPlan, paymentDetails);
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error("There was an error processing your request. Please try again.");
    }
  };
  
  const handleBack = () => {
    if (step === "checkout" && !isAuthenticated) {
      setStep("customer-info");
    } else {
      setStep("plan");
    }
    window.scrollTo(0, 0);
  };
  
  // Render different content based on the current step
  const renderContent = () => {
    switch (step) {
      case "plan":
        return renderPlanSelection();
      case "customer-info":
        return renderCustomerInfo();
      case "checkout":
        return renderCheckout();
      default:
        return renderPlanSelection();
    }
  };
  
  // Render plan selection step
  const renderPlanSelection = () => {
    return (
      <>
        {/* Plan selection section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Choose the right plan for your business</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All plans include our core features. Choose based on how many tasks and websites you need.
            </p>
            
            <div className="inline-flex items-center rounded-full border p-1 bg-background shadow-subtle mt-6">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  billingCycle === "monthly" 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  billingCycle === "yearly" 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockPlans.map((plan) => {
              const isCurrentPlan = isAuthenticated && user?.subscription.planId === plan.id;
              const isSelected = plan.id === selectedPlan;
              const price = getDiscountedPrice(plan.price);
              
              return (
                <Card 
                  key={plan.id}
                  className={`relative border transition-all duration-300 ${
                    isSelected 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "hover:border-primary/50"
                  } ${plan.mostPopular ? "shadow-hover" : ""}`}
                >
                  {plan.mostPopular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="bg-primary text-primary-foreground text-xs font-medium rounded-full px-3 py-1">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className={`${plan.mostPopular ? "pt-8" : "pt-6"}`}>
                    <div className="text-center mb-4">
                      <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">€{price}</span>
                        <span className="text-muted-foreground ml-1.5">/month</span>
                      </div>
                      {billingCycle === "yearly" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Billed €{price * 12} yearly
                        </p>
                      )}
                      <div className="text-xs text-green-600 font-medium mt-2">
                        7-day free trial
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center">
                        <div className="bg-primary/10 rounded-full p-1 mr-3">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path 
                              d="M9 10.5L11 12.5L15.5 8" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="text-primary" 
                            />
                          </svg>
                        </div>
                        <p className="text-sm">
                          <span className="font-medium">{plan.limits.tasks} tasks</span> per month
                        </p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="bg-primary/10 rounded-full p-1 mr-3">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path 
                              d="M9 10.5L11 12.5L15.5 8" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="text-primary" 
                            />
                          </svg>
                        </div>
                        <p className="text-sm">
                          <span className="font-medium">{plan.limits.websites} websites</span> included
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-3">Features</h4>
                      <ul className="space-y-2.5">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check size={16} className="text-primary mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        fullWidth 
                        variant={isSelected ? "primary" : "outline"}
                        onClick={() => setSelectedPlan(plan.id)}
                        disabled={isCurrentPlan && isSelected}
                      >
                        {isCurrentPlan 
                          ? isSelected 
                            ? "Current Plan" 
                            : "Switch Plan" 
                          : isSelected 
                            ? "Selected" 
                            : `Select ${plan.name}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Add-ons selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">Add extra features to your plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Extra Tasks */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{mockAddOns[0].name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{mockAddOns[0].description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">€{mockAddOns[0].price.toFixed(2)} per task</span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setExtraTasks(Math.max(0, extraTasks - 10))}
                      disabled={extraTasks === 0}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{extraTasks}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setExtraTasks(extraTasks + 10)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                {extraTasks > 0 && (
                  <p className="text-sm font-medium text-primary">
                    + €{(extraTasks * mockAddOns[0].price).toFixed(2)}
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Extra Websites */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{mockAddOns[1].name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{mockAddOns[1].description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">€{mockAddOns[1].price.toFixed(2)} per website</span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setExtraWebsites(Math.max(0, extraWebsites - 1))}
                      disabled={extraWebsites === 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{extraWebsites}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setExtraWebsites(extraWebsites + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                {extraWebsites > 0 && (
                  <p className="text-sm font-medium text-primary">
                    + €{(extraWebsites * mockAddOns[1].price).toFixed(2)}
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Custom Reports */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{mockAddOns[2].name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{mockAddOns[2].description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">€{mockAddOns[2].price.toFixed(2)} per month</span>
                  <Button 
                    variant={customReports ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setCustomReports(!customReports)}
                  >
                    {customReports ? "Selected" : "Add"}
                  </Button>
                </div>
                {customReports && (
                  <p className="text-sm font-medium text-primary">
                    + €{mockAddOns[2].price.toFixed(2)}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Order summary and continue */}
        <div className="max-w-md mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {mockPlans.find(p => p.id === selectedPlan)?.name} Plan ({billingCycle})
                </span>
                <span>
                  €{getDiscountedPrice(mockPlans.find(p => p.id === selectedPlan)?.price || 0)}
                </span>
              </div>
              
              {extraTasks > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{extraTasks} Extra Tasks</span>
                  <span>€{(extraTasks * mockAddOns[0].price).toFixed(2)}</span>
                </div>
              )}
              
              {extraWebsites > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{extraWebsites} Extra Websites</span>
                  <span>€{(extraWebsites * mockAddOns[1].price).toFixed(2)}</span>
                </div>
              )}
              
              {customReports && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Custom Reports</span>
                  <span>€{mockAddOns[2].price.toFixed(2)}</span>
                </div>
              )}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <div className="text-right">
                    <div>€{calculateTotal().toFixed(2)}/month</div>
                    <div className="text-sm text-green-600">7-day free trial</div>
                  </div>
                </div>
                
                {billingCycle === "yearly" && (
                  <div className="text-sm text-green-600 mt-1">
                    You save €{(calculateTotal() * 2.4).toFixed(2)} yearly
                  </div>
                )}
              </div>
              
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleContinue}
                className="mt-4"
              >
                Continue to {isAuthenticated ? "Payment" : "Sign Up"}
              </Button>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 justify-center">
                <Shield size={14} />
                <span>We won't charge you during your 7-day free trial</span>
              </div>
              
              <p className="text-xs text-center text-muted-foreground mt-1">
                By upgrading, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };
  
  // Render customer information step
  const renderCustomerInfo = () => {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCustomerInfoContinue} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Smith" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Continue to Payment
                </Button>
                
                <Button 
                  type="button" 
                  variant="ghost" 
                  fullWidth
                  className="mt-2"
                  onClick={handleBack}
                >
                  Back to Plan Selection
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // Render checkout step
  const renderCheckout = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
              
              <div className="mb-6">
                <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "bank")} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="card" className="flex-1">
                      <CreditCard size={16} className="mr-2" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="bank" className="flex-1">
                      <svg width="16" height="16" className="mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 8H22M6 8V18M18 8V18M3 8H21C21.5523 8 22 7.55228 22 7V5C22 4.44772 21.5523 4 21 4H3C2.44772 4 2 4.44772 2 5V7C2 7.55228 2.44772 8 3 8ZM4 18H20C21.1046 18 22 18.8954 22 20V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V20C2 18.8954 2.89543 18 4 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Bank Transfer
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardholder">Cardholder Name</Label>
                        <Input 
                          id="cardholder" 
                          placeholder="John Smith" 
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardnumber">Card Number</Label>
                        <Input 
                          id="cardnumber" 
                          placeholder="1234 5678 9012 3456" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiration Date</Label>
                          <Input 
                            id="expiry" 
                            placeholder="MM/YY" 
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input 
                            id="cvc" 
                            placeholder="123" 
                            maxLength={3} 
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-6">
                        <div className="flex gap-3 items-start">
                          <Shield className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <h4 className="text-sm font-medium mb-1">7-Day Free Trial</h4>
                            <p className="text-xs text-muted-foreground">
                              We'll secure your payment method now, but won't charge you until your free trial ends. 
                              You can cancel anytime before then at no cost.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                        <Shield size={16} />
                        <span>Your payment information is secure and encrypted</span>
                      </div>
                      
                      <div className="pt-4">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          fullWidth
                          isLoading={isProcessing}
                        >
                          Start 7-Day Free Trial
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="bank" className="mt-6">
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4 bg-muted/30">
                        <h3 className="font-medium mb-2">Bank Transfer Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-1">
                            <span className="text-muted-foreground">Account Name:</span>
                            <span>GrowEasy Ltd</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <span className="text-muted-foreground">IBAN:</span>
                            <span>IE12 AIBK 9311 5212 3456 78</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <span className="text-muted-foreground">BIC/SWIFT:</span>
                            <span>AIBKIE2D</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <span className="text-muted-foreground">Reference:</span>
                            <span>GE-TRIAL-{email.split('@')[0]}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                        <div className="flex gap-3 items-start">
                          <Shield className="text-blue-500 flex-shrink-0 mt-0.5" size={18} />
                          <div>
                            <h4 className="text-sm font-medium mb-1">7-Day Free Trial</h4>
                            <p className="text-xs text-muted-foreground">
                              For bank transfers, your trial will begin once we receive your payment.
                              Please email us your transfer receipt for faster activation.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={() => {
                          toast.success("Bank transfer instructions sent to your email!");
                          navigate("/");
                        }}
                      >
                        Email Me These Instructions
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {mockPlans.find(p => p.id === selectedPlan)?.name} Plan ({billingCycle})
                </span>
                <span>
                  €{getDiscountedPrice(mockPlans.find(p => p.id === selectedPlan)?.price || 0)}
                </span>
              </div>
              
              {extraTasks > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{extraTasks} Extra Tasks</span>
                  <span>€{(extraTasks * mockAddOns[0].price).toFixed(2)}</span>
                </div>
              )}
              
              {extraWebsites > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{extraWebsites} Extra Websites</span>
                  <span>€{(extraWebsites * mockAddOns[1].price).toFixed(2)}</span>
                </div>
              )}
              
              {customReports && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Custom Reports</span>
                  <span>€{mockAddOns[2].price.toFixed(2)}</span>
                </div>
              )}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <div className="text-right">
                    <div>€{calculateTotal().toFixed(2)}/month</div>
                    <div className="text-sm text-green-600">7-day free trial</div>
                  </div>
                </div>
                
                {billingCycle === "yearly" && (
                  <div className="text-sm text-green-600 mt-1">
                    You save €{(calculateTotal() * 2.4).toFixed(2)} yearly
                  </div>
                )}
              </div>
              
              <Button
                variant="outline"
                fullWidth
                onClick={handleBack}
                className="mt-6"
              >
                Modify Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  return (
    <MainLayout>
      <div className="layout py-12">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            icon={<ChevronLeft size={16} />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold ml-2">
            {step === "plan" 
              ? "Choose Your Plan" 
              : step === "customer-info" 
                ? "Create Account" 
                : "Complete Your Order"}
          </h1>
        </div>
        
        {renderContent()}
      </div>
    </MainLayout>
  );
};

export default Upgrade;
