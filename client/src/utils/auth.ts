// simple helpers for storing/getting JWT on the client
const STORAGE_KEY = "jwt_token";

export function setToken(token: string, useSession = false) {
  if (useSession) {
    sessionStorage.setItem(STORAGE_KEY, token);
  } else {
    localStorage.setItem(STORAGE_KEY, token);
  }
}

export function getToken(): string | null {
  return (
    localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY)
  );
}

export function clearToken() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
}
