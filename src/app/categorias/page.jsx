'use client';
import { useEffect, useState } from 'react';
import { getCategorias, eliminarCategoria } from '@/lib/api';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const router = useRouter();

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const data = await getCategorias();
    setCategorias(data);
  };

  const eliminar = async (id) => {
    if (confirm('¿Está seguro que desea eliminar esta categoría?')) {
      await eliminarCategoria(id);
      cargar();
    }
  };

  const categoriasFiltradas = categorias.filter(categoria =>
    categoria.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-green-100 to-pink-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-200 p-8 mb-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-black text-purple-700 mb-2">
                  Categorías de Productos
                </h1>
                <p className="text-green-700">Gestiona las categorías de tu farmacia</p>
              </div>
              <button 
                className="bg-gradient-to-r from-purple-400 via-green-300 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all shadow-lg transform hover:scale-105 font-semibold text-lg"
                onClick={() => router.push('/categorias/new')}
              >
                Nueva Categoría
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6 mb-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-purple-400 text-xl">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Buscar categorías..."
                className="pl-12 pr-4 py-3 w-full border-2 border-purple-200 rounded-full focus:ring-4 focus:ring-purple-100 focus:border-purple-400 text-lg transition-all"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
          {categoriasFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categoriasFiltradas.map((categoria) => (
                <div key={categoria.id} className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 hover:border-pink-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-400 via-green-300 to-pink-400 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-lg">#{categoria.id}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/categorias/${categoria.id}/edit`)}
                          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
                          title="Editar categoría"
                        >
                          <span className="text-sm">✏️</span>
                        </button>
                        <button
                          onClick={() => eliminar(categoria.id)}
                          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
                          title="Eliminar categoría"
                        >
                          <span className="text-sm">🗑️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-purple-700 mb-2">{categoria.nombre}</h3>
                    <p className="text-green-700 text-sm">Categoría de productos</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-12 text-center">
              <div className="text-6xl mb-4">
                {busqueda ? '🔍' : '📁'}
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-2">
                {busqueda ? 'No se encontraron categorías' : 'No hay categorías registradas'}
              </h3>
              <p className="text-green-700">
                {busqueda 
                  ? 'Intenta con otros términos de búsqueda' 
                  : 'Comienza creando tu primera categoría'}
              </p>
              {!busqueda && (
                <button 
                  className="mt-6 bg-gradient-to-r from-purple-400 via-green-300 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full transition-all shadow-lg transform hover:scale-105 font-semibold"
                  onClick={() => router.push('/categorias/new')}
                >
                  Crear Primera Categoría
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}