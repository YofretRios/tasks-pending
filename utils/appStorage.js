export function getKey(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function setKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function clearKey(key) {
  localStorage.removeItem(key);
}