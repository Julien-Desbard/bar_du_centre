'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface AuthContextType {
  session: any;
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
  
  // ← useEffect pour synchroniser isConnected avec la session
  useEffect(() => {
    if (session) {
      setIsConnected(true);  // Connecté
    } else {
      setIsConnected(false); // Déconnecté
    }
  }, [session]); // Se déclenche à chaque changement de session
  
  return (
    <AuthContext.Provider value={{ 
      session, 
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