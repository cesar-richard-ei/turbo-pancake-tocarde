import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getAuth, logout } from '../../lib/allauth';

interface User {
  username: string;
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getAuth();
      
      if (response.status === 200) {
        if (response.meta?.is_authenticated && response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
        if (response.message) {
          setError(response.message);
        }
      }
    } catch (err) {
      setUser(null);
      setError('Erreur lors de la récupération des informations utilisateur');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await logout();
      
      if (response.status === 200) {
        setUser(null);
      } else {
        setError(response.message || 'Erreur lors de la déconnexion');
      }
    } catch (err) {
      setError('Erreur lors de la déconnexion');
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = (userData: User) => {
    setUser(userData);
  };

  // Écouteur d'événement pour les changements d'authentification
  useEffect(() => {
    // Vérifier si on est côté client
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    
    const handleAuthChange = (event: CustomEvent) => {
      if (event.detail?.meta?.is_authenticated) {
        refreshUser();
      } else {
        setUser(null);
      }
    };

    document.addEventListener('allauth.auth.change', handleAuthChange as EventListener);
    
    // Vérifier l'état d'authentification au chargement
    refreshUser();

    return () => {
      document.removeEventListener('allauth.auth.change', handleAuthChange as EventListener);
    };
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login: loginUser,
    logout: handleLogout,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 