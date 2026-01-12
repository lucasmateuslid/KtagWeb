
import * as React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { storage } from '../services/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<string | void>;
  register: (name: string, email: string, password: string, ip: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const u = await storage.getSessionUser();
      if (u) setUser(u);
      setLoading(false);
    };
    init();
  }, []);

  const login = async (email: string, password?: string): Promise<string | void> => {
    setLoading(true);
    // MOCK LOGIN: Aceita qualquer coisa e cria um perfil Demo
    const demoUser: User = {
      id: 'demo-user-id',
      name: email.split('@')[0].toUpperCase() || 'OPERADOR DEMO',
      email: email.toLowerCase(),
      role: 'admin',
      status: 'approved',
      avatarInitial: 'D',
      createdAt: Date.now()
    };
    
    await storage.setSessionUser(demoUser);
    setUser(demoUser);
    setLoading(false);
    return;
  };

  const register = async (name: string, email: string, password: string, ip: string) => {
    const newUser: User = { 
        id: crypto.randomUUID(), 
        name, email: email.toLowerCase(), 
        password, role: 'user', status: 'approved',
        createdAt: Date.now()
    };
    await storage.registerUserRequest(newUser);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    await storage.setSessionUser(updated);
    await storage.updateUserProfile(user.id, data);
  };

  const logout = async () => {
    await storage.clearSessionUser();
    setUser(null);
  };

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <AuthContext.Provider value={{ 
      user, login, register, updateProfile, logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
