'use client';
import { useEffect, useState } from 'react';
import { getProducto, actualizarProducto } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';

export default function EditarProducto() {
  const [producto, setProducto] = useState({ nombre: '', precio: '', stock: '', categoriaId: '' });
  const router = useRouter();
  const params = useParams(); 
  const id = params.id;

  useEffect(() => {
    if (id) getProducto(id).then(setProducto);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarProducto(id, producto);
    router.push('/productos');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">✏️ Editar Producto</h1>
        <p className="text-gray-600">Modifique los campos que desee actualizar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={producto.nombre}
            onChange={e => setProducto({...producto, nombre: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Precio (S/.)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={producto.precio}
              onChange={e => setProducto({...producto, precio: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={producto.stock}
              onChange={e => setProducto({...producto, stock: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={producto.categoriaId}
            onChange={e => setProducto({...producto, categoriaId: e.target.value})}
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/productos')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Actualizar Producto
          </button>
        </div>
      </form>
    </div>
  );
}