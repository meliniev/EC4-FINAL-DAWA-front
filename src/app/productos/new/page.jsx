'use client';
import { useState } from 'react';
import { crearProducto } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function NuevoProducto() {
  const [producto, setProducto] = useState({ nombre: '', precio: '', stock: '', categoriaId: '' });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await crearProducto(producto);
    router.push('/productos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center py-8">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-2 border-blue-200 p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-pink-400 mb-4 shadow-lg">
            <span className="text-3xl text-white">➕</span>
          </div>
          <h1 className="text-4xl font-black text-blue-900 mb-2">Nuevo Producto</h1>
          <p className="text-gray-600">Complete los campos para registrar un medicamento</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-semibold text-blue-900 mb-1">Nombre del Producto</label>
            <input
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-base placeholder-gray-400"
              placeholder="Ej: Paracetamol 500mg"
              onChange={e => setProducto({...producto, nombre: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Precio (S/.)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-base placeholder-gray-400"
                placeholder="0.00"
                onChange={e => setProducto({...producto, precio: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-blue-900 mb-1">Stock</label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-base placeholder-gray-400"
                placeholder="Cantidad"
                onChange={e => setProducto({...producto, stock: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold text-blue-900 mb-1">Categoría (ID)</label>
            <input
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 text-base placeholder-gray-400"
              placeholder="ID de categoría"
              onChange={e => setProducto({...producto, categoriaId: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push('/productos')}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
              disabled={saving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-pink-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={saving}
            >
              {saving ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}