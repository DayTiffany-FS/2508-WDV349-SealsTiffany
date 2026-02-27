const API_URL = 'http://localhost:3000';

export async function login(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Invalid username or password');

  return res.json();
}

export async function getGigs(token) {
  const res = await fetch(`${API_URL}/gigs`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return res.json();
}

export async function createGig(data, token) {
  const res = await fetch(`${API_URL}/gigs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateGig(id, data, token) {
  const res = await fetch(`${API_URL}/gigs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteGig(id, token) {
  const res = await fetch(`${API_URL}/gigs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return res.json();
}
