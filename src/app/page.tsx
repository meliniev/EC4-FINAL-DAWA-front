'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { isAuthenticated, usuario } = useAuth();

  if (isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-green-100 to-pink-100">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-purple-600 mb-4 tracking-tight">
              Bienvenida a SystemFarm, {usuario?.nombre}!
            </h1>
            <p className="text-xl text-green-700 max-w-2xl mx-auto">
              Organiza tu farmacia con estilo, color y mucha dulzura.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Link href="/productos" className="bg-white rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-purple-200">
              <div className="text-6xl mb-4">🧺</div>
              <h3 className="text-2xl font-bold text-purple-500 mb-2">
                Mis Medicinas
              </h3>
              <p className="text-green-600 mb-6">
                Lleva un registro seguro y bonito de tus medicamentos.
              </p>
              <span className="inline-block bg-gradient-to-r from-purple-300 to-green-300 text-purple-900 px-7 py-3 rounded-full font-semibold">
                Ver Medicinas →
              </span>
            </Link>
            
            <Link href="/categorias" className="bg-white rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-green-200">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-2xl font-bold text-green-500 mb-2">
                Categorías Pastel
              </h3>
              <p className="text-purple-600 mb-6">
                Organiza y encuentra tus productos fácil y rápido.
              </p>
              <span className="inline-block bg-gradient-to-r from-green-200 to-pink-200 text-green-900 px-7 py-3 rounded-full font-semibold">
                Ver Categorías →
              </span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-8">
            <h2 className="text-2xl font-bold text-center text-purple-600 mb-8">
              ✨ Tus Números
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">+120</div>
                <div className="text-green-600">Medicinas Guardadas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">8</div>
                <div className="text-purple-600">Categorías</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
                <div className="text-green-600">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-green-100 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-purple-600 mb-4 tracking-tight">
            SystemFarm
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto mb-8">
            Organiza tu farmacia con estilo, color y mucha dulzura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="bg-purple-300 hover:bg-purple-400 text-purple-900 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/registro"
              className="bg-green-200 hover:bg-green-300 text-green-900 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              Registrarme
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center border-t-4 border-purple-200">
            <h3 className="text-2xl font-bold text-purple-500 mb-2">
              Mis Medicinas
            </h3>
            <p className="text-green-600">
              Lleva un registro seguro y bonito de tus medicamentos.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center border-t-4 border-green-200">
            <h3 className="text-2xl font-bold text-green-500 mb-2">
              Categorías Pastel
            </h3>
            <p className="text-purple-600">
              Organiza y encuentra tus productos fácil y rápido.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            ¿Lista para organizar tu farmacia con estilo?
          </h2>
          <p className="text-green-700 mb-6">
            Únete a Farmalove y haz tu gestión más linda y sencilla.
          </p>
          <Link
            href="/auth/registro"
            className="bg-gradient-to-r from-purple-200 to-green-200 hover:from-purple-300 hover:to-green-300 text-purple-900 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
          >
            💌 Comenzar Ahora
          </Link>
        </div>
      </div>
    </div>
  );
}