'use client';
import { useEffect, useState } from 'react';
import { getCategoria, actualizarCategoria } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';

export default function EditarCategoria() {
  const [categoria, setCategoria] = useState({ 
    nombre: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      getCategoria(id).then(c => {
        setCategoria({ nombre: c.nombre });
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await actualizarCategoria(id, categoria);
      router.push('/categorias');
    } catch (error) {
      // Manejo de error visual
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-green-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-700 font-semibold">Cargando categoría...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-green-100 to-pink-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-400 to-green-300 p-8 text-center">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-10 mb-2 shadow-lg">
            <span className="text-3xl text-white">✏️</span>
          </span>
          <h1 className="text-4xl font-bold text-white mb-2">Editar Categoría</h1>
          <p className="text-purple-100">ID: #{id}</p>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div>
            <label className="block text-lg font-semibold text-purple-700 mb-2">
              <span className="flex items-center gap-2">
                <span>🏷️</span> Nombre de la categoría
              </span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 text-lg transition-all placeholder-gray-400"
              value={categoria.nombre}
              onChange={e => setCategoria({...categoria, nombre: e.target.value})}
              placeholder="Ej: Analgésicos, Antibióticos, etc."
              required
            />
          </div>
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-400 via-green-300 to-pink-400 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={saving}
            >
              <span className="flex items-center justify-center gap-2">
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Actualizando...
                  </>
                ) : (
                  <>
                    <span>💾</span> Actualizar Categoría
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
        <div className="bg-gradient-to-r from-purple-50 via-green-50 to-pink-50 border-t-2 border-purple-100 p-6">
          <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
            <span>💡</span> Consejos
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Usa nombres descriptivos y fáciles de entender</li>
            <li>• Evita nombres muy largos o complicados</li>
            <li>• Mantén consistencia en el formato de nombres</li>
          </ul>
        </div>
      </div>
    </div>
  );
}