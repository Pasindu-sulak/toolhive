const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const message = (data && data.error) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export function getTools(category) {
  const qs = category ? `?category=${encodeURIComponent(category)}` : '';
  return request(`/tools${qs}`);
}

export function getTool(slug) {
  return request(`/tools/${encodeURIComponent(slug)}`);
}

export function getCategories() {
  return request('/tools/categories');
}

export function submitContact(payload) {
  return request('/contact', { method: 'POST', body: JSON.stringify(payload) });
}

export function logEvent(type, path, slug) {
  // best-effort, never blocks the UI
  fetch(`${BASE}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, path, slug })
  }).catch(() => {});
}
