const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const buildUrl = (path) => {
  if (path.startsWith("http")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const buildHeaders = (token, custom = {}, isFormData = false) => {
  const headers = { ...custom };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }
  return headers;
};

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    token,
    headers: customHeaders,
    query,
    ...rest
  } = options;

  const queryString = query
    ? `?${new URLSearchParams(query).toString()}`
    : "";

  const isFormData = body instanceof FormData;
  const requestBody =
    !body || isFormData || typeof body === "string"
      ? body
      : JSON.stringify(body);

  const response = await fetch(buildUrl(`${path}${queryString}`), {
    method,
    body: requestBody ?? undefined,
    headers: buildHeaders(token, customHeaders, isFormData),
    credentials: "include",
    ...rest,
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type");
  const payload =
    contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload || response.statusText
        : payload?.message || response.statusText;
    throw new Error(message);
  }

  return payload;
}

export function buildQueryParams(params) {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.append(key, value);
    }
  });
  const queryString = search.toString();
  return queryString ? `?${queryString}` : "";
}

export { API_BASE_URL };

