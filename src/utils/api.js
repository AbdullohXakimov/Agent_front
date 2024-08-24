// src/utils/api.js

import { API_BASE_URL } from "@/config";


export async function apiRequest({ method, url, body, tokenRequired = true }) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (tokenRequired) {
    const token = localStorage.getItem("access_token");
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    if (response.status === 401) {
      await handleTokenExpiration();
      return apiRequest({ method, url, body, tokenRequired });
    }
    throw new Error("API request failed");
  }

  return response.json();
}

export async function handleTokenExpiration() {
  try {
    await refreshToken();
  } catch (error) {
    console.error("Token refresh failed", error);
    // Redirect to login page if refresh fails
    router.push("/admin_login");
  }
}

async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${API_BASE_URL}/admins/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const { tokens } = await response.json();
  localStorage.setItem("access_token", tokens.accessToken);
  localStorage.setItem("refresh_token", tokens.refreshToken);
}
