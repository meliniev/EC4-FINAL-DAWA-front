'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { isAuthenticated, usuario } = useAuth();

  if (isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-blue-900 mb-4">
              🏆 Bienvenido, {usuario?.nombre}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sistema de gestión farmacéutica con la pasión del FC Barcelona
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Link href="/productos" className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
              <div className="text-6xl mb-4">💊</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Gestión de Medicamentos
              </h3>
              <p className="text-gray-600 mb-6">
                Administra tu inventario de medicamentos de forma eficiente
              </p>
              <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold">
                Ver más →
              </span>
            </Link>
            
            <Link href="/categorias" className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Categorías
              </h3>
              <p className="text-gray-600 mb-6">
                Organiza tus productos por categorías para un mejor control
              </p>
              <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full font-semibold">
                Ver más →
              </span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
              📊 Panel de Control
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">∞</div>
                <div className="text-gray-600">Medicamentos Disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">∞</div>
                <div className="text-gray-600">Categorías Activas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">100%</div>
                <div className="text-gray-600">Satisfacción del Cliente</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            🏆 BarcaFarma
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Sistema de gestión farmacéutica con la pasión del FC Barcelona
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              🔐 Iniciar Sesión
            </Link>
            <Link
              href="/auth/registro"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              👤 Registrarse
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">💊</div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Gestión de Medicamentos
            </h3>
            <p className="text-gray-600">
              Administra tu inventario de medicamentos de forma eficiente
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Categorías
            </h3>
            <p className="text-gray-600">
              Organiza tus productos por categorías para un mejor control
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-gray-600 mb-6">
            Únete a BarcaFarma y gestiona tu farmacia con la excelencia del Barça
          </p>
          <Link
            href="/auth/registro"
            className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
          >
            🚀 Comenzar Ahora
          </Link>
        </div>
      </div>
    </div>
  );
}