import api from "../../../api";

// -----------------------
// LOGIN
// -----------------------
export async function login(email, password) {
  const res = await api.post("/api/auth/login", { email, password });

  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { token, user };
}

// -----------------------
// LOGOUT
// -----------------------
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// -----------------------
// REGISTER USER
// -----------------------
export async function registerUser(payload) {

  const res = await api.post("/api/auth/register", payload);
  return res.data; // return backend response
}
