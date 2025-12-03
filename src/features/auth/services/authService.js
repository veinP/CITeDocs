import api from "../../../api";

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });

  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { token, user };
}

export async function registerUser(payload) {
  const res = await api.post("/auth/register", payload);
  return res.data; // { message, user }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
