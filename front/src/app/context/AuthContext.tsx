'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

import { Session } from 'next-auth';


interface AuthContextType {
  session: Session | null; 
  isAuthenticated: boolean;
  isLoading: boolean;
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isAuthenticated = !!session;
  
  const [isConnected, setIsConnected] = useState<boolean>(false);
  

  
  useEffect(() => {
    if (session) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [session]);
  
  return (
    <AuthContext.Provider value={{ 

      session: session ?? null, 
      isAuthenticated,
      isLoading,
      isConnected,
      setIsConnected
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}