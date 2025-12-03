import { apiRequest } from "./client";

const REQUESTS_BASE = "/api/requests";
const CLAIM_SLIPS_BASE = "/api/claimslips";

export const fetchRequests = ({ token, query } = {}) =>
  apiRequest(REQUESTS_BASE, {
    method: "GET",
    token,
    query,
  });

export const fetchRequestById = ({ id, token }) =>
  apiRequest(`${REQUESTS_BASE}/${id}`, {
    method: "GET",
    token,
  });

export const createRequest = ({ payload, token }) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return apiRequest(REQUESTS_BASE, {
    method: "POST",
    body: formData,
    token,
  });
};

export const updateRequest = ({ id, payload, token }) =>
  apiRequest(`${REQUESTS_BASE}/${id}`, {
    method: "PUT",
    body: payload,
    token,
  });

export const updateRequestStatus = ({ id, status, remarks, token }) =>
  apiRequest(`${REQUESTS_BASE}/${id}/status`, {
    method: "PATCH",
    body: { status, remarks },
    token,
  });

export const fetchClaimSlip = ({ requestId, token }) =>
  apiRequest(`${CLAIM_SLIPS_BASE}/${requestId}`, {
    method: "GET",
    token,
  });

