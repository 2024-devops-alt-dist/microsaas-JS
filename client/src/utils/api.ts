import { getToken } from "./auth";

function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const port = process.env.NEXT_PUBLIC_API_PORT || "3000";
  const host = process.env.NEXT_PUBLIC_API_HOST || "localhost";
  return configuredBaseUrl || `http://${host}:${port}`;
}

export function resolveApiUrl(input: string): string {
  if (/^(https?:|blob:|data:)/i.test(input)) {
    return input;
  }

  const baseUrl = getApiBaseUrl();
  return input.startsWith("/") ? `${baseUrl}${input}` : `${baseUrl}/${input}`;
}

export async function apiFetch(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // when running the development server the React app lives on a
  // different port (usually 5173) than the API (3000). earlier we were
  // passing a relative path (`/api/...`), which caused the browser to
  // hit the frontend server instead of the backend. to fix that we
  // compute an absolute URL using an env var that can be overridden in
  // docker-compose or .env.local.
  const baseUrl = getApiBaseUrl();

  // if the caller already provided a full URL we leave it alone; otherwise
  // prepend the base.
  let url: string;
  if (typeof input === "string") {
    url = input.startsWith("http") ? input : `${baseUrl}${input}`;
  } else {
    // Request object – clone with absolute URL if necessary
    const orig = input as Request;
    url = orig.url.startsWith("http") ? orig.url : `${baseUrl}${orig.url}`;
  }

  return fetch(url, { ...init, headers });
}
