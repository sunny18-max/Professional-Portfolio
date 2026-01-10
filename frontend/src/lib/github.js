export async function fetchPinned() {
  try {
    const res = await fetch('/api/github/pinned');
    if (!res.ok) throw new Error('Failed to fetch pinned repos');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
