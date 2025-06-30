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
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">💊 Lista de Medicamentos</h1>
          <button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            onClick={() => router.push('/productos/new')}
          >
            ➕ Nuevo Producto
          </button>
        </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
        <div className="p-3 bg-gray-50 border-b">
          <div className="relative max-w-xs mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              🔍
            </div>
            <input
              type="text"
              placeholder="Buscar medicamentos"
              className="pl-10 pr-3 py-2 w-full border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">ID</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Producto</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">Precio</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">Stock</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">Categoría</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {productosFiltrados.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2 text-center text-sm font-medium text-gray-900">
                    #{producto.id}
                  </td>
                  <td className="px-3 py-2">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {producto.nombre}
                    </div>
                    {producto.descripcion && (
                      <div className="text-xs text-gray-500 truncate max-w-xs">
                        {producto.descripcion}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center text-sm font-semibold text-gray-900">
                    S/. {producto.precio}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm">
                        {producto.stock > 0 ? '✅' : '❌'}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {producto.stock || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center text-sm text-gray-600">
                    {producto.categoriaId}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => router.push(`/productos/${producto.id}/edit`)}
                        className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 p-1 rounded transition-colors"
                        title="Editar producto"
                      >
                        <span className="text-sm">✏️</span>
                      </button>
                      <button
                        onClick={() => eliminar(producto.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors"
                        title="Eliminar producto"
                      >
                        <span className="text-sm">🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    </ProtectedRoute>
  );
}