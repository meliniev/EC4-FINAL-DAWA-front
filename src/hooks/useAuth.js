'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerPerfil } from '@/lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    verificarAuth();
  }, []);

  const verificarAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await obtenerPerfil();
      if (response.error) {
        // Token inválido
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUsuario(null);
      } else {
        setUsuario(response);
        localStorage.setItem('usuario', JSON.stringify(response));
      }
    } catch (error) {
      console.error('Error verificando auth:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (datosUsuario, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    router.push('/auth/login');
  };

  const isAuthenticated = () => {
    return !!usuario;
  };

  const isAdmin = () => {
    return usuario?.rol === 'admin';
  };

  const value = {
    usuario,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    verificarAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
