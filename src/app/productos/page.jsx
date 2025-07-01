'use client';
import { useEffect, useState } from 'react';
import { getProductos, eliminarProducto } from '@/lib/api';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const router = useRouter();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const eliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await eliminarProducto(id);
      cargarProductos();
    }
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-green-100 to-pink-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-200 p-8 mb-10">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <h1 className="text-4xl font-black text-purple-700 mb-2 lg:mb-0">Lista de Medicamentos</h1>
              <button 
                className="bg-gradient-to-r from-purple-400 via-green-300 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all shadow-lg transform hover:scale-105 font-semibold text-lg"
                onClick={() => router.push('/productos/new')}
              >
                <span>➕</span> Nuevo Producto
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
                placeholder="Buscar medicamentos"
                className="pl-12 pr-4 py-3 w-full border-2 border-purple-200 rounded-full focus:ring-4 focus:ring-purple-100 focus:border-purple-400 text-lg transition-all"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border-2 border-purple-200">
            <table className="min-w-full divide-y divide-purple-100">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-4 py-2 text-center text-xs font-bold text-purple-700 uppercase tracking-wider w-12">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">Producto</th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-purple-700 uppercase tracking-wider w-20">Precio</th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-purple-700 uppercase tracking-wider w-16">Stock</th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-purple-700 uppercase tracking-wider w-20">Categoría</th>
                  <th className="px-4 py-2 text-center text-xs font-bold text-purple-700 uppercase tracking-wider w-20">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-purple-50">
                {productosFiltrados.map((producto) => (
                  <tr key={producto.id} className="hover:bg-pink-50 transition-all">
                    <td className="px-4 py-2 text-center text-sm font-semibold text-purple-700">
                      #{producto.id}
                    </td>
                    <td className="px-4 py-2">
                      <div className="text-base font-bold text-purple-700 truncate max-w-xs">{producto.nombre}</div>
                      {producto.descripcion && (
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {producto.descripcion}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center text-base font-bold text-purple-700">
                      S/. {producto.precio}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm">
                          {producto.stock > 0 ? '✅' : '❌'}
                        </span>
                        <span className="text-sm font-medium text-purple-700">
                          {producto.stock || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center text-sm text-green-700 font-semibold">
                      {producto.categoriaId}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => router.push(`/productos/${producto.id}/edit`)}
                          className="bg-white bg-opacity-20 hover:bg-purple-100 text-purple-700 p-2 rounded-full transition-all"
                          title="Editar producto"
                        >
                          <span className="text-lg">✏️</span>
                        </button>
                        <button
                          onClick={() => eliminar(producto.id)}
                          className="bg-white bg-opacity-20 hover:bg-pink-100 text-pink-600 p-2 rounded-full transition-all"
                          title="Eliminar producto"
                        >
                          <span className="text-lg">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {productosFiltrados.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <div className="text-3xl mb-2">
                  {busqueda ? '🔍' : '📭'}
                </div>
                <p className="text-sm">
                  {busqueda ? 'No se encontraron productos' : 'No hay productos registrados'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}