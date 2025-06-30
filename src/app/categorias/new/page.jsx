'use client';
import { useState } from 'react';
import { crearCategoria } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function NuevaCategoria() {
  const [categoria, setCategoria] = useState({ 
    nombre: '',
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await crearCategoria(categoria);
      router.push('/categorias');
    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-red-500 mb-4 shadow-lg">
            <span className="text-2xl text-white">➕</span>
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Nueva Categoría
          </h1>
          <p className="text-gray-600">
            Crea una nueva categoría con la calidad del Barça
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-red-500 p-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📝</span> Información de la Categoría
            </h2>
            <p className="text-blue-100 mt-1">Completa los datos requeridos</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-blue-900 mb-2">
                <span className="flex items-center gap-2">
                  <span>🏷️</span> Nombre de la categoría
                </span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 text-lg transition-all placeholder-gray-400"
                value={categoria.nombre}
                onChange={e => setCategoria({...categoria, nombre: e.target.value})}
                placeholder="Ej: Analgésicos, Antibióticos, Vitaminas..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Ingresa un nombre descriptivo para la nueva categoría
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/categorias')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
                disabled={saving}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>❌</span> Cancelar
                </span>
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={saving}
              >
                <span className="flex items-center justify-center gap-2">
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creando...
                    </>
                  ) : (
                    <>
                      <span>💾</span> Crear Categoría
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-red-50 rounded-2xl border-2 border-blue-200 p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span>💡</span> Consejos para crear categorías
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Usa nombres claros y específicos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Evita duplicar categorías existentes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Piensa en cómo organizarás tus productos</span>
            </li>
          </ul>
        </div>

        {/* Preview Card */}
        {categoria.nombre && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
              <span>👁️</span> Vista Previa
            </h3>
            <div className="bg-gradient-to-r from-blue-500 to-red-500 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-lg">#NEW</span>
                <div className="flex gap-2">
                  <span className="bg-white bg-opacity-20 text-white p-2 rounded-full text-sm">✏️</span>
                  <span className="bg-white bg-opacity-20 text-white p-2 rounded-full text-sm">🗑️</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-xl font-bold text-gray-800 mb-2">{categoria.nombre}</h4>
              <p className="text-gray-500 text-sm">Categoría de productos</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}