'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [datos, setDatos] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login: loginContext } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(datos);
      if (response.error) {
        setError(response.error);
        return;
      }
      loginContext(response.usuario, response.token);
      router.push('/');
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-green-100 to-pink-100 flex flex-col justify-center items-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border-2 border-purple-200">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-purple-700 mb-2">Inicia sesión</h2>
          <p className="text-green-700">
            Ingresa tus datos para acceder a la plataforma
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-pink-50 border border-pink-200 text-pink-600 px-4 py-3 rounded mb-2">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={datos.email}
              onChange={handleChange}
              placeholder="ejemplo@email.com"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 text-base placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-purple-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={datos.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 text-base placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-xl shadow-md text-lg font-bold text-white bg-gradient-to-r from-purple-400 via-green-300 to-pink-400 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 transition-all"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="mt-8 text-center text-green-700">
          ¿No tienes cuenta?{' '}
          <Link href="/auth/registro" className="font-bold text-purple-600 hover:text-pink-500 transition-all">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}