export default async function reqdt({ method, url, token, data }) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
    body: data ? JSON.stringify(data) : undefined
  });
  if (!res.ok) throw await res.json();
  return res.json();
}
