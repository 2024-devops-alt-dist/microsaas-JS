import type { NextRequest } from "next/server";
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/api/v1";

export const apiClient = {
  get: async (endpoint: string, req?: NextRequest) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: req ? { cookie: req.headers.get("cookie") || "" } : undefined,
    });
    if (!res.ok) {
      throw new Error(`GET ${endpoint} failed with status ${res.status}`);
    }
    return res.json();
  },

  post: async (
    endpoint: string,
    body: Record<string, unknown>,
    req?: NextRequest,
  ) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(req ? { cookie: req.headers.get("cookie") || "" } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`POST ${endpoint} failed with status ${res.status}`);
    }
    return res.json();
  },

  put: async (
    endpoint: string,
    body: Record<string, unknown>,
    req?: NextRequest,
  ) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(req ? { cookie: req.headers.get("cookie") || "" } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`PUT ${endpoint} failed with status ${res.status}`);
    }
    return res.json();
  },

  delete: async (endpoint: string, req?: NextRequest) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: req ? { cookie: req.headers.get("cookie") || "" } : {},
    });
    if (!res.ok) {
      throw new Error(`DELETE ${endpoint} failed with status ${res.status}`);
    }
    return res.json();
  },
};
