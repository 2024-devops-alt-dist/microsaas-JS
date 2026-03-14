import { getToken } from "./auth";

function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const port = process.env.NEXT_PUBLIC_API_PORT || "3000";
  const host = process.env.NEXT_PUBLIC_API_HOST || "localhost";
  const fallbackBaseUrl = `http://${host}:${port}/api/v1`;
  return (configuredBaseUrl || fallbackBaseUrl).replace(/\/$/, "");
}

function getApiUrlParts() {
  const apiBaseUrl = new URL(getApiBaseUrl());
  const apiBasePath = apiBaseUrl.pathname.replace(/\/$/, "");

  return {
    origin: apiBaseUrl.origin,
    apiBasePath,
    apiBaseUrl: apiBaseUrl.toString(),
  };
}

export function resolveApiUrl(input: string): string {
  if (/^(https?:|blob:|data:)/i.test(input)) {
    return input;
  }

  const { origin, apiBasePath, apiBaseUrl } = getApiUrlParts();

  if (input.startsWith("/uploads/")) {
    return `${origin}${input}`;
  }

  if (input.startsWith("/")) {
    if (apiBasePath && input.startsWith(`${apiBasePath}/`)) {
      return `${origin}${input}`;
    }

    return apiBasePath
      ? `${origin}${apiBasePath}${input}`
      : `${origin}${input}`;
  }

  return new URL(input, `${apiBaseUrl}/`).toString();
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
  // if the caller already provided a full URL we leave it alone; otherwise
  // prepend the base.
  let url: string;
  if (typeof input === "string") {
    url = input.startsWith("http") ? input : resolveApiUrl(input);
  } else {
    // Request object – clone with absolute URL if necessary
    const orig = input as Request;
    url = orig.url.startsWith("http") ? orig.url : resolveApiUrl(orig.url);
  }

  return fetch(url, { ...init, headers });
}
