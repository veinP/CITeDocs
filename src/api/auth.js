import { apiRequest } from "./client";

const AUTH_BASE = "/api/auth";
const USERS_BASE = "/api/users";

export const loginRequest = (credentials) =>
  apiRequest(`${AUTH_BASE}/login`, {
    method: "POST",
    body: credentials,
  });

export const logoutRequest = (token) =>
  apiRequest(`${AUTH_BASE}/logout`, {
    method: "POST",
    token,
  });

export const forgotPasswordRequest = (payload) =>
  apiRequest(`${AUTH_BASE}/forgot-password`, {
    method: "POST",
    body: payload,
  });

export const fetchCurrentUser = (token) =>
  apiRequest(`${USERS_BASE}/me`, {
    method: "GET",
    token,
  });

