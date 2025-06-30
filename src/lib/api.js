
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Función auxiliar para obtener headers con token
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// AUTENTICACIÓN
export async function registro(data) {
  const res = await fetch(`${BASE_URL}/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function login(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function obtenerPerfil() {
  const res = await fetch(`${BASE_URL}/auth/perfil`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function actualizarPerfil(data) {
  const res = await fetch(`${BASE_URL}/auth/perfil`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
}

// PRODUCTOS
export async function getProductos() {
  const res = await fetch(`${BASE_URL}/productos`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function getProducto(id) {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function crearProducto(data) {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function actualizarProducto(id, data) {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return res.json();
}

// CATEGORÍAS
export async function getCategorias() {
  const res = await fetch(`${BASE_URL}/categorias`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function getCategoria(id) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    headers: getAuthHeaders()
  });
  return res.json();
}

export async function crearCategoria(data) {
  const res = await fetch(`${BASE_URL}/categorias`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function actualizarCategoria(id, data) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function eliminarCategoria(id) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return res.json();
}
