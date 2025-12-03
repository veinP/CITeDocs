// src/features/auth/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!storedToken || !storedUser) {
        setIsLoading(false);
        return;
      }

      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      setIsLoading(false);
    }

    loadSession();
  }, []);

  // ============================================
  // ✔ Save BOTH token + user after login
  // ============================================
  function loginContext(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  }

  // ============================================
  // ✔ Logout
  // ============================================
  function logoutContext() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginContext,
        logoutContext,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
