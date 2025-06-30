'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const pathname = usePathname();
  const { usuario, logout, isAuthenticated } = useAuth();
  
  const isActive = (href) => pathname === href;

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-red-800 shadow-2xl relative">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 flex items-center justify-center shadow-lg">
                <span className="text-xl">🏆</span>
              </div>
              <span className="text-white text-2xl font-extrabold tracking-wide">BarcaFarma</span>
            </div>
          </div>

          <div className="hidden md:block">
            <ul className="flex items-center space-x-2">
              <NavLink href="/" active={isActive('/')}>
                🏠 Inicio
              </NavLink>
              {isAuthenticated() && (
                <>
                  <NavLink href="/productos" active={isActive('/productos')}>
                    💊 Medicamentos
                  </NavLink>
                  <NavLink href="/categorias" active={isActive('/categorias')}>
                    📂 Categorías
                  </NavLink>
                </>
              )}
              
              {isAuthenticated() ? (
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-white text-sm">
                    👋 Hola, {usuario?.nombre}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                  >
                    🚪 Salir
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 ml-4">
                  <NavLink href="/auth/login" active={isActive('/auth/login')}>
                    🔐 Iniciar Sesión
                  </NavLink>
                  <NavLink href="/auth/registro" active={isActive('/auth/registro')}>
                    👤 Registrarse
                  </NavLink>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }) {
  return (
    <li>
      <Link href={href} passHref>
        <span className={`${
          active 
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 shadow-lg' 
            : 'text-white hover:bg-white hover:bg-opacity-20'
        } px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105`}>
          {children}
        </span>
      </Link>
    </li>
  );
}