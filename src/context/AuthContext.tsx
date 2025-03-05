
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription: {
    planId: string;
    name: string;
    status: string;
    trialEndDate?: string;
    billingCycle: "monthly" | "yearly";
    tasksUsed: number;
    tasksLimit: number;
    websitesUsed: number;
    websitesLimit: number;
    nextBillingDate: string;
    autoRenew: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  startFreeTrial: (email: string, planId: string, paymentDetails: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful login with mock data
      if (email && password) {
        // Import mockUser data
        const { mockUser } = await import('@/components/dashboard/mockData');
        
        // Set user data in state and localStorage
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      } else {
        throw new Error('Please enter both email and password');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
    navigate('/');
  };

  const startFreeTrial = async (email: string, planId: string, paymentDetails: any) => {
    setIsLoading(true);
    try {
      // In a real app, this would call an API to register the user
      // Here we'll simulate it and use mock data
      const { mockUser, mockPlans } = await import('@/components/dashboard/mockData');
      
      const selectedPlan = mockPlans.find(p => p.id === planId);
      if (!selectedPlan) throw new Error('Invalid plan selected');
      
      // Create a new user with trial information
      const trialUser = {
        ...mockUser,
        email,
        subscription: {
          ...mockUser.subscription,
          planId,
          name: selectedPlan.name,
          status: "trial",
          trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          billingCycle: paymentDetails.billingCycle
        }
      };
      
      setUser(trialUser);
      localStorage.setItem('user', JSON.stringify(trialUser));
      
      toast.success('Your 7-day free trial has started!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to start trial');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout,
      startFreeTrial
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
